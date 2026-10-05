# KHIM — Personal Portfolio

A modern, full-stack personal portfolio built with **React**, **Spring Boot**, and **SQLite**, featuring 3D animations, scroll-triggered effects, and a particle background.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| 3D / Animation | Three.js, Framer Motion, GSAP |
| Styling | Tailwind CSS |
| Backend | Spring Boot 3.2 |
| Database | SQLite (via Hibernate Community Dialects) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **npm**
- **Java 17+** (JDK)
- **Maven** 3.8+ (or use the included `./mvnw` wrapper)

---

### 1. Start the Backend

```bash
cd backend

# Using Maven Wrapper (no Maven install needed)
./mvnw spring-boot:run

# OR if you have Maven installed
mvn spring-boot:run
```

The API will be available at: **http://localhost:8080**

| Endpoint | Description |
|---|---|
| GET /api/projects | All projects |
| GET /api/skills | All skills |
| GET /api/experiences | Work experience |
| POST /api/contact | Submit contact form |
| GET /actuator/health | Health check |

---

### 2. Start the Frontend

```bash
cd frontend
npm install       # First time only
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## 📁 Project Structure

```
POTFOLIO-KHIM/
├── backend/                        # Spring Boot API
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/portfolio/
│       │   ├── config/             # CORS
│       │   ├── controller/         # REST endpoints
│       │   ├── entity/             # JPA entities
│       │   ├── repository/         # Spring Data repos
│       │   └── service/            # Business logic
│       └── resources/
│           ├── application.properties
│           └── data.sql            # Seed data
│
└── frontend/                       # React App
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── components/
        │   ├── layout/             # Navbar, Footer
        │   ├── sections/           # Hero, About, Skills, Projects, Experience, Education, Contact
        │   ├── three/              # ParticleBackground (Three.js)
        │   └── ui/                 # Reusable UI components
        ├── hooks/                  # useLenis, useScrollAnimation
        ├── services/               # Axios API client
        └── types/                  # TypeScript interfaces
```

---

## ✨ Features

- 🌌 **3D Particle Background** — 2000 animated particles + rotating wireframe icosahedron
- 🎯 **Typewriter Hero** — Cycling role animations
- 📜 **Scroll Animations** — Framer Motion + GSAP ScrollTrigger
- 🃏 **3D Tilt Cards** — Project cards with tilt/hover effects
- 📊 **Skill Bars** — Animated progress bars triggered on scroll
- 🗓️ **Timeline** — Animated experience timeline
- 📬 **Contact Form** — Posts to Spring Boot API
- 📱 **Responsive** — Mobile-first design
- 🎨 **Glass Morphism** — Frosted glass card effects

---

## 🎨 Customize

Edit the seed data in [`backend/src/main/resources/data.sql`](backend/src/main/resources/data.sql) to update your:
- Projects
- Skills
- Work experience

Update social links and personal info in the Hero and Contact components.

---

*Built with ❤️ by KHIM*
