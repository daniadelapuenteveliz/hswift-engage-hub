import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from 'lucide-react';

// Mock Data for Tool Sets
const mockToolSets = {
  'boe-tools': {
    name: 'Boe Tools',
    tools: [
      {
        id: 'get_users',
        name: 'get_users',
        description: 'Retrieves a list of all users.',
        enabled: true,
        args: [
          { name: 'page', type: 'number', description: 'The page number for pagination.' },
          { name: 'limit', type: 'number', description: 'The number of users to return per page.' },
        ],
        output: { description: 'A list of user objects.' },
      },
      {
        id: 'create_order',
        name: 'create_order',
        description: 'Creates a new order for a product.',
        enabled: true,
        args: [
          { name: 'productId', type: 'string', description: 'The unique identifier for the product.' },
          { name: 'quantity', type: 'number', description: 'The number of units to order.' },
        ],
        output: { description: 'The newly created order object.' },
      },
    ],
  },
  'search-internet-tool': {
    name: 'Search Internet Tool',
    tools: [
      {
        id: 'search_web',
        name: 'search_web',
        description: 'Performs a web search.',
        enabled: false,
        args: [
          { name: 'query', type: 'string', description: 'The search query.' },
        ],
        output: { description: 'A list of search results with URLs and snippets.' },
      },
    ],
  },
};

const ToolSetConfiguration = () => {
  const { toolSetName } = useParams();
  const toolSet = mockToolSets[toolSetName] || mockToolSets['boe-tools']; // Fallback to default

  const [tools, setTools] = useState(toolSet.tools);
  const [selectedTool, setSelectedTool] = useState(tools[0]);

  const handleToolToggle = (toolId) => {
    setTools(prev =>
      prev.map(t => (t.id === toolId ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const handleArgDescChange = (toolId, argName, value) => {
    setSelectedTool(prev => ({
      ...prev,
      args: prev.args.map(arg => arg.name === argName ? { ...arg, description: value } : arg)
    }));
    setTools(prev =>
      prev.map(t => t.id === toolId ? { ...t, args: t.args.map(arg => arg.name === argName ? { ...arg, description: value } : arg) } : t)
    );
  };

  return (
    <div className="p-4 sm:p-6 h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle>{toolSet.name}</CardTitle>
          <CardDescription>Configure the tools available in this package.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          <div className="space-y-4">
            {tools.map(tool => (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className={`p-3 rounded-lg cursor-pointer border ${selectedTool.id === tool.id ? 'bg-muted border-primary' : 'hover:bg-muted/50'}`}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{tool.name}</span>
                  <Switch
                    checked={tool.enabled}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => handleToolToggle(tool.id)}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedTool && (
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>{selectedTool.name}</CardTitle>
            <CardDescription>Define how the LLM should interpret and use this tool.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto space-y-6">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                These descriptions are crucial. They will be used by the LLM to understand how and when to use this tool autonomously.
              </AlertDescription>
            </Alert>

            <div>
              <h3 className="text-lg font-semibold mb-2">Arguments</h3>
              <div className="space-y-4">
                {selectedTool.args.map(arg => (
                  <div key={arg.name}>
                    <Label htmlFor={`${selectedTool.id}-${arg.name}`}>{arg.name} <span className="text-muted-foreground text-xs">({arg.type})</span></Label>
                    <Input
                      id={`${selectedTool.id}-${arg.name}`}
                      placeholder={`Explain what the '${arg.name}' argument is for...`}
                      value={arg.description}
                      onChange={(e) => handleArgDescChange(selectedTool.id, arg.name, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Output</h3>
              <Label htmlFor={`${selectedTool.id}-output`}>Output Description</Label>
              <Input
                id={`${selectedTool.id}-output`}
                placeholder="Describe what this tool returns..."
                value={selectedTool.output.description}
                // Add onChange handler if output description needs to be editable
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ToolSetConfiguration;
