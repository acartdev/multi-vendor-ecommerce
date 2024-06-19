"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumn from "@/components/data-table-columns/ImageColumn";
import TitleColumn from "@/components/data-table-columns/TitleColumn";
import ActionColumn from "@/components/data-table-columns/ActionColumn";
import DateCreatedColumn from "@/components/data-table-columns/DateCreatedColumn";
import ActiveColumn from "@/components/data-table-columns/ActiveColumn";
import DateCreatedColumnCell from "@/components/data-table-columns/DateCreatedColumnCell";

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
    accessorKey: "title",
    header: ({ column }) => <TitleColumn column={column} title="Title" />,
  },
  {
    accessorKey: "imageUrl",
    header: "Thumbnail",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <ActiveColumn column={column} />,
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
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const training = row.original;
      return (
        <ActionColumn
          row={row}
          title="Market"
          endpoint={`trainings/${training.id}`}
          editEndpoint={`community/update/${training.id}`}

        />
      );
    },
  },
];
