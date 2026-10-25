export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("andrew id")) {
    return "dalmohan"
  }

  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "D";
  }

  if (query.toLowerCase().includes("age")) {
    return "20";
  }

  const addition = query.match(/-?\d+(?:\.\d+)?(?:\s*(?:plus|\+)\s*-?\d+(?:\.\d+)?)+/i);
  const additionRequested = /\b(?:add|addition)\b/i.test(query);
  if (addition || additionRequested) {
    const numbers = (addition?.[0] ?? query).match(/-?\d+(?:\.\d+)?/g) ?? [];
    if (numbers.length < 2) {
      return "";
    }
    return String(numbers.reduce((sum, number) => sum + Number(number), 0));
  }

  const comparison = query.match(/\b(largest|larger|biggest|greatest|highest|smallest|smaller|lowest)\b/i);
  if (comparison) {
    const numbers = query.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
    if (numbers.length < 2) {
      return "";
    }
    const wantsSmallest = /^(smallest|smaller|lowest)$/i.test(comparison[1]);
    return String(wantsSmallest ? Math.min(...numbers) : Math.max(...numbers));
  }

  return "";
}
