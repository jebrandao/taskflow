import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { EventEmitter } from '@angular/core';
import { vi } from 'vitest';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  it('deve mostrar erro e impedir envio quando title tiver menos de 3 caracteres', async () => {
    const saved = new EventEmitter();
    vi.spyOn(saved, 'emit');

    await render(TaskFormComponent, {
      componentProperties: {
        saved
      }
    });

    const titleInput = screen.getByPlaceholderText('Digite o título') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Adicionar tarefa' }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    await userEvent.type(titleInput, 'ab');
    await userEvent.tab();

    expect(screen.getByText('O título é obrigatório e deve ter pelo menos 3 caracteres.')).toBeTruthy();
    expect(button.disabled).toBe(true);
    expect(saved.emit).not.toHaveBeenCalled();
  });

  it('deve emitir saved quando o formulário for válido', async () => {
    const saved = new EventEmitter();
    vi.spyOn(saved, 'emit');

    await render(TaskFormComponent, {
      componentProperties: {
        saved
      }
    });

    const titleInput = screen.getByPlaceholderText('Digite o título') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Adicionar tarefa' }) as HTMLButtonElement;

    await userEvent.type(titleInput, 'Tarefa válida');

    expect(button.disabled).toBe(false);

    await userEvent.click(button);

    expect(saved.emit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Tarefa válida',
        description: ''
      })
    );
  });
});
