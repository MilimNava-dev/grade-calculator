import { ArrowUpDown, ChevronUp, ChevronDown, MoreVertical, Trash2, SquarePen } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Sorting Icon for Header
export function SortingIcon(column) {
  if (!column.getIsSorted()) {
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  }
  if (column.getIsSorted() === "asc") {
    return <ChevronUp className="ml-2 h-4 w-4" />;
  }
  if (column.getIsSorted() === "desc") {
    return <ChevronDown className="ml-2 h-4 w-4" />;
  }
  return null;
}

export function getColumns({ categoriesName, handleSortingToggle, onEdit, onDelete }) {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      filterFn: "arrIncludes",
      cell: ({ row, table }) => {
        const currentType = row.getValue("type");
        const { options } = table.options.meta;
        return (
          <Select
            value={currentType}
            onValueChange={(value) => {
              table.options.meta.updateType(row.original.id, value);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {options.categoriesName.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => handleSortingToggle(column)}>
          Date {SortingIcon(column)}
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue("date")}</span>,
      meta: {
        className: "hidden md:table-cell",
      },
    },
    {
      accessorKey: "term",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => handleSortingToggle(column)}>
          Term {SortingIcon(column)}
        </Button>
      ),
      filterFn: "arrIncludes",
      cell: ({ row }) => {
        const term = row.getValue("term");
        let classes = "";
        switch (term) {
          case "1":
            classes = "bg-blue-50 border-blue-400";
            break;
          case "2":
            classes = "bg-lime-50 border-lime-400";
            break;
          case "3":
            classes = "bg-amber-50 border-amber-400";
            break;
        }
        return (
          <span
            className={`block w-fit m-auto text-center py-1 px-3 rounded-md border ${classes}`}
          >
            {term}
          </span>
        );
      },
      meta: {
        className: "hidden md:table-cell",
      },
    },
    {
      accessorKey: "mark",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => handleSortingToggle(column)}>
          Mark {SortingIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <span className="block w-full text-center font-bold">
          {row.getValue("mark")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <SquarePen /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(row.original.id)}>
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
