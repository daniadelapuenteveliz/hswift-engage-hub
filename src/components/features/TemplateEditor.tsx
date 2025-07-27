import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Template } from '@/data/mockData';
import { Separator } from '@/components/ui/separator';

interface TemplateEditorProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, isOpen, onClose }) => {
  const { t } = useTranslation();
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(template);
  const [params, setParams] = useState<string[]>([]);
  const [testValues, setTestValues] = useState<{ [key: string]: string }>({});

  const extractParams = (content: string): string[] => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = content.match(regex) || [];
    const params = matches.map(p => p.replace(/\{\{|\}\}/g, ''));
    return [...new Set(params)]; // Remove duplicates
  };

  useEffect(() => {
    setEditedTemplate(template);
    if (template?.content) {
      const foundParams = extractParams(template.content);
      setParams(foundParams);
      // Reset test values
      setTestValues(foundParams.reduce((acc, p) => ({ ...acc, [p]: '' }), {}));
    }
  }, [template]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (editedTemplate) {
      setEditedTemplate({ ...editedTemplate, content: newContent });
      const foundParams = extractParams(newContent);
      setParams(foundParams);
    }
  };

  const handleTestValueChange = (param: string, value: string) => {
    setTestValues(prev => ({ ...prev, [param]: value }));
  };

  const renderPreview = () => {
    if (!editedTemplate) return '';

    const content = editedTemplate.content;
    const regex = /\{\{([^}]+)\}\}/g;
    let result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      result.push(content.substring(lastIndex, match.index));
      const paramName = match[1];
      const fullMatch = match[0];
      result.push(testValues[paramName] || fullMatch);
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      result.push(content.substring(lastIndex));
    }

    return result.join('');
  };

  if (!editedTemplate) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6">
            <SheetTitle className="text-2xl font-bold">{t('templates.editor.title')}</SheetTitle>
            <SheetDescription>{t('templates.editor.description')}</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Label htmlFor="name">{t('templates.editor.name')}</Label>
                <Input id="name" value={editedTemplate.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="category">{t('templates.editor.category')}</Label>
                <Select value={editedTemplate.category}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={t('templates.editor.selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing">{t('templates.editor.categories.marketing')}</SelectItem>
                    <SelectItem value="Utility">{t('templates.editor.categories.utility')}</SelectItem>
                    <SelectItem value="Authentication">{t('templates.editor.categories.authentication')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">{t('templates.language')}</Label>
                <Select value={editedTemplate.language}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={t('templates.editor.selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Español">Español</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <Label>{t('templates.editor.contentEditorPreview')}</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Textarea
                  id="content"
                  value={editedTemplate.content}
                  onChange={handleContentChange}
                  className="min-h-[200px] bg-white dark:bg-slate-900"
                  placeholder={t('templates.editor.contentPlaceholder')}
                />
                <div className="flex items-center justify-center p-4 bg-cover bg-center rounded-md" style={{ backgroundImage: `url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')`}}>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3 max-w-full shadow-md">
                        <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{renderPreview()}</p>
                        <p className="text-xs text-right mt-1 text-gray-400">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
              </div>
            </div>

            {params.length > 0 && (
              <div>
                <Separator className="my-6" />
                <h3 className="text-lg font-semibold mb-4">{t('templates.editor.testParameters')}</h3>
                <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border">
                  <p className="text-sm text-muted-foreground">{t('templates.editor.testParametersDescription')}</p>
                  {params.map(param => (
                    <div key={param}>
                      <Label htmlFor={`param-${param}`}>{`{{${param}}}`}</Label>
                      <Input 
                        id={`param-${param}`} 
                        placeholder={t('templates.editor.testParametersExample')}
                        className="mt-1" 
                        value={testValues[param] || ''}
                        onChange={(e) => handleTestValueChange(param, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <SheetFooter className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t">
            <SheetClose asChild>
              <Button variant="outline">{t('templates.editor.cancel')}</Button>
            </SheetClose>
            <Button type="submit">{t('templates.editor.save')}</Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TemplateEditor;