describe('Navigation', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  describe('Unauthenticated User', () => {
    it('should show login and register links', () => {
      cy.visit('/');
      
      cy.get('nav').should('contain', 'Simple Chat App');
      cy.get('nav').should('contain', 'Login');
      cy.get('nav').should('contain', 'Register');
      cy.get('nav').should('contain', 'About');
      cy.get('nav').should('not.contain', 'Chat');
      cy.get('nav').should('not.contain', 'Profile');
      cy.get('nav').should('not.contain', 'Logout');
    });

    it('should navigate to login page', () => {
      cy.visit('/');
      cy.contains('Login').click();
      cy.url().should('include', '/login');
      cy.contains('h1', 'Login').should('be.visible');
    });

    it('should navigate to register page', () => {
      cy.visit('/');
      cy.contains('Register').click();
      cy.url().should('include', '/register');
      cy.contains('h1', 'Register').should('be.visible');
    });

    it('should navigate to about page', () => {
      cy.visit('/');
      cy.contains('About').click();
      cy.url().should('include', '/about');
      cy.contains('About Simple Chat App').should('be.visible');
    });

    it('should redirect to login when accessing protected routes', () => {
      cy.visit('/chat');
      cy.url().should('include', '/login');
      
      cy.visit('/profile');
      cy.url().should('include', '/login');
    });
  });

  describe('Authenticated User', () => {
    beforeEach(() => {
      // Create and login a user
      cy.window().then((win) => {
        const user = {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          gender: 'male',
          dateOfBirth: '1990-01-01',
          password: 'password123',
          registeredAt: new Date().toISOString()
        };
        
        win.localStorage.setItem('users', JSON.stringify([user]));
        win.localStorage.setItem('currentUser', JSON.stringify(user));
      });
    });

    it('should show authenticated navigation menu', () => {
      cy.visit('/');
      
      cy.get('nav').should('contain', 'Simple Chat App');
      cy.get('nav').should('contain', 'Chat');
      cy.get('nav').should('contain', 'Profile');
      cy.get('nav').should('contain', 'About');
      cy.get('nav').should('contain', 'Logout');
      cy.get('nav').should('not.contain', 'Login');
      cy.get('nav').should('not.contain', 'Register');
    });

    it('should navigate to chat page', () => {
      cy.visit('/');
      cy.contains('Chat').click();
      cy.url().should('include', '/chat');
      cy.contains('Welcome to Simple Chat').should('be.visible');
    });

    it('should navigate to profile page', () => {
      cy.visit('/');
      cy.contains('Profile').click();
      cy.url().should('include', '/profile');
      cy.contains('User Profile').should('be.visible');
    });

    it('should logout successfully', () => {
      cy.visit('/');
      cy.contains('Logout').click();
      
      // Should redirect to home and show unauthenticated nav
      cy.url().should('not.include', '/chat');
      cy.get('nav').should('contain', 'Login');
      cy.get('nav').should('contain', 'Register');
      cy.get('nav').should('not.contain', 'Logout');
    });
  });
}); 