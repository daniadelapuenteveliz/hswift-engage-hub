import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactFlow, { MiniMap, Background, BackgroundVariant, NodeProps, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, Lock, MessageSquare, ShoppingCart, Flag, 
  Database, Cpu, Lightbulb, BarChart, FileText, UserCheck, Search, 
  AlertTriangle, BrainCircuit, Send, GitBranch, Users, TrendingUp, TrendingDown 
} from 'lucide-react';

// --- Mock Analytics Data ---
const analyticsData = {
  hermes: {
    '1': { count: 1500, conversion: 95 },
    '2': { count: 1425, conversion: 92 },
    '3': { count: 1311, conversion: 85 },
    '4': { count: 1114, conversion: 98 },
    '5': { count: 1092, conversion: 100 },
  },
  boet: {
    '1': { count: 850, conversion: 99 },
    '2': { count: 841, conversion: 90 },
    '3': { count: 757, conversion: 75 },
    '4': { count: 568, conversion: 100 },
    '5': { count: 189, conversion: 100 },
  },
  maui: {
    '1': { count: 2200, conversion: 100 },
    'b1': { count: 750, conversion: 95 },
    '2': { count: 712, conversion: 80 },
    '3': { count: 570, conversion: 30 },
    '4': { count: 171, conversion: 100 },
    'b2': { count: 1100, conversion: 98 },
    '5': { count: 1078, conversion: 92 },
    '6': { count: 991, conversion: 88 },
    '7': { count: 872, conversion: 100 },
    'b3': { count: 350, conversion: 60 },
    '8': { count: 210, conversion: 70 },
    '9': { count: 147, conversion: 45 },
    '10': { count: 66, conversion: 100 },
    '11': { count: 1109, conversion: 100 },
  },
};

