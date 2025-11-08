import { Routes, Route } from "react-router-dom";
import SubjectDetails from "./pages/SubjectDetails";
import SubjectList from "./pages/SubjectList";
import { useState, useEffect } from "react";

function App() {
  const [grades, setGrades] = useState(() => {
    const saved = localStorage.getItem("grades");
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved
      ? JSON.parse(saved)
      : [
        {
          id: "1",
          name: "Spanish",
          tags: [
            { id: "1", name: "Exam", weight: 60 },
            { id: "2", name: "Presentation", weight: 20 },
            { id: "3", name: "HW", weight: 20 },
          ],
        },
      ];
  });

  useEffect(() => {
    localStorage.setItem("grades", JSON.stringify(grades));
  }, [grades]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const deleteSubject = (subjectId) => {
    setCategories(categories.filter((category) => category.id !== subjectId));
    setGrades(grades.filter((grade) => grade.subject !== subjectId));
  };

  return (
    <Routes>
      <Route path="/" element={<SubjectList categories={categories} setCategories={setCategories} deleteSubject={deleteSubject} />} />
      <Route
        path="/subject/:subjectId"
        element={<SubjectDetails
          grades={grades}
          setGrades={setGrades}
          categories={categories}
          setCategories={setCategories}
        />}
      />
    </Routes>
  );
}

export default App;
