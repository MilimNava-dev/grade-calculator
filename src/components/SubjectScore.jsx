import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryMark from "./CategoryMark";
import {
  getCategoryAverages,
  getTermFinals,
  getTotalFinal,
  getCategoryAveragesByTerm,
} from "../utils/gradeCalculations";

export default function SubjectScore({ categories, setCategories, subject, grades }) {
  const catAverages = getCategoryAverages(grades, categories, subject);
  const termFinals = getTermFinals(grades, categories, subject);
  const totalFinal = getTotalFinal(grades, categories, subject);
  const catAveragesByTerm = getCategoryAveragesByTerm(
    grades,
    categories,
    subject,
  );

  return (
    <div className="flex justify-between w-full py-16 flex-column items-center">
      <div className="flex w-fit gap-8 items-center">
        <div className="bg-black w-40 h-40 rounded-full flex justify-center items-center text-5xl">
          <span className="text-white">
            {totalFinal ? totalFinal.toFixed(2) : "??"}
          </span>
        </div>
        <div className="h-fit rounded-md border overflow-hidden">
          <Table>
            <TableBody>
              {Object.entries(termFinals).map(([term, mark]) => (
                <TableRow key={term}>
                  <TableCell className="font-medium text-gray-700 w-20">
                    Term {term}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {mark ? mark.toFixed(2) : "??"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-200 hover:bg-gray-300">
                <TableCell className="font-medium text-gray-700 w-20">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">
                  {totalFinal ? totalFinal.toFixed(2) : "??"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <Tabs defaultValue="final" className="w-fit">
        <TabsList>
          <TabsTrigger value="term-1">Term 1</TabsTrigger>
          <TabsTrigger value="term-2">Term 2</TabsTrigger>
          <TabsTrigger value="term-3">Term 3</TabsTrigger>
          <TabsTrigger value="final">Final</TabsTrigger>
        </TabsList>
        <TabsContent value="term-1">
          <CategoryMark categories={categories} setCategories={setCategories} catAveragesByTerm={catAveragesByTerm} term={1} />
        </TabsContent>
        <TabsContent value="term-2">
          <CategoryMark categories={categories} setCategories={setCategories} catAveragesByTerm={catAveragesByTerm}term={2}/>
        </TabsContent>
        <TabsContent value="term-3">
          <CategoryMark categories={categories} setCategories={setCategories} catAveragesByTerm={catAveragesByTerm}term={3}/>
        </TabsContent>
        <TabsContent value="final">
          <CategoryMark categories={categories} setCategories={setCategories} catAverages={catAverages}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
