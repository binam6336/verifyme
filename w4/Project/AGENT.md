frontend agent
1. Project Overview & Architecture
This project is a modern, responsive web application for a Warranty and Product Management Panel. It provides an intuitive user interface for registration, authentication, dynamic dashboards, and product management workflows.

Core Stack: HTML5, CSS3, Modern Vanilla JavaScript (ES6+).

Styling & UI: Custom CSS with variable-based design tokens, responsive layouts (Flexbox & Grid), and custom components.

Architecture Pattern: Modular UI development, Client-Side Routing/Page views, and Event-Driven Interface Logic.

2. Directory Structure & Key UI Components
Plaintext
/
├── assets/                       # Static UI Assets
│   ├── css/                      # Global & Component Style Sheets
│   ├── js/                       # Core Frontend Logic & Handlers
│   ├── icons/                    # UI SVG/Image Icons
│   └── loaders/                  # Loading Spinners & Animation Assets
├── config/
│   ├── api-config.js             # API Base Endpoint & Request Configuration
│   └── API-CONTRACT.md           # Interface Data Contract Guidelines
├── dashboard/                    # Dashboard Layouts & View Modules
├── index.html                    # Main Entry / Authentication Layout
└── index2.html                   # Secondary / Alternate Layout
3. Visual & UI Guidelines
A. Design Tokens & Theme
Color Palette:

Primary: Dark Red (#8B0000 / #A00000 range) for key action buttons, highlights, and active navigation states.

Secondary: Clean White (#FFFFFF) and Neutral Grays for clean, structured backgrounds and card containers.

Layout Principles:

Clean, minimal interface focused on data clarity and visual hierarchy.

Fully responsive across Mobile, Tablet, and Desktop displays.

B. User Experience & States
Loading States: Every dynamic action or data-fetching operation must display feedback (e.g., custom GIF/SVG loaders from assets/loaders/).

Error Handling: Form fields and user interactions must present clear visual feedback for validation errors without breaking page layout.

Interactive Components: Hover, active, and focus states must be clearly defined for accessibility and responsiveness.

4. Code Style & JavaScript Standards
A. JavaScript (ES6+)
Modular Syntax: Use clean ES6 modules (import/export) or structured script execution.

Asynchronous Operations: Use standard async/await syntax with robust try...catch blocks for all asynchronous tasks.

DOM Manipulation: Prefer event delegation and direct DOM references over heavy DOM queries. Keep scripts efficient and clean.

B. CSS Standards
Variables: Define shared colors, spacing, and typography within :root for consistency.

Naming Conventions: Use clear, descriptive class names (BEM or utility-first patterns).

No Inline Styles: All styling must reside in dedicated stylesheet files inside assets/css/.

5. Important AI Agent Instructions
Configuration Management: Always refer to config/api-config.js for base configuration settings. Do not hardcode domain origins or port numbers inside individual JavaScript files.

Incremental Development: Build and test UI components systematically, section by section.

Asset Handling: Keep all local visual resources organized under assets/. Do not link to external unverified CDNs for core icons or styles.