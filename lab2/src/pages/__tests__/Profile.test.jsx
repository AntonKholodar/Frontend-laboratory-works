import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../Profile';

describe('Profile Component', () => {
  const mockUser = {
    id: 123,
    name: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'male',
    dateOfBirth: '1990-05-15',
    registeredAt: '2023-01-15T10:30:00.000Z'
  };

  test('renders user profile correctly', () => {
    render(<Profile user={mockUser} />);
    
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument(); // Should be capitalized
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  test('returns null when user is not provided', () => {
    const { container } = render(<Profile user={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('returns null when user is undefined', () => {
    const { container } = render(<Profile user={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  test('displays all profile fields', () => {
    render(<Profile user={mockUser} />);
    
    // Check all table headers are present
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('User ID')).toBeInTheDocument();
    expect(screen.getByText('Registration Date')).toBeInTheDocument();
  });

  test('capitalizes gender display', () => {
    const userWithLowercaseGender = {
      ...mockUser,
      gender: 'female'
    };
    
    render(<Profile user={userWithLowercaseGender} />);
    expect(screen.getByText('Female')).toBeInTheDocument();
  });

  test('formats dates correctly', () => {
    render(<Profile user={mockUser} />);
    
    // The exact format depends on locale, but we can check that dates are displayed
    const dateElements = screen.getAllByText(/\d{1,2}\.\d{1,2}\.\d{4}/);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  test('calculates age correctly', () => {
    // Mock current date to be 2023-06-15 (after birthday)
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-06-15'));
    
    render(<Profile user={mockUser} />);

    expect(screen.getByText(/33.*years/)).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('calculates age correctly when birthday has not occurred this year', () => {
    // Mock current date to be 2023-04-15 (before birthday)
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-04-15'));
    
    render(<Profile user={mockUser} />);
    
    expect(screen.getByText(/32.*years/)).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('displays information note', () => {
    render(<Profile user={mockUser} />);
    
    expect(screen.getByText('Profile information is stored locally in your browser')).toBeInTheDocument();
  });

  test('has proper table structure', () => {
    render(<Profile user={mockUser} />);
    
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(7); // 7 data rows
  });

  test('displays user data in table cells', () => {
    render(<Profile user={mockUser} />);
    
    // Check that user data is in table cells
    const cells = screen.getAllByRole('cell');
    const cellTexts = cells.map(cell => cell.textContent);
    
    expect(cellTexts).toContain('John Doe');
    expect(cellTexts).toContain('john.doe@example.com');
    expect(cellTexts).toContain('Male');
    expect(cellTexts).toContain('123');
  });

  test('handles different gender values', () => {
    const userWithOtherGender = {
      ...mockUser,
      gender: 'other'
    };
    
    render(<Profile user={userWithOtherGender} />);
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  test('handles edge case for age calculation on exact birthday', () => {
    // Create a user born on 1990-05-15
    const userBornOnDate = {
      ...mockUser,
      dateOfBirth: '1990-05-15'
    };
    
    // Mock current date to be exactly the birthday
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-05-15'));
    
    render(<Profile user={userBornOnDate} />);

    expect(screen.getByText(/33.*years/)).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  test('handles different date formats', () => {
    const userWithDifferentDate = {
      ...mockUser,
      dateOfBirth: '1990-12-31',
      registeredAt: '2022-12-25T15:45:30.000Z'
    };
    
    render(<Profile user={userWithDifferentDate} />);
    
    // Should render without errors
    expect(screen.getByText('User Profile')).toBeInTheDocument();
  });

  test('has proper CSS classes for styling', () => {
    render(<Profile user={mockUser} />);
    
    const container = screen.getByText('User Profile').closest('div');
    expect(container).toHaveClass('max-w-2xl', 'mx-auto', 'bg-white', 'rounded-lg', 'shadow-md', 'p-6');
  });
}); 