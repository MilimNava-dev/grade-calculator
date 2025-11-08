import { useState } from "react";
import SubjectCard from "@/components/SubjectCard";
import { Button } from "@/components/ui/button";
import CreateSubjectDialog from "@/components/CreateSubjectDialog";
import DeleteSubjectDialog from "@/components/DeleteSubjectDialog";
import { PlusIcon } from "lucide-react";

export default function SubjectList({ categories, setCategories, deleteSubject }) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const handleCreateSubject = (subjectName) => {
    const newSubject = {
      id: crypto.randomUUID(),
      name: subjectName,
      tags: [],
    };
    setCategories([...categories, newSubject]);
  };

  const handleDeleteClick = (subject) => {
    setSubjectToDelete(subject);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (subjectToDelete) {
      deleteSubject(subjectToDelete.id);
      setIsDeleteDialogOpen(false);
      setSubjectToDelete(null);
    }
  };

  return (
    <main className="max-w-[70rem] w-full m-auto py-12 px-6 sm:px-8 md:px-20">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Subjects</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}><PlusIcon /></Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <SubjectCard
            key={category.id}
            subject={category}
            onDelete={() => handleDeleteClick(category)}
          />
        ))}
      </div>
      <CreateSubjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreate={handleCreateSubject}
      />
      {subjectToDelete && (
        <DeleteSubjectDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          subjectName={subjectToDelete.name}
        />
      )}
    </main>
  );
}
