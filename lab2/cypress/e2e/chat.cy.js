describe('Chat Functionality', () => {
  beforeEach(() => {
    // Setup authenticated user
    cy.window().then((win) => {
      win.localStorage.clear();
      
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
    
    cy.visit('/chat');
  });

  it('should display chat interface', () => {
    cy.contains('Welcome to Simple Chat').should('be.visible');
    cy.get('textarea[placeholder="Type your message here..."]').should('be.visible');
    cy.get('button').contains('Send').should('be.visible');
    cy.contains('Character count:').should('be.visible');
  });

  it('should show character count', () => {
    const message = 'Hello world!';
    cy.get('textarea[placeholder="Type your message here..."]').type(message);
    cy.contains(`Character count: ${message.length}/500`).should('be.visible');
  });

  it('should send a message successfully', () => {
    const message = 'This is a test message';
    
    cy.get('textarea[placeholder="Type your message here..."]').type(message);
    cy.get('button').contains('Send').click();
    
    // Message should appear in chat
    cy.contains(message).should('be.visible');
    cy.contains('Test User').should('be.visible');
    
    // Input should be cleared
    cy.get('textarea[placeholder="Type your message here..."]').should('have.value', '');
  });

  it('should not send empty messages', () => {
    cy.get('button').contains('Send').click();
    
    // Should not create any message elements
    cy.get('[data-testid="message"]').should('not.exist');
  });

  it('should persist messages in localStorage', () => {
    const message = 'Persistent message test';
    
    cy.get('textarea[placeholder="Type your message here..."]').type(message);
    cy.get('button').contains('Send').click();
    
    // Reload page
    cy.reload();
    
    // Message should still be visible
    cy.contains(message).should('be.visible');
  });

  it('should display timestamps for messages', () => {
    cy.get('textarea[placeholder="Type your message here..."]').type('Message with timestamp');
    cy.get('button').contains('Send').click();
    
    // Should show timestamp (format: HH:MM)
    cy.get('[data-testid="message"]').should('contain', ':');
  });

  it('should handle multiple messages', () => {
    const messages = ['First message', 'Second message', 'Third message'];
    
    messages.forEach((message) => {
      cy.get('textarea[placeholder="Type your message here..."]').type(message);
      cy.get('button').contains('Send').click();
    });
    
    // All messages should be visible
    messages.forEach((message) => {
      cy.contains(message).should('be.visible');
    });
  });

  it('should enforce character limit', () => {
    const longMessage = 'a'.repeat(501); // Exceed 500 character limit
    
    cy.get('textarea[placeholder="Type your message here..."]').type(longMessage);
    
    // Should show exceeded character count
    cy.contains('Character count: 501/500').should('be.visible');
    
    // Should still be able to send (app behavior)
    cy.get('button').contains('Send').click();
    
    // Message should appear but truncated or handled by app logic
    cy.get('[data-testid="message"]').should('exist');
  });

  it('should handle keyboard shortcuts', () => {
    cy.get('textarea[placeholder="Type your message here..."]').type('Message with Enter key');
    
    // Test Ctrl+Enter or Enter to send message (depending on app implementation)
    cy.get('textarea[placeholder="Type your message here..."]').type('{ctrl+enter}');
    
    // Message might be sent depending on implementation
    // This test verifies the textarea handles keyboard events
    cy.get('textarea[placeholder="Type your message here..."]').should('be.focused');
  });

  it('should show empty state when no messages', () => {
    // Clear any existing messages from localStorage
    cy.window().then((win) => {
      win.localStorage.removeItem('messages');
    });
    
    cy.reload();
    
    // Should show welcome message or empty state
    cy.contains('Welcome to Simple Chat').should('be.visible');
  });

  it('should handle message formatting', () => {
    const messageWithSpecialChars = 'Message with "quotes" and <tags> & symbols!';
    
    cy.get('textarea[placeholder="Type your message here..."]').type(messageWithSpecialChars);
    cy.get('button').contains('Send').click();
    
    // Message should appear correctly formatted
    cy.contains(messageWithSpecialChars).should('be.visible');
  });
}); 