import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import DatePicker from "./DatePicker";
import { Plus } from "lucide-react";
import { isFormFilled } from "../utils/subject-table-utils";

export default function SubjectTableDialog({
  categories,
  dialogOpen,
  setDialogOpen,
  newEntry,
  setNewEntry,
  addEntry,
  editMode = false,
}) {
  const isFilled = isFormFilled(newEntry);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!editMode && (
        <DialogTrigger asChild>
          <Button>
            <Plus />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Entry" : "New Entry"}</DialogTitle>
          <DialogDescription>
            {editMode
              ? "Edit the details for this grade entry."
              : "Fill in the details for the new grade entry."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-1">
            <label>Name</label>
            <Input
              value={newEntry.name}
              onChange={e =>
                setNewEntry({ ...newEntry, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Type</label>
            <Select
              value={newEntry.type}
              onValueChange={value =>
                setNewEntry({ ...newEntry, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Date</label>
            <DatePicker
              value={newEntry.date}
              onChange={date => setNewEntry({ ...newEntry, date })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Term</label>
            <Select
              value={newEntry.term}
              onValueChange={value =>
                setNewEntry({ ...newEntry, term: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Mark</label>
            <Input
              type="number"
              step="0.1"
              value={newEntry.mark}
              className="w-20"
              onChange={e =>
                setNewEntry({ ...newEntry, mark: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!isFilled}
            onClick={() => {
              addEntry();
              setDialogOpen(false);
            }}
          >
            {editMode ? "Save Entry" : "Add Entry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