// --- Graph Definitions ---
const hermesNodesRaw = [
  { id: '1', type: 'input', data: { icon: <Play/>, label: 'Inicio' }, position: { x: 250, y: 5 } },
  { id: '2', data: { icon: <Lock/>, label: 'Autenticación' }, position: { x: 250, y: 125 } },
  { id: '3', data: { icon: <MessageSquare/>, label: 'Intención del Usuario' }, position: { x: 250, y: 250 } },
  { id: '4', data: { icon: <ShoppingCart/>, label: 'Ventas' }, position: { x: 100, y: 375 } },
  { id: '5', type: 'output', data: { icon: <Flag/>, label: 'Fin' }, position: { x: 250, y: 500 } },
];
const hermesEdges = [
  { id: 'e1-2', source: '1', target: '2' }, { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' }, { id: 'e4-5', source: '4', target: '5' },
];

const boetNodesRaw = [
  { id: '1', type: 'input', data: { icon: <Database/>, label: 'Data Ingestion' }, position: { x: 250, y: 5 } },
  { id: '2', data: { icon: <Cpu/>, label: 'Data Processing' }, position: { x: 250, y: 125 } },
  { id: '3', data: { icon: <Lightbulb/>, label: 'Insight Generation' }, position: { x: 250, y: 250 } },
  { id: '4', data: { icon: <BarChart/>, label: 'Visualization' }, position: { x: 100, y: 375 } },
  { id: '5', type: 'output', data: { icon: <FileText/>, label: 'Reporting' }, position: { x: 400, y: 375 } },
];
const boetEdges = [
  { id: 'e1-2', source: '1', target: '2' }, { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' }, { id: 'e3-5', source: '3', target: '5' },
];

const mauiNodesRaw = [
  { id: '1', type: 'input', data: { icon: <UserCheck/>, label: 'User Intent' }, position: { x: 400, y: 0 } },
  { id: 'b1', data: { icon: <GitBranch/>, label: 'Branch: Support' }, position: { x: 150, y: 100 } },
  { id: '2', data: { icon: <Search/>, label: 'Identify Issue' }, position: { x: 150, y: 200 } },
  { id: '3', data: { icon: <FileText/>, label: 'Search KB' }, position: { x: 150, y: 300 } },
  { id: '4', data: { icon: <AlertTriangle/>, label: 'Escalate' }, position: { x: 150, y: 400 } },
  { id: 'b2', data: { icon: <GitBranch/>, label: 'Branch: Analysis' }, position: { x: 400, y: 100 } },
  { id: '5', data: { icon: <Database/>, label: 'Query Database' }, position: { x: 400, y: 200 } },
  { id: '6', data: { icon: <BrainCircuit/>, label: 'Aggregate Data' }, position: { x: 400, y: 300 } },
  { id: '7', data: { icon: <BarChart/>, label: 'Generate Report' }, position: { x: 400, y: 400 } },
  { id: 'b3', data: { icon: <GitBranch/>, label: 'Branch: Engagement' }, position: { x: 650, y: 100 } },
  { id: '8', data: { icon: <Users/>, label: 'Analyze Behavior' }, position: { x: 650, y: 200 } },
  { id: '9', data: { icon: <Lightbulb/>, label: 'Find Opportunity' }, position: { x: 650, y: 300 } },
  { id: '10', data: { icon: <Send/>, label: 'Send Message' }, position: { x: 650, y: 400 } },
  { id: '11', type: 'output', data: { icon: <Flag/>, label: 'End' }, position: { x: 400, y: 550 } },
];
const mauiEdges = [
  { id: 'e1-b1', source: '1', target: 'b1' }, { id: 'e1-b2', source: '1', target: 'b2' }, { id: 'e1-b3', source: '1', target: 'b3' },
  { id: 'eb1-2', source: 'b1', target: '2' }, { id: 'e2-3', source: '2', target: '3' }, { id: 'e3-4', source: '3', target: '4' }, { id: 'e4-11', source: '4', target: '11' },
  { id: 'eb2-5', source: 'b2', target: '5' }, { id: 'e5-6', source: '5', target: '6' }, { id: 'e6-7', source: '6', target: '7' }, { id: 'e7-11', source: '7', target: '11' },
  { id: 'eb3-8', source: 'b3', target: '8' }, { id: 'e8-9', source: '8', target: '9' }, { id: 'e9-10', source: '9', target: '10' }, { id: 'e10-11', source: '10', target: '11' },
];

const graphMap = {
  hermes: { nodes: hermesNodesRaw, edges: hermesEdges },
  boet: { nodes: boetNodesRaw, edges: boetEdges },
  maui: { nodes: mauiNodesRaw, edges: mauiEdges },
};

// Helper to format large numbers
const formatCount = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
};

const AnalyticsNode: React.FC<NodeProps> = ({ data }) => {
  const { t } = useTranslation();
  const { icon, label, count, conversion } = data;
  const isHighConversion = conversion >= 80;
  const isLowConversion = conversion < 50;

  return (
    <div className="p-3 bg-white rounded-lg shadow-md border border-gray-200 w-60">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-blue-500">{React.cloneElement(icon, { className: 'w-5 h-5' })}</div>
        <div className="font-bold text-gray-800 text-md">{label}</div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center text-gray-600">
          <span>{t('analytics.bots.executions')}</span>
          <span className="font-semibold text-gray-800">{formatCount(count)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t('analytics.bots.conversion')}</span>
          <div className={`flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${isHighConversion ? 'text-green-700 bg-green-100' : isLowConversion ? 'text-red-700 bg-red-100' : 'text-yellow-700 bg-yellow-100'}`}>
            {isHighConversion ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{conversion}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  analyticsNode: AnalyticsNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
  style: { strokeWidth: 2, stroke: '#9ca3af' }, // A lighter gray (gray-400)
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#9ca3af',
  },
};

const BotAnalytics = () => {
  const { t } = useTranslation();
  const [selectedAgent, setSelectedAgent] = useState('maui');

  const processedNodes = useMemo(() => {
    const agentData = analyticsData[selectedAgent as keyof typeof analyticsData];
    const rawNodes = graphMap[selectedAgent as keyof typeof graphMap].nodes;

    return rawNodes.map(node => {
      const stats = agentData[node.id as keyof typeof agentData] || { count: 0, conversion: 0 };
      return {
        ...node,
        type: 'analyticsNode',
        data: {
          ...node.data,
          ...stats,
        },
      };
    });
  }, [selectedAgent]);

  const edges = useMemo(() => graphMap[selectedAgent as keyof typeof graphMap].edges, [selectedAgent]);

  return (
    <div className="p-4 sm:p-6 flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('analytics.bots.title')}</h1>
        <div className="w-64">
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('analytics.bots.selectAgent')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hermes">Hermes</SelectItem>
              <SelectItem value="boet">Boet</SelectItem>
              <SelectItem value="maui">Maui</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="w-full flex-grow flex flex-col">
        <CardContent className="flex-grow p-0">
        <ReactFlow
          nodes={processedNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
        </CardContent>
      </Card>
    </div>
  );
};

export default BotAnalytics;