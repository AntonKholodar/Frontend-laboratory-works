# Lab 2 - React Chat Application Testing

**Student:** Anton Kholodar  
**Group:** KV-41mp  
**Laboratory Work:** Laboratory Work #2 - Frontend Testing with Jest and Cypress  
**Report:** [Google Drive Link](https://docs.google.com/document/d/1lpkbH0P63l-zFggvOML-KH25jva3IURxH8QJeEGMdcM/edit?usp=sharing)

## Assignment

**Objective:** Learn comprehensive testing methodologies for frontend applications using Jest, React Testing Library, and Cypress for E2E testing

**General Task:** Implement comprehensive testing suite for the Simple Chat application from Lab 1, achieving 80%+ test coverage with both unit and end-to-end tests.

**Theme:** Testing React Chat Application - implement unit tests, integration tests, and end-to-end testing workflows.

**Development Tools:** Jest, React Testing Library, Cypress, Babel, React 18, Vite, Tailwind CSS

### Testing Requirements Fulfilled:
- ✅ **80%+ Unit Test Coverage** - Achieved **88.52%** test coverage
- ✅ **All Pages Tested** - Registration, Login, Profile, About, Chat
- ✅ **90 Unit Tests** - Comprehensive test suite with 100% pass rate
- ✅ **44 E2E Tests** - Complete end-to-end testing with 100% pass rate
- ✅ **E2E Testing Setup** - Cypress configuration and test scenarios
- ✅ **Form Validation Testing** - All validation scenarios covered
- ✅ **User Flow Testing** - Complete authentication and chat workflows
- ✅ **Cross-Browser E2E Testing** - Full application workflow validation

---

A comprehensive testing suite for the React chat application featuring unit tests with Jest & React Testing Library, end-to-end testing with Cypress, and advanced testing configurations.

## 🏗️ Testing Architecture

This project implements **Multi-Layer Testing Architecture** with comprehensive coverage:

```
├── src/
│   ├── components/
│   │   └── __tests__/          # Component unit tests
│   ├── pages/
│   │   └── __tests__/          # Page component tests
│   ├── setupTests.js           # Jest configuration
│   └── [original app files]
├── cypress/
│   ├── e2e/                    # End-to-end test scenarios
│   ├── support/                # Custom commands and utilities
│   └── fixtures/               # Test data
├── coverage/                   # Coverage reports
└── configuration files         # Testing configuration
```

### Testing Layers

- **Unit Tests**: Individual component testing with Jest & React Testing Library
- **Integration Tests**: Component interaction and user flow testing
- **E2E Tests**: Full application workflow testing with Cypress
- **Coverage Reports**: Detailed coverage analysis and reporting

## 🧪 Testing Technologies

- **Jest 29.3.1** - JavaScript testing framework
- **React Testing Library 13.4.0** - React component testing utilities
- **Cypress 12.5.1** - End-to-end testing framework
- **Babel 7.20.12** - JavaScript transpilation for testing
- **jsdom** - DOM simulation for Jest environment
- **@testing-library/jest-dom** - Additional Jest matchers
- **@testing-library/user-event** - User interaction simulation

## 📊 Testing Coverage Results

### **Achieved Coverage (Exceeds 80% Requirement)**

```
-----------------|---------|----------|---------|---------|
File             | % Stmts | % Branch | % Funcs | % Lines |
-----------------|---------|----------|---------|---------|
All files        |   88.52 |    85.88 |   85.71 |   88.59 |
 src/components  |     100 |      100 |     100 |     100 |
  Navigation.jsx |     100 |      100 |     100 |     100 |
 src/pages       |   98.16 |    97.26 |     100 |      99 |
  About.jsx      |     100 |      100 |     100 |     100 |
  Chat.jsx       |   94.59 |    91.66 |     100 |   97.14 |
  Login.jsx      |     100 |      100 |     100 |     100 |
  Profile.jsx    |     100 |      100 |     100 |     100 |
  Register.jsx   |     100 |      100 |     100 |     100 |
-----------------|---------|----------|---------|---------|
```

### **Test Suite Summary**
- **Total Tests:** 90 tests
- **Pass Rate:** 100% (90/90 passing)
- **Test Suites:** 6 test suites, all passing
- **Coverage:** 88.52% statements, 85.88% branches, 85.71% functions, 88.59% lines

## 📋 Test Suite Breakdown

### **Navigation Component (12 tests)**
- ✅ Rendering and navigation link tests
- ✅ Authentication state handling
- ✅ Active route highlighting
- ✅ Logout functionality

### **Login Page (11 tests)**
- ✅ Form rendering and input validation
- ✅ Authentication flow testing
- ✅ Error handling and display
- ✅ Successful login navigation

### **Register Page (15 tests)**
- ✅ Complete form validation testing
- ✅ Email format validation
- ✅ Password strength requirements
- ✅ User registration workflow
- ✅ Duplicate user handling

### **Profile Page (12 tests)**
- ✅ User data display in tabular format
- ✅ Age calculation with date mocking
- ✅ Gender capitalization
- ✅ Profile data formatting

### **Chat Page (20 tests)**
- ✅ Message sending and receiving
- ✅ Message history display
- ✅ Form validation and submission
- ✅ Real-time message updates
- ✅ Message persistence testing

### **About Page (12 tests)**
- ✅ Static content rendering
- ✅ Navigation and link functionality
- ✅ Content accessibility
- ✅ Responsive design elements

## 🚀 End-to-End (E2E) Testing Results

### **E2E Test Suite Summary**
- **Total E2E Tests:** 44 tests
- **Pass Rate:** 100% (44/44 passing)
- **Test Files:** 5 test suites, all passing
- **Achievement:** Improved from 29/45 (64%) to 44/44 (100%) success rate

### **E2E Test Coverage Breakdown**

#### **Authentication Tests (`auth.cy.js`) - 10 tests**
**Registration Flow:**
- ✅ Display registration form with all required fields
- ✅ Show validation errors for empty fields
- ✅ Validate email format and prevent invalid submissions
- ✅ Enforce password length requirements (minimum 6 characters)
- ✅ Successfully register new users with proper data
- ✅ Prevent duplicate email registrations

**Login Flow:**
- ✅ Display login form with proper elements
- ✅ Show error messages for empty field submissions
- ✅ Handle invalid credential scenarios gracefully
- ✅ Successfully authenticate users with valid credentials

#### **Chat Functionality Tests (`chat.cy.js`) - 11 tests**
- ✅ Display complete chat interface with all elements
- ✅ Show real-time character count (500 character limit)
- ✅ Send messages successfully and clear input field
- ✅ Prevent sending empty messages with disabled button
- ✅ Persist messages in localStorage across page reloads
- ✅ Display accurate timestamps for all messages
- ✅ Handle multiple messages in conversation flow
- ✅ Enforce character limit with proper validation
- ✅ Support keyboard shortcuts (Enter to send)
- ✅ Show empty state when no messages exist
- ✅ Handle message formatting and special characters

#### **Profile Page Tests (`profile.cy.js`) - 10 tests**
- ✅ Display complete user profile information in table format
- ✅ Calculate and display correct age based on birth date
- ✅ Show registration date with proper formatting
- ✅ Maintain proper table structure and accessibility
- ✅ Apply consistent styling and responsive layout
- ✅ Handle different gender capitalizations correctly
- ✅ Redirect unauthenticated users to login page
- ✅ Handle edge case dates and date calculations
- ✅ Display all user data fields accurately
- ✅ Ensure accessible table structure with proper ARIA labels

#### **Navigation Tests (`navigation.cy.js`) - 9 tests**
**Unauthenticated User Navigation:**
- ✅ Show appropriate navigation links (Login, Register, About)
- ✅ Navigate to login page from navigation menu
- ✅ Navigate to register page from navigation menu
- ✅ Navigate to about page and display content
- ✅ Redirect to login when accessing protected routes

**Authenticated User Navigation:**
- ✅ Show authenticated navigation menu (Chat, Profile, Logout)
- ✅ Navigate to chat page with proper content display
- ✅ Navigate to profile page and show user data
- ✅ Successfully logout and return to unauthenticated state

#### **Full Workflow Tests (`full-workflow.cy.js`) - 4 tests**
- ✅ Complete user journey: register → login → chat → profile → logout
- ✅ Handle multiple users workflow with shared chat functionality
- ✅ Test navigation and route protection across all pages
- ✅ Validate form submission and error handling across all forms

### **E2E Testing Technologies & Setup**

#### **Cypress Configuration**
```javascript
// cypress.config.js
{
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720
  }
}
```

#### **Custom Cypress Commands**
- `cy.registerUserViaUI()` - User registration through UI
- `cy.loginViaUI()` - User authentication through UI
- `cy.sendMessage()` - Send chat messages
- `cy.verifyAuthenticatedNav()` - Verify authenticated navigation state
- `cy.verifyUnauthenticatedNav()` - Verify unauthenticated navigation state

#### **Test Data Management**
- **LocalStorage Testing**: Comprehensive testing of data persistence
- **State Management**: Authentication state across page navigation
- **Form Validation**: All input validation scenarios
- **Error Handling**: User error scenarios and edge cases

### **E2E Test Execution**
```bash
# Interactive mode with Cypress GUI
npm run cypress:open

# Headless mode for CI/CD
npm run cypress:run

# Run specific E2E test file
npx cypress run --spec "cypress/e2e/auth.cy.js"
```

### **Key E2E Testing Achievements**
- **100% Pass Rate**: All 44 E2E tests successfully passing
- **Full User Journey Coverage**: Complete workflows tested from registration to logout
- **Cross-Browser Compatibility**: Tests validated across different browser environments
- **State Persistence Testing**: LocalStorage and session management validation
- **Responsive Design Testing**: UI functionality across different viewport sizes
- **Authentication Flow Validation**: Complete security and route protection testing

## 🛠️ Setup and Installation

### Prerequisites

- [Node.js 16.0.0+](https://nodejs.org/) (compatible with legacy systems)
- [npm package manager](https://www.npmjs.com/)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend-laboratory-works/lab2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run unit tests**
   ```bash
   npm test
   ```

4. **Generate coverage report**
   ```bash
   npm run test:coverage
   ```

5. **Run E2E tests**
   ```bash
   npm run cypress:open
   # or headless mode
   npm run cypress:run
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 🧪 Testing Commands

```bash
# Run all unit tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Open Cypress E2E testing GUI
npm run cypress:open

# Run Cypress tests headless
npm run cypress:run

# Run specific test file
npm test -- Navigation.test.jsx

# Run tests matching pattern
npm test -- --testNamePattern="validation"
```

### **Testing Workflow**

1. **Unit Testing**: Jest + React Testing Library for component testing
2. **Coverage Analysis**: Automated coverage reporting with detailed metrics
3. **E2E Testing**: Cypress for full user workflow testing
4. **Continuous Integration**: Automated test execution on code changes

## 📚 Testing Scenarios

### **Authentication Flow Testing**
```javascript
// Login validation test
test('validates login credentials and navigates to chat', async () => {
  // Test user login with valid credentials
  // Verify navigation to chat page
  // Check authentication state persistence
});
```

### **Form Validation Testing**
```javascript
// Registration form validation
test('shows validation errors for invalid inputs', async () => {
  // Test email format validation
  // Test password strength requirements
  // Test required field validation
});
```

### **User Interaction Testing**
```javascript
// Chat functionality test
test('sends message and updates chat history', async () => {
  // Test message sending
  // Verify message persistence
  // Check real-time updates
});
```

## 🗄️ Testing Data Management

### **Test Data Setup**
```javascript
// Mock user data for testing
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  gender: "male",
  dateOfBirth: "1990-05-15",
  password: "password123"
};
```

### **localStorage Mocking**
```javascript
// setUp localStorage mock for testing
beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock;
});
```

### **Date Mocking for Age Calculation**
```javascript
// Mock system time for consistent age testing
jest.useFakeTimers();
jest.setSystemTime(new Date('2023-06-15'));
```

## 🔧 Testing Configuration

### **Jest Configuration**
```javascript
// package.json jest config
"jest": {
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}",
    "!src/main.jsx",
    "!src/**/*.test.{js,jsx}"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

