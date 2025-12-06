# Real Time Collaborative Document Editor
COMPANY: CODTECH IT SOLUTIONS

NAME: YATHIPATHI AMULYA

INTERN ID:  :CT04DR2165

DOMAIIN: FULL STCK WEB DEVLOPMENT

DURATION: 4 WEEKS

MENTOR: NEELA SANTOSH

The Real-Time Collaborative Document Editor is a web-based platform that enables multiple users to edit the same document simultaneously with real-time updates. It uses WebSocket communication for instant synchronization across all connected users. The project stores documents in a database and supports autosave, manual save, and document-based session management. It is ideal for collaborative editing, classrooms, remote workspace collaboration, and similar use cases.

# Features
Real-time collaborative editing (synchronized across all clients instantly)
Rich-text editing using React-Quill (bold, italic, underline, lists, headings, etc.)
Auto Save & Manual Save functionality
Multiple document rooms using Document IDs
MongoDB persistence for saving documents permanently

# Tech Stack
  # Frontend
  React.js (Vite)
  React-Quill (QuillJS)
  Socket.IO client
  CSS / Tailwind 
  Backend
  Node.js
  Express.js
  Socket.IO (WebSockets)
  Mongoose (MongoDB 
  Database
  MongoDB 
  
# Project Structure
  realtime-collab-editor/
├── server/
│ ├── package.json
│ ├── .env.example
│ ├── server.js
│ ├── models/
│ │ └── Document.js
│ └── routes/
│ └── docs.js
│
├── client/
│ ├── package.json
│ ├── index.html
│ ├── vite.config.js
│ ├── src/
│ │ ├── main.jsx
│ │ ├── App.jsx
│ │ ├── components/
│ │ │ └── Editor.jsx
│ │ └── styles.css
│ └── public/
│ └── favicon.ico
│
└── README.md
