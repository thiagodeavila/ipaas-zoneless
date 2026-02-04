import { NgClass } from '@angular/common';
import { Component, computed, inject, Injectable, signal, viewChild } from '@angular/core';
import { EFConnectionType, EFMarkerType, FCanvasComponent, FFlowModule, FZoomDirective } from '@foblex/flow';
import { Mutator } from '@foblex/mutator';
import { ICompleteNodeData, IFlowState, INodeState } from '../../models/node.model';
import { NodeDataRepository } from '../../repositories/data-node.repository';
import { CanvasActions } from "../canvas-actions/canvas-actions";
import { NodeActions } from "../node-actions/node-actions";

@Injectable()
class FlowState extends Mutator<IFlowState> {
}

@Component({
  selector: 'app-canvas-view',
  imports: [FFlowModule, FZoomDirective, CanvasActions, NodeActions, NgClass],
  templateUrl: './canvas-view.html',
  styleUrl: './canvas-view.scss',
  providers: [FlowState, NodeDataRepository],
})
export class CanvasView {
  public eMarkerType = EFMarkerType;
  public eConnectionType = EFConnectionType;

  protected readonly state = inject(FlowState);
  protected readonly nodeDataRepo = inject(NodeDataRepository);

  private readonly _canvas = viewChild.required(FCanvasComponent);
  private readonly _fZoom = viewChild.required(FZoomDirective);
  private readonly _currentSnapshot = signal<IFlowState | null>(null);

  protected readonly nodes = computed(() => {
    const stateSnapshot = this._currentSnapshot();
    if (!stateSnapshot) return [];

    return Object
      .values(stateSnapshot.nodes)
      .map((nodeState: INodeState): ICompleteNodeData => {
        const staticData = this.nodeDataRepo.getNodeData(nodeState.componentId);

        return {
          ...nodeState,
          ...staticData
        } as ICompleteNodeData;
      });
  });

  protected readonly connections = computed(() => {
    const stateSnapshot = this._currentSnapshot();
    return Object.values(stateSnapshot?.connections || {});
  });

  public ngOnInit(): void {
    this._initializeWithData();
  }

  public onLoaded(): void {
    this.resetScaleAndCenter();
  }

  private _initializeWithData(): void {
    // 1. Registrar dados estáticos, futuramente será com dados do backend
    this.nodeDataRepo.setNodeData('webhook_id', {
      title: 'Webook',
      icon: 'webhook.svg',
      category: 'start',
      componentId: 'webhook_id'
    });

    this.nodeDataRepo.setNodeData('google_id', {
      title: 'Google',
      icon: 'google.svg',
      category: 'component',
      componentId: 'google_id'
    });

    this.nodeDataRepo.setNodeData('chatgpt_id', {
      title: 'Chatgpt',
      icon: 'chat.svg',
      category: 'component',
      componentId: 'chatgpt_id'
    });

    this.nodeDataRepo.setNodeData('stripe_id', {
      title: 'Stripe',
      icon: 'stripe.svg',
      category: 'component',
      componentId: 'stripe_id'
    });

    // 2. Inicializar estado dinâmico no Mutator. O flow da integração.
    const initialState: IFlowState = {
      nodes: {
        'node1': {
          id: 'node1',
          componentId: 'webhook_id',
          position: { x: 0, y: 200 }
        },
        'node2': {
          id: 'node2',
          componentId: 'google_id',
          position: { x: 300, y: 200 }
        },
        'node3': {
          id: 'node3',
          componentId: 'chatgpt_id',
          position: { x: 600, y: 200 }
        }
      },
      connections: {
        'connection1': {
          id: 'connection1',
          source: 'node1-output',
          target: 'node2-input'
        }
      },
      transform: {
        position: { x: 0, y: 0 },
        scale: 1
      }
    };

    this.state.initialize(initialState);
    this._currentSnapshot.set(initialState);
  }

  protected resetScaleAndCenter(): void {
    this._canvas().resetScaleAndCenter(false);
  }

  protected zoomIn(): void {
    this._fZoom().zoomIn();
  }

  protected zoomOut(): void {
    this._fZoom().zoomOut();
  }
}
