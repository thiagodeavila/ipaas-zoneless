import { Component, output } from '@angular/core';

@Component({
  selector: 'app-canvas-actions',
  imports: [],
  templateUrl: './canvas-actions.html',
  styleUrl: './canvas-actions.scss',
})
export class CanvasActions {
  autoLayout = output<boolean>();
  center = output<boolean>();
  toggleTheme = output<boolean>();
  zoomIn = output<boolean>();
  zoomOut = output<boolean>();
  
}
