import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component, input } from '@angular/core';
import { FExternalItemDirective } from '@foblex/flow';
import { INodeStaticData } from '../../../../shared/models/node.model';

@Component({
  selector: 'app-side-list',
  imports: [
    FExternalItemDirective,
    CdkAccordionModule
  ],
  templateUrl: './side-list.html',
  styleUrl: './side-list.scss',
})
export class SideList {
  itemList = input<INodeStaticData>();

  data = {
    title:'titulo',
    icon: 'google.svg',
    category: 'component'
  };
}
