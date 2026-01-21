import { ChangeDetectorRef, Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EFMarkerType, FCanvasComponent, FCreateConnectionEvent, FFlowModule, FZoomDirective, IFFlowStateConnection, IFFlowStateNode } from '@foblex/flow';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FFlowModule, FZoomDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('zoneless-app');

  @ViewChild(FCanvasComponent, { static: true })
  public fCanvas!: FCanvasComponent;

  public connections: { from: string, to: string }[] = [];

  public eMarkerType = EFMarkerType;

  viewModel = signal<{ nodes: IFFlowStateNode[], connections: IFFlowStateConnection[] } | null>(null);

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public onLoaded(): void {
    this.fCanvas.resetScaleAndCenter(false);
  }

  public onCreateConnection(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      return;
    }
    this.connections.push({ from: event.fOutputId, to: event.fInputId });
  }

  public onDeleteConnections(): void {
    this.connections = [];
    this.changeDetectorRef.detectChanges();
  }
}
