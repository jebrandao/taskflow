import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './task.model';
import { TaskItemComponent } from './task-item.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  template: `
    <section class="task-list">
      <h2>Lista de tarefas</h2>
      <p class="subtitle" *ngIf="tasks.length === 0">Nenhuma tarefa cadastrada. Adicione uma tarefa ao lado.</p>
      <ul *ngIf="tasks.length > 0">
        <li *ngFor="let task of tasks">
          <task-item
            [task]="task"
            (edit)="edit.emit($event)"
            (remove)="remove.emit($event)"
            (toggle)="toggle.emit($event)"
          ></task-item>
        </li>
      </ul>
    </section>
  `,
  styles: [
    `
      .task-list {
        display: grid;
        gap: 1rem;
      }

      .task-list h2 {
        margin: 0;
        font-size: 1.25rem;
      }

      .subtitle {
        margin: 0;
        color: #64748b;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.75rem;
      }

      li {
        margin: 0;
      }
    `
  ]
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();
}
