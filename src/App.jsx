import SubjectDetails from "./pages/SubjectDetails";
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
          id: "spanish",
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

  return (
    <>
      <SubjectDetails
        grades={grades}
        setGrades={setGrades}
        categories={categories}
        setCategories={setCategories}
      />
    </>
  );
}

export default App;