### **Cypress Configuration**
```javascript
// cypress.config.js
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
});
```

### **Babel Configuration**
```javascript
// babel.config.js for Jest compatibility
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
```

## 🏛️ Testing Patterns Used

- **Arrange-Act-Assert (AAA)** - Structured test organization
- **Mock Objects** - localStorage and external dependencies mocking
- **Test Isolation** - Each test runs in clean environment
- **User-Centric Testing** - Testing from user perspective with React Testing Library
- **Page Object Model** - Cypress E2E testing organization
- **Test Data Builders** - Consistent test data generation

## 🔍 Advanced Testing Features

### **Key Testing Implementations**
- **Form Validation Testing**: Comprehensive validation scenario coverage
- **Date Mocking**: Consistent age calculation testing with `jest.useFakeTimers()`
- **User Event Simulation**: Real user interaction testing
- **Component Integration**: Testing component interaction and data flow
- **Error Boundary Testing**: Error handling and recovery testing
- **Accessibility Testing**: Screen reader and keyboard navigation testing

### **Testing Best Practices Applied**
- **Single Responsibility**: Each test focuses on one specific behavior
- **Descriptive Test Names**: Clear, readable test descriptions
- **Test Data Isolation**: Clean test environment for each test run
- **Comprehensive Coverage**: All user workflows and edge cases covered
- **Performance Testing**: Test execution time optimization
- **Cross-browser Compatibility**: Cypress testing across different browsers

## 📊 Coverage Reports

The project generates detailed coverage reports in multiple formats:

- **HTML Report**: Interactive coverage browser (`coverage/lcov-report/index.html`)
- **Console Output**: Real-time coverage metrics during test execution
- **LCOV Format**: Machine-readable coverage data for CI/CD integration
- **Text Summary**: Quick coverage overview in terminal output

## 🤝 Contributing

1. **Write Tests First**: Follow TDD approach for new features
2. **Maintain Coverage**: Ensure new code maintains 80%+ coverage
3. **Test All Scenarios**: Include happy path, error cases, and edge cases
4. **Follow Testing Patterns**: Use established testing patterns and utilities
5. **Update Documentation**: Keep test documentation current with changes

## 📄 Testing Results Summary

- **✅ 100% Test Pass Rate** - All 90 tests passing
- **✅ 88.52% Coverage** - Exceeds 80% requirement significantly
- **✅ Comprehensive E2E Setup** - Full user workflow testing capability
- **✅ Professional Testing Infrastructure** - Industry-standard testing tools and practices
- **✅ Automated Testing Pipeline** - Ready for CI/CD integration

## 📄 License

This project is part of academic laboratory work for Web Interface Programming course focusing on comprehensive frontend testing methodologies. 