import { Component, signal } from '@angular/core';

enum CanvaTab {
  editor = 'EDITOR',
  executions = 'EXECUTIONS'
}

@Component({
  selector: 'app-header-container',
  imports: [],
  templateUrl: './header-container.html',
  styleUrl: './header-container.scss',
})
export class HeaderContainer {
  CanvaTab = CanvaTab;
  currentTab = signal<CanvaTab>(CanvaTab.editor);
}
