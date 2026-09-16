export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number = 500, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('/') ? endpoint : `/api/${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = json?.error?.message || `Request failed with status ${response.status}`;
    throw new ApiError(errorMsg, response.status, json);
  }

  return json?.data ?? json;
}
