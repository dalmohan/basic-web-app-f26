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

  if (/\bprime\b/i.test(query)) {
    const numbers = query.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
    const isPrime = (candidate: number): boolean => {
      if (!Number.isInteger(candidate) || candidate < 2) {
        return false;
      }
      for (let divisor = 2; divisor <= Math.sqrt(candidate); divisor += 1) {
        if (candidate % divisor === 0) {
          return false;
        }
      }
      return true;
    };

    if (/\bprimes\b|\bwhich\b/i.test(query)) {
      const primes = numbers.filter(isPrime);
      return primes.length > 0 ? primes.join(", ") : "None";
    }

    return numbers.length > 0 && isPrime(numbers[0]) ? "Yes" : "No";
  }

  const subtraction = query.match(/(-?\d+(?:\.\d+)?)\s*(?:minus|−|-)\s*(-?\d+(?:\.\d+)?)/i);
  if (subtraction) {
    return String(Number(subtraction[1]) - Number(subtraction[2]));
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
