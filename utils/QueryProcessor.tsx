function evaluateArithmeticExpression(expression: string): number {
  const tokens = expression.match(/-?\d+(?:\.\d+)?|multiplied\s+by|divided\s+by|to\s+the\s+power\s+of|raised\s+to\s+(?:the\s+)?power\s+of|to\s+power|plus|minus|times|[+*/^×÷]/gi) ?? [];
  const values = tokens.filter((_, index) => index % 2 === 0).map(Number);
  const operators = tokens
    .filter((_, index) => index % 2 === 1)
    .map((operator) => {
      const normalized = operator.toLowerCase().replace(/\s+/g, " ");
      if (["multiplied by", "times", "×"].includes(normalized)) return "*";
      if (["divided by", "÷"].includes(normalized)) return "/";
      if (["to the power of", "raised to the power of", "to power", "^"].includes(normalized)) return "^";
      if (normalized === "minus") return "-";
      return normalized;
    });

  for (const precedenceOperator of ["^", "*", "/"]) {
    for (let index = 0; index < operators.length;) {
      if (operators[index] === precedenceOperator) {
        if (precedenceOperator === "^") {
          values[index] = values[index] ** values[index + 1];
        } else if (precedenceOperator === "*") {
          values[index] *= values[index + 1];
        } else {
          values[index] /= values[index + 1];
        }
        values.splice(index + 1, 1);
        operators.splice(index, 1);
      } else {
        index += 1;
      }
    }
  }

  return values.reduce((total, value, index) => {
    if (index === 0) return value;
    return operators[index - 1] === "-" ? total - value : total + value;
  }, 0);
}

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

  const power = query.match(/(-?\d+)\s*(?:to\s+the\s+power\s+of|raised\s+to\s+(?:the\s+)?power\s+of|to\s+power|\^)\s*(\d+)/i);
  const otherOperation = power && query.replace(power[0], "").match(/\b(?:plus|minus|multiplied\s+by|times|divided\s+by)\b|[+*/×÷]/i);
  if (power && !otherOperation) {
    let base = BigInt(power[1]);
    let exponent = BigInt(power[2]);
    let result = BigInt(1);
    while (exponent > BigInt(0)) {
      if (exponent % BigInt(2) === BigInt(1)) {
        result *= base;
      }
      base *= base;
      exponent /= BigInt(2);
    }
    return result.toString();
  }

  const arithmeticExpression = query.match(/-?\d+(?:\.\d+)?(?:\s*(?:plus|minus|multiplied\s+by|times|divided\s+by|to\s+the\s+power\s+of|raised\s+to\s+(?:the\s+)?power\s+of|to\s+power|[+*/^×÷])\s*-?\d+(?:\.\d+)?)+/i);
  if (arithmeticExpression) {
    return String(evaluateArithmeticExpression(arithmeticExpression[0]));
  }

  if (/\bprimes?\b/i.test(query)) {
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
    const numbers: string[] = (addition?.[0] ?? query).match(/-?\d+(?:\.\d+)?/g) ?? [];
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
