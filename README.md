# Social App

A modern, full-featured social media application built with React, TypeScript, and Vite. This frontend application provides a seamless user experience for authentication, posting, commenting, and real-time notifications.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## 🌐 Overview

This Social App is a modern frontend application designed to provide core social media functionalities including user authentication, post creation, commenting systems, and real-time notifications. Built with performance and developer experience in mind, the application leverages the latest web technologies to deliver a fast, responsive, and maintainable codebase.

The application consumes a RESTful API (backend not included in this repository) and is designed to work with a standard authentication and social media API backend.

## ✨ Features

### Authentication
- Secure user registration and login
- JWT-based authentication
- Password change functionality
- Form validation with React Hook Form and Zod
- Protected routes

### Posts & Comments
- Create, read, and interact with posts
- Comment on posts with nested replies
- Like/unlike comments
- Real-time comment updates

### Notifications
- Real-time notification system
- Notification bell with badge indicator
- Mark notifications as read
- Various notification types (likes, comments, follows)

### UI & UX
- Modern, responsive design with Tailwind CSS
- Dark mode support
- Toast notifications for user feedback
- Loading states and skeleton screens
- Emoji picker for enhanced expression
- Optimistic UI updates for better perceived performance

### Developer Experience
- TypeScript for type safety
- Redux Toolkit for state management
- React Query for server state management
- ESLint and Prettier for code quality
- Vite for lightning-fast development and builds

## 🛠️ Tech Stack

### Frontend
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Vite** - Next-generation frontend tooling
- **Redux Toolkit** - State management
- **React Query** - Data fetching and caching
- **React Router DOM v7** - Routing
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Heroicons** - Beautiful SVG icons
- **React Hot Toast** - Notification system
- **Emoji Picker React** - Emoji selection component
- **Axios** - HTTP client
- **Clsx** - Utility for constructing className strings
- **Lucide React** - Beautiful open-source icons

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript linting support
- **Vite Plugin React** - React Fast Refresh
- **Vite Plugin Tailwind CSS** - Tailwind CSS integration

## 📁 Project Structure

```
src/
├── app/
│   ├── hooks.ts          # Custom React hooks
│   ├── queryClient.ts    # React Query client configuration
│   └── store.ts          # Redux store configuration
├── assets/               # Static assets (images, icons, etc.)
├── features/             # Feature-based code splitting
│   ├── auth/             # Authentication feature
│   │   ├── api/          # API calls for auth
│   │   ├── components/   # Auth components (LoginForm, RegisterForm)
│   │   ├── hooks/        # Auth-specific hooks
│   │   ├── types.ts      # Auth TypeScript types
│   │   └── authSlice.ts  # Auth Redux slice
│   ├── comments/         # Comments feature
│   │   ├── api/          # API calls for comments
│   │   ├── components/   # Comment UI components
│   │   ├── hooks/        # Comment-specific hooks
│   │   └── types.ts      # Comments TypeScript types
│   └── notifications/    # Notifications feature
│       ├── components/   # Notification components
│       └── types.ts      # Notifications TypeScript types
├── shared/               # Shared code across features
│   ├── api/              # Axios instance and API configuration
│   ├── components/       # Shared UI components (buttons, inputs, etc.)
│   ├── hooks/            # Shared custom hooks
│   ├── types.ts          # Shared TypeScript types
│   └── utils/            # Utility functions
├── App.tsx               # Root application component
└── main.tsx              # Application entry point
```

## 🔧 Installation & Setup

Follow these steps to get the development environment running:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory based on the provided `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_WS_URL=ws://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Visit `http://localhost:5173` to see the application running.

## 🔑 Environment Variables

The following environment variables are required:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL for the REST API | `http://localhost:5000/api` |
| `VITE_WS_URL` | WebSocket URL for real-time features | `ws://localhost:5000` |

> **Note**: These variables must be prefixed with `VITE_` to be exposed to the Vite-built application.

## 🚀 Available Scripts

In the project directory, you can run:

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server with hot module replacement |
| `npm run build` | Builds the application for production |
| `npm run lint` | Runs ESLint to check for code quality issues |
| `npm run preview` | Locally preview the production build |
| `npm run test` | Runs tests (if configured) |

## 🔌 API Endpoints

This frontend expects a backend API with the following endpoints (adjust based on your actual backend implementation):

### Authentication
- `POST /users/signin` - User login
- `POST /users/signup` - User registration
- `PATCH /users/change-password` - Change user password

### Posts
- `GET /posts` - Get all posts
- `POST /posts` - Create a new post
- `GET /posts/:id` - Get a specific post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Comments
- `GET /posts/:postId/comments` - Get comments for a post
- `POST /posts/:postId/comments` - Create a comment
- `DELETE /comments/:id` - Delete a comment
- `PATCH /comments/:id/like` - Like/unlike a comment

### Notifications
- `GET /notifications` - Get user notifications
- `PATCH /notifications/:id/read` - Mark notification as read
- `DELETE /notifications/:id` - Delete a notification

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to follow the existing code style and add tests for any new functionality.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the blazing fast development experience
- [React](https://reactjs.org/) for the powerful UI library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All the open-source packages used in this project

---

**Made with ❤️ by Ahmed Tayel**
