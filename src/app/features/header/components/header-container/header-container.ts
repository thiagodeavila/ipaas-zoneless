import { Component, effect, output, signal } from '@angular/core';
import { CanvaTab } from '../../../../shared/enums/canva.enum';

@Component({
  selector: 'app-header-container',
  imports: [],
  templateUrl: './header-container.html',
  styleUrl: './header-container.scss',
})
export class HeaderContainer {
  CanvaTab = CanvaTab;
  currentTab = signal<CanvaTab>(CanvaTab.editor);
  onChangetab = output<CanvaTab>();

  constructor() {
    effect(() => {
      this.onChangetab.emit(this.currentTab());
    });
  }
}
