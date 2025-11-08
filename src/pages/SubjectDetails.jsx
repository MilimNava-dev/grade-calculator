import { useParams, useNavigate } from "react-router-dom";
import SubjectScore from "@/components/SubjectScore";
import SubjectTable from "@/components/SubjectTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SubjectDetails({ grades, setGrades, categories, setCategories }) {
  const { subjectId } = useParams();
  const navigate = useNavigate()

  const subject = categories.find((cat) => cat.id === subjectId);

  if (!subject) {
    return <div>Subject not found</div>;
  }

  const currentCategories = subject.tags;
  const currentGrades = grades.filter((grad) => grad.subject === subjectId);

  return (
    <main className="max-w-[70rem] w-full m-auto p-8 relative">
      <SubjectScore categories={currentCategories} setCategories={setCategories} subject={subject} grades={grades} />
      <SubjectTable grades={currentGrades} setGrades={setGrades} categories={currentCategories} setCategories={setCategories} subject={subjectId} />
      <Button className="rounded-full absolute top-8 left-8" onClick={() => navigate("/")}><ArrowLeft /></Button>
    </main>
  );
}
