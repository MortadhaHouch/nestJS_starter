<!-- HERO BANNER -->
<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="70" alt="NestJS"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="70" alt="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="70" alt="TypeScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="70" alt="MongoDB"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="70" alt="Python"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" width="70" alt="FastAPI"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" width="70" alt="Redis"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="70" alt="Nginx"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="70" alt="Docker"/>
  <img src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" width="70" alt="TailwindCSS"/>
  <img src="https://raw.githubusercontent.com/TanStack/query/main/media/logo.svg" width="70" alt="TanStack Query"/>
  <img src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/favicon.ico" width="70" alt="shadcn UI"/>
  <img src="https://raw.githubusercontent.com/react-hook-form/react-hook-form/master/docs/logo.png" width="70" alt="React Hook Form"/>
  <img src="https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" width="70" alt="Zod"/>
</p>

<h1 align="center">NestJS + React + Analytics Full-Stack Starter</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
  <img src="https://img.shields.io/badge/Contributors-Welcome-orange" />
  <img src="https://img.shields.io/badge/PRs-Welcome-blueviolet" />
  <img src="https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb" />
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react" />
  <img src="https://img.shields.io/badge/Backend-NestJS-red?logo=nestjs" />
  <img src="https://img.shields.io/badge/Analytics-FastAPI-009688?logo=fastapi" />
  <img src="https://img.shields.io/badge/Cache-Redis-DC382D?logo=redis" />
  <img src="https://img.shields.io/badge/Proxy-Nginx-009639?logo=nginx" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Forms-React_Hook_Form-EC5990?logo=reacthookform" />
  <img src="https://img.shields.io/badge/Validation-Zod-3E77E6?logo=zod" />
  <img src="https://img.shields.io/badge/UI-shadcn_UI-111827?logo=shadcnui" />
  <img src="https://img.shields.io/badge/Query-TanStack_Query-FF4154?logo=reactquery" />
</p>

---

<details>
<summary><b>Table of Contents</b></summary>

