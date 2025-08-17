<div align="center">
  <h1>🚀 NestJS + React + FastAPI Full-Stack Starter</h1>
  <h3>Enterprise-Grade Full Stack Application Boilerplate with Real-time Features</h3>
  
  <p align="center">
    <img loading="lazy" src="https://img.shields.io/github/last-commit/yourusername/nest-starter?style=flat-square" alt="Last commit" />
    <img loading="lazy" src="https://img.shields.io/github/contributors/yourusername/nest-starter?style=flat-square" alt="Contributors" />
    <img loading="lazy" src="https://img.shields.io/github/license/yourusername/nest-starter?style=flat-square" alt="License" />
    <img loading="lazy" src="https://img.shields.io/github/stars/yourusername/nest-starter?style=social" alt="GitHub stars" />
  </p>

  <p align="center">
    <img loading="lazy" src="https://nestjs.com/img/logo-small.svg" width="60" alt="NestJS" title="NestJS" />
    <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="60" alt="React" title="React" />
    <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="60" alt="TypeScript" title="TypeScript" />
    <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="60" alt="MongoDB" title="MongoDB" />
    <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="60" alt="Python" title="Python" />
    <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" width="60" alt="FastAPI" title="FastAPI" />
    <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" width="60" alt="Redis" title="Redis" />
    <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="60" alt="Nginx" title="Nginx" />
    <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="60" alt="Docker" title="Docker" />
    <img loading="lazy" src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" width="60" alt="TailwindCSS" title="Tailwind CSS" />
    <img loading="lazy" src="https://raw.githubusercontent.com/TanStack/query/main/media/logo.svg" width="60" alt="TanStack Query" title="TanStack Query" />
    <img loading="lazy" src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/favicon.ico" width="60" alt="shadcn UI" title="shadcn/ui" />
    <img loading="lazy" src="https://raw.githubusercontent.com/react-hook-form/react-hook-form/master/docs/logo.png" width="60" alt="React Hook Form" title="React Hook Form" />
    <img loading="lazy" src="https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" width="60" alt="Zod" title="Zod" />
  </p>
</div>

<div align="center">
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#api-documentation">API Docs</a> •
    <a href="#deployment">Deployment</a>
  </p>
  
  <p>
    <a href="https://github.com/yourusername/nest-starter/actions/workflows/ci.yml">
      <img loading="lazy" src="https://img.shields.io/github/workflow/status/yourusername/nest-starter/CI/main?label=Build&logo=github" alt="CI Status" />
    </a>
    <a href="https://codecov.io/gh/yourusername/nest-starter">
      <img loading="lazy" src="https://img.shields.io/codecov/c/github/yourusername/nest-starter?logo=codecov" alt="Code Coverage" />
    </a>
    <a href="https://github.com/yourusername/nest-starter/issues">
      <img loading="lazy" src="https://img.shields.io/github/issues/yourusername/nest-starter?logo=github" alt="Open Issues" />
    </a>
    <a href="https://discord.gg/your-invite">
      <img loading="lazy" src="https://img.shields.io/discord/your-discord-id?label=Discord&logo=discord" alt="Discord" />
    </a>
  </p>
</div>

## 🚀 Quick Start

Get up and running in minutes with our one-command setup:

```bash
# Clone the repository
git clone https://github.com/yourusername/nest-starter.git
cd nest-starter

# Start the development environment
docker-compose up -d
```

Visit `http://localhost:3000` to see the application in action!

## ✨ Key Features

### 🎯 Core Functionality
- **Authentication & Authorization**
  - JWT-based authentication with refresh tokens
  - Role-based access control (RBAC)
  - Social login integration (Google, GitHub)
  - Two-factor authentication (2FA)
  - Session management with Redis

- **User Management**
  - Profile management with avatar uploads
  - Email verification flow
  - Password reset functionality
  - User activity tracking
  - Account settings and preferences

- **Task Management**
  - Create, read, update, delete tasks
  - Task assignments and due dates
  - Priority levels and status tracking
  - Task comments and attachments
  - Task history and audit trail

- **Team Collaboration**
  - Create and manage teams
  - Team roles and permissions
  - Team discussions
  - File sharing and versioning
  - Team analytics and insights

