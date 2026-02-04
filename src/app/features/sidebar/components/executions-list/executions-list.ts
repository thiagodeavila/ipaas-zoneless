import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Execution } from '../../../workflow/models/execution.model';
import { ExecutionService } from '../../../workflow/services/executions-service';

@Component({
  selector: 'app-executions-list',
  imports: [NgClass],
  templateUrl: './executions-list.html',
  styleUrl: './executions-list.scss',
})
export class ExecutionsList {
  executionService = inject(ExecutionService);

  executionList = computed(() => this.executionService.executionList());
  currentExecution = computed(() => this.executionService.currentExecution());

  ngOnInit(): void {
    this.executionService.currentExecution.set(this.executionService.executionList()[0]);
  }

  selectExecution(execution: Execution): void {
    this.executionService.currentExecution.set(execution);
  }
}
