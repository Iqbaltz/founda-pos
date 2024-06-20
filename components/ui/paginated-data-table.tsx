"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PaginatedModel from "@/src/helpers/pagination";
import CustomPagination from "./custom-pagination";
import { formatCurrency } from "@/src/helpers/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: PaginatedModel<TData>;
  onChange: (
    pageNumber: number,
    limit: number,
    key: string,
    sorts: SortingState
  ) => void;
  addLink?: string;
  name?: string;
}

export function PaginatedDataTable<TData, TValue>({
  columns,
  data,
  onChange,
  addLink,
  name,
}: DataTableProps<TData, TValue>) {
  const [searchKey, setSearchKey] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [activeLimit, setActiveLimit] = useState(10);

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  useEffect(() => {
    onChange(1, activeLimit, searchKey, sorting);
  }, [searchKey, sorting, activeLimit]);
  useEffect(() => {
    table.setPageSize(activeLimit);
  }, [activeLimit]);

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <Input
          placeholder="Cari..."
          className="max-w-sm"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        {addLink && (
          <Link href={addLink}>
            <Button
              variant={"secondary"}
              className="flex items-center justify-center gap-1"
            >
              <PlusIcon />
              Tambah
            </Button>
          </Link>
        )}
      </div>
      <div className="flex justify-between mb-1 text-sm opacity-70">
        <span>
          Total {data.total} {name}
        </span>
        <span>Rows per page: {data.per_page}</span>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {data.summary ? (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}></TableCell>
                <TableCell>Total</TableCell>
                <TableCell className="text-left">
                  {formatCurrency(Number(data.summary))}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          ) : (
            <></>
          )}
        </Table>
      </div>
      <div className="flex justify-between py-4 text-sm">
        <div>
          <span>
            Page {data.current_page} of {Math.ceil(data.total / activeLimit)}
          </span>
        </div>
        <div className="flex space-x-2">
          <CustomPagination
            data={data}
            limit={activeLimit}
            setLimit={setActiveLimit}
            onPageChange={(page, limit) => {
              setActiveLimit(limit);
              onChange(page, limit, searchKey, sorting);
            }}
          />
        </div>
      </div>
    </div>
  );
}
