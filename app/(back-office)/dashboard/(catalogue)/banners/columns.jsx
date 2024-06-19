"use client";

import { Checkbox } from "@/components/ui/checkbox";
import TitleColumn from "@/components/data-table-columns/TitleColumn";
import ImageColumn from "@/components/data-table-columns/ImageColumn";
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
    header: "Banner Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "link",
    header: "Banner Link",
    cell: ({ row }) => {
      const link = row.getValue("link");
      return <div className=" line-clamp-1">{link}</div>;
    },
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
      const banners = row.original;
      return (
        <ActionColumn
          row={row}
          title="Banner"
          endpoint={`banners/${banners.id}`}
          editEndpoint={`banners/update/${banners.id}`}
        />
      );
    },
  },
];
