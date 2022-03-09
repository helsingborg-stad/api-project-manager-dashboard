import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test.skip('renders learn react link', () => {
  render(<App apiEndpoint='' contentEndpoint=''/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
