import React from 'react';
import { render } from '@testing-library/react';
import AppWrapper from './App';

test('renders learn react link', () => {
  const { getByText } = render(<AppWrapper />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
