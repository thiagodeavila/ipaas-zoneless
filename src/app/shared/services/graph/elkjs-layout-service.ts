import { Injectable } from '@angular/core';
import { IPoint } from '@foblex/2d';
import { ELK } from 'elkjs';

export interface IElkNode {
  id: string;
  width: number;
  height: number;
}

export interface IElkEdge {
  id: string;
  sources: string[];
  targets: string[];
}

export interface IElkLayoutOptions {
  direction?: 'RIGHT' | 'DOWN' | 'LEFT' | 'UP';
  nodeSpacing?: number;
  layerSpacing?: number;
  edgeSpacing?: number;
}

export interface ILayoutResult {
  nodes: Map<string, IPoint>;
  edges: IElkEdge[];
}

@Injectable({ providedIn: 'root' })
export class ElkLayoutService {
  private elk: ELK | null = null;

  /**
   * Carrega o ELK dinamicamente (lazy loading)
   */
  private async loadElk(): Promise<ELK> {
    if (this.elk) {
      return this.elk;
    }

    const module = await import('elkjs/lib/elk.bundled.js');
    this.elk = new module.default();
    return this.elk;
  }

  /**
   * Calcula o layout automático usando ELK
   */
  async calculateLayout(
    nodes: IElkNode[],
    edges: IElkEdge[],
    options: IElkLayoutOptions = {}
  ): Promise<ILayoutResult> {
    const elk = await this.loadElk();

    const graph = {
      id: 'root',
      layoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': options.direction || 'RIGHT',
        'elk.spacing.nodeNode': String(options.nodeSpacing || 80),
        'elk.layered.spacing.nodeNodeBetweenLayers': String(options.layerSpacing || 100),
        'elk.spacing.edgeEdge': String(options.edgeSpacing || 10),
        'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX'
      },
      children: nodes,
      edges: edges
    };

    const layoutedGraph = await elk.layout(graph);

    // Mapear posições calculadas
    const nodePositions = new Map<string, IPoint>();
    
    if (layoutedGraph.children) {
      for (const node of layoutedGraph.children) {
        nodePositions.set(node.id, {
          x: node.x || 0,
          y: node.y || 0
        });
      }
    }

    return {
      nodes: nodePositions,
      edges: edges
    };
  }
}
