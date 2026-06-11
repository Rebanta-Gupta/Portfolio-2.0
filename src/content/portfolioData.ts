import type { PortfolioData } from '../types';

const portfolioData: PortfolioData = {
  resumeEnabled: true, // ← set to false to hide the resume download button everywhere
  resumePath: 'resume.pdf', // ← drop your PDF in /public/ and update this name

  hero: {
    greeting: "Hello, I'm",
    name: 'Rebanta',
    highlight: 'Gupta',
    taglines: [
      'Nanotechnology Engineering @ University of Waterloo',
      'Building things that bridge hardware and software',
      'From nanomaterials to Rust CLIs',
      'Physics simulations, PCB design, data tools',
    ],
  },

  about: [
    "I'm a Nanotechnology Engineering student at the University of Waterloo interested in building systems that connect hardware and software. I enjoy working on hands-on projects where ideas turn into real prototypes.",
    'My experience spans physical prototyping, PCB assembly, simulation and modelling, and building data-driven software tools. I\'m especially drawn to projects that sit at the intersection of physical devices and digital systems.',
    'Most of my projects start with a simple idea and end with something tangible — whether that\'s a nanomaterial-based electronic device, a Rust CLI tool, or a full-stack data analysis tool.',
    'I like experimenting, learning quickly, and building things that actually work.',
  ],

  experience: [
    {
      title: 'Teaching Assistant',
      org: 'University Hill Secondary',
      date: 'Jan 2024 – Jun 2024',
      location: 'Vancouver, BC',
      description: 'Supported classroom operations by assisting with grading and preparing instructional materials, helping improve course organization and student engagement across multiple science courses.',
      skills: ['Communication', 'Problem-solving', 'Analytical Thinking', 'Time Management'],
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
      title: 'Youth Program Intern',
      org: 'University Neighbourhood Association',
      date: 'Sep 2024 – Jun 2025',
      location: 'Vancouver, BC',
      description: 'Supported the planning and execution of over 10 community events, working closely with diverse teams to ensure smooth coordination, stakeholder engagement, and successful program delivery.',
      skills: ['Leadership', 'Project Coordination', 'Event Planning', 'Stakeholder Engagement'],
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
      brief: 'Synthesized silver nanoparticles, formulated conductive ink, designed and fabricated a functional PCB using printed electronics.',
      description: [
        'This project explored how nanomaterials can be used in real electronic systems. I synthesized silver nanoparticles using chemical reduction methods and used them to formulate a conductive ink for printed electronics. The goal was to see how materials developed at the nanoscale could actually be integrated into functional hardware.',
        'Alongside the materials work, I designed a complete PCB in KiCad, including schematic capture and board layout. The board was fabricated using a Voltera V-One PCB printer, which allowed me to rapidly prototype the design using conductive ink. After printing, I hand-soldered the components and performed bring-up and validation.',
        'What I enjoyed most was getting to work across the full hardware development pipeline — from synthesizing nanomaterials, to designing electronics in CAD, to physically fabricating and assembling the board. A great example of how materials science, electrical design, and hands-on prototyping come together.',
      ],
      images: [
        { src: '/images/precision-weighing.jpeg', alt: 'Precision weighing of PVP polymer', caption: '1. Precision weighing of PVP capping agent', description: 'PVP (polyvinylpyrrolidone) precisely weighed at 0.5014 g using a Sartorius analytical balance. PVP controls nanoparticle size and prevents agglomeration during synthesis.' },
        { src: '/images/magnetic-stirrer.jpeg', alt: 'Precursor solution mixing', caption: '2. Precursor solution mixing at 300 RPM', description: 'The precursor solution mixed at 300 RPM using a Heidolph magnetic hot plate stirrer. Controlled stirring ensures uniform reagent distribution and consistent nanoparticle nucleation.' },
        { src: '/images/fume-hood-synthesis.jpeg', alt: 'Synthesis inside fume hood', caption: '3. Synthesis in progress inside a fume hood', description: 'Full synthesis setup inside a fume hood. The Erlenmeyer flask sits on a magnetic stirrer with a condenser attached for safe handling of chemical reagents during the reduction reaction.' },
        { src: '/images/nanoparticle-sample.jpeg', alt: 'Silver nanoparticle colloid sample', caption: '4. Final silver nanoparticle colloid', description: 'The synthesized silver nanoparticle colloid in a labeled Greiner tube. The dark yellow-brown colour confirms successful formation of silver nanoparticles in colloidal suspension.' },
        { src: '/images/kicad-pcb-design.jpeg', alt: 'KiCad PCB layout', caption: '5. PCB schematic and layout in KiCad', description: 'Complete PCB schematic and layout in KiCad, including component placement, trace routing, and DRC checks — prepared for Voltera V-One fabrication.' },
        { src: '/images/voltera-printing.jpeg', alt: 'Voltera V-One printing traces', caption: '6. Voltera V-One printing conductive traces', description: 'The Voltera V-One PCB printer depositing conductive silver ink traces onto substrate, replacing traditional etching with precise dispensing.' },
        { src: '/images/pcb-led-test.jpeg', alt: 'PCB LED validation', caption: '7. Completed PCB with LED validation', description: 'Final fabricated PCB with a soldered LED successfully lit, confirming end-to-end pipeline from nanoparticle synthesis through conductive ink formulation, PCB printing, soldering, and circuit bring-up.' },
      ],
      tags: ['Nanomaterials Synthesis', 'Printed Electronics', 'PCB Design', 'KiCad', 'Voltera V-One', 'Soldering', 'Circuit Bring-up'],
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
        'Features include duplicate bookmark detection, dead-link validation, hierarchical folder restructuring, and organization utilities. The tool parses Edge\'s JSON bookmark format directly, with zero external dependencies at runtime.',
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
      brief: 'Developed RF Paul trap analytical models with automated COMSOL simulations — achieved 2nd highest trap depth-to-power ratio.',
      description: [
        'Developed comprehensive analytical models for RF Paul trap stability analysis in quantum computing systems. Automated complex electromagnetic simulations using Python, SciPy, and the COMSOL Multiphysics API to optimize trap performance parameters.',
        'Successfully achieved the second-highest trap depth-to-power ratio in the competition, demonstrating efficient design optimization. Combined theoretical electromagnetics with practical computational modelling to advance quantum hardware development.',
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
      items: ['Streamlit', 'NumPy', 'SciPy', 'Pandas', 'Matplotlib', 'React', 'p5.js', 'Matter.js'],
    },
    {
      icon: 'wrench',
      category: 'Tools & Hardware',
      items: ['SolidWorks', 'KiCad', 'COMSOL', 'Voltera V-One', 'PCB Fabrication', '3D Printing', 'Git & GitHub'],
    },
  ],

  contact: [
    { icon: 'mail', label: 'Email', value: 'guptarebanta816@gmail.com', url: 'mailto:guptarebanta816@gmail.com' },
    { icon: 'linkedin', label: 'LinkedIn', value: 'in/rebanta-gupta', url: 'https://www.linkedin.com/in/Rebanta-Gupta' },
    { icon: 'github', label: 'GitHub', value: 'Rebanta-Gupta', url: 'https://github.com/Rebanta-Gupta' },
  ],
};

export default portfolioData;