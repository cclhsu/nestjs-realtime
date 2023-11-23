// Path: src/common/interface/task.interface.ts
// DESC: This is the main entry point for the task-service application.
'use strict';

import { TaskDTO } from '../dto';

// interface TaskInterface {
//   id: string;
//   task: string;
//   timestamp: Date;
// }

interface TaskControllerInterface {
  send(task: TaskDTO): Promise<void>; // Send a task to the server
  receive(task: TaskDTO): Promise<void>; // Receive a task from the server
  listTasks(): Promise<TaskDTO[]>; // List tasks
}

interface TaskServiceInterface {
  send(task: TaskDTO): Promise<void>; // Send a task to the server
  receive(task: TaskDTO): Promise<void>; // Receive a task from the server
  listTasks(): Promise<TaskDTO[]>; // List tasks
}

interface TaskClientInterface {}

interface TaskServerInterface {}

export { TaskControllerInterface, TaskServiceInterface, TaskClientInterface, TaskServerInterface };
