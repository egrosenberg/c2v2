import { RequestType, ServiceFn, ServiceMetaFn } from ".";
import { encodeHookOptions } from "./options-transforms";

export type RunQueryOptions = {
  hookOptions: unknown;
  type: RequestType;
  route: string;
  name: string;
};

type QueryResult<T> = {
  data: T;
  error?: string;
};

export function getQuery<T = unknown>(
  options: RunQueryOptions,
): Promise<QueryResult<T>> {
  const encoded = encodeHookOptions(options.hookOptions);
  const uri = options.route + `?name=${options.name}&options=${encoded}`;

  const requestOptions = {
    method: "GET",
  };
  return new Promise((resolve) => {
    fetch(uri, requestOptions).then((response) => resolve(response.json()));
  });
}

export function postQuery<T = unknown>(
  options: RunQueryOptions,
): Promise<QueryResult<T>> {
  const uri = options.route + `?name=${options.name}`;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ options: options.hookOptions }),
  };
  return new Promise((resolve) => {
    fetch(uri, requestOptions).then((response) => resolve(response.json()));
  });
}

export async function runQuery<T = unknown>(
  options: RunQueryOptions,
): Promise<QueryResult<T>> {
  if (options.type === "GET") return getQuery<T>(options);
  return postQuery<T>(options);
}
