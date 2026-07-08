# 🐍 Python4u — Interactive Python eBook

A browser-based Python learning platform hosted on GitHub Pages.

**Live Site:** [https://aman-0402.github.io/Python4u/](https://aman-0402.github.io/Python4u/)

---

## What It Is

A single-page interactive eBook covering Python from scratch to advanced topics, with a built-in compiler, quizzes, mock exams, and IBM certification practice tests. No backend, no install — runs entirely in the browser.

---

## Topics Covered

| # | Topic |
|---|-------|
| 1 | Introduction to Python |
| 2 | Variables, Data Types and Operators |
| 3 | Control Flow Statements |
| 4 | Functions and Modules |
| 5 | Data Structures — List, Tuple, Set, Dictionary |
| 6 | String Handling and File I/O |
| 7 | Exception Handling and Debugging |
| 8 | Object-Oriented Programming |
| 9 | Working with Libraries (NumPy, pandas) |
| 10 | Data Visualization with matplotlib |
| 11 | Web APIs and JSON |
| 12 | Database Connectivity |
| 13 | Interactive Quizzes |
| 14 | Mock Exam Questions |
| 15 | Capstone Mini Project |
| 16 | Full Stack Project |
| 17 | Revision & IBM Certification Practice Tests |
| 18 | Comprehensions |
| 19 | Iterators & Generators |
| 20 | Decorators & Closures |
| 21 | Context Managers |
| 22 | Regular Expressions |
| 23 | Concurrency (Threading, Multiprocessing, asyncio) |
| 24 | Type Hints & typing |
| 25 | Virtual Environments & Packaging |
| 26 | Testing (unittest & pytest) |
| 27 | Magic / Dunder Methods |
| 28 | Functional Tools (map, filter, reduce) |
| 29 | Date & Time |
| 30 | Web Scraping |
| 31 | Command-line Arguments |
| 32 | Logging |
| 33 | Memory & Performance |
| 34 | Big-O / Time Complexity |
| 35 | Recursion |
| 36 | Searching Algorithms |
| 37 | Sorting Algorithms |
| 38 | Stack & Queue |
| 39 | Linked List |
| 40 | Trees (Binary Tree & BST) |
| 41 | Hashing |
| 42 | Graphs (BFS & DFS) |

---

## Features

- **Live Python Compiler** — write and run Python code directly in the browser
- **Interactive Quizzes** — per-topic multiple choice questions with instant feedback
- **Mock Exams** — exam-style questions for certification prep
- **IBM Certification Practice** — dedicated practice tests
- **Dark / Light Mode** — toggle via header button
- **Progress Tracking** — localStorage-based topic completion tracking
- **Fully Responsive** — works on mobile and desktop

---

## Tech Stack

- Pure HTML, CSS, JavaScript — no frameworks, no build step
- Font Awesome 6 for icons
- SweetAlert2 for welcome modal
- Content loaded dynamically via `fetch()` into a single-page shell

---

## Project Structure

```
Python4u/
├── index.html              # Main shell (header, sidebar, content area)
├── style.css               # Global styles + dark mode
├── script.js               # Sidebar toggle, topic fetch, theme switch
├── enhanced-script.js      # Progress tracking, additional interactions
├── topics/
│   ├── introduction.html
│   ├── variables.html
│   ├── control-flow.html
│   ├── functions-modules.html
│   ├── data-structures.html
│   ├── strings-files.html
│   ├── exceptions.html
│   ├── oop.html
│   ├── libraries.html
│   ├── visualization.html
│   ├── apis-json.html
│   ├── database.html
│   ├── compiler.html
│   ├── quiz.html
│   ├── mock.html
│   ├── project.html
│   ├── fullstackproject.html
│   ├── revision-cert.html
│   └── follow.html
├── python.png              # Hero image
├── monty.jpg               # Supplemental image
└── faviconnn.png           # Favicon
```

---

## Running Locally

No build step needed. Serve with any static file server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

Then open `http://localhost:8000`.

> **Note:** Topic files load via `fetch()`, so opening `index.html` directly as a `file://` URL will hit CORS errors. Use a local server.

---

## Contributing

Pull requests welcome. Each topic is a self-contained HTML file in `topics/`. Add a new topic file and a corresponding `<li>` entry in the sidebar in `index.html`.

---

## Author

**Aman Raj** — [GitHub](https://github.com/Aman-0402)
