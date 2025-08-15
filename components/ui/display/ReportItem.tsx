/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { FileText, Printer, Download } from 'lucide-react';

const ReportItem = ({ report }: { report: any }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
    <div className="flex items-center space-x-4">
      <FileText className="h-8 w-8 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">{report.name}</p>
        <p className="text-xs text-muted-foreground">{report.description}</p>
        <p className="text-xs text-muted-foreground">
          {report.date} • {report.type}
        </p>
      </div>
    </div>
    <div className="flex space-x-2 ml-12 sm:ml-0">
      <Button variant="outline" size="icon">
        <Printer className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default ReportItem;
