export type ExecutionStatus = 'SUCCESS' | 'ERROR' | 'RUNNING' | 'PENDING';

// Payload para buscar workflow por versão
export interface WorkflowVersionPayload {
  templateVersion: number;
  publishVersion: number;
  sketchVersion: number;
}

// Resposta do backend com workflow template
export interface WorkflowTemplate {
  id: string;
  name: string;
  version: WorkflowVersionPayload;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  createdAt: string;
  updatedAt: string;
}

// Node do workflow template (estrutura do backend)
export interface WorkflowNode {
  id: string;
  componentId: string;
  name: string;
  category: 'component' | 'start';
  position: {
    x: number;
    y: number;
  };
  config?: any;
}

// Conexão do workflow template
export interface WorkflowConnection {
  id: string;
  source: string;  // nodeId-output
  target: string;  // nodeId-input
}

// Lista de execuções (resumo)
export interface ExecutionSummary {
  id: string;
  startTime: string;
  duration: string;
  version: string;
  status: ExecutionStatus;
}

// Detalhes completos de uma execução
export interface ExecutionDetail extends ExecutionSummary {
  endTime: string;
  workflowId: string;
  triggeredBy: string;
}

// Steps de uma execução (nodes executados)
export interface ExecutionStep {
  id: string;
  nodeId: string;
  nodeName: string;
  category: 'component' | 'start';
  status: ExecutionStatus;
  startTime: string;
  duration: string;
  inputs?: string[]; // IDs dos steps que conectam neste step
  outputs?: string[]; // IDs dos steps para os quais este step conecta
  data?: {
    input?: any;
    output?: any;
  };
  error?: string;
}

// Logs de uma execução
export interface ExecutionLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  nodeId?: string;
  details?: any;
}

// Mantendo para compatibilidade (alias para ExecutionSummary)
export type Execution = ExecutionSummary;