import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { InsidePage } from '.';

it('Should render correctly', () => {
  render(
    <InsidePage title="Pacientes">
      <p>Teste</p>
    </InsidePage>
  );
  expect(screen.getByText('Pacientes')).toBeInTheDocument();
});

it('Should render with class default', () => {
  const { container } = render(
    <InsidePage title="Pacientes">
      <p>Teste</p>
    </InsidePage>
  );

  const classDefault = `h-24 bg-[#06afb1]`;
  const containsClass = container.innerHTML.includes(classDefault);
  expect(containsClass).toBe(true);
});
