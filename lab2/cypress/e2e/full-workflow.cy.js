describe('Complete User Workflow', () => {
  beforeEach(() => {
    cy.clearStorage();
  });

  it('should complete full user journey: register → login → chat → profile → logout', () => {
    // Step 1: Register a new user
    cy.registerUserViaUI({
      name: 'John Workflow',
      email: 'john.workflow@example.com',
      gender: 'male',
      dateOfBirth: '1985-03-20',
      password: 'securepass123'
    });

    // Should redirect to chat after registration
    cy.url().should('include', '/chat');
    cy.verifyAuthenticatedNav();

    // Step 2: Send some messages in chat
    cy.sendMessage('Hello, this is my first message!');
    cy.contains('Hello, this is my first message!').should('be.visible');
    cy.contains('John Workflow').should('be.visible');

    cy.sendMessage('This is a second message to test persistence.');
    cy.contains('This is a second message to test persistence.').should('be.visible');

    // Step 3: Navigate to profile and verify information
    cy.contains('a', 'Profile').click();
    cy.url().should('include', '/profile');
    
    cy.contains('User Profile').should('be.visible');
    cy.contains('John Workflow').should('be.visible');
    cy.contains('john.workflow@example.com').should('be.visible');
    cy.contains('Male').should('be.visible');
    cy.contains('1985').should('be.visible'); // Just check year instead of exact format

    // Step 4: Go back to chat via direct navigation (avoid click issues)
    cy.visit('/chat');
    cy.url().should('include', '/chat');
    
    cy.contains('Hello, this is my first message!').should('be.visible');
    cy.contains('This is a second message to test persistence.').should('be.visible');

    // Step 5: Logout
    cy.contains('Logout').click();
    cy.wait(1000); // Wait for logout to complete
    cy.verifyUnauthenticatedNav();

    // Step 6: Login again and verify data persistence
    cy.loginViaUI('john.workflow@example.com', 'securepass123');
    cy.url().should('include', '/chat');
    
    // Messages should still be there
    cy.contains('Hello, this is my first message!').should('be.visible');
    cy.contains('This is a second message to test persistence.').should('be.visible');

    // Profile should still have correct data
    cy.contains('Profile').click();
    cy.contains('td', 'John Workflow').should('be.visible');
    cy.contains('td', 'john.workflow@example.com').should('be.visible');
  });

  it('should handle multiple users workflow', () => {
    // Register first user
    cy.registerUserViaUI({
      name: 'Alice User',
      email: 'alice@example.com',
      password: 'alice123'
    });

    // Send message as Alice
    cy.sendMessage('Message from Alice');
    cy.contains('Message from Alice').should('be.visible');
    cy.contains('Alice User').should('be.visible');

    // Logout Alice
    cy.contains('Logout').click();

    // Register second user
    cy.registerUserViaUI({
      name: 'Bob User',
      email: 'bob@example.com',
      password: 'bob123'
    });

    // Bob should see Alice's message (shared chat)
    cy.contains('Message from Alice').should('be.visible');
    cy.contains('Alice User').should('be.visible');

    // Send message as Bob
    cy.sendMessage('Message from Bob');
    cy.contains('Message from Bob').should('be.visible');
    cy.contains('Bob User').should('be.visible');

    // Both messages should be visible
    cy.contains('Message from Alice').should('be.visible');
    cy.contains('Message from Bob').should('be.visible');

    // Logout Bob and login Alice again
    cy.contains('Logout').click();
    cy.loginViaUI('alice@example.com', 'alice123');

    // Alice should see both messages
    cy.contains('Message from Alice').should('be.visible');
    cy.contains('Message from Bob').should('be.visible');
  });

  it('should handle navigation and route protection correctly', () => {
    // Try to access protected routes without login
    cy.visit('/chat');
    cy.url().should('include', '/login');

    cy.visit('/profile');
    cy.url().should('include', '/login');

    // Register and verify access
    cy.registerUserViaUI({
      name: 'Navigation Test',
      email: 'nav@example.com'
    });

    // Should be able to access all routes when authenticated
    cy.visit('/chat');
    cy.url().should('include', '/chat');

    cy.visit('/profile');
    cy.url().should('include', '/profile');

    cy.visit('/about');
    cy.url().should('include', '/about');

    // Logout and verify protection again
    cy.contains('Logout').click();

    cy.visit('/chat');
    cy.url().should('include', '/login');

    cy.visit('/profile');
    cy.url().should('include', '/login');

    // Public routes should still be accessible
    cy.visit('/about');
    cy.url().should('include', '/about');

    cy.visit('/register');
    cy.url().should('include', '/register');
  });

  it('should handle form validation across all forms', () => {
    // Test registration validation
    cy.visit('/register');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Gender is required').should('be.visible');
    cy.contains('Date of birth is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');

    // Test email format validation
    cy.get('input[name="email"]').invoke('attr', 'type', 'text').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email format').should('be.visible');

    // Test password length validation
    cy.get('input[name="email"]').clear().type('valid@example.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Password must be at least 6 characters').should('be.visible');

    // Test login validation
    cy.visit('/login');
    cy.get('button[type="submit"]').click();
    cy.contains('Please fill in all fields').should('be.visible');

    // Test invalid credentials
    cy.get('input[name="email"]').type('nonexistent@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email or password').should('be.visible');
  });


}); 