import SubjectScore from "@/components/SubjectScore";
import SubjectTable from "@/components/SubjectTable";

export default function SubjectDetails({ grades, setGrades, categories, setCategories }) {
  const subject = "spanish"
  const currentCategories = categories.find(cat => cat.id === subject).tags
  const currentGrades = grades.filter(grad => grad.subject === subject)

  return (
    <main className="max-w-[70rem] w-full m-auto p-8">
      <SubjectScore categories={currentCategories} setCategories={setCategories} subject={subject} grades={grades} />
      <SubjectTable grades={currentGrades} setGrades={setGrades} categories={currentCategories} setCategories={setCategories} />
    </main>
  );
}
