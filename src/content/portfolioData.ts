import type { PortfolioData } from '../types';

const portfolioData: PortfolioData = {
  resumeEnabled: false, // CV hidden until a PDF matching this site is in /public/
  resumePath: 'resume.pdf', // ← drop your PDF in /public/ and update this name

  hero: {
    greeting: "Hello, I'm",
    name: 'Rebanta',
    highlight: 'Gupta',
    taglines: [
      'Nanotechnology Engineering @ University of Waterloo',
      'Research software for open-source physics simulation',
      'Building things that bridge hardware and software',
      'From nanomaterials to Rust and Python CLIs',
    ],
  },

  about: [
    "I'm a Nanotechnology Engineering student at the University of Waterloo interested in building systems that connect hardware and software. I enjoy working on hands-on projects where ideas turn into real prototypes.",
    'In summer 2026 I worked as an Undergraduate Research Assistant on OpenCMP, an open-source finite-element simulation package, where I built its interactive 3D results visualizer. Beyond research, my experience spans physical prototyping, PCB assembly, simulation and modelling, and building data-driven software tools.',
    'Most of my projects start with a simple idea and end with something tangible — whether that\'s a nanomaterial-based electronic device, a Python package on PyPI, a Rust CLI tool, or a data analysis app.',
    'I like experimenting, learning quickly, and building things that actually work.',
  ],

  experience: [
    {
      title: 'Undergraduate Research Assistant',
      org: 'CoMPhys Group, University of Waterloo',
      date: 'Jun 2026 – Aug 2026',
      location: 'Waterloo, ON',
      description: 'Worked on OpenCMP, an open-source finite-element multiphysics solver built on NGSolve. Designed and built its interactive PyVista/Qt results visualizer solo, with supervisor review, backed by 39 pytest tests and no regressions in the existing suite. Also fixed solver bugs (case-sensitive boundary-condition headers, a bare except swallowing Ctrl+C) and diagnosed CRLF and .pvd output corruption issues.',
      skills: ['Python', 'PyVista / VTK', 'Qt', 'pytest', 'Open Source', 'Debugging'],
    },
    {
      title: 'Youth Intern',
      org: 'University Neighbourhood Association',
      date: 'Jul 2025 – Aug 2025',
      location: 'Vancouver, BC',
      description: 'Independently planned 5+ pop-up events: wrote proposals, set budgets, sourced materials, scheduled, estimated volunteer needs and defined target age groups. Tracked inventory in spreadsheets I built.',
      skills: ['Project Coordination', 'Budgeting', 'Event Planning', 'Spreadsheets'],
    },
    {
      title: 'Youth Leader',
      org: 'University Neighbourhood Association',
      date: 'Sep 2024 – Jun 2025',
      location: 'Vancouver, BC',
      description: 'Part of a 25+ member youth group that planned and ran 5+ community events end-to-end.',
      skills: ['Teamwork', 'Event Planning', 'Community Engagement'],
    },
    {
      title: 'Peer Tutor',
      org: 'University Hill Secondary',
      date: 'Sep 2024 – Jun 2025',
      location: 'Vancouver, BC',
      description: 'Worked one-on-one with students across physics, chemistry, and biology, adapting teaching style to match different learning needs. Supported peers in building foundational understanding and confidence in STEM subjects.',
      skills: ['Teaching & Mentoring', 'Interpersonal Skills', 'Adaptability', 'Knowledge Transfer'],
    },
    {
      title: 'Teaching Assistant',
      org: 'University Hill Secondary',
      date: 'Jan 2024 – Jun 2024',
      location: 'Vancouver, BC',
      description: 'Supported classroom operations by assisting with grading and preparing instructional materials, helping improve course organization and student engagement across multiple science courses.',
      skills: ['Communication', 'Problem-solving', 'Analytical Thinking', 'Time Management'],
    },
  ],

  projects: [
    // ── HARDWARE / NANO ─────────────────────────────────────────────
    {
      id: 'nanomaterials',
      icon: 'beaker',
      category: 'hardware',
      featured: true,
      title: 'Applied Nanomaterials for Electronic Systems',
      brief: 'UWNRG printed-electronics workshop: the silver nanoparticle ink batch failed, so we switched to commercial ink and used manual rework to deliver a tested, working LED circuit.',
      description: [
        'A UWNRG Nanomaterials Workshop that set out to go end-to-end on printed electronics, from raw chemistry to a working circuit, using conductive ink synthesized from scratch. Working as part of the group, I measured reagents and ran the silver nanoparticle synthesis by chemical reduction, with a PVP capping agent and controlled magnetic stirring.',
        'The synthesized batch failed, and lab time did not allow a second attempt, so we fell back to commercial conductive ink to stay within the fabrication window. With a partner, I designed a PCB in KiCad, printed it on a Voltera V-One, and soldered a simple LED circuit (3 LEDs, a resistor and a battery).',
        'The printed traces had inconsistent ink deposition that left gaps in the conductive paths. I worked around them by soldering bridges over the gaps to restore continuity, then confirmed the board worked with an LED bring-up test. The main lesson: a failed step is a new problem to solve under real constraints, not the end of the project.',
      ],
      images: [
        { src: '/images/precision-weighing.jpeg', alt: 'Precision weighing of PVP polymer', caption: '1. Precision weighing of PVP capping agent', description: 'PVP (polyvinylpyrrolidone) precisely weighed at 0.5014 g using a Sartorius analytical balance. PVP controls nanoparticle size and prevents agglomeration during synthesis.' },
        { src: '/images/magnetic-stirrer.jpeg', alt: 'Precursor solution mixing', caption: '2. Precursor solution mixing at 300 RPM', description: 'The precursor solution mixed at 300 RPM using a Heidolph magnetic hot plate stirrer. Controlled stirring ensures uniform reagent distribution and consistent nanoparticle nucleation.' },
        { src: '/images/fume-hood-synthesis.jpeg', alt: 'Synthesis inside fume hood', caption: '3. Synthesis in progress inside a fume hood', description: 'Full synthesis setup inside a fume hood. The Erlenmeyer flask sits on a magnetic stirrer with a condenser attached for safe handling of chemical reagents during the reduction reaction.' },
        { src: '/images/nanoparticle-sample.jpeg', alt: 'Silver nanoparticle colloid sample', caption: '4. Synthesized nanoparticle sample', description: 'The synthesized sample in a labeled Greiner tube. This batch did not produce a usable conductive ink, and lab time did not allow a re-run, so the boards were printed with commercial ink.' },
        { src: '/images/kicad-pcb-design.jpeg', alt: 'KiCad PCB layout', caption: '5. PCB schematic and layout in KiCad', description: 'Complete PCB schematic and layout in KiCad, including component placement, trace routing, and DRC checks — prepared for Voltera V-One fabrication.' },
        { src: '/images/voltera-printing.jpeg', alt: 'Voltera V-One printing traces', caption: '6. Voltera V-One printing conductive traces', description: 'The Voltera V-One PCB printer depositing commercial conductive ink traces onto the substrate, replacing traditional etching with precise dispensing.' },
        { src: '/images/pcb-led-test.jpeg', alt: 'PCB LED validation', caption: '7. Completed PCB with LED validation', description: 'The finished board with its LEDs lit. Gaps in the printed traces were bridged with solder to restore continuity before the bring-up test passed.' },
      ],
      tags: ['Nanoparticle Synthesis', 'Printed Electronics', 'PCB Design', 'KiCad', 'Voltera V-One', 'Soldering', 'Rework'],
      link: null,
    },
    {
      id: 'teng',
      icon: 'zap',
      category: 'hardware',
      title: 'Triboelectric Nanogenerator (TENG)',
      brief: 'Designed and built a slider-crank mechanical energy harvesting device that converts motion to electricity via the triboelectric effect.',
      description: [
        'Designed and assembled a slider-crank–based triboelectric nanogenerator for mechanical-to-electrical energy conversion. This device harnesses the triboelectric effect to generate electrical power from mechanical motion, representing a sustainable approach to energy harvesting.',
        'Created custom 3D-printable parts using SolidWorks CAD software, ensuring precise mechanical tolerances and optimal functionality. The project involved iterative prototyping and testing to maximize energy conversion efficiency.',
      ],
      images: [],
      tags: ['Mechanical Design', 'Energy Harvesting', 'SolidWorks', '3D Printing', 'Prototyping'],
      link: null,
    },

    // ── SOFTWARE ─────────────────────────────────────────────────────
    {
      id: 'opencmp',
      icon: 'cpu',
      category: 'software',
      featured: true,
      title: 'OpenCMP — Simulation Results Visualizer',
      brief: 'Built an interactive 3D visualizer into OpenCMP, an open-source finite-element solver: step, rewind and jump through simulation results in a Qt window. 39 tests, no regressions.',
      description: [
        'OpenCMP is an open-source simulation package that researchers use to model problems like fluid flow. Once a run finished, there was no built-in way to see the results unfold: researchers exported the data and stitched together an external visualization workflow by hand, every time.',
        'As an Undergraduate Research Assistant, I designed and built a visualization system directly into OpenCMP, solo, with my supervisor reviewing and approving the work. When the option is enabled, it reads the simulation\'s .vtu output after a run and renders it in a Qt window, using pyvistaqt to embed the PyVista/VTK view as a native widget and qtpy to stay binding-agnostic over PyQt5. The control panel steps forward and backward and jumps to any point in time, not just linear playback.',
        'The hard parts were rendering without noticeably slowing the solver, managing VTK state across time steps, GPU rendering limits under WSL, and solver interruptions corrupting .pvd output between runs. I chose VTK rendering over streamlines (too heavy, and broken under WSLg) and PyVista over Matplotlib (native .vtu reading instead of a custom parser).',
        'I wrote 39 pytest tests for the workflow. It passes OpenCMP\'s full existing test suite with no regressions and works across all 5+ tutorials that need rendering. The main lesson: the best choice on paper isn\'t always right in practice, and the tests were what let me trust my own judgment working alone.',
      ],
      images: [],
      tags: ['Python', 'PyVista', 'VTK', 'Qt (qtpy / PyQt5)', 'pytest', 'NGSolve', 'Open Source'],
      link: 'https://github.com/Rebanta-Gupta/opencmp/tree/visualization',
    },
    {
      id: 'vaultwright',
      icon: 'terminal',
      category: 'software',
      featured: true,
      title: 'vaultwright',
      brief: 'Python CLI toolkit for Obsidian vaults, published on PyPI. Its kiln command refines rough notes with a local Ollama model, never touching the originals.',
      description: [
        'A command-line toolkit for working with Obsidian vaults: scan a vault\'s structure, list vaults, check that notes survive processing, and refine notes. The kiln command sends a rough note to a local Ollama model and writes the cleaned-up version beside it, so nothing leaves the machine and the original is never modified.',
        'Anything the model adds from its own knowledge has to land inside a marked callout, so added material stays visually separate from what I wrote. kiln refuses to save if the model changed or moved content it shouldn\'t have.',
        'Built with Typer, Rich, Pydantic and the Ollama client, with 111 tests on Python 3.11 to 3.14. Releases go out from GitHub Actions through PyPI Trusted Publishing, so no API token exists to leak, and publishing runs only after the tests pass.',
      ],
      images: [],
      tags: ['Python', 'CLI', 'Ollama', 'Local LLM', 'Typer', 'pytest', 'GitHub Actions', 'PyPI'],
      link: 'https://github.com/Rebanta-Gupta/vaultwright',
      liveLink: 'https://pypi.org/project/vaultwright/',
    },
    {
      id: 'statfit',
      icon: 'chart-column',
      category: 'software',
      featured: true,
      title: 'Statistical Distribution Fitting Tool',
      brief: 'Interactive Streamlit app for fitting and visualizing statistical distributions — normal, exponential, gamma, Weibull — on datasets up to 10,000+ samples.',
      description: [
        'Built a comprehensive Python-based Streamlit application supporting multiple statistical distributions including normal, exponential, gamma, and Weibull. The tool provides interactive visualization and detailed error analysis for large datasets.',
        'Features include real-time parameter fitting, goodness-of-fit tests, probability plots, and exportable reports. Useful for researchers and engineers performing statistical analysis on experimental data.',
      ],
      images: [],
      tags: ['Python', 'Streamlit', 'NumPy', 'SciPy', 'Pandas', 'Matplotlib', 'Data Analysis'],
      link: 'https://github.com/Rebanta-Gupta/Statistical-Distribution-Fitting-Tool',
    },
    {
      id: 'edge-bookmarks',
      icon: 'terminal',
      category: 'software',
      featured: true,
      title: 'Edge Bookmarks Organizer',
      brief: 'Rust CLI tool that safely cleans and restructures Microsoft Edge bookmarks — dry-run mode, automatic backups, duplicate detection, and dead-link checking.',
      description: [
        'A command-line tool written in Rust for safely managing and reorganizing Microsoft Edge bookmark files. Built with safety-first design: every operation supports a dry-run mode that shows what would change without touching any files, and automatic backups are created before any modification.',
        'Features include duplicate bookmark detection, async dead-link checking, hierarchical folder restructuring, and organization utilities. Built on clap for the CLI, serde for Edge\'s JSON bookmark format, and reqwest for link checks.',
      ],
      images: [],
      tags: ['Rust', 'CLI', 'JSON Parsing', 'File Systems', 'Developer Tooling'],
      link: 'https://github.com/Rebanta-Gupta/edge-bookmarks-organizer',
    },
    {
      id: 'taylor-matlab',
      icon: 'chart-column',
      category: 'software',
      title: 'Taylor Series vs Exact — MATLAB',
      brief: 'Interactive MATLAB tool for comparing Taylor series approximations against exact function values, with live error analysis and convergence visualization.',
      description: [
        'An interactive MATLAB application for exploring Taylor series approximations. Users select a function, set the expansion point and number of terms, and see real-time comparison plots between the Taylor polynomial and the exact function.',
        'Includes error analysis plots showing how approximation accuracy varies with the number of terms and distance from the expansion point — useful for numerical methods coursework and computational physics.',
      ],
      images: [],
      tags: ['MATLAB', 'Numerical Methods', 'Scientific Computing', 'Visualization', 'Math'],
      link: 'https://github.com/Rebanta-Gupta/taylor-vs-exact',
    },
    {
      id: 'java-projects',
      icon: 'code',
      category: 'software',
      title: 'Java Projects',
      brief: 'Portfolio of Java coursework covering OOP, data structures, array manipulation, and core CS fundamentals.',
      description: [
        'A collection of Java programming assignments and projects from CS coursework, covering object-oriented programming principles, data structures, algorithm implementation, and core computer science concepts.',
        'Projects include exercises on array manipulation, inheritance and polymorphism, control flow, and more — built as part of foundational CS training.',
      ],
      images: [],
      tags: ['Java', 'OOP', 'Data Structures', 'Algorithms', 'CS Fundamentals'],
      link: 'https://github.com/Rebanta-Gupta/Java-Projects',
    },

    // ── GAMES ────────────────────────────────────────────────────────
    {
      id: 'trex-game',
      icon: 'gamepad-2',
      category: 'games',
      title: 'T-Rex Infinite Runner',
      brief: 'Browser-based infinite runner inspired by the Chrome Dino game — procedural obstacles, score tracking, and progressive difficulty.',
      description: [
        'A browser-based infinite runner game built with p5.js and p5.play, inspired by the classic Chrome offline Dino game. Features procedurally generated obstacles, an increasing difficulty curve, and a high-score tracker.',
        'Built as an exploration of game loop design, sprite management, and collision detection using p5.play\'s physics and sprite system.',
      ],
      images: [],
      tags: ['JavaScript', 'p5.js', 'p5.play', 'Game Dev', 'Creative Coding'],
      link: 'https://github.com/Rebanta-Gupta/Trex-Game',
    },
    {
      id: 'treasure-game',
      icon: 'gamepad-2',
      category: 'games',
      title: 'Treasure Vertical Runner',
      brief: '2D vertical runner built with p5.js — collect treasures, dodge obstacles, survive as long as you can.',
      description: [
        'A 2D vertical runner game built with p5.js where the player collects treasures while avoiding obstacles falling from above. Features a scoring system, escalating difficulty, and smooth sprite animations.',
        'Focused on learning game state management, input handling, and rendering loops within p5.js\'s draw cycle.',
      ],
      images: [],
      tags: ['JavaScript', 'p5.js', 'Game Dev', 'Creative Coding'],
      link: 'https://github.com/Rebanta-Gupta/Treasure-Game',
    },
    {
      id: 'bouncing-ball',
      icon: 'atom',
      category: 'games',
      title: 'Bouncing Ball Physics Simulation',
      brief: 'Interactive physics simulation of high-restitution elastic collisions, built with Matter.js and p5.js.',
      description: [
        'A real-time physics simulation modelling elastic collisions between balls with high restitution coefficients. Built with Matter.js for physics and p5.js for rendering.',
        'Users can spawn balls and watch emergent collision behaviour — an exploration of rigid body dynamics, impulse resolution, and how small parameter changes (restitution, mass) dramatically alter system behaviour.',
      ],
      images: [],
      tags: ['JavaScript', 'Matter.js', 'p5.js', 'Physics Simulation', 'Creative Coding'],
      link: 'https://github.com/Rebanta-Gupta/Bouncing-Ball-Simulation',
    },

    // ── HACKATHONS ───────────────────────────────────────────────────
    {
      id: 'hardhaq',
      icon: 'atom',
      category: 'hackathon',
      featured: true,
      title: 'HardHaQ – Quantum Hardware Hackathon',
      brief: 'Three-person team entry: an automated COMSOL pipeline ran 1000+ RF Paul trap simulations in 9 days, placing 2nd for trap depth-to-power ratio among 25+ teams.',
      description: [
        'My first hackathon, on a team with Nikhil and Lucas. Evaluating a single RF Paul trap geometry meant running COMSOL by hand, so after hand-testing 50+ parameter sets the team moved to a Python pipeline that drove COMSOL through its mph API. Nikhil built that pipeline and its Streamlit dashboard; Lucas led the trap redesign the judges requested.',
        'My part: I derived 5+ analytical models for trap stability and depth from electromagnetic theory and cross-validated each against simulation output to narrow the geometry search. I also spotted that the vacuum sphere enclosing the trap had been left out as a parameter and added it, and helped debug a divergence that was producing invalid negative scores.',
        'Across the 9 days the team ran 1000+ simulations and reached the second-highest trap depth-to-power ratio among 25+ teams, about 7 million times better than the baseline design.',
      ],
      images: [],
      tags: ['Electromagnetics', 'Quantum Hardware', 'COMSOL', 'Python', 'SciPy', 'Scientific Computing'],
      link: 'https://github.com/Rebanta-Gupta/Formulae-Documentation',
    },
  ],

  skills: [
    {
      icon: 'code',
      category: 'Languages',
      items: ['Python', 'Rust', 'Java', 'JavaScript', 'TypeScript', 'MATLAB', 'HTML & CSS', 'LaTeX'],
    },
    {
      icon: 'boxes',
      category: 'Frameworks & Libraries',
      items: ['NumPy', 'SciPy', 'Pandas', 'Matplotlib', 'PyVista / VTK', 'NGSolve', 'Qt (PyQt5)', 'Streamlit', 'React', 'p5.js'],
    },
    {
      icon: 'wrench',
      category: 'Tools & Hardware',
      items: ['Git & GitHub', 'pytest', 'GitHub Actions', 'Docker', 'WSL / Linux', 'Ollama', 'SolidWorks', 'KiCad', 'COMSOL', 'Voltera V-One', '3D Printing'],
    },
  ],

  contact: [
    { icon: 'mail', label: 'Email', value: 'guptarebanta816@gmail.com', url: 'mailto:guptarebanta816@gmail.com' },
    { icon: 'linkedin', label: 'LinkedIn', value: 'in/rebanta-gupta', url: 'https://www.linkedin.com/in/Rebanta-Gupta' },
    { icon: 'github', label: 'GitHub', value: 'Rebanta-Gupta', url: 'https://github.com/Rebanta-Gupta' },
  ],
};

export default portfolioData;