import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WeightPopover from './WeightPopover'

export default function CategoryMark({
  categories,
  setCategories,
  catAveragesByTerm,
  term,
  catAverages,
}) {
  const [values, setValues] = useState(categories);
  console.log(catAveragesByTerm);
  function getResult(mark) {
    let grade;
    if (!mark) return;
    if (mark < 5) {
      grade = "NA";
    } else if (mark < 7) {
      grade = "AS";
    } else if (mark < 8.5) {
      grade = "AN";
    } else {
      grade = "AE";
    }
    return grade;
  }

  return (
    <div className="h-fit rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-100 hover:bg-gray-200">
          <TableRow>
            <TableHead className="w-[100px]">Category</TableHead>
            <TableHead>
              <WeightPopover values={values} setValues={setValues} setCategories={setCategories}/>
            </TableHead>
            <TableHead>Mark</TableHead>
            <TableHead className="text-right">Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {catAveragesByTerm &&
            catAveragesByTerm[term] &&
            Object.entries(catAveragesByTerm[term]).map(([cat, avg]) => {
              // CAMBIO: buscar por name no por id
              const weight = categories.find((cate) => cate.name === cat)?.weight;
              return (
                <TableRow key={cat}>
                  <TableCell className="font-medium">{cat}</TableCell>
                  <TableCell>{weight}%</TableCell>
                  <TableCell>{avg}</TableCell>
                  <TableCell className="text-right">{getResult(avg)}</TableCell>
                </TableRow>
              );
            })}
          {catAverages &&
            Object.entries(catAverages).map(([cat, avg]) => {
              // CAMBIO: buscar por name no por id
              const weight = categories.find((cate) => cate.name === cat)?.weight;
              return (
                <TableRow key={cat}>
                  <TableCell className="font-medium">{cat}</TableCell>
                  <TableCell>{weight}%</TableCell>
                  <TableCell>{avg}</TableCell>
                  <TableCell className="text-right">{getResult(avg)}</TableCell>
                </TableRow>
              );
            })}
          {!catAverages && !catAveragesByTerm[term] ?
            categories.map((cat, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell>{cat.weight}%</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
            )) : null }
        </TableBody>
      </Table>
    </div>
  );
}
