export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year?: string;
  tags: string[];
  stack: string[];
  highlights: string[];
  cover?: string;
  gallery?: string[]; // mini gallery images (optional)
  links: { label: string; href: string }[];
  body: { label: string; text: string }[];
};

export const projects: Project[] = [
  {
    slug: "rednet-ml",
    title: "REDNET-ML",
    subtitle:
      "Geospatial environmental risk mapping with time-split evaluation under distribution shift",
    cover: "/projects/rednet-ml/cover.png",
    gallery: [
      "/placeholders/rednet-1.png",
      "/placeholders/rednet-2.png",
      "/placeholders/rednet-3.png",
    ],
    year: "2025–2026",
    tags: ["Geospatial ML", "Distribution Shift", "Risk Mapping"],
    stack: ["Python", "PyTorch", "CatBoost", "YOLOv8", "ONNX", "scikit-learn"],
    highlights: [
      "Built a multi-sensor geospatial ML pipeline for harmful algal bloom risk mapping",
      "Evaluated using time-based splits to measure real-world shift; CatBoost fusion improved AUPRC (~0.64 → ~0.78)",
      "Delivered a runnable repo with training, export, and ONNX inference scripts",
    ],
    links: [{ label: "Repo", href: "https://github.com/TallowCatch/REDNET-ML" }],
    body: [
      {
        label: "Problem",
        text:
          "Environmental monitoring data is sparse and noisy, and model performance can degrade when conditions change over time.",
      },
      {
        label: "Approach",
        text:
          "I combined detector confidence signals with oceanographic features, then used time-split validation to stress-test generalisation under shift.",
      },
      {
        label: "Evidence",
        text:
          "Fusion improved AUPRC over simpler baselines under time shift, and the repository includes end-to-end reproduction and ONNX export.",
      },
    ],
  },

  {
    slug: "awrp",
    title: "AWRP",
    subtitle:
      "Arctic weather-dependent routing simulator with multi-objective optimisation",
    cover: "/projects/awrp/cover-v2.png",
    gallery: [
      "/placeholders/awrp-1.png",
      "/placeholders/awrp-2.png",
      "/placeholders/awrp-3.png",
    ],
    year: "2025",
    tags: ["Simulation", "Routing", "Multi-objective"],
    stack: ["Python", "Graph Modelling", "NSGA-II"],
    highlights: [
      "Built a simulator for time-varying constraints with explicit safety–efficiency trade-offs",
      "Implemented obstacle-aware graph validation and repeatable scenario evaluation loops",
      "Ran multi-objective optimisation with robustness checks under changing conditions",
    ],
    links: [],
    body: [
      {
        label: "What it shows",
        text:
          "A focus on evaluation under uncertainty: simulate realistic constraints, measure trade-offs, and compare approaches under consistent scenarios.",
      },
    ],
  },

  {
    slug: "rant",
    title: "RANT",
    subtitle: "Ant-inspired multi-robot exploration under partial observability",
    cover: "/projects/rant/cover.png",
    gallery: [
      "/placeholders/rant-1.png",
      "/placeholders/rant-2.png",
      "/placeholders/rant-3.png",
    ],
    year: "2024–2025",
    tags: ["Multi-Agent", "Robotics", "Evaluation"],
    stack: ["Python", "Webots", "Particle Filter"],
    highlights: [
      "Designed decentralised coordination with noisy sensing and pheromone-style no-revisit policies",
      "Implemented particle-filter localisation and reproducible parameter sweeps",
      "In a 10×10 arena: unique coverage 8.5% → 18.1% (N=1→5) and hotspot recall 20.0% → 65.6%",
    ],
    links: [],
    body: [
      {
        label: "Why it matters",
        text:
          "Demonstrates coordination without central control, plus clean evaluation across team sizes and environments.",
      },
    ],
  },

  {
    slug: "hemayah",
    title: "Hemayah",
    subtitle: "TinyML fall detection with embedded inference and robustness analysis",
    cover: "/projects/hemayah/cover.png",
    gallery: [
      "/placeholders/hemayah-1.png",
      "/placeholders/hemayah-2.png",
      "/placeholders/hemayah-3.png",
    ],
    year: "2024–2025",
    tags: ["TinyML", "Embedded", "Robustness"],
    stack: ["Python", "TensorFlow", "TFLite"],
    highlights: [
      "Built an IMU fall-detection pipeline and deployed a lightweight embedded model",
      "Handled class imbalance, sensor noise, and user variation during training and evaluation",
      "Achieved weighted F1 of 0.84 with structured failure-mode analysis",
    ],
    links: [],
    body: [
      {
        label: "Pitch",
        text:
          "Deployment-aware edge ML: accuracy is paired with practical constraints, noise handling, and real-world failure analysis.",
      },
    ],
  },

  {
    slug: "firewall-configuration",
    title: "Firewall Configuration",
    subtitle: "C TCP firewall rules engine with Python GUI and Makefile automation",
    cover: "/projects/firewall-configuration/cover.png",
    gallery: [
      "/placeholders/firewall-1.png",
      "/placeholders/firewall-2.png",
      "/placeholders/firewall-3.png",
    ],
    year: "2024",
    tags: ["Systems", "C", "Networking"],
    stack: ["C", "Python", "Makefile", "TCP"],
    highlights: [
      "Implemented rule parsing for single IP/port and range formats",
      "Built a Python GUI for safer input, plus a separate CLI client",
      "Added Makefile targets to run the server and GUI together",
    ],
    links: [
      { label: "Repo", href: "https://github.com/TallowCatch/Firewall-Configuration" },
    ],
    body: [
      {
        label: "Why it’s here",
        text:
          "Shows low-level systems work: protocols, parsing, validation, and logging, alongside automation and tooling.",
      },
    ],
  },
];
