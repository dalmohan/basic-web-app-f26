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



  return "";
}
