<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
  <a href="https://react.dev/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React Logo" /></a>
</p>

<h1 align="center">NestJS + React Full-Stack Starter</h1>

<p align="center">
  A robust starter repository for building modern, full-stack web applications. It combines a powerful <a href="http://nestjs.com/" target="_blank">NestJS</a> backend with a dynamic <a href="https://react.dev/" target="_blank">React</a> frontend, both written in TypeScript.
</p>

## Latest Update

- Added new dependencies: `@dnd-kit/core`, `@dnd-kit/modifiers`, `@dnd-kit/sortable`, `socket.io-client`, and `uuid` in the client.
- Updated `package.json` and `package-lock.json` for both client and server to include `@nestjs/platform-socket.io` and `@nestjs/websockets`.
- Implemented new routes for login, signup, and kanban board in the client application.
- **Added Kanban board functionality to the client application:**
  - The Kanban board provides a visual project management tool with multiple columns (e.g., "To Do", "In Progress", "Done").
  - Users can add new columns to represent different stages or categories in their workflow.
  - Tasks (tiles) can be created and assigned to any column, representing individual work items or project tasks.
  - Tasks can be dragged and dropped between columns to update their status or progress.
  - The board is designed to help teams and individuals organize, prioritize, and track project tasks efficiently.
- Introduced `TaskPriority` enum in the server for task management.

## Description

This starter project provides a solid foundation for developers looking to build scalable and maintainable applications. It's pre-configured with a monorepo structure to manage both the server and client code in a single repository.

## Key Features

**Backend (NestJS)**

- ✅ **Modern & Scalable:** Built with the progressive Node.js framework, NestJS.
- ✅ **TypeScript First:** Strong typing for robust and maintainable code.
- ✅ **Modular Architecture:** Organized into modules for clear separation of concerns.
- ✅ **Authentication & Authorization:** Pre-configured with JWT-based authentication.
- ✅ **Database Integration:** Ready-to-use setup with TypeORM and PostgreSQL.
- ✅ **Configuration Management:** Centralized and environment-aware configuration.
- ✅ **Validation:** Built-in validation pipes for incoming requests.
- ✅ **API Documentation:** Automatic API documentation generation with Swagger (OpenAPI).

**Frontend (React)**

- ✅ **Component-Based UI:** Powered by the popular React library.
- ✅ **TypeScript Support:** Type safety for your frontend components and logic.
- ✅ **Development Server:** Hot-reloading for a smooth development experience.
- ✅ **API Proxy:** Pre-configured to proxy API requests to the NestJS backend, avoiding CORS issues in development.

## Roadmap

We are continuously working to improve this starter repository. Here are some of the features we plan to add:

**Frontend:**
- 🚀 **Kanban Boards:** A feature-rich, interactive Kanban board for task management.
- 🚀 **Real-time Collaboration:** WebSocket integration for live collaboration features.
- 🚀 **MDX Editor:** A powerful Markdown editor with component support for creating rich content.

**Backend & DevOps:**
- 🚀 **Redis Caching:** Integration with Redis for high-performance caching.
- 🚀 **Nginx Integration:** Configuration for using Nginx as a reverse proxy and load balancer in production.

## Advanced Project Management Features (Planned)

We are considering the following advanced features for future integration to enhance project management capabilities:

- **Task Assignment & User Roles:** Assign tasks to users/teams and define roles with permissions.
- **Due Dates & Reminders:** Add due dates to tasks and send automated reminders.
- **Task Dependencies:** Set and visualize dependencies between tasks.
- **Subtasks & Checklists:** Break down tasks into subtasks or checklists.
- **Labels, Tags, & Priorities:** Categorize and prioritize tasks with labels and tags.
- **Comments & Activity Feed:** Enable discussions and maintain an activity log for tasks.
- **File Attachments:** Attach files and documents to tasks.
- **Time Tracking & Estimates:** Log time spent and add time estimates for tasks.
- **Customizable Workflows:** Create custom columns, workflows, and templates.
- **Notifications & Real-Time Collaboration:** In-app/email notifications and live updates.
- **Analytics & Reporting:** Visualize progress with charts and export reports.
- **Calendar & Timeline Views:** Integrate calendar and Gantt/timeline views for planning.
- **Integration with External Tools:** Connect with Slack, GitHub, Google Drive, Jira, etc.
- **Advanced Search & Filtering:** Search and filter tasks by various criteria.
- **Project Archiving & Templates:** Archive projects and reuse templates for workflows.

## Project Structure

The project is organized as a monorepo with two main packages:

```
/
├── client/      # React frontend application
├── server/      # NestJS backend application
└── package.json # Root package.json for shared scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher is recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MortadhaHouch/nestJS_starter.git
   cd nestJS_starter
   ```
2. **Install dependencies:**
   This command will install dependencies for both the `server` and `client` applications.

   ```bash
   npm install
   ```
3. **Configure Environment Variables:**

   - **Backend:** Navigate to the `server` directory, copy the `.env.example` file to a new `.env` file, and update the variables as needed.
     ```bash
     cd server
     cp .env.example .env
     ```
   - **Frontend:** The React app can use environment variables prefixed with `REACT_APP_`. Create a `.env` file in the `client` directory if needed.

## Available Scripts

```bash
# Run both client and server concurrently for development
$ npm run dev

# Run only the backend server (in watch mode)
$ npm run start:dev:server

# Run only the frontend client
$ npm run start:dev:client

# Build both client and server for production
$ npm run build

# Run the production-ready server (after building)
$ npm run start:prod
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
