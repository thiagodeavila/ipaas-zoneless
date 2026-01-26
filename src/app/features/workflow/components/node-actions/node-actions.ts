import { Component, output } from '@angular/core';

@Component({
  selector: 'app-node-actions',
  imports: [],
  templateUrl: './node-actions.html',
  styleUrl: './node-actions.scss',
})
export class NodeActions {
  settings = output<boolean>();
  copy = output<boolean>();
  remove = output<boolean>();
}
