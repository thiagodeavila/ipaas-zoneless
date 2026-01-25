import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Canvas } from "./features/workflow/components/canvas/canvas";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Canvas, Canvas],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('zoneless-app');

 
}
