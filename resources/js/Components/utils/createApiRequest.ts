import { toast } from "sonner";
import { ensureError } from "@/Components/utils/error";

/**
 * Wraps an API function to handle errors and success/failure cases.
 * Displays toast notifications for loading, success, and errors unless `hideToast` is true.
 * @param apiFunction - The API function to wrap.
 * @param onSuccess - Optional callback to execute on successful completion of the API function.
 * @param onError - Optional callback to execute on error.
 * @param shouldRetryOnError - Optional flag to retry the request on error.
 * @param shouldRethrowError - Optional flag to rethrow the error.
 * @param hideToast - Optional flag to suppress toast notifications.
 * @returns A function that wraps the API function and preserves its return value.
 */
export function createApiRequest<T extends (...args: any[]) => Promise<any>>(
    apiFunction: T,
    onSuccess?: (data: Awaited<ReturnType<T>>) => void,
    onError?: (error: Error) => void,
    shouldRetryOnError = false,
    shouldRethrowError = false,
    hideToast = false
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
    return async function (
        ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>>> {
        let retries = shouldRetryOnError ? 1 : 0;

        // Only show the loading toast if hideToast is false
        const toastId = hideToast
            ? undefined
            : toast.loading("Processing request...");

        while (true) {
            try {
                const data = await apiFunction(...args);

                // Handle success
                if (!hideToast) {
                    toast.success("Request completed successfully!", {
                        id: toastId,
                    });
                }
                if (onSuccess) {
                    onSuccess(data);
                }

                return data; // Return the data to the caller
            } catch (error) {
                const ensuredError = ensureError(error);

                // Handle error
                if (!hideToast) {
                    toast.error(`Error: ${ensuredError.message}`, {
                        id: toastId,
                    });
                }

                if (onError) {
                    onError(ensuredError);
                } else {
                    console.error("Unhandled API error:", ensuredError);
                }

                // Retry logic
                if (retries > 0) {
                    retries--;
                    if (!hideToast) {
                        toast.loading("Retrying request...", { id: toastId });
                    }
                    continue; // Retry the loop
                }

                // Rethrow error if flag is set
                if (shouldRethrowError) {
                    throw ensuredError;
                } else {
                    // Otherwise, resolve with null to avoid crashing the caller
                    return null as Awaited<ReturnType<T>>;
                }
            }
        }
    };
}
