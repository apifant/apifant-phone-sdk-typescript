/**
 * This exception is thrown when an error occurs in the API client.
 */
export class ApiFantException extends Error {
    private readonly error: string;

    constructor(error: string) {
        super(error);
        this.error = error;
        // Set the prototype explicitly for proper inheritance in TypeScript
        Object.setPrototypeOf(this, ApiFantException.prototype);
    }

    toString(): string {
        return this.error;
    }
}