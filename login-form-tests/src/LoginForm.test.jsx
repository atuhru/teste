import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import '@testing-library/jest-dom/extend-expect';

describe('LoginForm', () => {
  test('renderiza os campos de e-mail, senha e botão Entrar', () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('permite preencher os campos', () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: '123456' } });
    expect(screen.getByLabelText(/e-mail/i)).toHaveValue('teste@exemplo.com');
    expect(screen.getByLabelText(/senha/i)).toHaveValue('123456');
  });

  test('chama onSubmit ao clicar em Entrar com os campos preenchidos', () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'usuario@teste.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha123' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  test('não chama onSubmit se os campos estiverem vazios', () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
