import { Injectable } from '@angular/core';
import { INodeStaticData } from '../components/models/node.model';

@Injectable()
export class NodeDataRepository {
  // Armazena dados estáticos fora do histórico
  private _nodeData = new Map<string, INodeStaticData>();

  setNodeData(nodeId: string, data: INodeStaticData): void {
    this._nodeData.set(nodeId, data);
  }

  getNodeData(nodeId: string): INodeStaticData | undefined {
    return this._nodeData.get(nodeId);
  }

  deleteNodeData(nodeId: string): void {
    this._nodeData.delete(nodeId);
  }

  hasNodeData(nodeId: string): boolean {
    return this._nodeData.has(nodeId);
  }
}