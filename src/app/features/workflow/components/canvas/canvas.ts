import { ChangeDetectorRef, Component, computed, effect, inject, Injectable, Injector, signal, untracked, viewChild } from '@angular/core';
import { EFConnectionType, EFMarkerType, FCanvasComponent, FCreateConnectionEvent, FFlowComponent, FFlowModule, FMoveNodesEvent, FSelectionChangeEvent, FZoomDirective } from '@foblex/flow';
import { Mutator } from '@foblex/mutator';
import { generateGuid } from '@foblex/utils';
import { ICompleteNodeData, IFlowState } from '../../../../shared/models/node.model';
import { NodeDataRepository } from '../../../../shared/repositories/data-node.repository';
import { UndoRedo } from "../undo-redo/undo-redo";

@Injectable()
class FlowState extends Mutator<IFlowState> {
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss',
  providers: [FlowState, NodeDataRepository],
  imports: [FFlowModule, FZoomDirective, UndoRedo],
})
export class Canvas {
  public eMarkerType = EFMarkerType;
  public eConnectionType = EFConnectionType;

  protected readonly state = inject(FlowState);
  protected readonly nodeDataRepo = inject(NodeDataRepository);

  private readonly _injector = inject(Injector);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private readonly _flow = viewChild.required(FFlowComponent);
  private readonly _canvas = viewChild.required(FCanvasComponent);
  private readonly _currentSnapshot = signal<IFlowState | null>(null);

  protected readonly nodes = computed(() => {
    const stateSnapshot = this._currentSnapshot();
    if (!stateSnapshot) return [];

    return Object.values(stateSnapshot.nodes).map(nodeState => {
      const staticData = this.nodeDataRepo.getNodeData(nodeState.id);
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
    this._listenStateChanges();
  }

  private _initializeWithData(): void {
    // 1. Registrar dados estáticos, futuramente será com dados do backend
    this.nodeDataRepo.setNodeData('node1', {
      title: 'Webook',
      icon: 'webhook.svg',
      category: 'start'
    });

    this.nodeDataRepo.setNodeData('node2', {
      title: 'Google',
      icon: 'google.svg',
      category: 'component'
    });

    this.nodeDataRepo.setNodeData('node3', {
      title: 'Chatgpt',
      icon: 'chatgpt.svg',
      category: 'component'
    });

    // 2. Inicializar estado dinâmico no Mutator. O flow da integração.
    const initialState: IFlowState = {
      nodes: {
        'node1': {
          id: 'node1',
          position: { x: 0, y: 200 }
        },
        'node2': {
          id: 'node2',
          position: { x: 300, y: 200 }
        },
        'node3': {
          id: 'node3',
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

  private _listenStateChanges(): void {
    effect(() => {
      this.state.changes();

      untracked(() => { 
        const spapshot = this.state.getSnapshot();
        this._currentSnapshot.set(spapshot);
        this._applyChanges()
      });
    }, { injector: this._injector });
  }
  
  private _applyChanges(): void {
    const snapshot = this.state.getSnapshot();
    if (!snapshot) return;
    
    // this._reCenterCanvasIfUndoneToFirstStep();
    this._applySelectionChanges(snapshot);
  }

  private _applySelectionChanges({ selection }: IFlowState): void {
    this._flow()?.select(
      selection?.nodes || [],
      selection?.connections || [],
      false
    );

    this._changeDetectorRef.detectChanges();
  }

  protected onChangeSelection(event: FSelectionChangeEvent): void {
    // Não salvar seleções por enquanto
    return ;

    this.state.update({
      selection: {
        nodes: [...event.fNodeIds],
        connections: [...event.fConnectionIds]
      }
    });
  }

  public onLoaded(): void {
    this._canvas().resetScaleAndCenter(false);
  }

  protected onCreateConnection(event: FCreateConnectionEvent): void {
    if (event.fInputId) {
      const connection = {
        id: generateGuid(),
        source: event.fOutputId,
        target: event.fInputId
      };

      this.state.create({
        connections: {
          [connection.id]: connection
        }
      });
    }
  }

  protected undo(): void {
    this.state.undo();
  }

  protected redo(): void {
    this.state.redo();
  }

  protected get canUndo(): boolean {
    return this.state.canUndo();
  }

  protected get canRedo(): boolean {
    return this.state.canRedo();
  }

  protected onMoveNodes(event: FMoveNodesEvent): void {
    const updates = Object.fromEntries(
      event.fNodes.map(({ id, position }) => [id, { position }])
    );
    
    this.state.update({
      nodes: updates
    });
  }

  public onDeleteConnections(): void {
    // this.connections = [];
    this._changeDetectorRef.detectChanges();
  }
}
