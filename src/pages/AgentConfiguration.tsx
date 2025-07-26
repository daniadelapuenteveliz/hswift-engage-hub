import React, { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, { MiniMap, Controls, Background, BackgroundVariant, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { 
  Play, Lock, MessageSquare, ShoppingCart, Flag, Bot, Wrench, X, 
  Database, Cpu, Lightbulb, BarChart, FileText, UserCheck, Search, 
  AlertTriangle, BrainCircuit, Send, GitBranch, Users 
} from 'lucide-react';

// --- Hermes Graph (Editable) ---
const hermesNodes = [
  {
    id: '1',
    type: 'input',
    data: { 
      stringLabel: 'Inicio',
      icon: <Play className="w-5 h-5 text-green-500" />,
      prompt: '',
      tools: [],
      agent: null,
    },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { 
      stringLabel: 'Autenticación',
      icon: <Lock className="w-5 h-5 text-red-500" />,
      prompt: 'Verificar las credenciales del usuario y asegurar que tiene los permisos necesarios.',
      tools: ['check_auth_token'],
      agent: null,
    },
    position: { x: 250, y: 125 },
  },
  {
    id: '3',
    data: { 
      stringLabel: 'Intención del Usuario',
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
      prompt: 'Analizar la solicitud del usuario para determinar su objetivo principal. ¿Quiere comprar, preguntar o algo más?',
      tools: ['natural_language_processing'],
      agent: null,
    },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    data: { 
      stringLabel: 'Ventas',
      icon: <ShoppingCart className="w-5 h-5 text-orange-500" />,
      prompt: 'Si la intención es de venta, guiar al usuario a través del proceso de compra y llamar al agente de ventas si es necesario.',
      tools: ['create_order', 'get_product_details'],
      agent: 'Boet',
    },
    position: { x: 100, y: 375 },
  },
  {
    id: '5',
    type: 'output',
    data: { 
      stringLabel: 'Fin',
      icon: <Flag className="w-5 h-5 text-gray-500" />,
      prompt: '',
      tools: [],
      agent: null,
    },
    position: { x: 250, y: 500 },
  },
].map(node => ({
  ...node,
  data: {
    ...node.data,
    label: (
      <div className="flex items-center gap-2">
        {node.data.icon} <span className="font-semibold">{node.data.stringLabel}</span>
      </div>
    )
  }
}));

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { strokeWidth: 2 } },
];

// --- Boet Graph (Read-only Analytics Style) ---
const boetNodes = [
  {
    id: '1', type: 'input', data: { label: <div className="flex items-center gap-2"><Database className="w-5 h-5 text-blue-500" /> <span className="font-semibold">Data Ingestion</span></div> }, position: { x: 250, y: 5 },
  },
  {
    id: '2', data: { label: <div className="flex items-center gap-2"><Cpu className="w-5 h-5 text-orange-500" /> <span className="font-semibold">Data Processing</span></div> }, position: { x: 250, y: 125 },
  },
  {
    id: '3', data: { label: <div className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-500" /> <span className="font-semibold">Insight Generation</span></div> }, position: { x: 250, y: 250 },
  },
  {
    id: '4', data: { label: <div className="flex items-center gap-2"><BarChart className="w-5 h-5 text-green-500" /> <span className="font-semibold">Visualization</span></div> }, position: { x: 100, y: 375 },
  },
  {
    id: '5', type: 'output', data: { label: <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-purple-500" /> <span className="font-semibold">Reporting</span></div> }, position: { x: 400, y: 375 },
  },
].map(node => ({ ...node, style: { padding: '10px 15px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' } }));

const boetEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { strokeWidth: 2 } },
];

