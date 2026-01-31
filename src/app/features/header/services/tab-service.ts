import { computed, Injectable, signal } from '@angular/core';
import { WorkflowTab } from '../enums/tab.enum';

@Injectable({
  providedIn: 'root'
})
export class WorkflowTabsService {
  private _activeTab = signal<WorkflowTab>(WorkflowTab.editor);
  
  activeTab = this._activeTab.asReadonly();

  isEditorActive = computed(() => this._activeTab() === WorkflowTab.editor);
  isExecutionsActive = computed(() => this._activeTab() === WorkflowTab.executions);

  private setActiveTab(tab: WorkflowTab): void {
    this._activeTab.set(tab);
  }

  switchToEditor(): void {
    this.setActiveTab(WorkflowTab.editor);
  }

  switchToExecutions(): void {
    this.setActiveTab(WorkflowTab.executions);
  }
}