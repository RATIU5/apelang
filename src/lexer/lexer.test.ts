import token, { TokenType } from "../token/token";
import { it, describe, expect } from "vitest";
import { Lexer } from "./lexer";

describe("TestNextToken", () => {
    const input: string = `let five = 5;
    let ten = 10;
  
    let add = fn(x, y) {
      x + y;
    };
  
    let result = add(five, ten);
    !-/*5;
    5 < 10 > 5;
    #
    `;

    const tests: Array<{
        expectedType: TokenType;
        expectedLiteral: string;
    }> = [
        { expectedType: token.LET, expectedLiteral: "let" },
        { expectedType: token.IDENT, expectedLiteral: "five" },
        { expectedType: token.ASSIGN, expectedLiteral: "=" },
        { expectedType: token.INT, expectedLiteral: "5" },
        { expectedType: token.SEMICOLON, expectedLiteral: ";" },
        { expectedType: token.LET, expectedLiteral: "let" },
        { expectedType: token.IDENT, expectedLiteral: "ten" },
        { expectedType: token.ASSIGN, expectedLiteral: "=" },
        { expectedType: token.INT, expectedLiteral: "10" },
        { expectedType: token.SEMICOLON, expectedLiteral: ";" },
        { expectedType: token.LET, expectedLiteral: "let" },
        { expectedType: token.IDENT, expectedLiteral: "add" },
        { expectedType: token.ASSIGN, expectedLiteral: "=" },
        { expectedType: token.FUNCTION, expectedLiteral: "fn" },
        { expectedType: token.LPAREN, expectedLiteral: "(" },
        { expectedType: token.IDENT, expectedLiteral: "x" },
        { expectedType: token.COMMA, expectedLiteral: "," },
        { expectedType: token.IDENT, expectedLiteral: "y" },
        { expectedType: token.RPAREN, expectedLiteral: ")" },
        { expectedType: token.LBRACE, expectedLiteral: "{" },
        { expectedType: token.IDENT, expectedLiteral: "x" },
        { expectedType: token.PLUS, expectedLiteral: "+" },
        { expectedType: token.IDENT, expectedLiteral: "y" },
        { expectedType: token.SEMICOLON, expectedLiteral: ";" },
        { expectedType: token.RBRACE, expectedLiteral: "}" },
        { expectedType: token.SEMICOLON, expectedLiteral: ";" },
        { expectedType: token.LET, expectedLiteral: "let" },
        { expectedType: token.IDENT, expectedLiteral: "result" },
        { expectedType: token.ASSIGN, expectedLiteral: "=" },
        { expectedType: token.IDENT, expectedLiteral: "add" },
        { expectedType: token.LPAREN, expectedLiteral: "(" },
        { expectedType: token.IDENT, expectedLiteral: "five" },
        { expectedType: token.COMMA, expectedLiteral: "," },
        { expectedType: token.IDENT, expectedLiteral: "ten" },
        { expectedType: token.RPAREN, expectedLiteral: ")" },
        { expectedType: token.SEMICOLON, expectedLiteral: ";" },
    ];

    const l = new Lexer(input);

    for (let i = 0; i < tests.length; i++) {
        const tt = tests[i];
        const tok = l.NextToken();

        it(`checks expected type of ${tok.Type}`, () => {
            expect(() => {
                if (tok.Type !== tt.expectedType) {
                    throw new Error(
                        `tests[${i}] - tokentype wrong. expected=${tt.expectedType}, got=${tok.Type}`
                    );
                }
            }).not.toThrow();
        });

        it(`checks expected literal of ${tok.Literal}`, () => {
            expect(() => {
                if (tok.Literal !== tt.expectedLiteral) {
                    throw new Error(
                        `tests[${i}] - literal wrong. expected=${tt.expectedLiteral}, got=${tok.Literal}`
                    );
                }
            }).not.toThrow();
        });
    }
});
