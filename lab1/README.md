# Lab 1 - Simple Chat Application

**Student:** Anton Kholodar  
**Group:** KV-41mp  
**Laboratory Work:** Laboratory Work #1 - Frontend Web Application Development  
**Report:** [Google Drive Link](https://docs.google.com/document/d/1LU3ZaA-npO0Kk8mvd5hJ8xGZ050V_3HRhNauLjcjzO8/edit?usp=sharing)

## Assignment

**Objective:** Learn to use frontend web framework tools, component-based development, and responsive web design

**General Task:** Develop a frontend Web application (Simple Chat) with multiple pages and client-side functionality.

**Theme:** Simple Chat - implement user registration, authentication, profile management, and chat interface.

**Development Tools:** React 18, Vite, Tailwind CSS, React Router DOM, localStorage

### Implemented Features:
- ✅ User registration (name, email, gender, date of birth)
- ✅ User login (email, password) with localStorage authentication
- ✅ User profile management with tabular display
- ✅ Chat interface for sending and receiving messages
- ✅ About page with application information
- ✅ Responsive design for all screen sizes

---

A modern chat application built with React and component-based architecture using Vite build tool, Tailwind CSS styling, and client-side data persistence.

## 🏗️ Architecture

This project follows **React Component Architecture** with clear separation of concerns and modular design:

```
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
└── configuration files     # Build and styling configuration
```

### Architecture Layers

- **Component Layer**: Reusable UI components (`Navigation`) with props and state management
- **Page Layer**: Route-specific components (`Register`, `Login`, `Profile`, `About`, `Chat`)
- **Application Layer**: Main app component with routing and global state
- **Asset Layer**: Static files, icons, and public resources

## 🚀 Technologies Used

- **React 18.2.0** - Component-based UI library
- **Vite 4.1.4** - Fast build tool and development server
- **Tailwind CSS 3.2.7** - Utility-first CSS framework
- **React Router DOM 6.8.1** - Client-side routing
- **localStorage API** - Client-side data persistence
- **JavaScript ES6+** - Modern JavaScript features
- **PostCSS** - CSS processing tool

## 📋 Features

- **User Management**
  - User registration with form validation
  - Email and password authentication
  - Profile data display in tabular format
  - Form validation and error handling

- **Chat Functionality**
  - Send and receive messages
  - Message history with timestamps
  - Real-time message display
  - Persistent message storage

- **User Interface**
  - Responsive design for mobile, tablet, desktop
  - Modern UI with Tailwind CSS
  - Navigation with active state indication
  - Clean and intuitive user experience

## 🛠️ Setup and Installation

### Prerequisites

- [Node.js 16.0.0+](https://nodejs.org/) (compatible with legacy systems)
- [npm package manager](https://www.npmjs.com/)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend-laboratory-works/lab1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Access the application**
   - Development: `http://localhost:5173`
   - Production build preview: `npm run preview`

## 🧪 Testing

The project includes manual testing procedures:

```bash
# Start development server
npm run dev

# Build production version
npm run build

# Preview production build
npm run preview
```

### Manual Testing Checklist

- **Registration Flow**: Form validation, data submission, localStorage storage
- **Authentication Flow**: Login validation, credential verification, route protection
- **Profile Display**: User data retrieval and tabular presentation
- **Chat Functionality**: Message sending, receiving, and persistence
- **Responsive Design**: Mobile, tablet, and desktop compatibility
- **Cross-browser Support**: Chrome, Firefox, Safari, Edge testing

## 📚 Application Flow

### User Registration
```javascript
// Registration form data
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "gender": "male",
  "dateOfBirth": "1990-01-01"
}
```

### User Authentication
```javascript
// Login credentials
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

### Chat Message Format
```javascript
// Message structure
{
  "id": "unique-id",
  "content": "Hello, World!",
  "timestamp": "2025-01-09T10:30:00Z",
  "sender": "john.doe@example.com"
}
```

## 🗄️ Data Storage Schema

The application uses localStorage with the following data structures:

### Users Storage
```javascript
localStorage.users = [
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123",
    "gender": "male",
    "dateOfBirth": "1990-01-01",
    "registeredAt": "2025-01-09T10:00:00Z"
  }
]
```

### Messages Storage
```javascript
localStorage.messages = [
  {
    "id": "msg-001",
    "content": "Hello, World!",
    "timestamp": "2025-01-09T10:30:00Z",
    "sender": "john.doe@example.com"
  }
]
```

### Session Storage
```javascript
localStorage.currentUser = {
  "email": "john.doe@example.com",
  "isAuthenticated": true,
  "loginTime": "2025-01-09T10:15:00Z"
}
```

## 🔧 Configuration

### Vite Configuration
Configure build settings in `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### Tailwind Configuration
Styling configuration in `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🏛️ Design Patterns Used

- **Component-Based Architecture** - Modular UI components with reusability
- **Single Page Application (SPA)** - Client-side routing with React Router
- **State Management** - Local component state and localStorage persistence
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Form Validation** - Client-side validation with error handling
- **Conditional Rendering** - Dynamic UI based on application state

## 🔍 Development Notes

### Key Implementation Details
- **Form Validation**: Email format, password requirements, date validation
- **Authentication System**: Simple email/password with localStorage session management
- **Responsive Design**: Tailwind CSS utility classes for all screen sizes
- **Component Reusability**: Navigation component used across all pages
- **Data Persistence**: localStorage for users, messages, and session data
- **Route Protection**: Authentication check for protected routes

### Compatibility Considerations
- **Node.js 16 Support**: Downgraded package versions for legacy compatibility
- **PostCSS Configuration**: ES module compatibility with `.cjs` extension
- **Browser Support**: Modern browsers with ES6+ features
- **Mobile Optimization**: Touch-friendly interface with responsive breakpoints

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all manual tests pass
4. Follow React best practices
5. Submit a pull request

## 📄 License

This project is part of academic laboratory work for Web Interface Programming course. 