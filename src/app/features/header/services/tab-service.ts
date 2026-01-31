import { computed, Injectable, signal } from '@angular/core';
import { CanvaTab } from '../enums/canva.enum';

@Injectable({
  providedIn: 'root'
})
export class WorkflowTabsService {
  private _activeTab = signal<CanvaTab>(CanvaTab.editor);
  
  activeTab = this._activeTab.asReadonly();

  isEditorActive = computed(() => this._activeTab() === CanvaTab.editor);
  isExecutionsActive = computed(() => this._activeTab() === CanvaTab.executions);

  private setActiveTab(tab: CanvaTab): void {
    this._activeTab.set(tab);
  }

  switchToEditor(): void {
    this.setActiveTab(CanvaTab.editor);
  }

  switchToExecutions(): void {
    this.setActiveTab(CanvaTab.executions);
  }
}