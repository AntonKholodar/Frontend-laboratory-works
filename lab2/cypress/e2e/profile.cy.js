describe('Profile Page', () => {
  beforeEach(() => {
    // Setup authenticated user
    cy.window().then((win) => {
      win.localStorage.clear();
      
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        gender: 'male',
        dateOfBirth: '1990-05-15',
        password: 'password123',
        registeredAt: '2023-01-01T00:00:00.000Z'
      };
      
      win.localStorage.setItem('users', JSON.stringify([user]));
      win.localStorage.setItem('currentUser', JSON.stringify(user));
    });
    
    cy.visit('/profile');
  });

  it('should display user profile information', () => {
    cy.contains('User Profile').should('be.visible');
    
    // Check if user data is displayed in table format
    cy.contains('td', 'John Doe').should('be.visible');
    cy.contains('td', 'john.doe@example.com').should('be.visible');
    cy.contains('td', 'Male').should('be.visible');
    cy.contains('td', 'May 15, 1990').should('be.visible');
  });

  it('should calculate and display correct age', () => {
    // The user was born on 1990-05-15, so age should be calculated correctly
    const birthYear = 1990;
    const currentYear = new Date().getFullYear();
    const expectedAge = currentYear - birthYear;
    
    cy.contains('td', `${expectedAge} years old`).should('be.visible');
  });

  it('should display registration date', () => {
    cy.contains('td', 'January 1, 2023').should('be.visible');
  });

  it('should have proper table structure', () => {
    // Check table headers and structure
    cy.get('table').should('exist');
    cy.get('th').should('contain', 'Field');
    cy.get('th').should('contain', 'Value');
    
    // Check all expected rows exist
    cy.contains('tr', 'Name').should('exist');
    cy.contains('tr', 'Email').should('exist');
    cy.contains('tr', 'Gender').should('exist');
    cy.contains('tr', 'Date of Birth').should('exist');
    cy.contains('tr', 'Age').should('exist');
    cy.contains('tr', 'Registration Date').should('exist');
  });

  it('should have proper styling and layout', () => {
    // Check if the profile container has expected classes
    cy.get('.max-w-md').should('exist');
    cy.get('.bg-white').should('exist');
    cy.get('.rounded-lg').should('exist');
    cy.get('.shadow-md').should('exist');
    
    // Check table styling
    cy.get('table').should('have.class', 'w-full');
  });

  it('should handle different gender capitalizations', () => {
    // Test with female user
    cy.window().then((win) => {
      const femaleUser = {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        gender: 'female',
        dateOfBirth: '1992-08-20',
        password: 'password123',
        registeredAt: '2023-02-01T00:00:00.000Z'
      };
      
      win.localStorage.setItem('currentUser', JSON.stringify(femaleUser));
    });
    
    cy.reload();
    cy.contains('td', 'Female').should('be.visible');
  });

  it('should redirect to login if not authenticated', () => {
    cy.window().then((win) => {
      win.localStorage.removeItem('currentUser');
    });
    
    cy.reload();
    cy.url().should('include', '/login');
  });

  it('should handle edge case dates properly', () => {
    // Test with user born on leap year
    cy.window().then((win) => {
      const leapYearUser = {
        id: 3,
        name: 'Leap Year User',
        email: 'leap@example.com',
        gender: 'other',
        dateOfBirth: '2000-02-29',
        password: 'password123',
        registeredAt: '2023-03-01T00:00:00.000Z'
      };
      
      win.localStorage.setItem('currentUser', JSON.stringify(leapYearUser));
    });
    
    cy.reload();
    cy.contains('td', 'February 29, 2000').should('be.visible');
    cy.contains('td', 'Other').should('be.visible');
  });

  it('should display all user data fields correctly', () => {
    // Verify each field is labeled and displayed correctly
    const fields = [
      { label: 'Name', value: 'John Doe' },
      { label: 'Email', value: 'john.doe@example.com' },
      { label: 'Gender', value: 'Male' },
      { label: 'Date of Birth', value: 'May 15, 1990' },
      { label: 'Registration Date', value: 'January 1, 2023' }
    ];
    
    fields.forEach(field => {
      cy.contains('tr', field.label).within(() => {
        cy.contains('td', field.value).should('be.visible');
      });
    });
  });

  it('should have accessible table structure', () => {
    // Check for proper table accessibility
    cy.get('table').should('exist');
    cy.get('thead').should('exist');
    cy.get('tbody').should('exist');
    
    // Verify table headers
    cy.get('th').first().should('contain', 'Field');
    cy.get('th').last().should('contain', 'Value');
  });
}); 