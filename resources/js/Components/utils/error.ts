/**
 * Ensures that the given value is an Error instance.
 * If it is already an Error, it is returned as-is.
 * If it is not an Error, it is wrapped in a new Error instance.
 * @param value - The value to check.
 * @returns An Error instance.
 */
export function ensureError(value: unknown): Error {
    if (value instanceof Error) return value;

    let stringified = "[Unable to stringify the thrown value]";
    try {
        stringified = JSON.stringify(value);
    } catch {
    }

    const error = new Error(
        `This value was thrown as is, not through an Error: ${stringified}`
    );
    return error;
}

type Result<T> = { data: T | null; error: Error | null };

/**
 * Ensures that the given function returns a Promise that resolves to a Result object.
 * If the function throws an error, it is wrapped in a new Error instance and returned as the error property of the Result object.
 * @param asyncFunction - The function to wrap.
 * @returns A function that returns a Promise that resolves to a Result object.
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
    asyncFunction: T
) {
    return async function (
        ...args: Parameters<T>
    ): Promise<Result<Awaited<ReturnType<T>>>> {
        try {
            const data = await asyncFunction(...args);
            return {data, error: null};
        } catch (err) {
            const error = ensureError(err);
            return {data: null, error};
        }
    };
}

/**
 * Ensures that the given Promise resolves to a Result object.
 * If the Promise rejects, it is wrapped in a new Error instance and returned as the error property of the Result object.
 * @param method - The Promise to wrap.
 * @returns A Promise that resolves to a Result object.
 */
export async function withMethodErrorHandling<T>(
    method: Promise<T>
): Promise<Result<T>> {
    try {
        const data = await method;
        return {data, error: null};
    } catch (err) {
        const error = ensureError(err);
        return {data: null, error};
    }
}
