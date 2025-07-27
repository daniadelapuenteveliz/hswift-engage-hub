import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { Template } from '@/data/mockData';

/**
 * Renders a template by replacing placeholders with actual data.
 * @param template The template object.
 * @returns The rendered template content as a string.
 */
export const renderTemplate = (template: Template): string => {
  if (!template.examples) {
    return template.content;
  }

  let renderedContent = template.content;
  for (const key in template.examples) {
    const placeholder = `{{${key}}}`;
    const value = template.examples[key];
    renderedContent = renderedContent.replace(new RegExp(placeholder, 'g'), value);
  }

  return renderedContent;
};
