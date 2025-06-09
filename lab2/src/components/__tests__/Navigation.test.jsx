import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

// Helper function to render component with router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('Navigation Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    mockLogout.mockClear();
  });

  test('renders application title', () => {
    renderWithRouter(<Navigation user={null} logout={mockLogout} />);
    
    expect(screen.getByText('Simple Chat')).toBeInTheDocument();
  });

  test('renders About link', () => {
    renderWithRouter(<Navigation user={null} logout={mockLogout} />);
    
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about');
  });

  describe('when user is not logged in', () => {
    test('shows Login and Register links', () => {
      renderWithRouter(<Navigation user={null} logout={mockLogout} />);
      
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Register')).toBeInTheDocument();
      expect(screen.getByText('Login').closest('a')).toHaveAttribute('href', '/login');
      expect(screen.getByText('Register').closest('a')).toHaveAttribute('href', '/register');
    });

    test('does not show user-specific links', () => {
      renderWithRouter(<Navigation user={null} logout={mockLogout} />);
      
      expect(screen.queryByText('Chat')).not.toBeInTheDocument();
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    test('shows user-specific links', () => {
      renderWithRouter(<Navigation user={mockUser} logout={mockLogout} />);
      
      expect(screen.getByText('Chat')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Chat').closest('a')).toHaveAttribute('href', '/chat');
      expect(screen.getByText('Profile').closest('a')).toHaveAttribute('href', '/profile');
    });

    test('displays welcome message with user name', () => {
      renderWithRouter(<Navigation user={mockUser} logout={mockLogout} />);
      
      expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
    });

    test('shows logout button', () => {
      renderWithRouter(<Navigation user={mockUser} logout={mockLogout} />);
      
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    test('does not show Login and Register links', () => {
      renderWithRouter(<Navigation user={mockUser} logout={mockLogout} />);
      
      expect(screen.queryByText('Login')).not.toBeInTheDocument();
      expect(screen.queryByText('Register')).not.toBeInTheDocument();
    });

    test('calls logout function when logout button is clicked', () => {
      renderWithRouter(<Navigation user={mockUser} logout={mockLogout} />);
      
      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);
      
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  test('has proper CSS classes for styling', () => {
    renderWithRouter(<Navigation user={null} logout={mockLogout} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-blue-600', 'text-white', 'shadow-lg');
  });

  test('has responsive container', () => {
    renderWithRouter(<Navigation user={null} logout={mockLogout} />);
    
    const container = screen.getByRole('navigation').querySelector('.container');
    expect(container).toHaveClass('container', 'mx-auto', 'px-4');
  });
}); 