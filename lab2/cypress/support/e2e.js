// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Disable Cypress's default behavior of failing tests on uncaught exceptions
// This is useful for applications that might have non-critical errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // Only do this for specific errors you expect and want to ignore
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  
  // Let other errors fail the test
  return true;
});

// Add custom configuration
beforeEach(() => {
  // Set viewport size for consistent testing
  cy.viewport(1280, 720);
  
  // Ensure localStorage is available
  cy.window().should('have.property', 'localStorage');
}); 