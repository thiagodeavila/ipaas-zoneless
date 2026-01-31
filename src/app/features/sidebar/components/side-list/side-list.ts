import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component, input } from '@angular/core';
import { FExternalItemDirective } from '@foblex/flow';
import { INodeStaticData } from '../../../workflow/components/models/node.model';

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
    componentId: 'google_id',
    title:'Google',
    icon: 'google.svg',
    category: 'component',
  };

  data2 = {
    componentId: 'chatgpt_id',
    title:'Chatgpt',
    icon: 'chat.svg',
    category: 'component',
  };

  data3 = {
    componentId: 'stripe_id',
    title:'Stripe',
    icon: 'stripe.svg',
    category: 'component',
  };
}
