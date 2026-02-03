export type Project = {
    slug: string;
    title: string;
    subtitle: string;
    year?: string;
    tags: string[];
    stack: string[];
    highlights: string[];
    links: { label: string; href: string }[];
    body: { label: string; text: string }[];
  };
  
  export const projects: Project[] = [
    {
      slug: "rednet-ml",
      title: "REDNET-ML",
      subtitle: "Geospatial environmental risk mapping with temporal generalisation under shift",
      year: "2025–2026",
      tags: ["Geospatial ML", "Distribution Shift", "Risk Mapping"],
      stack: ["Python", "PyTorch", "CatBoost", "YOLOv8", "ONNX", "scikit-learn"],
      highlights: [
        "Built multi-sensor geospatial ML pipeline for harmful algal bloom risk mapping",
        "Time-based evaluation under strong distribution shift; CatBoost fusion improved AUPRC (~0.64 → ~0.78)",
        "Runnable stack includes PyTorch training, Ultralytics YOLOv8, and ONNX export/inference scripts",
      ],
      links: [
        { label: "Repo", href: "https://github.com/TallowCatch/REDNET-ML" },
      ],
      body: [
        {
          label: "Problem",
          text:
            "Environmental monitoring is sparse and noisy; you need models that hold up when conditions change across time.",
        },
        {
          label: "Approach",
          text:
            "Fuse detector confidence signals with oceanographic features and evaluate using time-split validation to surface real shift, not just random splits.",
        },
        {
          label: "Evidence",
          text:
            "Observed meaningful AUPRC uplift with CatBoost fusion over logistic baselines under time shift; the repo provides a minimal runnable pipeline and ONNX export path.",
        },
      ],
    },
  
    {
      slug: "awrp",
      title: "AWRP",
      subtitle: "Arctic weather-dependent routing simulator + multi-objective optimisation",
      year: "2025",
      tags: ["Simulation", "Routing", "Multi-objective"],
      stack: ["Python", "Graph Modelling", "NSGA-II"],
      highlights: [
        "Simulator for stochastic, time-varying constraints with explicit efficiency–safety trade-offs",
        "Obstacle-aware graph validation + repeatable scenario evaluation loops",
        "Multi-objective optimisation (NSGA-II) + robustness analysis under shift",
      ],
      links: [],
      body: [
        {
          label: "What makes it ‘you’",
          text:
            "This is the same evaluation mindset as your Cooperative AI work: don’t just optimise—stress-test policies under changing conditions.",
        },
      ],
    },
  
    {
      slug: "rant",
      title: "RANT",
      subtitle: "Ant-inspired multi-robot exploration under partial observability",
      year: "2024–2025",
      tags: ["Multi-Agent", "Robotics", "Evaluation"],
      stack: ["Python", "Webots", "Particle Filter"],
      highlights: [
        "Decentralised coordination with noisy sensing + pheromone-style no-revisit policies",
        "Particle-filter localisation; reproducible sweeps over team size and environment scale",
        "In a 10×10 arena: unique coverage 8.5% → 18.1% (N=1→5) and hotspot recall 20.0% → 65.6%",
      ],
      links: [],
      body: [
        {
          label: "Why it matters",
          text:
            "Clean example of coordination without central control—great anchor for your Cooperative AI narrative.",
        },
      ],
    },
  
    {
      slug: "hemayah",
      title: "Hemayah",
      subtitle: "TinyML fall detection with embedded inference + robustness thinking",
      year: "2024–2025",
      tags: ["TinyML", "Embedded", "Robustness"],
      stack: ["Python", "TensorFlow", "TFLite"],
      highlights: [
        "Supervised IMU fall detection pipeline deployed as lightweight embedded model",
        "Studied class imbalance, sensor noise, and user variation",
        "Achieved weighted F1 of 0.84 with structured failure-mode analysis",
      ],
      links: [],
      body: [
        {
          label: "Pitch line",
          text:
            "Edge ML that’s actually deployment-aware, not just notebook metrics.",
        },
      ],
    },
  
    {
      slug: "firewall-configuration",
      title: "Firewall Configuration",
      subtitle: "C TCP server/client firewall rules + Python GUI + Makefile automation",
      year: "2024",
      tags: ["Systems", "C", "Networking"],
      stack: ["C", "Python", "Makefile", "TCP"],
      highlights: [
        "Rule specification supports single IP/port or range formats",
        "Includes Python GUI for safer input + separate CLI client",
        "Makefile target to run server + GUI together",
      ],
      links: [
        { label: "Repo", href: "https://github.com/TallowCatch/Firewall-Configuration" },
      ],
      body: [
        {
          label: "Why it’s here",
          text:
            "Shows you can do low-level systems work (protocols, parsing, logging) — useful contrast to your ML projects.",
        },
      ],
    },
  
    {
      slug: "currency-converter",
      title: "Currency Converter",
      subtitle: "Simple web converter using ExchangeRate API",
      year: "2023–2024",
      tags: ["Web", "JS", "API"],
      stack: ["HTML", "CSS", "JavaScript"],
      highlights: [
        "Real-time conversion + swap feature + error handling",
      ],
      links: [{ label: "Repo", href: "https://github.com/TallowCatch/Currency-Converter" }],
      body: [
        { label: "Note", text: "Keep this as a lightweight ‘baseline’ web project—don’t over-feature it." },
      ],
    },
  ];
  