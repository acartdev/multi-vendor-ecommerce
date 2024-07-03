"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumn from "@/components/data-table-columns/ImageColumn";
import TitleColumn from "@/components/data-table-columns/TitleColumn";
import ActionColumn from "@/components/data-table-columns/ActionColumn";
import DateCreatedColumn from "@/components/data-table-columns/DateCreatedColumn";
import ActiveColumn from "@/components/data-table-columns/ActiveColumn";
import DateCreatedColumnCell from "@/components/data-table-columns/DateCreatedColumnCell";
import NumberColumn from "@/components/data-table-columns/NumberColumn";

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
    header: "Product Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "salePrice",
    header: ({ column }) => <TitleColumn column={column} title="Sale Price" />,
    cell: ({ row }) => <NumberColumn row={row} accessorKey="salePrice" />,
  },
  {
    accessorKey: "productStock",
    header: ({ column }) => <TitleColumn column={column} title="Stock" />,
    cell: ({ row }) => <NumberColumn row={row} accessorKey="productStock" />,
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
      const products = row.original;
      return (
        <ActionColumn
          row={row}
          title="Product"
          endpoint={`products/${products.id}`}
          editEndpoint={`products/update/${products.id}`}
          imagesUrl={products.imagesUrl}
          
        />
      );
    },
  },
];
