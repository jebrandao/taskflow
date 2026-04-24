import { Injectable, computed, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly tasksSignal = signal<Task[]>([
    {
      id: '1',
      title: 'Aprender Angular 21',
      description: 'Criar uma lista de tarefas simples com componentes e rotas',
      completed: false
    }
  ]);

  readonly tasks = this.tasksSignal.asReadonly();
  readonly remaining = computed(() => this.tasksSignal().filter(task => !task.completed).length);

  getTask(id: string): Task | undefined {
    return this.tasksSignal().find(task => task.id === id);
  }

  addTask(task: Pick<Task, 'title' | 'description'>): void {
    const nextTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: task.title.trim(),
      description: task.description.trim(),
      completed: false
    };

    this.tasksSignal.update(tasks => [...tasks, nextTask]);
  }

  updateTask(updated: Task): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task => (task.id === updated.id ? { ...task, ...updated } : task))
    );
  }

  removeTask(id: string): void {
    this.tasksSignal.update(tasks => tasks.filter(task => task.id !== id));
  }

  toggleCompletion(id: string): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
}
