import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chat from '../Chat';

describe('Chat Component', () => {
  const mockUser = {
    id: 123,
    name: 'John Doe',
    email: 'john@example.com'
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders chat interface correctly', () => {
    render(<Chat user={mockUser} />);
    
    expect(screen.getByText('Simple Chat Room')).toBeInTheDocument();
    expect(screen.getByText(/0 message.*Active user: John Doe/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  test('shows empty state when no messages', () => {
    render(<Chat user={mockUser} />);
    
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
    expect(screen.getByText('Start the conversation by sending a message!')).toBeInTheDocument();
  });

  test('loads existing messages from localStorage', () => {
    const existingMessages = [
      {
        id: 1,
        text: 'Hello world',
        userId: 123,
        userName: 'John Doe',
        timestamp: '2023-01-01T10:00:00.000Z'
      }
    ];
    localStorage.setItem('chatMessages', JSON.stringify(existingMessages));
    
    render(<Chat user={mockUser} />);
    
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(screen.getByText(/1 message.*Active user: John Doe/)).toBeInTheDocument();
  });

  test('updates message input when user types', () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'Test message' } });
    
    expect(input.value).toBe('Test message');
  });

  test('shows character count', () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    expect(screen.getByText('5/500')).toBeInTheDocument();
  });

  test('disables send button when message is empty', () => {
    render(<Chat user={mockUser} />);
    
    const sendButton = screen.getByText('Send');
    expect(sendButton).toBeDisabled();
  });

  test('enables send button when message is not empty', () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    expect(sendButton).not.toBeDisabled();
  });

  test('sends message when form is submitted', async () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  test('clears input after sending message', async () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  test('saves message to localStorage', async () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
      expect(savedMessages).toHaveLength(1);
      expect(savedMessages[0].text).toBe('Test message');
      expect(savedMessages[0].userId).toBe(123);
      expect(savedMessages[0].userName).toBe('John Doe');
    });
  });

  test('does not send empty or whitespace-only messages', () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    // Try sending empty message
    fireEvent.click(sendButton);
    expect(screen.getByText(/0 message.*Active user: John Doe/)).toBeInTheDocument();
    
    // Try sending whitespace-only message
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(sendButton);
    expect(screen.getByText(/0 message.*Active user: John Doe/)).toBeInTheDocument();
  });

  test('trims whitespace from messages', async () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: '  Test message  ' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  test('displays own messages on the right', async () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'My message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      const messageElement = screen.getByText('My message').closest('div').parentElement;
      expect(messageElement).toHaveClass('justify-end');
    });
  });

  test('displays other users messages on the left', () => {
    const otherUserMessage = [
      {
        id: 1,
        text: 'Other user message',
        userId: 456,
        userName: 'Jane Doe',
        timestamp: '2023-01-01T10:00:00.000Z'
      }
    ];
    localStorage.setItem('chatMessages', JSON.stringify(otherUserMessage));
    
    render(<Chat user={mockUser} />);
    
    const messageElement = screen.getByText('Other user message').closest('div').parentElement;
    expect(messageElement).toHaveClass('justify-start');
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('does not show username for own messages', async () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'My message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('My message')).toBeInTheDocument();
      // Should not show the username "John Doe" as a separate element for own messages
      const johnDoeElements = screen.getAllByText(/John Doe/);
      // Only should appear in the header
      expect(johnDoeElements).toHaveLength(1);
    });
  });

  test('shows username for other users messages', () => {
    const otherUserMessage = [
      {
        id: 1,
        text: 'Other message',
        userId: 456,
        userName: 'Jane Doe',
        timestamp: '2023-01-01T10:00:00.000Z'
      }
    ];
    localStorage.setItem('chatMessages', JSON.stringify(otherUserMessage));
    
    render(<Chat user={mockUser} />);
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('updates message count in header', async () => {
    render(<Chat user={mockUser} />);
    
    expect(screen.getByText(/0 message.*Active user: John Doe/)).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'First message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText(/1 message.*Active user: John Doe/)).toBeInTheDocument();
    });
    
    fireEvent.change(input, { target: { value: 'Second message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText(/2 messages.*Active user: John Doe/)).toBeInTheDocument();
    });
  });

  test('handles enter key submission', async () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  test('shows storage info', () => {
    render(<Chat user={mockUser} />);
    
    expect(screen.getByText('Messages are saved locally in your browser')).toBeInTheDocument();
  });

  test('enforces message length limit', () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    expect(input).toHaveAttribute('maxLength', '500');
  });

  test('formats time correctly', () => {
    // Mock date for consistent testing
    const mockDate = new Date('2023-01-01T14:30:00.000Z');
    jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue('2:30 PM');
    
    const message = [
      {
        id: 1,
        text: 'Test message',
        userId: 123,
        userName: 'John Doe',
        timestamp: '2023-01-01T14:30:00.000Z'
      }
    ];
    localStorage.setItem('chatMessages', JSON.stringify(message));
    
    render(<Chat user={mockUser} />);
    
    expect(screen.getByText('2:30 PM')).toBeInTheDocument();
    
    jest.restoreAllMocks();
  });

  test('handles multiple messages correctly', async () => {
    render(<Chat user={mockUser} />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');
    
    // Send first message
    fireEvent.change(input, { target: { value: 'First message' } });
    fireEvent.click(sendButton);
    
    // Send second message
    await waitFor(() => {
      fireEvent.change(input, { target: { value: 'Second message' } });
      fireEvent.click(sendButton);
    });
    
    await waitFor(() => {
      expect(screen.getByText('First message')).toBeInTheDocument();
      expect(screen.getByText('Second message')).toBeInTheDocument();
    });
  });
}); 