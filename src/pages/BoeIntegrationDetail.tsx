import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Search, PlusCircle, Send, BrainCircuit, ShieldCheck, Trash2, Folder, ChevronRight, Package } from 'lucide-react';

// Mock Data with folder structure
const mockEndpoints = [
  {
    id: 'folder-users',
    type: 'folder',
    name: 'User Management',
    children: [
      {
        id: 'get-users',
        type: 'endpoint',
        method: 'GET',
        path: '/users',
        description: 'Retrieves a list of all users from the system.',
        aiExplanation: 'This endpoint fetches user data without requiring a request body. It is a read-only operation, ideal for populating user lists or dashboards.',
        headers: [{ key: 'Authorization', value: 'Bearer {{api_key}}' }],
        params: [{ key: 'page', value: '1' }, { key: 'limit', value: '25' }],
        body: null,
      },
      {
        id: 'get-user-by-id',
        type: 'endpoint',
        method: 'GET',
        path: '/users/{id}',
        description: 'Retrieves a single user by their unique ID.',
        aiExplanation: 'Fetches detailed information for a specific user. The user ID must be provided in the URL path.',
        headers: [{ key: 'Authorization', value: 'Bearer {{api_key}}' }],
        params: [],
        body: null,
      },
    ]
  },
  {
    id: 'folder-orders',
    type: 'folder',
    name: 'Order Processing',
    children: [
      {
        id: 'create-order',
        type: 'endpoint',
        method: 'POST',
        path: '/orders',
        description: 'Creates a new order with the provided product details.',
        aiExplanation: 'Use this endpoint to add a new order. The request body must contain the product ID and quantity. It returns the newly created order object, including its unique ID.',
        headers: [{ key: 'Authorization', value: 'Bearer {{api_key}}' }, { key: 'Content-Type', value: 'application/json' }],
        params: [],
        body: JSON.stringify({ productId: 'prod_12345', quantity: 2 }, null, 2),
      },
    ]
  },
  {
    id: 'update-inventory',
    type: 'endpoint',
    method: 'PUT',
    path: '/inventory/{itemId}',
    description: 'Updates the stock level for a specific inventory item.',
    aiExplanation: 'This endpoint modifies an existing inventory item. The item\'s ID must be included in the URL path, and the new stock level should be in the request body.',
    headers: [{ key: 'Authorization', value: 'Bearer {{api_key}}' }, { key: 'Content-Type', value: 'application/json' }],
    params: [],
    body: JSON.stringify({ stock: 150 }, null, 2),
  },
];

const HttpMethodBadge = ({ method }) => {
  const colors = {
    GET: 'border-sky-300/50 bg-sky-100 text-sky-700 dark:border-sky-700/50 dark:bg-sky-900/50 dark:text-sky-300',
    POST: 'border-green-300/50 bg-green-100 text-green-700 dark:border-green-700/50 dark:bg-green-900/50 dark:text-green-300',
    PUT: 'border-amber-300/50 bg-amber-100 text-amber-700 dark:border-amber-700/50 dark:bg-amber-900/50 dark:text-amber-300',
    DELETE: 'border-red-300/50 bg-red-100 text-red-700 dark:border-red-700/50 dark:bg-red-900/50 dark:text-red-300',
  };
  return <Badge variant="outline" className={`text-xs ${colors[method] || 'border-gray-300/50 bg-gray-100 text-gray-700'}`}>{method}</Badge>;
};

