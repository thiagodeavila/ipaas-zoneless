import { Injectable, signal } from '@angular/core';
import { Execution } from '../models/execution.model';

@Injectable({ providedIn: 'root' })
export class ExecutionService {
  executionList = signal<Execution[]>([
    {
      id: 'exec1',
      status: 'SUCCESS',
      duration: '5.432MS',
      startTime: 'Jan 29, 12:24:05',
      version: 'v1.0.0',
    },
    {
      id: 'exec2',
      status: 'SUCCESS',
      duration: '5.432MS',
      startTime: 'Jan 29, 12:25:13',
      version: 'v1.0.0',
    },
    {
      id: 'exec3',
      status: 'ERROR',
      duration: '5.432MS',
      startTime: 'Jan 29, 12:25:50',
      version: 'v1.0.0',
    },
    {
      id: 'exec4',
      status: 'SUCCESS',
      duration: '5.432MS',
      startTime: 'Jan 29, 12:26:24',
      version: 'v1.0.0',
    }
  ]);

  currentExecution = signal<Execution | null>(null);
}