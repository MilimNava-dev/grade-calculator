import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function SubjectCard({ subject, onDelete }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-5">{subject.name}</h2>
      <div className="flex justify-between items-center">
        <Link to={`/subject/${subject.id}`}>
          <Button>View Details</Button>
        </Link>
        <Button variant="destructive" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
