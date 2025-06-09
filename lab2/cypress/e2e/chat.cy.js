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
    cy.contains('Simple Chat Room').should('be.visible');
    cy.get('input[placeholder="Type your message..."]').should('be.visible');
    cy.get('button').contains('Send').should('be.visible');
    cy.contains('/500').should('be.visible');
  });

  it('should show character count', () => {
    const message = 'Hello world!';
    cy.get('input[placeholder="Type your message..."]').type(message);
    cy.contains(`${message.length}/500`).should('be.visible');
  });

  it('should send a message successfully', () => {
    const message = 'This is a test message';
    
    cy.get('input[placeholder="Type your message..."]').type(message);
    cy.get('button').contains('Send').click();
    
    // Message should appear in chat
    cy.contains(message).should('be.visible');
    
    // Input should be cleared
    cy.get('input[placeholder="Type your message..."]').should('have.value', '');
  });

  it('should not send empty messages', () => {
    // Button should be disabled when input is empty
    cy.get('button').contains('Send').should('be.disabled');
    
    // Should show empty state
    cy.contains('No messages yet').should('be.visible');
  });

  it('should persist messages in localStorage', () => {
    const message = 'Persistent message test';
    
    cy.get('input[placeholder="Type your message..."]').type(message);
    cy.get('button').contains('Send').click();
    
    // Reload page and restore user session
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
      win.localStorage.setItem('currentUser', JSON.stringify(user));
    });
    
    cy.reload();
    
    // Message should still be visible
    cy.contains(message).should('be.visible');
  });

  it('should display timestamps for messages', () => {
    cy.get('input[placeholder="Type your message..."]').type('Message with timestamp');
    cy.get('button').contains('Send').click();
    
    // Should show timestamp (format: HH:MM)
    cy.contains('Message with timestamp').parent().should('contain', ':');
  });

  it('should handle multiple messages', () => {
    const messages = ['First message', 'Second message', 'Third message'];
    
    messages.forEach((message) => {
      cy.get('input[placeholder="Type your message..."]').type(message);
      cy.get('button').contains('Send').click();
    });
    
    // All messages should be visible
    messages.forEach((message) => {
      cy.contains(message).should('be.visible');
    });
  });

  it('should enforce character limit', () => {
    const longMessage = 'a'.repeat(500); // Max 500 characters
    
    cy.get('input[placeholder="Type your message..."]').type(longMessage);
    
    // Should show character count at limit
    cy.contains('500/500').should('be.visible');
    
    // Try to type one more character - input should prevent it or truncate
    cy.get('input[placeholder="Type your message..."]').type('x');
    
    // Should still be at or near 500 characters
    cy.get('input[placeholder="Type your message..."]').should('have.value', longMessage);
  });

  it('should handle keyboard shortcuts', () => {
    cy.get('input[placeholder="Type your message..."]').type('Message with Enter key');
    
    // Test Enter to send message
    cy.get('input[placeholder="Type your message..."]').type('{enter}');
    
    // Message should be sent
    cy.contains('Message with Enter key').should('be.visible');
  });

  it('should show empty state when no messages', () => {
    // Clear any existing messages from localStorage
    cy.window().then((win) => {
      win.localStorage.removeItem('chatMessages');
    });
    
    cy.reload();
    
    // Should show empty state
    cy.contains('No messages yet').should('be.visible');
    cy.contains('Start the conversation').should('be.visible');
  });

  it('should handle message formatting', () => {
    const messageWithSpecialChars = 'Message with "quotes" and <tags> & symbols!';
    
    cy.get('input[placeholder="Type your message..."]').type(messageWithSpecialChars);
    cy.get('button').contains('Send').click();
    
    // Message should appear correctly formatted
    cy.contains(messageWithSpecialChars).should('be.visible');
  });
}); 