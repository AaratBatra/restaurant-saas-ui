'use client';
import { Button } from '@/components/ui/button';
import WMYDateRange from '@/components/ui/WMYDateRange';
import { useFullDataTable } from '@/hooks/use-full-data-table';
import { endOfMonth, startOfMonth } from 'date-fns';
import { Download, Plus, Trash } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker';
import { generateData } from './makeData';
import { reportColumns, ReportTable } from './reportColumns';
import { ColumnDef } from '@tanstack/react-table';
import FullDataTable from '@/components/FullDataTable';

const Report = () => {
  const [date, setDate] = useState<DateRange | undefined>({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    });
    const initData = useMemo(() => generateData(), []);
    const props = useFullDataTable<ReportTable>(initData, reportColumns as ColumnDef<ReportTable>[]);
  return (
    <div className='w-full p-4'>
      <div className="w-full flex items-center justify-between mb-4">
				<h1>Reports</h1>
				<WMYDateRange date={date} setDate={setDate} />
			</div>
			<div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2 place-self-end">
          <Button><Download />Download</Button>
          <Button><Trash />Delete</Button>
          <Button><Plus />Create New</Button>
        </div>
        <div className="w-full p-2">
          <FullDataTable {...props} />
        </div>
      </div>
    </div>
  )
}

export default Report
