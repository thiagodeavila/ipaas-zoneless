import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderContainer } from "./features/header/components/header-container/header-container";
import { WorkflowTab } from './features/header/enums/tab.enum';
import { WorkflowTabsService } from './features/header/services/tab-service';
import { SideContainer } from "./features/sidebar/components/side-container/side-container";
import { CanvasView } from "./features/workflow/components/canvas-view/canvas-view";
import { Canvas } from "./features/workflow/components/canvas/canvas";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Canvas, Canvas, SideContainer, HeaderContainer, CanvasView],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  WorkflowTab = WorkflowTab;

  protected readonly title = signal('zoneless-app');

  workflowTabsService = inject(WorkflowTabsService)
}
