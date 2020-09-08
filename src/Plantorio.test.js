import React from 'react';
import { render } from '@testing-library/react';
import Plantorio from './Plantorio';

test('renders learn react link', () => {
  const { getByText } = render(<Plantorio />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
