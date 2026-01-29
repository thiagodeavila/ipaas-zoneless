import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderContainer } from "./features/header/components/header-container/header-container";
import { SideContainer } from "./features/sidebar/components/side-container/side-container";
import { Canvas } from "./features/workflow/components/canvas/canvas";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Canvas, Canvas, SideContainer, HeaderContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('zoneless-app');

 
}
