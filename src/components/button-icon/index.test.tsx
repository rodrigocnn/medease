import { render } from '@testing-library/react';
import { it, expect } from 'vitest';
import '@testing-library/jest-dom';
import IconButton from '.';

it('Should render correctly', () => {
  const { container } = render(<IconButton icon="edit" />);
  const svgElement = container.querySelector('svg');
  expect(svgElement).toBeInTheDocument();
});

it('Should render correctly icon of type edit', () => {
  const { container } = render(<IconButton icon="edit" />);
  const svgElement = container.querySelector('svg');
  const viewBoxAttributeValue = svgElement?.getAttribute('viewBox');
  expect(viewBoxAttributeValue).toBe('0 0 576 512');
});

it('Should render correctly icon of type delete', () => {
  const { container } = render(<IconButton icon="delete" />);
  const svgElement = container.querySelector('svg');
  const viewBoxAttributeValue = svgElement?.getAttribute('viewBox');
  expect(viewBoxAttributeValue).toBe('0 0 448 512');
});
