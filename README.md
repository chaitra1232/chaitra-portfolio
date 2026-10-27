# Chaitra M G - Cinematic Dark Portfolio Website

A complete, responsive, animated personal portfolio website built with **HTML5, CSS3, and Vanilla JavaScript** for **Chaitra M G** (Final-Year CSE Student at Amrutha Institute of Engineering and Management Sciences, CGPA: 9.2).

Designed with a **cinematic dark aesthetic**: obsidian black background, neon pink (`#ff2a85`), crimson (`#ff1744`), and electric purple (`#a855f7`) gradients, glassmorphism cards, glowing portrait backdrops, and interactive floating particles.

---

## 🚀 Quick Launch

### Option 1: Direct Browser Launch
Double-click `launch.bat` or open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari):
```
file:///C:/Users/chait/.gemini/antigravity/scratch/chaitra-portfolio/index.html
```

### Option 2: Local HTTP Server (Python)
In PowerShell or Terminal:
```bash
cd C:\Users\chait\.gemini\antigravity\scratch\chaitra-portfolio
python -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

---

## 📁 Project Structure

```
chaitra-portfolio/
│
├── index.html                   # Semantic HTML5 single-page application
├── launch.bat                   # 1-click batch launcher for Windows
├── README.md                    # Project documentation & configuration guide
│
├── css/
│   ├── style.css                # Core design system, glassmorphism, responsive grid
│   └── animations.css           # Keyframe animations, glows, scroll reveal & a11y
│
├── js/
│   ├── main.js                  # Typing effect, modal simulators, form validation, theme toggle
│   └── particles.js             # Canvas 60fps glowing particles & interactive mouse drift
│
└── assets/
    ├── docs/
    │   └── Chaitra_MG_Resume.pdf# Valid downloadable PDF resume for Chaitra M G
    │
    └── images/
        ├── WhatsApp Image 2026-10-27 at 4.08.44 PM.jpeg # Chaitra M G's real portrait photo (Active)
        ├── chaitra-portrait.jpeg             # Direct copy of portrait
        ├── project-rag.svg                   # AI Video Entity Prediction RAG illustration
        ├── project-stock.svg                 # Stock Portfolio Tracker dynamic chart graphic
        ├── project-weather.svg               # Weather Forecast Web App radar/forecast UI
        ├── favicon.svg                       # Monogram "CMG" with glowing neon ring
        └── README-PORTRAIT.txt               # Step-by-step portrait documentation
```

---

## 🎨 Key Features & Technical Details

1. **Cinematic Dark & Light Theme System**:
   - Obsidian void black (`#08060d`), neon pink (`#ff2a85`), crimson (`#ff1744`), electric purple (`#a855f7`), and cyan highlights (`#00f5d4`).
   - Seamless one-click Dark/Light mode toggle with persistence in `localStorage`.

2. **Hero Section with Dynamic Visuals**:
   - Monogram logo (`CMG`) with subtle tilt hover effect.
   - Live dynamic typing effect cycling through roles:
     - *Final-Year CSE Student*
     - *Aspiring Software Engineer*
     - *AI & RAG Researcher*
     - *Full-Stack Developer*
     - *Data Analysis Enthusiast*
   - Replaceable portrait with multi-layered glowing backdrop halo and rotating tech rings.
   - Working "Contact Me" smooth-scroll button and genuine "Download Resume" button.

3. **About Me & Education**:
   - Detailed academic overview: Amrutha Institute of Engineering and Management Sciences (AIEMS).
   - Degree: B.E. in Computer Science and Engineering (2023 - 2027).
   - CGPA: **9.2 / 10.0**.
   - Core focus areas: Algorithms, Systems, RAG Multimodal Pipelines, Relational Databases.

4. **11 Technical Skills (Categorized & Interactive)**:
   - Python, Java, C, HTML5, CSS3, React, MySQL, Git, GitHub, Data Analysis, Machine Learning.
   - Interactive category tabs: *All Skills*, *Programming Languages*, *Web Technologies*, *Databases & Version Control*, *AI & Data Analysis*.
   - Glassmorphic cards with skill proficiency meters and 3D hover glow.

5. **3 Featured Projects with Interactive Simulators**:
   - **AI-Based Video Entity Prediction using RAG**: Multimodal RAG with PyTorch, OpenCV, ChromaDB. Includes live interactive vector search simulator.
   - **Stock Portfolio Tracker**: Full-stack equity tracking with real-time valuation and MySQL schema. Includes interactive market surge/dip valuation simulator.
   - **Weather Forecast Web App**: Asynchronous REST weather client with 7-day forecast and offline caching. Includes interactive multi-city meteorological simulator.
   - Interactive modal popup with architecture walkthroughs and live interactive consoles.

6. **Animated Milestones Timeline**:
   - 2023 to 2027 chronological progression with animated scroll-linked progress indicator.

7. **Validated Contact Section**:
   - Direct Email: `chaitrachethaa@gmail.com` with a one-click copy button and `mailto:` action.
   - Contact form with real-time validation (Name, Email, Subject, Message), live character counter, sending state animation, and success toast alert.

8. **Accessibility & Performance**:
   - Strict adherence to `prefers-reduced-motion` to disable or tone down heavy transitions for sensitive users.
   - Zero external framework overhead (No React, No Tailwind, No npm bundle dependencies).
   - High Lighthouse score, responsive down to 320px mobile screens.

---

## 📷 Portrait Photo Configuration

Your real photo is currently active:
```html
<img src="assets/images/WhatsApp Image 2026-10-27 at 4.08.44 PM.jpeg" alt="Chaitra M G - Portrait" class="portrait-img" id="hero-portrait-img">
```
To update or swap your photo in the future, simply place a new image in `assets/images/` and update the `src` attribute in `index.html`.