### 🚀 Advanced Features
- **Real-time Updates**
  - WebSocket integration for live updates
  - Real-time notifications
  - Live chat functionality
  - Collaborative editing
  - Presence indicators

- **Analytics Dashboard**
  - User activity tracking
  - Performance metrics
  - Custom report generation
  - Data visualization
  - Export capabilities (CSV, PDF)

- **Developer Experience**
  - Comprehensive API documentation
  - TypeScript support throughout
  - Testing utilities
  - Development tools
  - Debugging helpers

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: React Query, Zustand
- **Styling**: Tailwind CSS with shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router v6
- **Real-time**: Socket.IO Client
- **UI Components**: Radix UI Primitives, shadcn/ui
- **Icons**: Lucide React
- **Testing**: Jest, React Testing Library, Cypress

### Backend (NestJS)
- **Runtime**: Node.js 18+
- **Framework**: NestJS 10+
- **Database**: MongoDB with Mongoose
- **Cache**: Redis
- **Authentication**: JWT, Passport.js
- **Real-time**: WebSockets with Socket.IO
- **Queue**: BullMQ
- **Validation**: Class Validator, Class Transformer
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest

### Analytics (FastAPI)
- **Language**: Python 3.10+
- **Framework**: FastAPI
- **Data Processing**: Pandas, NumPy
- **Machine Learning**: scikit-learn (optional)
- **Visualization**: Matplotlib, Plotly
- **API Documentation**: Swagger UI, ReDoc

### DevOps
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **Logging**: Winston, ELK Stack (optional)
- **Error Tracking**: Sentry
- **Performance**: New Relic (optional)

## 📋 Table of Contents

