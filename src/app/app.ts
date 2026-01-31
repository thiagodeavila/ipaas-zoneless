import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderContainer } from "./features/header/components/header-container/header-container";
import { SideContainer } from "./features/sidebar/components/side-container/side-container";
import { CanvasView } from "./features/workflow/components/canvas-view/canvas-view";
import { Canvas } from "./features/workflow/components/canvas/canvas";
import { CanvaTab } from './shared/enums/canva.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Canvas, Canvas, SideContainer, HeaderContainer, CanvasView],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  CanvaTab = CanvaTab;

  protected readonly title = signal('zoneless-app');
  currentTab = signal<CanvaTab>(CanvaTab.editor);
}
