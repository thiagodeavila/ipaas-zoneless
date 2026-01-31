import { Component, inject } from '@angular/core';
import { WorkflowTab } from '../../enums/tab.enum';
import { WorkflowTabsService } from '../../services/tab-service';

@Component({
  selector: 'app-header-container',
  imports: [],
  templateUrl: './header-container.html',
  styleUrl: './header-container.scss',
})
export class HeaderContainer {
  WorkflowTab = WorkflowTab;

  workflowTabsService = inject(WorkflowTabsService);
}
