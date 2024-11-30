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
