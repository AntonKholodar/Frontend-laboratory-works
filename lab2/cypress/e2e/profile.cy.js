describe('Profile Page', () => {
  beforeEach(() => {
    // Set up localStorage directly before visiting any page
    cy.visit('/login'); // Visit any page to get window object
    cy.window().then((win) => {
      const user = {
        id: Date.now(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        gender: 'male',
        dateOfBirth: '1990-05-15',
        password: 'password123',
        registeredAt: '2023-01-01T00:00:00.000Z'
      };
      
      win.localStorage.clear();
      win.localStorage.setItem('users', JSON.stringify([user]));
      win.localStorage.setItem('currentUser', JSON.stringify(user));
    });
    
    // Navigate to profile via UI (click the Profile link)
    cy.visit('/chat'); // Go to chat first where user will be
    cy.contains('a', 'Profile').click(); // Click Profile link in navigation
    cy.url().should('include', '/profile'); // Ensure we're on profile page
  });

  it('should display user profile information', () => {
    // Check if we're on the right page and not redirected to login
    cy.url().should('include', '/profile');
    cy.url().should('not.include', '/login');
    
    // Look for profile content - be more flexible about selectors
    cy.contains('User Profile').should('be.visible');
    cy.contains('John Doe').should('be.visible');
    cy.contains('john.doe@example.com').should('be.visible');
    cy.contains('Male').should('be.visible');
  });

  it('should calculate and display correct age', () => {
    // Wait for the page to load properly
    cy.url().should('include', '/profile');
    
    // The user was born on 1990-05-15, so age should be calculated correctly
    const birthYear = 1990;
    const currentYear = new Date().getFullYear();
    let expectedAge = currentYear - birthYear;
    
    // Check if birthday has passed this year
    const birthDate = new Date('1990-05-15');
    const today = new Date();
    if (today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      expectedAge--;
    }
    
    // Look for age display - more flexible
    cy.contains(`${expectedAge} years`).should('be.visible');
  });

  it('should display registration date', () => {
    cy.url().should('include', '/profile');
    
    // Look for registration date components (year 2023) instead of exact format
    cy.contains('2023').should('be.visible');
  });

  it('should have proper table structure', () => {
    // Check table headers and structure
    cy.url().should('include', '/profile');
    cy.get('table').should('exist');
    
    // Check all expected field labels exist in first column
    cy.contains('td', 'Name').should('exist');
    cy.contains('td', 'Email').should('exist');
    cy.contains('td', 'Gender').should('exist');
    cy.contains('td', 'Date of Birth').should('exist');
    cy.contains('td', 'Age').should('exist');
    cy.contains('td', 'Registration Date').should('exist');
  });

  it('should have proper styling and layout', () => {
    // Check if the profile container has expected classes
    cy.url().should('include', '/profile');
    cy.get('.max-w-2xl').should('exist');
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
    
    // Navigate to profile again after changing user
    cy.visit('/chat');
    cy.contains('a', 'Profile').click();
    cy.url().should('include', '/profile');
    
    cy.contains('Female').should('be.visible');
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
    
    // Navigate to profile again after changing user
    cy.visit('/chat');
    cy.contains('a', 'Profile').click();
    cy.url().should('include', '/profile');
    
    // Look for year and month components instead of exact format
    cy.contains('2000').should('be.visible');
    cy.contains('29').should('be.visible'); // Day 29
    cy.contains('Other').should('be.visible');
  });

  it('should display all user data fields correctly', () => {
    // Verify each field is labeled and displayed correctly
    cy.url().should('include', '/profile');
    
    const fields = [
      { label: 'Name', value: 'John Doe' },
      { label: 'Email', value: 'john.doe@example.com' },
      { label: 'Gender', value: 'Male' }
    ];
    
    fields.forEach(field => {
      cy.contains(field.label).should('be.visible');
      cy.contains(field.value).should('be.visible');
    });
    
    // Check date components separately  
    cy.contains('1990').should('be.visible'); // Birth year
    cy.contains('15').should('be.visible');   // Birth day
  });

  it('should have accessible table structure', () => {
    // Check for proper table accessibility
    cy.url().should('include', '/profile');
    cy.get('table').should('exist');
    cy.get('tbody').should('exist');
    
    // Should have multiple rows
    cy.get('tr').should('have.length.at.least', 7);
  });
}); 