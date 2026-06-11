import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import config from '../../content/particleConfig.json';

interface ParticleFieldProps {
  className?: string;
}

export default function ParticleField({ className = '' }: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let destroyed = false;
    let raf: number;

    const { count } = config;
    const particleColor = parseInt(config.particle.color.replace('#', ''), 16);
    const bondColor     = parseInt(config.bonds.color.replace('#', ''), 16);

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      config.camera.fov,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = config.camera.z;

    // ── Particles ─────────────────────────────────────────────────
    const positions = new Float32Array(count * 3);
    const speeds    = new Float32Array(count);
    const offsets   = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * config.spread.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * config.spread.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * config.spread.z;
      speeds[i]  = 0.08 + Math.random() * 0.12;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    // Store origins so particles spring back — prevents bond breaking
    const origins = new Float32Array(positions);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color:           particleColor,
      size:            config.particle.size,
      transparent:     true,
      opacity:         config.particle.opacity,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ── Line connections ──────────────────────────────────────────
    const linePairs: [number, number][] = [];
    outer: for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3]     - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < config.bonds.threshold) {
          linePairs.push([i, j]);
          if (linePairs.length >= config.bonds.maxCount) break outer;
        }
      }
    }

    const linePositions = new Float32Array(linePairs.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color:       bondColor,
      transparent: true,
      opacity:     config.bonds.opacity,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ── Mouse ─────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, active: false };
    const onMove = (e: MouseEvent) => {
      mouse.x      = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y      = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.active = true;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount || destroyed) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Visibility ────────────────────────────────────────────────
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0.01 }
    );
    io.observe(mount);

    // ── Animation ─────────────────────────────────────────────────
    let frame = 0;

    const animate = () => {
      if (destroyed) return;
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      frame += config.animation.driftSpeed;

      const pos = geo.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        // Gentle drift
        pos[iy] += Math.sin(frame * speeds[i] + offsets[i]) * config.animation.driftAmount;

        // Spring back toward origin — keeps bonds from breaking
        pos[ix] += (origins[ix] - pos[ix]) * config.animation.springStrength;
        pos[iy] += (origins[iy] - pos[iy]) * config.animation.springStrength;
        pos[iz] += (origins[iz] - pos[iz]) * config.animation.springStrength;

        // Mouse repulsion
        if (mouse.active) {
          const mx = mouse.x * config.spread.x / 2;
          const my = mouse.y * config.spread.y / 2;
          const dx = pos[ix] - mx;
          const dy = pos[iy] - my;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < config.mouse.repulsionRadius) {
            const f = (config.mouse.repulsionRadius - d) / config.mouse.repulsionRadius * config.mouse.repulsionStrength;
            pos[ix] += (dx / d) * f;
            pos[iy] += (dy / d) * f;
          }
        }
      }
      geo.attributes.position.needsUpdate = true;

      // Update line positions
      const lp = lineGeo.attributes.position.array as Float32Array;
      for (let k = 0; k < linePairs.length; k++) {
        const [a, b] = linePairs[k];
        lp[k * 6]     = pos[a * 3];     lp[k * 6 + 1] = pos[a * 3 + 1]; lp[k * 6 + 2] = pos[a * 3 + 2];
        lp[k * 6 + 3] = pos[b * 3];     lp[k * 6 + 4] = pos[b * 3 + 1]; lp[k * 6 + 5] = pos[b * 3 + 2];
      }
      lineGeo.attributes.position.needsUpdate = true;

      // Slow auto-rotation
      points.rotation.y += config.animation.rotationSpeed;
      lines.rotation.y   = points.rotation.y;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────
    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      lineGeo.dispose();
      mat.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`particle-canvas pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}