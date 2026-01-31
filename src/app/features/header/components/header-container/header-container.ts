import { Component, inject } from '@angular/core';
import { CanvaTab } from '../../enums/canva.enum';
import { WorkflowTabsService } from '../../services/tab-service';

@Component({
  selector: 'app-header-container',
  imports: [],
  templateUrl: './header-container.html',
  styleUrl: './header-container.scss',
})
export class HeaderContainer {
  CanvaTab = CanvaTab;

  workflowTabsService = inject(WorkflowTabsService);
}
