import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Users, MessageSquareReply, Languages, Search, Plus, MoreHorizontal } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const templates = [
  {
    name: "Promoción Exclusiva",
    version: "1.2",
    reachedUsers: 1250,
    responseRate: 18,
    language: "Español",
    preview: "¡Hola, [nombre]! 🎉 No te pierdas nuestras ofertas de mitad de temporada. ¡Hasta 50% de descuento en productos seleccionados! Compra ahora: [link]",
  },
  {
    name: "Recordatorio de Cita",
    version: "1.0",
    reachedUsers: 340,
    responseRate: 45,
    language: "Español",
    preview: "Hola, [nombre]. Te recordamos tu cita con nosotros mañana a las [hora]. Si necesitas reagendar, responde a este mensaje.",
  },
  {
    name: "Tu Pedido Está en Camino",
    version: "2.1",
    reachedUsers: 890,
    responseRate: 8,
    language: "English",
    preview: "¡Buenas noticias, [nombre]! Tu pedido #[número_de_pedido] ha sido enviado y está en camino. Puedes seguirlo aquí: [link_seguimiento]",
  },
  {
    name: "Carrito Abandonado",
    version: "1.5",
    reachedUsers: 620,
    responseRate: 25,
    language: "English",
    preview: "¡Hola, [nombre]! Notamos que dejaste algunos artículos en tu carrito. ¡Completa tu compra antes de que se agoten! Aquí tienes tu carrito: [link_carrito]",
  },
  {
    name: "Solicitud de Feedback",
    version: "1.0",
    reachedUsers: 980,
    responseRate: 32,
    language: "Español",
    preview: "Hola, [nombre], gracias por tu reciente compra. Nos encantaría conocer tu opinión. ¿Podrías dedicarnos un minuto? [link_encuesta]",
  },
];

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Message Templates</h1>
            <p className="text-muted-foreground mt-1">Design, manage, and track your communication blueprints.</p>
          </div>
          <Button size="lg" className="shadow-sm hover:shadow-md transition-shadow">
            <Plus className="w-5 h-5 mr-2" />
            Create New Template
          </Button>
        </div>

        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by template name..."
            className="pl-12 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <Card key={index} className="flex flex-col bg-card/80 backdrop-blur-sm border-border/80 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className='max-w-[80%]'>
                    <CardTitle className="text-lg font-semibold text-foreground">{template.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2 font-mono">v{template.version}</Badge>
                  </div>
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
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base leading-relaxed">{template.preview}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4 mt-4">
                <Tooltip>
                  <TooltipTrigger className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    <span>{template.reachedUsers.toLocaleString()}</span>
                  </TooltipTrigger>
                  <TooltipContent>Users Reached</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger className="flex items-center">
                    <MessageSquareReply className="w-4 h-4 mr-2 text-primary" />
                    <span>{template.responseRate}%</span>
                  </TooltipTrigger>
                  <TooltipContent>Response Rate</TooltipContent>
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
    </TooltipProvider>
  );
};

export default Templates;