const EndpointTree = ({ items, onSelect, selectedId, level = 0 }) => {
  const [openFolders, setOpenFolders] = useState(() => {
    const folderIds = new Set();
    items.forEach(item => item.type === 'folder' && folderIds.add(item.id));
    return folderIds;
  });

  const toggleFolder = (folderId) => {
    setOpenFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  return (
    <div>
      {items.map(item => {
        if (item.type === 'folder') {
          const isOpen = openFolders.has(item.id);
          return (
            <div key={item.id} style={{ paddingLeft: `${level * 16}px` }}>
              <button onClick={() => toggleFolder(item.id)} className="w-full text-left p-2 rounded-md flex items-center gap-2 hover:bg-muted/50">
                <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                <Folder className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-sm truncate">{item.name}</span>
              </button>
              {isOpen && <EndpointTree items={item.children} onSelect={onSelect} selectedId={selectedId} level={level + 1} />}
            </div>
          );
        } else {
          return (
            <button key={item.id} onClick={() => onSelect(item)} style={{ paddingLeft: `${level * 16}px` }} className={`w-full text-left p-2 rounded-md flex items-center gap-3 ${selectedId === item.id ? 'bg-muted' : 'hover:bg-muted/50'}`}>
              <HttpMethodBadge method={item.method} />
              <span className="font-mono text-sm truncate">{item.path}</span>
            </button>
          );
        }
      })}
    </div>
  );
};

const BoeIntegrationDetail = () => {
  const [search, setSearch] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState(mockEndpoints[0].children[0]);

  // A more complex filter for tree data is needed if search is to be used
  const filteredEndpoints = useMemo(() => {
    if (!search) return mockEndpoints;
    // Simple search for now, can be improved to filter within folders
    return mockEndpoints.filter(ep => ep.name?.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="p-4 sm:p-6 bg-muted/40 h-[calc(100vh-4rem)]">
      <ResizablePanelGroup direction="horizontal" className="h-full max-w-7xl mx-auto rounded-lg border bg-background shadow-sm">
        {/* Left Panel: Endpoints List */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold">Endpoints</h2>
            <div className="relative my-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search endpoints..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex-grow overflow-auto -mx-4 px-2">
              <EndpointTree items={filteredEndpoints} onSelect={setSelectedEndpoint} selectedId={selectedEndpoint?.id} />
            </div>
            <Button className="mt-2 w-full"><PlusCircle className="w-4 h-4 mr-2" />New Endpoint</Button>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* Center Panel: Request Editor */}
        <ResizablePanel defaultSize={45} minSize={30}>
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Select defaultValue={selectedEndpoint.method}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
              <Input defaultValue={`{{base_url}}${selectedEndpoint.path}`} className="font-mono flex-grow" />
              <Button variant="outline" className="shrink-0"><Package className="w-4 h-4 mr-2" />Export as tools package</Button>
              <Button className="bg-primary hover:bg-primary/90 shrink-0"><Send className="w-4 h-4 mr-2" />Test</Button>
            </div>
            <Tabs defaultValue="body" className="flex-grow flex flex-col">
              <TabsList>
                <TabsTrigger value="params">Params</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
              </TabsList>
              <TabsContent value="params" className="flex-grow mt-2">
                <p className="text-sm text-muted-foreground">Query parameters to be sent with the request.</p>
              </TabsContent>
              <TabsContent value="headers" className="flex-grow mt-2">
                <div className="space-y-2">
                  {selectedEndpoint.headers.map((header, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input defaultValue={header.key} placeholder="Key" />
                      <Input defaultValue={header.value} placeholder="Value" />
                      <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="body" className="flex-grow mt-2 bg-muted rounded-md relative">
                {selectedEndpoint.body ? (
                  <textarea defaultValue={selectedEndpoint.body} className="w-full h-full p-4 bg-transparent font-mono text-sm resize-none border-0 focus:ring-0" />
                ) : (
                  <div className="text-center text-muted-foreground p-8">This request does not have a body.</div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* Right Panel: Documentation */}
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="p-4 h-full flex flex-col space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{selectedEndpoint.description}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-primary" /> AI Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">{selectedEndpoint.aiExplanation}</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400"><ShieldCheck className="w-5 h-5" /> Secure Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-600 dark:text-green-300">All requests are sent through a secure, encrypted channel. Your credentials and data are always protected.</p>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default BoeIntegrationDetail;