- [UI Gallery](#ui-gallery)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Service Explanations](#service-explanations)
- [Development & Production](#development--production)
- [Testing & Linting](#testing--linting)
- [Contribution Guide](#contribution-guide)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Credits & Inspiration](#credits--inspiration)
</details>

---

## 🎨 UI Gallery

<p align="center">
  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" width="300" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002;" alt="Kanban Board Screenshot" />
  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" width="300" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002;" alt="Login Screenshot" />
  <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" width="300" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002;" alt="Signup Screenshot" />
  <br/>
  <i>Replace these with your actual UI screenshots for Kanban, Login, Signup, etc.</i>
</p>

---

## 🚀 Features

<!-- Responsive feature cards: 5 per row, will wrap on mobile -->
<table>
  <tr>
    <td align="center"><img src="https://nestjs.com/img/logo-small.svg" width="32"/><br/><b>NestJS Backend</b></td>
    <td align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="32"/><br/><b>React Frontend</b></td>
    <td align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="32"/><br/><b>MongoDB/Mongoose</b></td>
    <td align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" width="32"/><br/><b>FastAPI Analytics</b></td>
    <td align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" width="32"/><br/><b>Redis Cache</b></td>
  </tr>
  <tr>
    <td align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="32"/><br/><b>Nginx Proxy</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" width="32"/><br/><b>TailwindCSS</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/TanStack/query/main/media/logo.svg" width="32"/><br/><b>TanStack Query</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/favicon.ico" width="32"/><br/><b>shadcn UI</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/react-hook-form/react-hook-form/master/docs/logo.png" width="32"/><br/><b>React Hook Form</b></td>
  </tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" width="32"/><br/><b>Zod Validation</b></td>
    <td colspan="4"></td>
  </tr>
</table>
<p align="center"><i>On mobile, features will wrap to the next line for better readability.</i></p>

---

## 🏗️ Architecture

```mermaid
flowchart LR
  subgraph Client
    A[React + shadcn UI + TailwindCSS] -- API Calls --> B(NestJS Backend)
    A -- Query/Cache --> Q[TanStack Query]
    A -- Forms/Validation --> F[React Hook Form & Zod]
  end
  B -- DB --> M(MongoDB/Mongoose)
  B -- Redis Cache --> R[Redis]
  B -- Analytics API --> C[FastAPI Microservice]
  C -- Data Science/ML --> D[Future Data Analysis]
  B -- API Docs --> S[Swagger]
  N[Nginx] -- Reverse Proxy --> A
  N -- Reverse Proxy --> B
  N -- Reverse Proxy --> C
  N -- Reverse Proxy --> M
  N -- Reverse Proxy --> R
```

---

## 🧰 Tech Stack

- ![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=for-the-badge) Progressive Node.js backend framework
- ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge) Modern frontend UI
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge) Type safety everywhere
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge) Flexible NoSQL database
- ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white&style=for-the-badge) Python microservice for analytics
- ![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white&style=for-the-badge) High-speed caching
- ![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white&style=for-the-badge) Reverse proxy and load balancer
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge) Utility-first CSS
- ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white&style=for-the-badge) Data fetching and caching
- ![shadcn UI](https://img.shields.io/badge/shadcn_UI-111827?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTEyIDJhMTAgMTAgMCAxIDAgMCAyMCAxMCAxMCAwIDAgMCAwLTIweiIvPjwvc3ZnPg==&logoColor=white&style=for-the-badge) Beautiful, accessible UI components
- ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white&style=for-the-badge) Form state management
- ![Zod](https://img.shields.io/badge/Zod-3E77E6?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjM0U3N0U2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTUgMTBoMTR2Mkg1eiIvPjxwYXRoIGQ9Ik0xMiA0bDcgMTJoLTd6Ii8+PC9zdmc+&logoColor=white&style=for-the-badge) TypeScript-first schema validation

---

## 🧠 Service Explanations

> ![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white&style=for-the-badge) **Nginx**
> 
> Acts as a reverse proxy, routing traffic to the correct service (frontend, backend, analytics). Handles SSL, load balancing, and static assets.
>
> ![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white&style=for-the-badge) **Redis**
> 
> In-memory data store for caching, session management, and pub/sub. Greatly improves performance and scalability.
>
> ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white&style=for-the-badge) **FastAPI**
> 
> Python microservice for analytics, ML, and data science. Fast, async, and easy to extend.
>
> ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge) **MongoDB/Mongoose**
> 
> Flexible NoSQL database, perfect for rapid development and scaling. Mongoose provides schema and validation for MongoDB in Node.js.
>
> ![Zod](https://img.shields.io/badge/Zod-3E77E6?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjM0U3N0U2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTUgMTBoMTR2Mkg1eiIvPjxwYXRoIGQ9Ik0xMiA0bDcgMTJoLTd6Ii8+PC9zdmc+&logoColor=white&style=for-the-badge) **Zod**
> 
> TypeScript-first schema validation for frontend and backend. Ensures data safety and developer happiness.
>
> ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white&style=for-the-badge) **React Hook Form**
> 
> Lightweight, performant form state management for React. Works beautifully with Zod.
>
> ![shadcn UI](https://img.shields.io/badge/shadcn_UI-111827?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTEyIDJhMTAgMTAgMCAxIDAgMCAyMCAxMCAxMCAwIDAgMCAwLTIweiIvPjwvc3ZnPg==&logoColor=white&style=for-the-badge) **shadcn UI**
> 
> Accessible, beautiful React UI components. Built on top of Radix UI and TailwindCSS.
>
> ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white&style=for-the-badge) **TanStack Query**
> 
> Powerful data fetching, caching, and sync for React apps.
>
> ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge) **TailwindCSS**
> 
> Utility-first CSS framework for rapid, responsive design.

---

## 🛠️ Development & Production

- **Local Development:**
  - Run all services with Docker Compose: `docker-compose up --build`