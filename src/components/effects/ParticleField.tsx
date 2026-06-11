import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

export default function ParticleField({ count = 1600, className = '' }: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 80;

    // ── Particles ─────────────────────────────────────────────────
    const positions = new Float32Array(count * 3);
    const speeds    = new Float32Array(count);
    const offsets   = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 180;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      speeds[i]  = 0.08 + Math.random() * 0.12;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.55,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ── Line connections ──────────────────────────────────────────
    // Only connect nearest pairs — pre-computed sparse set
    const linePairs: [number, number][] = [];
    const THRESHOLD = 22;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i*3]   - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < THRESHOLD) {
          linePairs.push([i, j]);
          if (linePairs.length > 480) break; // cap line count
        }
      }
      if (linePairs.length > 480) break;
    }

    const linePositions = new Float32Array(linePairs.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineSegmentsGeometry
      ? new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.13 })
      : new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.13 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ── Mouse ─────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, active: false };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.active = true;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Animation ─────────────────────────────────────────────────
    let frame = 0;
    let raf: number;
    let visible = true;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.01 });
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      frame += 0.004;

      const pos = geo.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        // Gentle drift
        pos[i*3+1] += Math.sin(frame * speeds[i] + offsets[i]) * 0.012;

        // Mouse repulsion (world-space approx)
        if (mouse.active) {
          const mx = mouse.x * 90;
          const my = mouse.y * 60;
          const dx = pos[i*3]   - mx;
          const dy = pos[i*3+1] - my;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 14) {
            const f = (14 - d) / 14 * 0.18;
            pos[i*3]   += (dx / d) * f;
            pos[i*3+1] += (dy / d) * f;
          }
        }
      }
      geo.attributes.position.needsUpdate = true;

      // Update line positions
      const lp = lineGeo.attributes.position.array as Float32Array;
      for (let k = 0; k < linePairs.length; k++) {
        const [a, b] = linePairs[k];
        lp[k*6]   = pos[a*3];   lp[k*6+1] = pos[a*3+1]; lp[k*6+2] = pos[a*3+2];
        lp[k*6+3] = pos[b*3];   lp[k*6+4] = pos[b*3+1]; lp[k*6+5] = pos[b*3+2];
      }
      lineGeo.attributes.position.needsUpdate = true;

      // Slow auto-rotation
      points.rotation.y += 0.00015;
      lines.rotation.y   = points.rotation.y;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      lineGeo.dispose();
      mat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [count]);

  return (
    <div
      ref={mountRef}
      className={`particle-canvas pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}