import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Loading } from '.';

it('Should render correctly', () => {
  const { container } = render(<Loading />);
  const svgElement = container.querySelector('svg');
  const viewBoxAttributeValue = svgElement?.getAttribute('viewBox');
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(viewBoxAttributeValue).toBe('0 0 100 101');
});
