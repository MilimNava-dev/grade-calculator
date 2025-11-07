export const arrIncludes = (row, columnId, filterValue) => {
  if (filterValue.length === 0) return false;
  return filterValue.includes(String(row.getValue(columnId)));
};

export const isFormFilled = (entry) =>
  entry.name?.trim() !== "" &&
  entry.type?.trim() !== "" &&
  entry.date !== null &&
  entry.term?.trim() !== "" &&
  String(entry.mark).trim() !== "";
