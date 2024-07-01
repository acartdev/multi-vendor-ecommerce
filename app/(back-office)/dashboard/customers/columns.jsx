"use client";

import { Checkbox } from "@/components/ui/checkbox";
import TitleColumn from "@/components/data-table-columns/TitleColumn";
import ActionColumn from "@/components/data-table-columns/ActionColumn";
import DateCreatedColumn from "@/components/data-table-columns/DateCreatedColumn";
import DateCreatedColumnCell from "@/components/data-table-columns/DateCreatedColumnCell";
import DateUpdatedColumnCell from "@/components/data-table-columns/DateCreatedColumnUpdatedCell";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TitleColumn column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TitleColumn column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <TitleColumn column={column} title="Role" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DateCreatedColumn column={column} title="Date Created" />
    ),
    cell: ({ row }) => (
      <DateCreatedColumnCell row={row} accessorKey="createdAt" />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DateCreatedColumn column={column} title="Updated" />
    ),
    cell: ({ row }) => (
      <DateUpdatedColumnCell row={row} accessorKey="updatedAt" />
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <ActionColumn
          row={row}
          title="Customer"
          endpoint={`users/${customer.id}`}
          editEndpoint={`customers/update/${customer.id}`}
          
        />
      );
    },
  },
];
