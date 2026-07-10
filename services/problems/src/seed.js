import mongoose from "mongoose";
import { env } from "./config/env.js";
import { Problem } from "./models/problem.model.js";

const problems = [
  {
    title: "Star Rating Component",
    slug: "star-rating-component",
    category: "component",
    description: "Build an interactive star rating component that allows users to select a rating from 1 to 5 stars.\n\nThe component should highlight stars on hover and persist the selection on click. Display the current rating as text below the stars.",
    difficulty: "easy",
    tags: ["css", "events", "dom"],
    timeLimit: 30,
    requirements: [
      "Display 5 clickable stars",
      "Stars highlight on hover (all stars up to hovered one)",
      "Click selects the rating and persists it",
      "Show selected rating as text (e.g. '3/5 stars')",
      "Hovering after selection shows preview without losing saved rating",
      "Stars should be visually distinct (filled vs empty)"
    ],
    starterCode: {
      html: "<div id=\"star-rating\">\n  <!-- Build your star rating here -->\n</div>\n<p id=\"rating-text\">No rating selected</p>",
      css: "#star-rating {\n  display: flex;\n  gap: 4px;\n  cursor: pointer;\n}\n\n.star {\n  font-size: 2rem;\n  color: #4b5563;\n  transition: color 0.15s;\n}\n\n.star.active {\n  color: #facc15;\n}",
      js: "// Build your star rating component here\n"
    },
    hints: [
      "Use mouseover and mouseout events on the container",
      "Track both 'hovered' and 'selected' state separately",
      "Use event delegation on the parent container"
    ],
    isPublished: true,
  },
  {
    title: "Accordion Component",
    slug: "accordion-component",
    category: "component",
    description: "Build an accordion/collapsible component that shows a list of FAQ items. Clicking on a question toggles its answer visibility.\n\nOnly one answer should be visible at a time (closing others when a new one opens).",
    difficulty: "easy",
    tags: ["css", "dom", "animation"],
    timeLimit: 30,
    requirements: [
      "Render at least 4 FAQ items",
      "Clicking a question toggles its answer",
      "Only one answer visible at a time",
      "Show a +/- or arrow indicator for open/closed state",
      "Smooth expand/collapse animation",
      "Accessible - items should be keyboard navigable"
    ],
    starterCode: {
      html: "<div id=\"accordion\">\n  <!-- Build your accordion here -->\n</div>",
      css: ".accordion-item {\n  border: 1px solid #374151;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  overflow: hidden;\n}\n\n.accordion-header {\n  padding: 16px;\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #1f2937;\n}\n\n.accordion-body {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.3s ease;\n  padding: 0 16px;\n}\n\n.accordion-item.active .accordion-body {\n  max-height: 200px;\n  padding: 16px;\n}",
      js: "// Build your accordion logic here\n"
    },
    hints: [
      "Use max-height transition for smooth animation",
      "Toggle an 'active' class on the accordion item",
      "Remove 'active' from all siblings before adding to clicked item"
    ],
    isPublished: true,
  },
  {
    title: "Todo App with Filters",
    slug: "todo-app-with-filters",
    category: "mini-app",
    description: "Build a fully functional todo application with add, delete, toggle complete, and filter functionality.\n\nUsers should be able to add todos, mark them complete, delete them, and filter by status (All, Active, Completed).",
    difficulty: "medium",
    tags: ["dom", "state-management", "events", "crud"],
    timeLimit: 45,
    requirements: [
      "Input field to add new todos (on Enter key)",
      "Display todos as a list with checkboxes",
      "Toggle completion state by clicking checkbox",
      "Delete individual todos with a remove button",
      "Filter buttons: All, Active, Completed",
      "Show count of remaining active todos",
      "Clear completed button to bulk-remove done items",
      "Persist todos in localStorage"
    ],
    starterCode: {
      html: "<div id=\"app\">\n  <h1>Todos</h1>\n  <input id=\"todo-input\" type=\"text\" placeholder=\"What needs to be done?\" />\n  <div id=\"filters\"></div>\n  <ul id=\"todo-list\"></ul>\n  <div id=\"footer\"></div>\n</div>",
      css: "#app {\n  max-width: 500px;\n  margin: 0 auto;\n  font-family: sans-serif;\n}\n\n#todo-input {\n  width: 100%;\n  padding: 12px;\n  font-size: 1rem;\n  border: 1px solid #374151;\n  border-radius: 8px;\n  background: #1f2937;\n  color: white;\n  margin-bottom: 16px;\n}\n\n.todo-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  border-bottom: 1px solid #374151;\n}\n\n.todo-item.completed span {\n  text-decoration: line-through;\n  opacity: 0.5;\n}",
      js: "// Build your todo app here\n"
    },
    hints: [
      "Keep todos in an array, re-render the list on every change",
      "Use event delegation for checkbox and delete button clicks",
      "Filter is just a view concern - dont modify the source array"
    ],
    isPublished: true,
  },
  {
    title: "Autocomplete Search",
    slug: "autocomplete-search",
    category: "feature",
    description: "Build an autocomplete/typeahead search input that shows suggestions as the user types.\n\nFetch suggestions from a mock data array and display matching results in a dropdown below the input.",
    difficulty: "medium",
    tags: ["dom", "events", "debounce", "filtering"],
    timeLimit: 45,
    requirements: [
      "Input field that filters suggestions as user types",
      "Show dropdown with matching results (case-insensitive)",
      "Highlight the matching text portion in suggestions",
      "Keyboard navigation (arrow keys + Enter to select)",
      "Click on suggestion fills the input",
      "Close dropdown when clicking outside",
      "Debounce input to avoid excessive filtering",
      "Show 'No results' when nothing matches"
    ],
    starterCode: {
      html: "<div id=\"search-container\">\n  <input id=\"search-input\" type=\"text\" placeholder=\"Search countries...\" autocomplete=\"off\" />\n  <ul id=\"suggestions\"></ul>\n</div>",
      css: "#search-container {\n  position: relative;\n  max-width: 400px;\n  margin: 40px auto;\n}\n\n#search-input {\n  width: 100%;\n  padding: 12px 16px;\n  font-size: 1rem;\n  border: 1px solid #374151;\n  border-radius: 8px;\n  background: #1f2937;\n  color: white;\n}\n\n#suggestions {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 8px;\n  margin-top: 4px;\n  max-height: 250px;\n  overflow-y: auto;\n  display: none;\n}\n\n#suggestions.active {\n  display: block;\n}\n\n#suggestions li {\n  padding: 10px 16px;\n  cursor: pointer;\n}\n\n#suggestions li:hover,\n#suggestions li.highlighted {\n  background: #374151;\n}",
      js: "const countries = [\n  \"India\", \"United States\", \"Indonesia\", \"Brazil\", \"Pakistan\",\n  \"Nigeria\", \"Bangladesh\", \"Russia\", \"Japan\", \"Mexico\",\n  \"Germany\", \"France\", \"United Kingdom\", \"Italy\", \"South Korea\",\n  \"Canada\", \"Australia\", \"Spain\", \"Argentina\", \"Netherlands\"\n];\n\n// Build your autocomplete here\n"
    },
    hints: [
      "Use setTimeout for debounce - clear previous timeout on each keystroke",
      "Track highlighted index for keyboard navigation",
      "Use document.addEventListener('click') to detect outside clicks"
    ],
    isPublished: true,
  },
  {
    title: "Modal System",
    slug: "modal-system",
    category: "component",
    description: "Build a reusable modal/dialog system with open, close, and overlay click-to-close functionality.\n\nSupport multiple modal triggers on the same page with different content.",
    difficulty: "easy",
    tags: ["css", "dom", "accessibility"],
    timeLimit: 30,
    requirements: [
      "Button click opens the modal",
      "Modal displays centered with an overlay/backdrop",
      "Close button inside the modal closes it",
      "Clicking the overlay closes the modal",
      "Escape key closes the modal",
      "Body scroll is locked when modal is open",
      "Focus trap inside modal for accessibility",
      "Smooth open/close animation"
    ],
    starterCode: {
      html: "<button class=\"open-modal\" data-modal=\"modal-1\">Open Modal</button>\n\n<div id=\"modal-1\" class=\"modal-overlay\">\n  <div class=\"modal-content\">\n    <button class=\"modal-close\">&times;</button>\n    <h2>Modal Title</h2>\n    <p>This is the modal content. Build something great!</p>\n  </div>\n</div>",
      css: ".modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s, visibility 0.2s;\n}\n\n.modal-overlay.active {\n  opacity: 1;\n  visibility: visible;\n}\n\n.modal-content {\n  background: #1f2937;\n  border-radius: 12px;\n  padding: 32px;\n  max-width: 500px;\n  width: 90%;\n  position: relative;\n  transform: scale(0.9);\n  transition: transform 0.2s;\n}\n\n.modal-overlay.active .modal-content {\n  transform: scale(1);\n}\n\n.modal-close {\n  position: absolute;\n  top: 12px;\n  right: 16px;\n  font-size: 1.5rem;\n  background: none;\n  border: none;\n  color: #9ca3af;\n  cursor: pointer;\n}",
      js: "// Build your modal system here\n"
    },
    hints: [
      "Use visibility + opacity for smooth transitions",
      "document.body.style.overflow = 'hidden' locks scroll",
      "Listen for keydown event on document for Escape key"
    ],
    isPublished: true,
  },
  {
    title: "Infinite Scroll Feed",
    slug: "infinite-scroll-feed",
    category: "feature",
    description: "Build an infinite scrolling feed that loads more items as the user scrolls to the bottom.\n\nSimulate an API call with setTimeout and display cards with mock post data.",
    difficulty: "medium",
    tags: ["scroll", "async", "dom", "performance"],
    timeLimit: 45,
    requirements: [
      "Initial load shows 10 items",
      "Loading spinner appears when fetching more",
      "New items load when user scrolls near bottom",
      "Each item shows title, excerpt, and author",
      "Handle loading state (prevent duplicate fetches)",
      "Show 'No more posts' when all items loaded",
      "Smooth scroll experience without janking",
      "Use IntersectionObserver (not scroll event)"
    ],
    starterCode: {
      html: "<div id=\"feed\">\n  <div id=\"posts\"></div>\n  <div id=\"loader\" class=\"loader\">Loading...</div>\n  <div id=\"end-message\" style=\"display:none\">No more posts</div>\n</div>",
      css: "#feed {\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.post-card {\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 16px;\n}\n\n.post-card h3 {\n  margin: 0 0 8px;\n  color: #f3f4f6;\n}\n\n.post-card p {\n  color: #9ca3af;\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n\n.post-card .author {\n  margin-top: 12px;\n  font-size: 0.8rem;\n  color: #6b7280;\n}\n\n.loader {\n  text-align: center;\n  padding: 20px;\n  color: #6b7280;\n}",
      js: "// Mock data generator\nfunction generatePost(id) {\n  return {\n    id,\n    title: \"Post #\" + id,\n    excerpt: \"This is the content preview for post number \" + id + \". It contains some interesting text.\",\n    author: \"Author \" + Math.ceil(id / 3)\n  };\n}\n\n// Build your infinite scroll here\n"
    },
    hints: [
      "IntersectionObserver on the loader element is cleaner than scroll events",
      "Keep a page/offset counter and a 'loading' flag",
      "Simulate API delay with setTimeout(resolve, 500)"
    ],
    isPublished: true,
  },
  {
    title: "Drag and Drop Kanban Board",
    slug: "drag-drop-kanban",
    category: "mini-app",
    description: "Build a Kanban board with three columns (Todo, In Progress, Done) where cards can be dragged between columns.\n\nUsers should also be able to add new cards to any column.",
    difficulty: "hard",
    tags: ["drag-drop", "dom", "state-management", "css-grid"],
    timeLimit: 60,
    requirements: [
      "Three columns: Todo, In Progress, Done",
      "Cards can be dragged between columns",
      "Visual feedback during drag (ghost card, highlight target column)",
      "Add new card button for each column",
      "Delete card functionality",
      "Card count shown per column",
      "Cards persist in localStorage",
      "Responsive layout (columns stack on mobile)"
    ],
    starterCode: {
      html: "<div id=\"kanban\">\n  <div class=\"column\" data-status=\"todo\">\n    <h2>Todo <span class=\"count\">0</span></h2>\n    <div class=\"cards\"></div>\n    <button class=\"add-card\">+ Add Card</button>\n  </div>\n  <div class=\"column\" data-status=\"in-progress\">\n    <h2>In Progress <span class=\"count\">0</span></h2>\n    <div class=\"cards\"></div>\n    <button class=\"add-card\">+ Add Card</button>\n  </div>\n  <div class=\"column\" data-status=\"done\">\n    <h2>Done <span class=\"count\">0</span></h2>\n    <div class=\"cards\"></div>\n    <button class=\"add-card\">+ Add Card</button>\n  </div>\n</div>",
      css: "#kanban {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  padding: 20px;\n  min-height: 80vh;\n}\n\n.column {\n  background: #111827;\n  border-radius: 12px;\n  padding: 16px;\n  border: 2px solid transparent;\n}\n\n.column.drag-over {\n  border-color: #6366f1;\n  background: #1e1b4b;\n}\n\n.column h2 {\n  font-size: 1rem;\n  margin-bottom: 12px;\n  display: flex;\n  justify-content: space-between;\n}\n\n.card {\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 8px;\n  padding: 12px;\n  margin-bottom: 8px;\n  cursor: grab;\n}\n\n.card:active {\n  cursor: grabbing;\n}\n\n.card.dragging {\n  opacity: 0.5;\n}\n\n.add-card {\n  width: 100%;\n  padding: 8px;\n  background: transparent;\n  border: 1px dashed #4b5563;\n  border-radius: 8px;\n  color: #6b7280;\n  cursor: pointer;\n}\n\n@media (max-width: 768px) {\n  #kanban { grid-template-columns: 1fr; }\n}",
      js: "// Build your Kanban board here\n"
    },
    hints: [
      "Use HTML5 drag and drop API: dragstart, dragover, drop events",
      "Set draggable='true' on cards",
      "Use dataTransfer.setData to pass the card id during drag",
      "Prevent default on dragover to allow dropping"
    ],
    isPublished: true,
  },
  {
    title: "Form Validator",
    slug: "form-validator",
    category: "feature",
    description: "Build a signup form with real-time client-side validation.\n\nValidate fields as the user types and show/hide error messages with proper styling.",
    difficulty: "easy",
    tags: ["forms", "validation", "dom", "regex"],
    timeLimit: 30,
    requirements: [
      "Fields: Name, Email, Password, Confirm Password",
      "Validate on blur and on submit",
      "Name: minimum 3 characters",
      "Email: valid email format",
      "Password: min 8 chars, 1 uppercase, 1 number",
      "Confirm Password: must match password",
      "Show inline error messages below each field",
      "Disable submit button until all fields are valid",
      "Green border on valid fields, red on invalid",
      "Show password strength indicator"
    ],
    starterCode: {
      html: "<form id=\"signup-form\" novalidate>\n  <div class=\"form-group\">\n    <label for=\"name\">Full Name</label>\n    <input type=\"text\" id=\"name\" placeholder=\"John Doe\" />\n    <span class=\"error\"></span>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"email\">Email</label>\n    <input type=\"email\" id=\"email\" placeholder=\"john@example.com\" />\n    <span class=\"error\"></span>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"password\">Password</label>\n    <input type=\"password\" id=\"password\" placeholder=\"Min 8 characters\" />\n    <div id=\"strength\"></div>\n    <span class=\"error\"></span>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"confirm\">Confirm Password</label>\n    <input type=\"password\" id=\"confirm\" placeholder=\"Repeat password\" />\n    <span class=\"error\"></span>\n  </div>\n  <button type=\"submit\" id=\"submit-btn\" disabled>Create Account</button>\n</form>",
      css: "#signup-form {\n  max-width: 400px;\n  margin: 40px auto;\n}\n\n.form-group {\n  margin-bottom: 16px;\n}\n\nlabel {\n  display: block;\n  margin-bottom: 4px;\n  font-size: 0.875rem;\n  color: #d1d5db;\n}\n\ninput {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #374151;\n  border-radius: 8px;\n  background: #1f2937;\n  color: white;\n  font-size: 0.9rem;\n}\n\ninput.valid { border-color: #22c55e; }\ninput.invalid { border-color: #ef4444; }\n\n.error {\n  display: block;\n  margin-top: 4px;\n  font-size: 0.75rem;\n  color: #ef4444;\n  min-height: 16px;\n}\n\n#submit-btn {\n  width: 100%;\n  padding: 12px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 1rem;\n}\n\n#submit-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}",
      js: "// Build your form validation here\n"
    },
    hints: [
      "Use regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ for email",
      "Listen for 'input' event for real-time validation",
      "Check all fields validity to enable/disable submit button"
    ],
    isPublished: true,
  },
  {
    title: "Image Carousel/Slider",
    slug: "image-carousel",
    category: "component",
    description: "Build an image carousel that cycles through images with previous/next buttons and dot indicators.\n\nInclude auto-play functionality that pauses on hover.",
    difficulty: "medium",
    tags: ["css", "animation", "dom", "timer"],
    timeLimit: 40,
    requirements: [
      "Display one image at a time with smooth transition",
      "Previous and Next arrow buttons",
      "Dot indicators showing current slide",
      "Click dots to jump to specific slide",
      "Auto-play every 3 seconds",
      "Pause auto-play on hover",
      "Infinite loop (wraps from last to first)",
      "Swipe support for touch devices (optional bonus)"
    ],
    starterCode: {
      html: "<div id=\"carousel\">\n  <div class=\"slides\">\n    <div class=\"slide active\" style=\"background: #4f46e5;\"><h2>Slide 1</h2></div>\n    <div class=\"slide\" style=\"background: #7c3aed;\"><h2>Slide 2</h2></div>\n    <div class=\"slide\" style=\"background: #2563eb;\"><h2>Slide 3</h2></div>\n    <div class=\"slide\" style=\"background: #059669;\"><h2>Slide 4</h2></div>\n  </div>\n  <button class=\"prev\">&larr;</button>\n  <button class=\"next\">&rarr;</button>\n  <div class=\"dots\"></div>\n</div>",
      css: "#carousel {\n  position: relative;\n  max-width: 700px;\n  margin: 40px auto;\n  overflow: hidden;\n  border-radius: 12px;\n}\n\n.slides {\n  display: flex;\n  transition: transform 0.4s ease;\n}\n\n.slide {\n  min-width: 100%;\n  height: 350px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 2rem;\n}\n\n.prev, .next {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  background: rgba(0,0,0,0.5);\n  color: white;\n  border: none;\n  padding: 12px 16px;\n  cursor: pointer;\n  font-size: 1.2rem;\n  border-radius: 4px;\n}\n\n.prev { left: 12px; }\n.next { right: 12px; }\n\n.dots {\n  text-align: center;\n  padding: 12px;\n}\n\n.dot {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #4b5563;\n  margin: 0 4px;\n  cursor: pointer;\n}\n\n.dot.active {\n  background: #6366f1;\n}",
      js: "// Build your carousel here\n"
    },
    hints: [
      "Use transform: translateX() on the slides container",
      "Track currentIndex, update transform on each navigation",
      "setInterval for auto-play, clearInterval on mouseenter"
    ],
    isPublished: true,
  },
  {
    title: "Multi-step Checkout Form",
    slug: "multi-step-form",
    category: "mini-app",
    description: "Build a multi-step form with progress indicator, validation per step, and a review step before submission.\n\nSteps: Personal Info -> Shipping Address -> Payment -> Review & Submit.",
    difficulty: "hard",
    tags: ["forms", "state-management", "dom", "validation"],
    timeLimit: 60,
    requirements: [
      "4 steps with progress bar/stepper indicator",
      "Step 1: Name, Email, Phone",
      "Step 2: Address, City, Zip, Country",
      "Step 3: Card Number, Expiry, CVV",
      "Step 4: Review all entered data",
      "Validate current step before allowing Next",
      "Previous button to go back (preserving data)",
      "Progress bar shows completion percentage",
      "Final submit shows success message",
      "Smooth step transition animation"
    ],
    starterCode: {
      html: "<div id=\"multi-step-form\">\n  <div id=\"progress-bar\">\n    <div class=\"progress\"></div>\n  </div>\n  <div id=\"steps\"></div>\n  <div id=\"navigation\">\n    <button id=\"prev-btn\">Previous</button>\n    <button id=\"next-btn\">Next</button>\n  </div>\n</div>",
      css: "#multi-step-form {\n  max-width: 500px;\n  margin: 40px auto;\n  background: #111827;\n  border-radius: 12px;\n  padding: 32px;\n}\n\n#progress-bar {\n  height: 4px;\n  background: #374151;\n  border-radius: 4px;\n  margin-bottom: 32px;\n}\n\n#progress-bar .progress {\n  height: 100%;\n  background: #6366f1;\n  border-radius: 4px;\n  transition: width 0.3s;\n}\n\n.step {\n  display: none;\n}\n\n.step.active {\n  display: block;\n}\n\n#navigation {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 24px;\n}\n\n#navigation button {\n  padding: 10px 24px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-size: 0.9rem;\n}\n\n#prev-btn {\n  background: #374151;\n  color: #d1d5db;\n}\n\n#next-btn {\n  background: #4f46e5;\n  color: white;\n}",
      js: "// Build your multi-step form here\n"
    },
    hints: [
      "Keep all form data in a single object, update on each input change",
      "Show/hide steps by toggling 'active' class",
      "Update progress bar width as percentage: (currentStep / totalSteps) * 100"
    ],
    isPublished: true,
  },
  {
    title: "CSS Grid Dashboard Layout",
    slug: "css-grid-dashboard",
    category: "layout",
    description: "Build a responsive admin dashboard layout using CSS Grid.\n\nThe layout should include a sidebar, header, main content area with cards, and a footer. It should collapse to a single column on mobile.",
    difficulty: "easy",
    tags: ["css-grid", "responsive", "layout"],
    timeLimit: 30,
    requirements: [
      "Fixed sidebar on the left (250px)",
      "Header spanning the top of the main area",
      "Content area with a grid of stat cards",
      "Footer at the bottom",
      "Sidebar collapses on screens < 768px",
      "Cards reflow from 3 columns to 2 to 1",
      "Sidebar has navigation links",
      "Smooth transition on responsive breakpoints"
    ],
    starterCode: {
      html: "<div class=\"dashboard\">\n  <aside class=\"sidebar\">\n    <h2>Dashboard</h2>\n    <nav>\n      <a href=\"#\" class=\"active\">Overview</a>\n      <a href=\"#\">Analytics</a>\n      <a href=\"#\">Users</a>\n      <a href=\"#\">Settings</a>\n    </nav>\n  </aside>\n  <header class=\"topbar\">Welcome back, Admin</header>\n  <main class=\"content\">\n    <div class=\"card\">Users: 1,234</div>\n    <div class=\"card\">Revenue: ,345</div>\n    <div class=\"card\">Orders: 567</div>\n    <div class=\"card\">Growth: +12%</div>\n    <div class=\"card\">Active: 89%</div>\n    <div class=\"card\">Support: 23 tickets</div>\n  </main>\n  <footer class=\"footer\">Dashboard v1.0</footer>\n</div>",
      css: "/* Build your grid layout here */\n\n.dashboard {\n  min-height: 100vh;\n}\n\n.sidebar {\n  background: #111827;\n  padding: 20px;\n}\n\n.sidebar nav a {\n  display: block;\n  padding: 10px;\n  color: #9ca3af;\n  text-decoration: none;\n  border-radius: 6px;\n  margin-bottom: 4px;\n}\n\n.sidebar nav a.active {\n  background: #1f2937;\n  color: white;\n}\n\n.topbar {\n  background: #1f2937;\n  padding: 16px 24px;\n  border-bottom: 1px solid #374151;\n}\n\n.content {\n  padding: 24px;\n}\n\n.card {\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 12px;\n  padding: 24px;\n  text-align: center;\n  font-size: 1.1rem;\n}\n\n.footer {\n  padding: 16px 24px;\n  text-align: center;\n  color: #6b7280;\n  border-top: 1px solid #374151;\n}",
      js: "// No JS needed for this layout challenge\n// Focus on CSS Grid to create the responsive layout\n"
    },
    hints: [
      "Use grid-template-areas for semantic layout",
      "grid-template-columns: 250px 1fr for sidebar + main",
      "Use @media (max-width: 768px) to switch to single column"
    ],
    isPublished: true,
  },
  {
    title: "Debounced Live Search with API",
    slug: "debounced-live-search",
    category: "feature",
    description: "Build a search interface that calls a mock API with debouncing, shows loading state, and renders results as cards.\n\nSimulate network latency and handle race conditions.",
    difficulty: "medium",
    tags: ["async", "debounce", "promises", "dom"],
    timeLimit: 45,
    requirements: [
      "Search input with 300ms debounce",
      "Loading spinner while fetching",
      "Display results as cards with title and description",
      "Handle empty query (clear results)",
      "Handle no results state",
      "Cancel previous pending request on new keystroke",
      "Minimum 2 characters before searching",
      "Show total result count"
    ],
    starterCode: {
      html: "<div id=\"search-app\">\n  <input id=\"query\" type=\"text\" placeholder=\"Search articles...\" />\n  <div id=\"status\"></div>\n  <div id=\"results\"></div>\n</div>",
      css: "#search-app {\n  max-width: 600px;\n  margin: 40px auto;\n}\n\n#query {\n  width: 100%;\n  padding: 14px 18px;\n  font-size: 1rem;\n  border: 1px solid #374151;\n  border-radius: 10px;\n  background: #1f2937;\n  color: white;\n}\n\n#status {\n  padding: 12px 0;\n  color: #6b7280;\n  font-size: 0.9rem;\n}\n\n.result-card {\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 10px;\n  padding: 16px;\n  margin-bottom: 12px;\n}\n\n.result-card h3 {\n  color: #f3f4f6;\n  margin: 0 0 6px;\n}\n\n.result-card p {\n  color: #9ca3af;\n  font-size: 0.85rem;\n  margin: 0;\n}",
      js: "// Mock API - simulates network latency\nconst articles = [\n  { title: \"Understanding Closures in JavaScript\", desc: \"A deep dive into closures and lexical scope\" },\n  { title: \"CSS Grid vs Flexbox\", desc: \"When to use grid and when to use flexbox\" },\n  { title: \"React Hooks Explained\", desc: \"useState, useEffect, and custom hooks\" },\n  { title: \"Building REST APIs with Node.js\", desc: \"Express, middleware, and routing\" },\n  { title: \"TypeScript for Beginners\", desc: \"Types, interfaces, and generics\" },\n  { title: \"Web Performance Optimization\", desc: \"Lazy loading, code splitting, caching\" },\n  { title: \"Responsive Design Patterns\", desc: \"Mobile-first, fluid grids, breakpoints\" },\n  { title: \"Testing with Jest\", desc: \"Unit tests, mocks, and coverage\" },\n];\n\nfunction mockFetch(query) {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      const results = articles.filter(a =>\n        a.title.toLowerCase().includes(query.toLowerCase())\n      );\n      resolve(results);\n    }, 300 + Math.random() * 500);\n  });\n}\n\n// Build your debounced search here\n"
    },
    hints: [
      "Use AbortController or a request ID to handle race conditions",
      "clearTimeout on each new keystroke for debounce",
      "Track a requestId counter - ignore responses from stale requests"
    ],
    isPublished: true,
  },
];

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("[seed] connected to mongodb");

  await Problem.deleteMany({});
  console.log("[seed] cleared existing problems");

  const inserted = await Problem.insertMany(problems);
  console.log("[seed] inserted " + inserted.length + " problems:");

  const grouped = {};
  for (const p of inserted) {
    grouped[p.category] = grouped[p.category] || [];
    grouped[p.category].push(p);
  }

  for (const [category, items] of Object.entries(grouped)) {
    console.log("\n  " + category.toUpperCase() + " (" + items.length + "):");
    for (const p of items) {
      console.log("    [" + p.difficulty + "] " + p.title);
    }
  }

  await mongoose.disconnect();
  console.log("\n[seed] done");
}

seed().catch((err) => {
  console.error("[seed] error:", err);
  process.exit(1);
});
