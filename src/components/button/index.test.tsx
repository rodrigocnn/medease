import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Button } from '.';

it('Should render correctly', () => {
  render(<Button>Atualizar</Button>);
  expect(screen.getByText('Atualizar')).toBeInTheDocument();
});

it('Should render with class default', () => {
  const { container } = render(<Button>Atualizar</Button>);
  const classDefault = `mb-6 mr-2 rounded-lg bg-[#01d8da] px-5 py-2.5 text-sm font-medium
      text-white hover:bg-[#06afb1] focus:outline-none focus:ring-4 focus:ring-blue-300
      dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`;
  const containsClass = container.innerHTML.includes(classDefault);
  expect(containsClass).toBe(true);
});
