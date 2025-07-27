import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';

// Mock data for conversation threads
const allThreads = Array.from({ length: 53 }, (_, i) => ({
  id: `CONV-${10234 + i}`,
  lastMessage: [
    'Sure, I can help with that! What is your order number?',
    'Thanks for reaching out. Your ticket has been created.',
    'Our new feature is now live! Check it out in your dashboard.',
    'Did you try clearing your cache? That often solves the issue.',
    'Your subscription has been successfully renewed for another year.',
    'We have received your payment. Thank you for your business!',
    'Can you provide a screenshot of the error message?',
  ][i % 7],
  updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
  status: ['Open', 'Closed', 'Pending'][i % 3],
}));

const ITEMS_PER_PAGE = 10;

const ThreadsView = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allThreads.length / ITEMS_PER_PAGE);

  const currentThreads = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allThreads.slice(startIndex, endIndex);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Badge variant="default">Open</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Threads</CardTitle>
        <CardDescription>
          An overview of all ongoing and past conversations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Conversation ID</TableHead>
                <TableHead>Last Message</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="text-right w-[180px]">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentThreads.map((thread) => (
                <TableRow key={thread.id}>
                  <TableCell className="font-mono font-medium">{thread.id}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {thread.lastMessage.substring(0, 50)}
                    {thread.lastMessage.length > 50 && '...'}
                  </TableCell>
                  <TableCell>{getStatusBadge(thread.status)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(thread.updatedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default ThreadsView;
