describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  describe('Registration', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('should display registration form', () => {
      cy.contains('h1', 'Register').should('be.visible');
      cy.get('input[name="name"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('select[name="gender"]').should('be.visible');
      cy.get('input[name="dateOfBirth"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Register');
    });

    it('should show validation errors for empty fields', () => {
      cy.get('button[type="submit"]').click();
      
      cy.contains('Name is required').should('be.visible');
      cy.contains('Email is required').should('be.visible');
      cy.contains('Gender is required').should('be.visible');
      cy.contains('Date of birth is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('should validate email format', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').invoke('attr', 'type', 'text').clear().type('invalid-email-without-at');
      cy.get('select[name="gender"]').select('male');
      cy.get('input[name="dateOfBirth"]').type('1990-01-01');
      cy.get('input[name="password"]').type('password123');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Invalid email format').should('be.visible');
    });

    it('should validate password length', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('select[name="gender"]').select('male');
      cy.get('input[name="dateOfBirth"]').type('1990-01-01');
      cy.get('input[name="password"]').type('123');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Password must be at least 6 characters').should('be.visible');
    });

    it('should successfully register a new user', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('select[name="gender"]').select('male');
      cy.get('input[name="dateOfBirth"]').type('1990-01-01');
      cy.get('input[name="password"]').type('password123');
      
      cy.get('button[type="submit"]').click();
      
      // Should redirect to chat page
      cy.url().should('include', '/chat');
      cy.contains('Simple Chat Room').should('be.visible');
    });

    it('should prevent duplicate email registration', () => {
      // First registration
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('select[name="gender"]').select('male');
      cy.get('input[name="dateOfBirth"]').type('1990-01-01');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      
      // Wait for redirect and clear user session
      cy.url().should('include', '/chat');
      cy.window().then((win) => {
        win.localStorage.removeItem('currentUser');
      });
      
      // Navigate back to register
      cy.visit('/register');
      
      // Try to register with same email
      cy.get('input[name="name"]').type('Jane Doe');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('select[name="gender"]').select('female');
      cy.get('input[name="dateOfBirth"]').type('1992-01-01');
      cy.get('input[name="password"]').type('password456');
      cy.get('button[type="submit"]').click();
      
      cy.contains('User with this email already exists').should('be.visible');
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      // Create a test user first
      cy.window().then((win) => {
        const users = [{
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          gender: 'male',
          dateOfBirth: '1990-01-01',
          password: 'password123',
          registeredAt: new Date().toISOString()
        }];
        win.localStorage.setItem('users', JSON.stringify(users));
      });
      
      cy.visit('/login');
    });

    it('should display login form', () => {
      cy.contains('h1', 'Login').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Login');
    });

    it('should show error for empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Please fill in all fields').should('be.visible');
    });

    it('should show error for invalid credentials', () => {
      cy.get('input[name="email"]').type('wrong@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Invalid email or password').should('be.visible');
    });

    it('should successfully login with valid credentials', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      
      // Should redirect to chat page
      cy.url().should('include', '/chat');
      cy.contains('Simple Chat Room').should('be.visible');
    });
  });
}); 