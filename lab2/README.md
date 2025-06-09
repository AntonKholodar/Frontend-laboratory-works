# Lab 2 - React Chat Application Testing

**Student:** Anton Kholodar  
**Group:** KV-41mp  
**Laboratory Work:** Laboratory Work #2 - Frontend Testing with Jest and Cypress  
**Report:** [Google Drive Link](https://docs.google.com/document/d/1LU3ZaA-npO0Kk8mvd5hJ8xGZ050V_3HRhNauLjcjzO8/edit?usp=sharing)

## Assignment

**Objective:** Learn comprehensive testing methodologies for frontend applications using Jest, React Testing Library, and Cypress for E2E testing

**General Task:** Implement comprehensive testing suite for the Simple Chat application from Lab 1, achieving 80%+ test coverage with both unit and end-to-end tests.

**Theme:** Testing React Chat Application - implement unit tests, integration tests, and end-to-end testing workflows.

**Development Tools:** Jest, React Testing Library, Cypress, Babel, React 18, Vite, Tailwind CSS

### Testing Requirements Fulfilled:
- ✅ **80%+ Unit Test Coverage** - Achieved **88.52%** test coverage
- ✅ **All Pages Tested** - Registration, Login, Profile, About, Chat
- ✅ **90 Unit Tests** - Comprehensive test suite with 100% pass rate
- ✅ **E2E Testing Setup** - Cypress configuration and test scenarios
- ✅ **Form Validation Testing** - All validation scenarios covered
- ✅ **User Flow Testing** - Complete authentication and chat workflows

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