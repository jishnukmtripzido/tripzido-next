type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  token?: string;
  cache?: RequestCache;
  revalidate?: number;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    token,
    cache = "no-store",
    revalidate,
  } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // attach token only if passed
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: revalidate ? "force-cache" : cache,
    next: revalidate ? { revalidate } : undefined,
  });

  if (!res.ok) {
    let message = `API error: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      if (errorBody?.message) {
        message = errorBody.message;
      }
    } catch {
      // response wasn't JSON — fall back to the generic message above
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

// clean helpers so you just call api.get(), api.post() etc
export const api = {
  get: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<T>(endpoint, { ...options, method: "POST", body }),

  patch: <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<T>(endpoint, { ...options, method: "PATCH", body }),

  put: <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<T>(endpoint, { ...options, method: "PUT", body }),

  delete: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ) => request<T>(endpoint, { ...options, method: "DELETE" }),
};
