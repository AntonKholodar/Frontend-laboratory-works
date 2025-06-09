import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About Component', () => {
  test('renders page title and logo', () => {
    render(<About />);
    
    expect(screen.getByText('Simple Chat')).toBeInTheDocument();
    expect(screen.getByText('SC')).toBeInTheDocument(); // Logo initials
  });

  test('displays welcome message and description', () => {
    render(<About />);
    
    expect(screen.getByText('Welcome to Simple Chat - a modern web application for real-time communication.')).toBeInTheDocument();
    expect(screen.getByText(/Simple Chat allows users to register/)).toBeInTheDocument();
  });

  test('displays features section', () => {
    render(<About />);
    
    expect(screen.getByText('Features')).toBeInTheDocument();
    
    // Check all features are listed
    expect(screen.getByText('User registration and authentication')).toBeInTheDocument();
    expect(screen.getByText('Real-time messaging interface')).toBeInTheDocument();
    expect(screen.getByText('User profile management')).toBeInTheDocument();
    expect(screen.getByText('Responsive design for all devices')).toBeInTheDocument();
    expect(screen.getByText('Local data storage')).toBeInTheDocument();
  });

  test('displays technology stack section', () => {
    render(<About />);
    
    expect(screen.getByText('Technology Stack')).toBeInTheDocument();
    
    // Check all technologies are listed
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('React Router')).toBeInTheDocument();
  });

  test('displays course information', () => {
    render(<About />);
    
    expect(screen.getByText(/Laboratory Work #1.*Web Interface Programming/)).toBeInTheDocument();
    expect(screen.getByText(/Built as part of the Frontend development course/)).toBeInTheDocument();
  });

  test('has proper structure and styling', () => {
    render(<About />);
    
    // Check main container
    const mainContainer = screen.getByText('Simple Chat').closest('div').parentElement;
    expect(mainContainer).toHaveClass('max-w-2xl', 'mx-auto', 'bg-white', 'rounded-lg', 'shadow-md', 'p-8', 'text-center');
  });

  test('has proper logo styling', () => {
    render(<About />);
    
    const logo = screen.getByText('SC');
    expect(logo).toHaveClass('w-24', 'h-24', 'mx-auto', 'bg-blue-600', 'rounded-full', 'flex', 'items-center', 'justify-center', 'text-white', 'text-4xl', 'font-bold');
  });

  test('features list has bullet points', () => {
    render(<About />);
    
    // Check that features are in a list structure
    const featuresSection = screen.getByText('Features').nextElementSibling;
    expect(featuresSection.tagName.toLowerCase()).toBe('ul');
    
    // Check for bullet point styling
    const listItems = featuresSection.querySelectorAll('li');
    expect(listItems).toHaveLength(5);
    
    // Each list item should have a bullet point
    listItems.forEach(item => {
      const bullet = item.querySelector('span');
      expect(bullet).toHaveClass('w-2', 'h-2', 'bg-blue-600', 'rounded-full');
    });
  });

  test('technology tags have proper styling', () => {
    render(<About />);
    
    const reactTag = screen.getByText('React');
    expect(reactTag).toHaveClass('bg-blue-100', 'text-blue-800', 'px-3', 'py-1', 'rounded-full', 'text-sm');
    
    const nodeTag = screen.getByText('Node.js');
    expect(nodeTag).toHaveClass('bg-green-100', 'text-green-800', 'px-3', 'py-1', 'rounded-full', 'text-sm');
    
    const viteTag = screen.getByText('Vite');
    expect(viteTag).toHaveClass('bg-purple-100', 'text-purple-800', 'px-3', 'py-1', 'rounded-full', 'text-sm');
    
    const tailwindTag = screen.getByText('Tailwind CSS');
    expect(tailwindTag).toHaveClass('bg-cyan-100', 'text-cyan-800', 'px-3', 'py-1', 'rounded-full', 'text-sm');
    
    const routerTag = screen.getByText('React Router');
    expect(routerTag).toHaveClass('bg-orange-100', 'text-orange-800', 'px-3', 'py-1', 'rounded-full', 'text-sm');
  });

  test('sections are properly spaced', () => {
    render(<About />);
    
    // Check that the content has proper spacing classes
    const contentDiv = screen.getByText('Welcome to Simple Chat - a modern web application for real-time communication.').closest('div');
    expect(contentDiv).toHaveClass('space-y-4', 'text-gray-700');
  });

  test('renders all headings with correct hierarchy', () => {
    render(<About />);
    
    // Main heading
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Simple Chat');
    
    // Section headings
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(sectionHeadings).toHaveLength(2);
    expect(sectionHeadings[0]).toHaveTextContent('Features');
    expect(sectionHeadings[1]).toHaveTextContent('Technology Stack');
  });

  test('has responsive layout classes', () => {
    render(<About />);
    
    const featuresContainer = screen.getByText('User registration and authentication').closest('ul');
    expect(featuresContainer).toHaveClass('text-left', 'space-y-2', 'max-w-md', 'mx-auto');
    
    const techStackContainer = screen.getByText('React').closest('div');
    expect(techStackContainer).toHaveClass('flex', 'flex-wrap', 'justify-center', 'gap-3');
  });

  test('footer section is properly separated', () => {
    render(<About />);
    
    const footerSection = screen.getByText(/Laboratory Work #1.*Web Interface Programming/).closest('div');
    expect(footerSection).toHaveClass('mt-8', 'pt-6', 'border-t', 'border-gray-200');
  });

  test('contains all expected text content', () => {
    render(<About />);
    
    // Check for key phrases in the description
    expect(screen.getByText(/Built with modern web technologies including/)).toBeInTheDocument();
    expect(screen.getByText(/React, Tailwind CSS, and local storage/)).toBeInTheDocument();
  });

  test('is stateless component', () => {
    const { rerender } = render(<About />);
    
    // Component should render the same content on rerender
    expect(screen.getByText('Simple Chat')).toBeInTheDocument();
    
    rerender(<About />);
    expect(screen.getByText('Simple Chat')).toBeInTheDocument();
  });
}); 