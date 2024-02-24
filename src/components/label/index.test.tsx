import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Label } from '.';

it('Should render correctly', () => {
  const { container } = render(<Label title="Professional" />);
  const classDefault = `left-1  z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-500 peer-focus:dark:text-blue-500`;
  const containsClass = container.innerHTML.includes(classDefault);
  expect(containsClass).toBe(true);
});

it('Should render correctly with props title', () => {
  render(<Label title="Professional" />);
  expect(screen.getByText('Professional')).toBeInTheDocument();
});