// --- Maui Graph (Complex) ---
const mauiNodes = [
  { id: '1', type: 'input', data: { label: <div className="flex items-center gap-2"><UserCheck className="w-5 h-5 text-blue-500"/><span>User Intent</span></div> }, position: { x: 400, y: 0 } },
  
  { id: 'b1', data: { label: <div className="flex items-center gap-2"><GitBranch className="w-5 h-5 text-gray-500"/><span>Branch: Support</span></div> }, position: { x: 150, y: 100 } },
  { id: '2', data: { label: <div className="flex items-center gap-2"><Search className="w-4 h-4"/><span>Identify Issue</span></div> }, position: { x: 150, y: 200 } },
  { id: '3', data: { label: <div className="flex items-center gap-2"><FileText className="w-4 h-4"/><span>Search KB</span></div> }, position: { x: 150, y: 300 } },
  { id: '4', data: { label: <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500"/><span>Escalate</span></div> }, position: { x: 150, y: 400 } },

  { id: 'b2', data: { label: <div className="flex items-center gap-2"><GitBranch className="w-5 h-5 text-gray-500"/><span>Branch: Analysis</span></div> }, position: { x: 400, y: 100 } },
  { id: '5', data: { label: <div className="flex items-center gap-2"><Database className="w-4 h-4"/><span>Query Database</span></div> }, position: { x: 400, y: 200 } },
  { id: '6', data: { label: <div className="flex items-center gap-2"><BrainCircuit className="w-4 h-4"/><span>Aggregate Data</span></div> }, position: { x: 400, y: 300 } },
  { id: '7', data: { label: <div className="flex items-center gap-2"><BarChart className="w-4 h-4"/><span>Generate Report</span></div> }, position: { x: 400, y: 400 } },

  { id: 'b3', data: { label: <div className="flex items-center gap-2"><GitBranch className="w-5 h-5 text-gray-500"/><span>Branch: Engagement</span></div> }, position: { x: 650, y: 100 } },
  { id: '8', data: { label: <div className="flex items-center gap-2"><Users className="w-4 h-4"/><span>Analyze Behavior</span></div> }, position: { x: 650, y: 200 } },
  { id: '9', data: { label: <div className="flex items-center gap-2"><Lightbulb className="w-4 h-4"/><span>Find Opportunity</span></div> }, position: { x: 650, y: 300 } },
  { id: '10', data: { label: <div className="flex items-center gap-2"><Send className="w-4 h-4"/><span>Send Message</span></div> }, position: { x: 650, y: 400 } },

  { id: '11', type: 'output', data: { label: <div className="flex items-center gap-2"><Flag className="w-5 h-5 text-green-500"/><span>End</span></div> }, position: { x: 400, y: 550 } },
].map(node => ({ ...node, style: { padding: '10px 15px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' } }));

const mauiEdges = [
  { id: 'e1-b1', source: '1', target: 'b1' }, { id: 'e1-b2', source: '1', target: 'b2' }, { id: 'e1-b3', source: '1', target: 'b3' },
  { id: 'eb1-2', source: 'b1', target: '2', animated: true }, { id: 'e2-3', source: '2', target: '3', animated: true }, { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'eb2-5', source: 'b2', target: '5', animated: true }, { id: 'e5-6', source: '5', target: '6', animated: true }, { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'eb3-8', source: 'b3', target: '8', animated: true }, { id: 'e8-9', source: '8', target: '9', animated: true }, { id: 'e9-10', source: '9', target: '10', animated: true },
  { id: 'e4-11', source: '4', target: '11' }, { id: 'e7-11', source: '7', target: '11' }, { id: 'e10-11', source: '10', target: '11' },
];

const NodeConfigPanel = ({ selectedNode, onUpdate, onClose }) => {
  if (!selectedNode) return null;

  const handlePromptChange = (e) => {
    onUpdate({ ...selectedNode.data, prompt: e.target.value });
  };

  return (
    <Card className="h-full flex flex-col relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
        <X className="w-5 h-5" />
      </button>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {selectedNode.data.icon} Configurar "{selectedNode.data.stringLabel}"
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto space-y-6">
        <div>
          <Label htmlFor="prompt" className="font-semibold">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Define la instrucción principal para este nodo..."
            value={selectedNode.data.prompt}
            onChange={handlePromptChange}
            className="mt-2 min-h-[120px]"
          />
        </div>
        <div>
          <Label className="font-semibold">Tools</Label>
          <div className="mt-2">
            <Select>
              <SelectTrigger><Wrench className="w-4 h-4 mr-2" />Add Tool</SelectTrigger>
              <SelectContent>
                <SelectItem value="get_users">get_users</SelectItem>
                <SelectItem value="create_order">create_order</SelectItem>
                <SelectItem value="search_web">search_web</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className="font-semibold">Call Agent</Label>
          <div className="mt-2">
            <Select defaultValue={selectedNode.data.agent}>
              <SelectTrigger><Bot className="w-4 h-4 mr-2" />Select Agent</SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="Hermes">Hermes</SelectItem>
                <SelectItem value="Boet">Boet</SelectItem>
                <SelectItem value="Maui">Maui</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AgentConfiguration = () => {
  const { agentName } = useParams();
  const [selectedNode, setSelectedNode] = useState(null);

  const graphData = useMemo(() => {
    switch (agentName) {
      case 'boet':
        return { nodes: boetNodes, edges: boetEdges, editable: false };
      case 'maui':
        return { nodes: mauiNodes, edges: mauiEdges, editable: false };
      case 'hermes':
      default:
        return { nodes: hermesNodes, edges: initialEdges, editable: true };
    }
  }, [agentName]);

  const [nodes, setNodes, onNodesChange] = useNodesState(graphData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graphData.edges);

  // Update state if agent changes
  React.useEffect(() => {
    setNodes(graphData.nodes);
    setEdges(graphData.edges);
    setSelectedNode(null);
  }, [agentName, graphData, setNodes, setEdges]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const handleNodeClick = (event, node) => {
    if (graphData.editable) {
      setSelectedNode(node);
    }
  };

  const handlePaneClick = () => {
    setSelectedNode(null);
  };

  const updateNodeData = (newData) => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNode.id) {
          return { ...n, data: { ...n.data, ...newData } };
        }
        return n;
      })
    );
    setSelectedNode(prev => ({ ...prev, data: { ...prev.data, ...newData } }));
  };

  if (graphData.editable) {
    return (
      <ResizablePanelGroup direction="horizontal" className="w-full h-[calc(100vh-4rem)] p-4 sm:p-6">
        <ResizablePanel defaultSize={70}>
          <Card className="w-full h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={handleNodeClick}
              onPaneClick={handlePaneClick}
              fitView
            >
              <Controls />
              <MiniMap />
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </Card>
        </ResizablePanel>
        {selectedNode && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30}>
              <NodeConfigPanel selectedNode={selectedNode} onUpdate={updateNodeData} onClose={() => setSelectedNode(null)} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    );
  }

  // Read-only view for Boet and Maui
  return (
    <div className="p-4 sm:p-6 h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-4">{agentName.charAt(0).toUpperCase() + agentName.slice(1)}'s Workflow</h1>
      <Card className="w-full h-[calc(100%-4rem)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </Card>
    </div>
  );
};

export default AgentConfiguration;
