import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { getColumns } from "./SubjectTableColumns";
import SubjectTableDialog from "./SubjectTableDialog";
import { arrIncludes } from "../utils/subject-table-utils";

export default function SubjectTable({ grades: data, setGrades, categories, subject }) {
  const [sorting, setSorting] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Array with categories name
  let categoriesName = Array.from(categories, (cat) => cat.name);
  console.log(categoriesName);

  const [typeFilter, setTypeFilter] = useState([...categoriesName]);
  const [termFilter, setTermFilter] = useState(["1", "2", "3"]);
  const [columnFilters, setColumnFilters] = useState([
    { id: "type", value: [...categoriesName] },
    { id: "term", value: ["1", "2", "3"] },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");
  const [newEntry, setNewEntry] = useState({
    name: "",
    type: "Exam",
    date: null,
    term: "1",
    mark: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // For editing
  const [editEntry, setEditEntry] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const newNames = categories.map((cat) => cat.name);
    setTypeFilter(newNames); // mostrar todas automáticamente
    setColumnFilters((filters) => [
      ...filters.filter((f) => f.id !== "type"),
      { id: "type", value: newNames },
    ]);
  }, [categories]);

  // Sorting Toggle Logic
  const handleSortingToggle = (column) => {
    const id = column.id;
    const current = sorting.find((s) => s.id === id);
    let nextSorting;
    if (!current) {
      nextSorting = [{ id, desc: false }];
    } else if (!current.desc) {
      nextSorting = [{ id, desc: true }];
    } else {
      nextSorting = sorting.filter((s) => s.id !== id);
    }
    setSorting(nextSorting);
  };

  // Utiliza esto para guardar como string local en YYYY-MM-DD
  function formatDateLocal(date) {
    // "en-CA" da formato YYYY-MM-DD
    return date instanceof Date ? date.toLocaleDateString("en-CA") : date;
  }

  const addEntry = () => {
    if (
      newEntry.name.trim() === "" ||
      newEntry.type.trim() === "" ||
      newEntry.date === null ||
      newEntry.term.trim() === "" ||
      newEntry.mark.trim() === ""
    )
      return;

    // TODO : make the subject part dynamic
    setGrades((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        subject: subject,
        name: newEntry.name,
        type: newEntry.type,
        date: formatDateLocal(newEntry.date),
        term: newEntry.term,
        mark: parseFloat(newEntry.mark),
      },
    ]);
    setNewEntry({ name: "", type: "Exam", date: null, term: "1", mark: "" });
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setGrades((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEditSubmit = () => {
    setGrades((prev) =>
      prev.map((e) =>
        e.id === editEntry.id
          ? {
            ...editEntry,
            date:
              editEntry.date instanceof Date
                ? formatDateLocal(editEntry.date)
                : editEntry.date,
          }
          : e,
      ),
    );
    setEditDialogOpen(false);
  };

  const columns = getColumns({
    categoriesName,
    handleSortingToggle,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: { pageIndex, pageSize },
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      options: { categoriesName },
      updateType: (id, newType) => {
        setGrades((prev) =>
          prev.map((grade) =>
            grade.id === id ? { ...grade, type: newType } : grade,
          ),
        );
      },
    },
    filterFns: {
      arrIncludes,
    },
  });

  const handleTypeFilter = (cat, checked) => {
    const nuevo = checked
      ? [...typeFilter, cat]
      : typeFilter.filter((v) => v !== cat);
    setTypeFilter(nuevo);
    setColumnFilters((filters) => [
      ...filters.filter((f) => f.id !== "type"),
      { id: "type", value: nuevo },
    ]);
  };

  const handleTermFilter = (t, checked) => {
    const nuevo = checked
      ? [...termFilter, t]
      : termFilter.filter((v) => v !== t);
    setTermFilter(nuevo);
    setColumnFilters((filters) => [
      ...filters.filter((f) => f.id !== "term"),
      { id: "term", value: nuevo },
    ]);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="Filter by name..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border rounded-md px-2 py-1 w-75"
        />
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Type <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categoriesName.map((cat) => (
                <DropdownMenuCheckboxItem
                  key={cat}
                  checked={typeFilter.includes(cat)}
                  onCheckedChange={(checked) => handleTypeFilter(cat, checked)}
                >
                  {cat}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Term */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Term <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["1", "2", "3"].map((t) => (
                <DropdownMenuCheckboxItem
                  key={t}
                  checked={termFilter.includes(t)}
                  onCheckedChange={(checked) => handleTermFilter(t, checked)}
                >
                  {t}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SubjectTableDialog
          categories={categoriesName}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          newEntry={newEntry}
          setNewEntry={setNewEntry}
          addEntry={addEntry}
        />
        {/* Edit dialog */}
        {editDialogOpen && (
          <SubjectTableDialog
            categories={categoriesName}
            dialogOpen={editDialogOpen}
            setDialogOpen={setEditDialogOpen}
            newEntry={editEntry}
            setNewEntry={setEditEntry}
            addEntry={handleEditSubmit}
            editMode
          />
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
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
                        cell.getContext(),
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
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-3 mt-3">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <span className="text-muted-foreground text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>
    </>
  );
}
