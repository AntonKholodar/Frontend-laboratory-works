import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper function to render component with router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('Register Component', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
    mockNavigate.mockClear();
    localStorage.clear();
    jest.clearAllMocks();
  });

    test('renders registration form correctly', () => {
    renderWithRouter(<Register onLogin={mockOnLogin} />);

    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  test('renders login link', () => {
    renderWithRouter(<Register onLogin={mockOnLogin} />);
    
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Login here')).toBeInTheDocument();
    expect(screen.getByText('Login here').closest('a')).toHaveAttribute('href', '/login');
  });

  test('updates form data when user types', () => {
    renderWithRouter(<Register onLogin={mockOnLogin} />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('updates gender selection', () => {
    renderWithRouter(<Register onLogin={mockOnLogin} />);
    
    const genderSelect = screen.getByLabelText('Gender');
    fireEvent.change(genderSelect, { target: { value: 'male' } });
    
    expect(genderSelect.value).toBe('male');
  });

  test('updates date of birth', () => {
    renderWithRouter(<Register onLogin={mockOnLogin} />);
    
    const dateInput = screen.getByLabelText('Date of Birth');
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } });
    
    expect(dateInput.value).toBe('1990-01-01');
  });

  describe('form validation', () => {
    test('shows error when name is missing', async () => {
      renderWithRouter(<Register onLogin={mockOnLogin} />);
      
      const submitButton = screen.getByRole('button', { name: 'Register' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
    });

    test('shows error when email is missing', async () => {
      renderWithRouter(<Register onLogin={mockOnLogin} />);
      
      const nameInput = screen.getByLabelText('Name');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      
      const submitButton = screen.getByRole('button', { name: 'Register' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    test('shows error for invalid email format', async () => {
      renderWithRouter(<Register onLogin={mockOnLogin} />);
      
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const genderSelect = screen.getByLabelText('Gender');
      const dateInput = screen.getByLabelText('Date of Birth');
      
      // Fill all required fields except use invalid email
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'invalid.email' } }); // Use period instead of missing @
      fireEvent.change(genderSelect, { target: { value: 'male' } });
      fireEvent.change(dateInput, { target: { value: '1990-01-01' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      const submitButton = screen.getByRole('button', { name: 'Register' });
      
      // Submit the form directly to bypass HTML5 validation
      const form = submitButton.closest('form');
      fireEvent.submit(form);
      
      await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      });
    });

    test('shows error when gender is missing', async () => {
      renderWithRouter(<Register onLogin={mockOnLogin} />);
      
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      
      const submitButton = screen.getByRole('button', { name: 'Register' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Gender is required')).toBeInTheDocument();
      });
    });

    test('shows error when date of birth is missing', async () => {
      renderWithRouter(<Register onLogin={mockOnLogin} />);
      
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const genderSelect = screen.getByLabelText('Gender');
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(genderSelect, { target: { value: 'male' } });
      
      const submitButton = screen.getByRole('button', { name: 'Register' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Date of birth is required')).toBeInTheDocument();
      });
    });

    test('shows error when password is missing', async () => {
      renderWithRouter(<Register onLogin={mockOnLogin} />);
      
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const genderSelect = screen.getByLabelText('Gender');
      const dateInput = screen.getByLabelText('Date of Birth');
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(genderSelect, { target: { value: 'male' } });
      fireEvent.change(dateInput, { target: { value: '1990-01-01' } });
      
      const submitButton = screen.getByRole('button', { name: 'Register' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    test('shows error when password is too short', async () => {
      renderWithRouter(<Register onLogin={mockOnLogin} />);
      
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const genderSelect = screen.getByLabelText('Gender');
      const dateInput = screen.getByLabelText('Date of Birth');
      const passwordInput = screen.getByLabelText('Password');
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(genderSelect, { target: { value: 'male' } });
      fireEvent.change(dateInput, { target: { value: '1990-01-01' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });
      
      const submitButton = screen.getByRole('button', { name: 'Register' });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
      });
    });
  });

  test('shows error when user with email already exists', async () => {
    // Setup existing user in localStorage
    const existingUsers = [
      { email: 'john@example.com', name: 'Existing John' }
    ];
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    renderWithRouter(<Register onLogin={mockOnLogin} />);
    
    // Fill form with existing email
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New John' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('User with this email already exists')).toBeInTheDocument();
    });
  });

  test('successfully registers new user', async () => {
    renderWithRouter(<Register onLogin={mockOnLogin} />);
    
    // Fill form with valid data
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/chat');
    });
    
    // Check localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject({
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'male',
      dateOfBirth: '1990-01-01',
      password: 'password123'
    });
  });

  test('has proper input types and names', () => {
    renderWithRouter(<Register onLogin={mockOnLogin} />);
    
    expect(screen.getByLabelText('Name')).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Name')).toHaveAttribute('name', 'name');
    
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Email')).toHaveAttribute('name', 'email');
    
    expect(screen.getByLabelText('Date of Birth')).toHaveAttribute('type', 'date');
    expect(screen.getByLabelText('Date of Birth')).toHaveAttribute('name', 'dateOfBirth');
    
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText('Password')).toHaveAttribute('name', 'password');
  });

  test('has gender options', () => {
    renderWithRouter(<Register onLogin={mockOnLogin} />);
    
    const genderSelect = screen.getByLabelText('Gender');
    const options = Array.from(genderSelect.options).map(option => option.value);
    
    expect(options).toEqual(['', 'male', 'female', 'other']);
  });
}); 