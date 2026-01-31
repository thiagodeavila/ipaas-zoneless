import { Component, inject } from '@angular/core';
import { WorkflowTabsService } from '../../../header/services/tab-service';
import { ExecutionsList } from "../executions-list/executions-list";
import { SideList } from "../side-list/side-list";

@Component({
  selector: 'app-side-container',
  imports: [SideList, ExecutionsList],
  templateUrl: './side-container.html',
  styleUrl: './side-container.scss',
})
export class SideContainer {
  workflowTabsService = inject(WorkflowTabsService);
}
