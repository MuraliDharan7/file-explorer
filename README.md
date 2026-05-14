# File Explorer

A modern VS Code-style File Explorer built using React and Vite.

## Features

- Create File
- Create Folder
- Rename File
- Rename Folder
- Delete File
- Delete Folder
- Nested Folder Structure
- Expand / Collapse Folders
- Expand / Collapse Explorer
- Dynamic File Icons Based on Extensions
- Inline Editing (VS Code-style)
- Automatic Alphabetical Sorting
- Folders Displayed Before Files
- Responsive and Professional UI

---

## Tech Stack

- React
- Vite
- CSS
- React Icons
- UUID

---

## Project Structure

```plaintext
src/
│
├── components/
│   ├── FileNode.jsx
│   └── FileTree.jsx
│
├── data/
│   └── initialData.js
│
├── utils/
│
├── App.jsx
├── main.jsx
└── styles.css
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd file-explorer
```

Install dependencies:

```bash
npm install
```

---

## Required Packages

Install additional packages:

```bash
npm install uuid react-icons
```

---

## Run the Project

Start the development server:

```bash
npm run dev
```

Open the browser and visit:

```plaintext
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---

## Supported File Icons

The explorer dynamically displays icons for:

- JavaScript (`.js`)
- React (`.jsx`)
- TypeScript (`.ts`, `.tsx`)
- HTML (`.html`)
- CSS (`.css`)
- JSON (`.json`)
- Java (`.java`)
- Python (`.py`)
- Markdown (`.md`)

Unknown extensions use a default file icon.

---

## UI Features

- Modern VS Code-inspired sidebar
- Inline file/folder creation
- Inline rename support
- Smooth hover effects
- Automatic sorting
- Professional typography
- Custom scrollbar styling

---

## Future Improvements

- Drag and Drop
- Local Storage Persistence
- Context Menu
- Search Functionality
- Keyboard Shortcuts
- Multi-select Support
- Light/Dark Theme Toggle

---

## Author

Murali Dharan