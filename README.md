# Explainable KNN – Interactive Learning Playground

<div align="center">

**A browser-based interactive tool that makes K-Nearest Neighbors (KNN) algorithm visual, intuitive, and fun to learn.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-yana--knn.lovable.app-blue?style=for-the-badge&logo=react)](https://yana-knn.lovable.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/yanaevteeva2027-code/knn-learning-lab)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

---

## 📋 Table of Contents

- [What is Explainable KNN?](#what-is-explainable-knn)
- [Key Features](#-key-features)
- [Who is this for?](#-who-is-this-for)
- [Quick Start](#-quick-start)
- [How it Works](#-how-it-works-technical-overview)
- [For Teachers](#-for-teachers-how-to-use-this-in-class)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Credits](#-credits)

---

## What is Explainable KNN?

**Explainable KNN** is a browser-based interactive tool that turns the K-Nearest Neighbors (KNN) algorithm from a black box into a hands-on, visual learning experience.

It started as a simple KNN playground for a BWSI final project and grew into a **complete mini-learning environment**:
- 🎮 An **interactive playground** to experiment with KNN
- 📚 A set of **Guided Examples** that walk learners through key concepts
- ✅ A **Quiz mode** that lets students test themselves on real KNN scenarios

Everything runs client-side in the browser. **No installation, no backend, just open the URL and start learning.**

---

## ✨ Key Features

### 1. Interactive KNN Playground

The Playground tab lets you freely explore how KNN behaves under different settings:

#### Datasets
- **Moons** – Two interlocking half-circles (non-linear)
- **Circles** – Two concentric circles (non-linear)
- **Blobs** – Two Gaussian blobs (approximately linearly separable)

#### Core Controls
- **k (number of neighbours):** 1–40, with live updates to the decision boundary
- **Weights:** `Uniform` vs `Distance` (closer neighbours vote more)
- **Distance metric p:**
  - `p = 2` → Euclidean (L2) - circular neighborhoods
  - `p = 1` → Manhattan (L1) - diamond-shaped neighborhoods
- **Noise:** Adjust overlap between classes to see how KNN handles messy data
- **Sample size:** Choose how many points to generate (20–200)
- **Random seed:** Reproduce the exact same dataset
- **Inspect point:** Select a point (by index or click) and see its neighbours visualized

#### Visualization
- Decision boundary **heatmap** showing predicted class across the plane
- Training points colored by class (cyan for Class A, magenta for Class B)
- One **inspected point** with dashed lines drawn to its k nearest neighbours
- Everything updates **live** as you move sliders or switch options

#### Metrics
- Overall **test accuracy** (as a percentage, calculated via leave-one-out cross-validation)
- **Confusion matrix** summary: TP, TN, FP, FN with accuracy formula

This gives students immediate visual feedback on how KNN responds to every parameter change.

---

### 2. Guided Examples – Built-In "Mini Lessons"

The **Examples** tab turns the playground into a structured learning tool.

- **Powered by TypeScript data files:** Each example stores a full KNN configuration and text explaining what to notice
- Each example card includes:
  - A **title** and learning **goal**
  - "What to observe" bullet points
  - Buttons:
    - **Load Example** – Applies that configuration to the playground
    - **Reset to Example** – Returns to the original settings if the learner made changes

#### Concepts Illustrated
- Overfitting vs smoothing when k is small vs large
- How distance weighting changes predictions in overlapping regions
- Euclidean vs Manhattan distance and their impact on the boundary
- Linear vs non-linear datasets (Blobs vs Moons/Circles)
- Sensitivity to noise and the effect on accuracy

This makes Explainable KNN more than a playground: it's a **self-guided tutorial**.

---

### 3. Quiz Mode – Check Your Understanding

The **Quiz** tab turns the KNN engine into a question bank.

- **Powered by TypeScript data files:** Each question contains:
  - A **scenario** (stem)
  - Multiple choice **options** (A–D), each with its own KNN configuration
  - The **correct option**
  - A detailed **explanation**

- For each option, students can:
  - **Preview** that configuration in the shared KNN canvas (dataset, k, metric, weights, noise, etc.)
  - Then select the answer they believe matches the question

- The app provides:
  - Instant **correct/incorrect feedback**
  - An **explanation** of the concept
  - A running **score** and progress (e.g., "Question 3 of 10")
  - A **Retake Quiz** option to reset everything

This transforms KNN from a static topic into an **active testing experience**, ideal for homework, self-study, or informal assessment.

---

### 4. Help & About – Clear, Student-Friendly Documentation

- **Help Dialog:**
  - Explains in plain language:
    - What KNN is
    - What each control does (k, metric, noise, etc.)
    - How to interpret the decision boundary and confusion matrix
    - How to use Playground, Examples, and Quiz modes

- **About Dialog:**
  - Project identity:
    - **Project name:** Explainable KNN
    - **Author:** Yana Evteeva
    - **Program:** MIT Beaver Works Applied Engineering & AI (BWSI) 2025
  - Short description of the project's purpose and BWSI context

---

## 👥 Who is this for?

- **High school / early college students** learning machine learning for the first time
- **Teachers & coaches** who want a visual, interactive way to explain KNN
- **Curious learners** who know some Python/ML but want to "see" what KNN is really doing

You can use this tool:
- As a **classroom demo**
- As a **self-study playground**
- As a **companion** to textbooks, online courses, or BWSI content

---

## 🚀 Quick Start

### Try it Online

Visit the [live demo](https://yana-knn.lovable.app/) - no installation required!

### Run Locally

```bash
# Clone the repository
git clone https://github.com/yanaevteeva2027-code/knn-learning-lab.git
cd knn-learning-lab

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔧 How it Works (Technical Overview)

Explainable KNN is built as a modern single-page React app using:

- **Vite** – Fast dev server and build system
- **React 18.3** + **TypeScript 5.8** – UI and logic
- **shadcn-ui** + **Tailwind CSS** – Responsive, accessible components and styling
- **React Router** – Client-side routing
- **Radix UI** – Accessible component primitives

### Under the Hood

- A small, **pure JavaScript/TypeScript KNN engine** (`src/lib/knn.ts`) performs brute-force neighbour search in the browser
- All datasets are generated **synthetically** on the client from a random seed using a seeded random number generator
- The Playground, Examples, and Quiz modes all share a **single KNN configuration state** via a custom React hook (`useKNNPlayground`), so the canvas and metrics are always consistent across modes
- Decision boundaries are computed on-the-fly by evaluating KNN predictions across a grid of points
- Metrics use **leave-one-out cross-validation** for accurate performance measurement

**No Python, server, or external ML libraries are required** – everything runs in the browser!

---

## 👨‍🏫 For Teachers: How to Use This in Class

Some ideas for classroom use:

### 1. Live Demo
- Project the Playground
- Ask students to predict what will happen if you change k, then show the result
- Toggle between Euclidean and Manhattan on the Circles dataset to discuss metrics

### 2. Guided Exploration
- Assign specific **Examples** as mini-labs
- Students load each example, follow "What to observe", and answer short written prompts

### 3. Formative Assessment
- Use the **Quiz** tab in small groups
- After each question, have students explain in their own words *why* the correct option works

Because everything runs in the browser, students can also continue exploring at home without installing anything.

---

## 📁 Project Structure

```
knn-learning-lab/
├── src/
│   ├── components/          # React components
│   │   ├── KNNPlayground.tsx    # Main playground component
│   │   ├── KNNCanvas.tsx         # Canvas visualization
│   │   ├── ControlPanel.tsx      # Parameter controls
│   │   ├── ExamplesView.tsx      # Examples tab
│   │   ├── QuizView.tsx          # Quiz tab
│   │   ├── HelpDialog.tsx        # Help modal
│   │   ├── AboutDialog.tsx       # About modal
│   │   └── ui/                    # shadcn-ui components
│   ├── data/                # Data files
│   │   ├── examples.ts           # Guided examples (6 examples)
│   │   └── quiz.ts               # Quiz questions (10 questions)
│   ├── hooks/               # Custom React hooks
│   │   └── useKNNPlayground.ts   # Shared KNN state management
│   ├── lib/                 # Core logic
│   │   ├── knn.ts                # KNN algorithm implementation
│   │   └── utils.ts              # Utility functions
│   ├── pages/               # Page components
│   │   ├── Index.tsx             # Main page (root route)
│   │   └── NotFound.tsx          # 404 page
│   └── App.tsx              # App root component
├── public/                  # Static assets
├── package.json             # Dependencies
└── README.md               # This file
```

---

## 💻 Development

### Prerequisites

- Node.js 18+ and npm
- Modern browser with ES6+ support

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Key Technologies

- **React 18.3.1** – UI framework
- **TypeScript 5.8.3** – Type safety
- **Vite 5.4.19** – Build tool and dev server
- **Tailwind CSS 3.4.17** – Styling
- **shadcn-ui** – Component library
- **React Router 6.30.1** – Routing
- **Radix UI** – Accessible primitives

---

## 🤝 Contributing

Contributions are welcome! This project was created for educational purposes as part of the BWSI 2025 program.

If you'd like to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions

- Additional example scenarios
- More quiz questions
- Performance optimizations for large datasets
- Additional distance metrics
- Export/import functionality for configurations
- Accessibility improvements

---

## 📄 License

This project is created for educational purposes as part of the MIT Beaver Works Applied Engineering & AI (BWSI) 2025 program.

---

## 🙏 Credits

**Author:** Yana Evteeva  
**Program:** MIT Beaver Works Applied Engineering & AI (BWSI) 2025  
**Project:** Explainable KNN – Interactive Learning Playground

### Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

<div align="center">

**Made with ❤️ for learners everywhere**

[Live Demo](https://yana-knn.lovable.app/) • [GitHub](https://github.com/yanaevteeva2027-code/knn-learning-lab)

</div>