<details open>
<summary>Click to expand/collapse</summary>

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [🏗 Project Structure](#-project-structure)
- [📚 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🔒 Security](#-security)
- [🧩 Extending the Project](#-extending-the-project)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
</details>

---

## 🎨 UI Gallery

<p align="center">
  <img loading="lazy" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" width="340" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002; margin:8px;" alt="Modern Kanban Board UI" />
  <img loading="lazy" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" width="340" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002; margin:8px;" alt="Task Scheduler UI" />
  <img loading="lazy" src="https://undraw.co/api/illustrations/undraw_team_collaboration_re_ow29.svg" width="340" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002; margin:8px;" alt="Team Collaboration Illustration" />
  <img loading="lazy" src="https://undraw.co/api/illustrations/undraw_artificial_intelligence_re_enpp.svg" width="340" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002; margin:8px;" alt="AI Assistant Illustration" />
  <img loading="lazy" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" width="340" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002; margin:8px;" alt="Analytics Dashboard UI" />
  <img loading="lazy" src="https://undraw.co/api/illustrations/undraw_notify_re_65on.svg" width="340" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002; margin:8px;" alt="Notifications Center Illustration" />
  <img loading="lazy" src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" width="340" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002; margin:8px;" alt="Settings UI" />
  <img loading="lazy" src="https://undraw.co/api/illustrations/undraw_project_completed_re_jr7u.svg" width="340" style="border:2px solid #e5e7eb; border-radius:12px; box-shadow:0 2px 8px #0002; margin:8px;" alt="Project Templates Illustration" />
  <br/>
  <i>Gallery: Kanban Board, Task Scheduler, Team Collaboration, AI Assistant, Analytics, Notifications, Settings, Project Templates</i>
</p>

---

## 🆕 Latest Updates

### WebSockets Integration
- **Real-Time Features:**
  - WebSocket support is now available for real-time updates (e.g., notifications, chat, live task updates).
  - The backend exposes WebSocket gateways for instant client-server communication.

### BullMQ Queuing in Auth Flow
- **Asynchronous Notification Jobs:**
  - The authentication flow now uses BullMQ queues to handle login and verification notifications asynchronously.
  - When a user logs in, a notification job is enqueued and processed by a dedicated worker.

### Notification System
- **Modular Notification Delivery:**
  - Notifications are processed via BullMQ and can be delivered via email, WebSocket, or both.
  - The notification processor is modular and can be extended for additional channels.

---

## 🗂️ Project Structure & API Overview

### 🚦 Main Features

- **User Authentication & 2-Step Verification** (BullMQ-powered async email/notification delivery)
- **Task Management** (CRUD, caching, real-time updates via WebSocket)
- **Team, Note, Discussion, Message, Notification, Workspace Management** (RESTful APIs)
- **Real-Time Task Collaboration** (WebSocket gateway for tasks)
- **Modular Notification System** (email, WebSocket, BullMQ)
- **Rate Limiting, Caching, and Security** (Throttler, Redis, Helmet)
- **Analytics Microservice** (FastAPI)
- **Modern Email Templates** (table-based, inline CSS, compatible with all clients)

---

### 📚 Controllers & Routes

| Entity        | Controller                | Main Routes (REST)                                                                                   |
|---------------|---------------------------|------------------------------------------------------------------------------------------------------|
| User          | `/user`                   | `POST /login`, `POST /validate`, `POST /signup`, `PATCH /update-profile`, `POST /logout`             |
| Task          | `/task`                   | `POST /`, `GET /`, `GET /overdue`, `GET /stats`, `GET /:id`, `PATCH /:id`, `DELETE /:id`            |
| Team          | `/team`                   | `POST /`, `GET /`, `GET /:id`, `PATCH /:id`, `DELETE /:id`                                          |
| Note          | `/note`                   | `POST /`, `GET /`, `GET /:id`, `PATCH /:id`, `DELETE /:id`                                          |
| Discussion    | `/discussion`             | `POST /`, `GET /`, `GET /:id`, `PATCH /:id`, `DELETE /:id`                                          |
| Message       | `/message`                | `POST /`, `GET /`, `GET /:id`, `PATCH /:id`, `DELETE /:id`                                          |
| Notification  | `/notification`           | `POST /`, `GET /`, `GET /:id`, `GET /status/:status`                                                |
| Workspace     | `/workspace`              | `POST /`, `GET /`, `GET /:id`, `PATCH /:id`, `PATCH /join/:id`, `DELETE /:id`                       |

**WebSocket Gateway:**  
- `/task-process` (port 3001): Real-time task collaboration (add, update, remove, find tasks, etc.)

---

### 🛠️ Services

- **UserService**: User CRUD, password hashing, validation, friend management.
- **TaskService**: Task CRUD, caching, statistics, overdue logic.
- **TeamService, NoteService, DiscussionService, MessageService, NotificationService, WorkspaceService**: Standard CRUD and business logic.
- **NotificationService**: Handles notification creation, filtering, and status updates.
- **TaskProcessService**: Used by the WebSocket gateway for real-time task operations.

---

### 🔄 Real-Time & Queuing

- **WebSocket Gateway**:  
  - Located in `processes/task_process/task_process.gateway.ts`
  - Handles real-time task events (`add-task`, `find-all`, `find-one`, `update-task`, `remove-task`).

- **BullMQ Queues**:  
  - Used in authentication and notification flows.
  - Example: On login, a notification job is enqueued and processed asynchronously.

---

### 📝 Example API Usage

#### User Authentication

```http
POST /user/login
POST /user/validate
POST /user/signup
PATCH /user/update-profile
POST /user/logout
```

#### Task Management

```http
POST /task
GET /task
GET /task/overdue
GET /task/stats
GET /task/:id
PATCH /task/:id
DELETE /task/:id
```

#### Notification

```http
POST /notification
GET /notification
GET /notification/:id
GET /notification/status/:status
```

#### Real-Time Task Collaboration

- Connect to WebSocket on port 3001
- Emit events: `add-task`, `find-all`, `find-one`, `update-task`, `remove-task`

---

### 🧩 How to Extend

- **Add new REST endpoints**: Create a new controller and service, register in the module.
- **Add new real-time features**: Add new WebSocket events in the gateway and service.
- **Add new notification channels**: Extend the notification processor to support SMS, push, etc.

---

## 🚀 Features

<!-- Responsive feature cards: 5 per row, will wrap on mobile -->
<table>
  <tr>
    <td align="center"><img loading="lazy" src="https://nestjs.com/img/logo-small.svg" width="32"/><br/><b>NestJS Backend</b></td>
    <td align="center"><img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="32"/><br/><b>React Frontend</b></td>
    <td align="center"><img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="32"/><br/><b>MongoDB/Mongoose</b></td>
    <td align="center"><img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" width="32"/><br/><b>FastAPI Analytics</b></td>
    <td align="center"><img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" width="32"/><br/><b>Redis Cache</b></td>
  </tr>
  <tr>
    <td align="center"><img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="32"/><br/><b>Nginx Proxy</b></td>
    <td align="center"><img loading="lazy" src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" width="32"/><br/><b>TailwindCSS</b></td>
    <td align="center"><img loading="lazy" src="https://ragavkumarv.com/services/tanstack-query-course" width="32"/><br/><b>TanStack Query</b></td>
    <td align="center"><img loading="lazy" src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/favicon.ico" width="32"/><br/><b>shadcn UI</b></td>
    <td align="center"><img loading="lazy" src="https://raw.githubusercontent.com/react-hook-form/react-hook-form/master/docs/logo.png" width="32"/><br/><b>React Hook Form</b></td>
  </tr>
  <tr>
    <td align="center"><img loading="lazy" src="https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" width="32"/><br/><b>Zod Validation</b></td>
    <td colspan="4"></td>
  </tr>
</table>
<p align="center"><i>On mobile, features will wrap to the next line for better readability.</i></p>

---

### 🆕 Workspace Management API

The backend now supports advanced workspace management features:

- **Create Workspace**: Create a new workspace for your projects or teams.
- **Get All Workspaces**: List all workspaces accessible to the authenticated user, with support for pagination, search, sorting, and status filtering.
- **Get Workspace by ID**: Retrieve details of a specific workspace if you have access.
- **Update Workspace**: Update the details of a workspace you own.
- **Join Workspace**: Add users to a workspace by their IDs.
- **Delete Workspace**: Remove a workspace you own.

**Workspace API Routes:**

| Method | Route                   | Description                                                                                  | Auth Required | Latest Feature? |
|--------|-------------------------|----------------------------------------------------------------------------------------------|:-------------:|:--------------:|
| POST   | `/workspace`            | Create a new workspace.                                                                      | Yes           |                |
| GET    | `/workspace`            | List all workspaces accessible to the user. Supports pagination, search, sort, and status.   | Yes           |                |
| GET    | `/workspace/:id`        | Get a specific workspace by ID, if accessible.                                               | Yes           |                |
| PATCH  | `/workspace/:id`        | Update a workspace (if owned by the user).                                                   | Yes           |                |
| PATCH  | `/workspace/join/:id`   | Add users to a workspace by their IDs.                                                       | Yes           |      ✅        |
| DELETE | `/workspace/:id`        | Delete a workspace (if owned by the user).                                                   | Yes           |                |

#### Latest Added Feature: Join Workspace

- **Join Workspace (`PATCH /workspace/join/:id`)**  
  Allows the owner of a workspace to add multiple users to the workspace by providing their user IDs. This endpoint ensures only authorized users can add others, and returns an error if the workspace is not found or the user is unauthorized.

All endpoints require authentication. Ownership and access checks are enforced for sensitive operations.

---

## 📚 API Overview

### Authentication & Notification Flow

- **Login:**
  - User submits credentials.
  - On success, a verification code is generated and sent via email (using BullMQ queue for async delivery).
  - A notification job is also enqueued for login events.
  - WebSocket events can be emitted for real-time feedback (e.g., "new login detected").

- **Notification API:**
  - Notifications can be triggered by user actions (login, task updates, etc.).
  - Each notification is enqueued and processed by a worker.
  - Delivery can be via email, WebSocket, or both, depending on user settings.

### User API

| Method | Route                | Description                                                                                  | Latest Feature? |
|--------|----------------------|----------------------------------------------------------------------------------------------|:--------------:|
| POST   | `/user/login`        | Login with email and password. Sends a verification code to email for 2-step verification.   |                |
| POST   | `/user/validate`     | Validate the verification code sent to email. Issues JWT on success.                         |      ✅        |
| POST   | `/user/signup`       | Register a new user. Checks for duplicate name/email.                                        |                |
| PATCH  | `/user/update-profile`| Update user profile (name, password).                                                        |                |
| POST   | `/user/logout`       | Log out the current user.                                                                    |                |

**Latest Feature:**  
- **2-Step Email Verification on Login:**  
  After login, a verification code is sent to the user's email. The user must validate this code to complete authentication.

---

### Task API

| Method | Route                | Description                                                                                  | Latest Feature? |
|--------|----------------------|----------------------------------------------------------------------------------------------|:--------------:|
| POST   | `/task`              | Create a new task. User is auto-assigned as owner.                                           |                |
| GET    | `/task`              | List all tasks for the user. Supports pagination, filtering, sorting, and search.            |                |
| GET    | `/task/overdue`      | List all overdue tasks for the user.                                                         |      ✅        |
| GET    | `/task/stats`        | Get statistics (total, overdue, by status) for the user's tasks.                             |      ✅        |
| GET    | `/task/:id`          | Get a specific task by ID. Uses caching for performance.                                     |                |
| PATCH  | `/task/:id`          | Update a task. Updates cache if present.                                                     |                |
| DELETE | `/task/:id`          | Delete a task. Removes from cache.                                                           |                |

**Latest Features:**  
- **Overdue Tasks Endpoint:**  
  Easily fetch all overdue tasks for the user.
- **Task Statistics Endpoint:**  
  Get a summary of total, overdue, and status breakdown for tasks.

---

### Workspace API

| Method | Route                   | Description                                                                                  | Latest Feature? |
|--------|-------------------------|----------------------------------------------------------------------------------------------|:--------------:|
| POST   | `/workspace`            | Create a new workspace.                                                                      |                |
| GET    | `/workspace`            | List all workspaces accessible to the user. Supports pagination, search, sort, and status.   |                |
| GET    | `/workspace/:id`        | Get a specific workspace by ID, if accessible.                                               |                |
| PATCH  | `/workspace/:id`        | Update a workspace (if owned by the user).                                                   |                |
| PATCH  | `/workspace/join/:id`   | Add users to a workspace by their IDs.                                                       |      ✅        |
| DELETE | `/workspace/:id`        | Delete a workspace (if owned by the user).                                                   |                |

**Latest Feature:**  
- **Join Workspace:**  
  Owners can add multiple users to a workspace by their IDs.

---

### Team, Note, Discussion, Message, Notification APIs

All these controllers follow a similar RESTful pattern:

| Method | Route                | Description                        |
|--------|----------------------|------------------------------------|
| POST   | `/entity`            | Create a new entity                |
| GET    | `/entity`            | List all entities                  |
| GET    | `/entity/:id`        | Get a specific entity by ID        |
| PATCH  | `/entity/:id`        | Update an entity                   |
| DELETE | `/entity/:id`        | Delete an entity                   |

Replace `/entity` with `/team`, `/note`, `/discussion`, `/message`, or `/notification` as appropriate.

---

## 🏗️ Architecture

```mermaid
flowchart LR
  subgraph Client
    A[React + shadcn UI + TailwindCSS] -- API Calls --> B(NestJS Backend)
    A -- Query/Cache --> Q[TanStack Query]
    A -- Forms/Validation --> F[React Hook Form & Zod]
    A -- WebSocket --> WS[WebSocket Gateway]
  end
  B -- DB --> M(MongoDB/Mongoose)
  B -- Redis Cache --> R[Redis]
  B -- Analytics API --> C[FastAPI Microservice]
  B -- BullMQ Queue --> Q2[BullMQ Worker]
  B -- WebSocket Gateway --> WS
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

> **WebSocket Gateway**
> - Enables real-time communication between backend and frontend for notifications, chat, and live updates.
>
> **BullMQ**
> - Used for queuing notification jobs, especially in the authentication flow (e.g., login notifications).
> - Ensures reliable, scalable, and asynchronous processing of background tasks.
>
> **Notification System**
> - Modular, supports both email and WebSocket delivery.
> - Easily extendable for SMS, push, or other channels.

---

## 🛠️ Development & Production

- **Local Development:**
  - Run all services with Docker Compose: `docker-compose up --build`
