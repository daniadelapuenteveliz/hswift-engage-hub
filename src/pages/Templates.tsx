import { useState, useRef } from 'react';
import TemplatePreview, { TemplatePreviewRef } from '@/components/features/TemplatePreview';
import TemplateEditor from '@/components/features/TemplateEditor';
import { renderTemplate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Template, templates as mockTemplates } from '@/data/mockData';
import { Users, MessageSquareReply, Languages, Search, Plus, MoreHorizontal, Eye } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const templatePreviewRef = useRef<TemplatePreviewRef>(null);

  const handleCardClick = (template: Template) => {
    setSelectedTemplate(template);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setTimeout(() => setSelectedTemplate(null), 300);
  };

  const handlePreviewClick = (e: React.MouseEvent, template: Template) => {
    e.stopPropagation();
    if (templatePreviewRef.current) {
      templatePreviewRef.current.addTemplateMessage(template);
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-var(--header-height))] bg-gray-50 dark:bg-gray-900/50">
        <div className="lg:col-span-2 p-6 flex flex-col h-full">
          <div className="flex-shrink-0">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-foreground flex-shrink-0">Templates</h1>
              <div className="relative flex-1 max-w-md mx-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10 bg-background/80 backdrop-blur-sm w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="flex items-center gap-2 flex-shrink-0">
                <Plus className="w-5 h-5" />
                <span>Create Template</span>
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-4 -mr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template, index) => (
                <Card
                  key={index}
                  className="flex flex-col bg-card/80 backdrop-blur-sm border-border/80 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => handleCardClick(template)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className='max-w-[80%]'>
                        <CardTitle className="text-lg font-semibold text-foreground">{template.name}</CardTitle>
                        <Badge variant="secondary" className="mt-2 font-mono">v{template.version}</Badge>
                      </div>
                      <div className="flex items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => handlePreviewClick(e, template)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Preview</p>
                          </TooltipContent>
                        </Tooltip>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>View Stats</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base leading-relaxed">{renderTemplate(template)}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4 mt-4">
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-primary" />
                        <span>{template.recipients.toLocaleString()}</span>
                      </TooltipTrigger>
                      <TooltipContent>Users Reached</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        <Languages className="w-4 h-4 mr-2 text-primary" />
                        <span>{template.language}</span>
                      </TooltipTrigger>
                      <TooltipContent>Language</TooltipContent>
                    </Tooltip>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1 p-6">
          <div className="w-1/3 pl-8 sticky top-24 self-start">
            <TemplatePreview ref={templatePreviewRef} />
          </div>
        </div>
      </div>
      <TemplateEditor template={selectedTemplate} isOpen={isEditorOpen} onClose={handleCloseEditor} />
    </TooltipProvider>
  );
};

export default Templates;
