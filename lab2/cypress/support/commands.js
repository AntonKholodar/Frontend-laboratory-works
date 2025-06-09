// Custom Cypress commands for the chat application

// Command to create and login a user
Cypress.Commands.add('loginUser', (userData = {}) => {
  const defaultUser = {
    id: Date.now(),
    name: 'Test User',
    email: 'test@example.com',
    gender: 'male',
    dateOfBirth: '1990-01-01',
    password: 'password123',
    registeredAt: new Date().toISOString(),
    ...userData
  };

  cy.window().then((win) => {
    const users = JSON.parse(win.localStorage.getItem('users') || '[]');
    if (!users.find(u => u.email === defaultUser.email)) {
      users.push(defaultUser);
      win.localStorage.setItem('users', JSON.stringify(users));
    }
    win.localStorage.setItem('currentUser', JSON.stringify(defaultUser));
  });
});

// Command to logout user
Cypress.Commands.add('logoutUser', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('currentUser');
  });
});

// Command to clear all storage
Cypress.Commands.add('clearStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

// Command to register a new user via UI
Cypress.Commands.add('registerUserViaUI', (userData) => {
  const user = {
    name: 'Test User',
    email: 'test@example.com',
    gender: 'male',
    dateOfBirth: '1990-01-01',
    password: 'password123',
    ...userData
  };

  cy.visit('/register');
  cy.get('input[name="name"]').type(user.name);
  cy.get('input[name="email"]').type(user.email);
  cy.get('select[name="gender"]').select(user.gender);
  cy.get('input[name="dateOfBirth"]').type(user.dateOfBirth);
  cy.get('input[name="password"]').type(user.password);
  cy.get('button[type="submit"]').click();
});

// Command to login via UI
Cypress.Commands.add('loginViaUI', (email = 'test@example.com', password = 'password123') => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Command to send a chat message
Cypress.Commands.add('sendMessage', (message) => {
  cy.get('textarea[placeholder="Type your message here..."]').type(message);
  cy.get('button').contains('Send').click();
});

// Command to verify navigation state
Cypress.Commands.add('verifyAuthenticatedNav', () => {
  cy.get('nav').should('contain', 'Chat');
  cy.get('nav').should('contain', 'Profile');
  cy.get('nav').should('contain', 'Logout');
  cy.get('nav').should('not.contain', 'Login');
  cy.get('nav').should('not.contain', 'Register');
});

Cypress.Commands.add('verifyUnauthenticatedNav', () => {
  cy.get('nav').should('contain', 'Login');
  cy.get('nav').should('contain', 'Register');
  cy.get('nav').should('not.contain', 'Chat');
  cy.get('nav').should('not.contain', 'Profile');
  cy.get('nav').should('not.contain', 'Logout');
}); 