import { Component } from '@angular/core';
import { SideList } from "../side-list/side-list";

@Component({
  selector: 'app-side-container',
  imports: [SideList],
  templateUrl: './side-container.html',
  styleUrl: './side-container.scss',
})
export class SideContainer {

}
