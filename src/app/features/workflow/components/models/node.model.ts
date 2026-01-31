import { IPoint } from '@foblex/2d';

// Static data: Dados dinâmicos ou de negócio
export interface INodeStaticData {
  componentId: string;
  title: string;
  icon: string;
  category: string;
}

export interface INodeState {
  id: string;
  componentId: string;
  position: IPoint;
  size?: { width: number; height: number };
}

export interface ICompleteNodeData extends INodeState {
  title: string;
  icon: string;
  category: string;
}

export interface IConnection {
  id: string;
  source: string;
  target: string;
}

// Mutator state 
export interface IFlowState {
  nodes: Record<string, INodeState>;
  connections: Record<string, IConnection>;
  selection?: {
    nodes: string[];
    connections: string[];
  };
  transform?: {
    position: IPoint;
    scale: number;
  };
}
