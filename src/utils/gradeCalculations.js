function round2(num) {
  return Math.round(num * 100) / 100;
}

export function getCategoryAverages(grades, categories) {
  const result = {};
  categories.forEach(tag => {
    // CAMBIO: comparar con tag.name, no tag.id
    const catGrades = grades.filter(g => g.type === tag.name);
    if (catGrades.length > 0) {
      const sum = catGrades.reduce((acc, g) => acc + Math.round(g.mark * 100), 0);
      const avg = sum / catGrades.length / 100;
      result[tag.name] = round2(avg); // CAMBIO: la clave es tag.name
    } else {
      result[tag.name] = null;
    }
  });
  return result;
}

export function getTermFinals(grades, categories) {
  const terms = [...new Set(grades.map(g => g.term))];
  const termFinals = {};

  terms.forEach(term => {
    let finalMark100 = 0;
    let totalWeight = 0;
    categories.forEach(tag => {
      // CAMBIO: comparar con tag.name
      const catGrades = grades.filter(
        g => g.term === term && g.type === tag.name
      );
      if (catGrades.length > 0) {
        const sum = catGrades.reduce((acc, g) => acc + Math.round(g.mark * 100), 0);
        const avg = sum / catGrades.length;
        finalMark100 += avg * (tag.weight / 100);
        totalWeight += tag.weight;
      }
    });
    termFinals[term] = totalWeight > 0 ? round2(finalMark100 / 100) : null;
  });

  return termFinals;
}

export function getTotalFinal(grades, categories) {
  const termFinals = getTermFinals(grades, categories);
  const termValues = Object.values(termFinals).filter(n => n !== null);
  if (termValues.length === 0) return null;
  const sum = termValues.reduce((acc, n) => acc + Math.round(n * 100), 0);
  return round2(sum / termValues.length / 100);
}

export function getCategoryAveragesByTerm(grades, categories) {
  const terms = [...new Set(grades.map(g => g.term))];
  const result = {};
  terms.forEach(term => {
    result[term] = {};
    categories.forEach(tag => {
      // CAMBIO: comparar con tag.name
      const catGrades = grades.filter(
        g => g.term === term && g.type === tag.name
      );
      if (catGrades.length > 0) {
        const sum = catGrades.reduce((acc, g) => acc + Math.round(g.mark * 100), 0);
        const avg = sum / catGrades.length / 100;
        result[term][tag.name] = round2(avg); // CAMBIO: la clave es tag.name
      } else {
        result[term][tag.name] = null;
      }
    });
  });
  return result;
}
