import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Dhabya"
          ));
    })

    test('should add numbers in the question', () => {
        expect(QueryProcessor("What is 30 plus 18?")).toBe("48");
        expect(QueryProcessor("What is 22 plus 83?")).toBe("105");
        expect(QueryProcessor("What is 30 plus 18 plus 7?")).toBe("55");
        expect(QueryProcessor("What is 30 + 18 + 7?")).toBe("55");
        expect(QueryProcessor("What is the addition of 30 and 18?")).toBe("48");
        expect(QueryProcessor("Add 22 and 83")).toBe("105");
        expect(QueryProcessor("What is 46 plus 87 multiplied by 42?")).toBe("3700");
    });

    test('should calculate powers exactly', () => {
        expect(QueryProcessor("What is 39 to the power of 65?")).toBe("26254240347363745754617745325509020787281403007589766257518484718066029234925468314010924538244020994599");
    });

    test('should understand common arithmetic phrasings', () => {
        expect(QueryProcessor("What is the sum of 22 and 83?")).toBe("105");
        expect(QueryProcessor("Subtract 18 from 30")).toBe("12");
        expect(QueryProcessor("What is the product of 6 and 7?")).toBe("42");
        expect(QueryProcessor("Divide 84 by 12")).toBe("7");
    });

    test('should return the largest number in a list', () => {
        expect(QueryProcessor("Which of the following numbers is the largest: 63, 34, 29?")).toBe("63");
        expect(QueryProcessor("Which is larger, 34 or 63?")).toBe("63");
        expect(QueryProcessor("Which is smaller, 34 or 63?")).toBe("34");
    });

    test('should subtract numbers in the question', () => {
        expect(QueryProcessor("What is 71 minus 94?")).toBe("-23");
    });

    test('should return the prime numbers in a list', () => {
        expect(QueryProcessor("Which of the following numbers are primes: 4, 70, 25, 17, 20?")).toBe("17");
        expect(QueryProcessor("Is 17 a prime number?")).toBe("Yes");
        expect(QueryProcessor("Is 18 a prime number?")).toBe("No");
    });

    test('should calculate Scrabble scores for different words', () => {
        expect(QueryProcessor("What is the Scrabble score of september?")).toBe("15");
        expect(QueryProcessor("What is the Scrabble score for quiz?")).toBe("22");
    });
});