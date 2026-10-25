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
    });

    test('should return the largest number in a list', () => {
        expect(QueryProcessor("Which of the following numbers is the largest: 63, 34, 29?")).toBe("63");
        expect(QueryProcessor("Which is larger, 34 or 63?")).toBe("63");
        expect(QueryProcessor("Which is smaller, 34 or 63?")).toBe("34");
    });
});