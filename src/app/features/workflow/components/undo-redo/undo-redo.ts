import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-undo-redo',
  imports: [],
  templateUrl: './undo-redo.html',
  styleUrl: './undo-redo.scss',
})
export class UndoRedo {
  canUndo = input<boolean>();
  canRedo = input<boolean>();
  undo = output<boolean>();
  redo = output<boolean>();
  
}
