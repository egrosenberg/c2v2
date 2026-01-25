"use client";

import { useCallback, useEffect, useState } from "react";
import { runQuery } from "./run-query";

export type RequestType = "GET" | "POST";

export type ServiceFn = (...args: any) => any;
export type ServiceResult<S extends ServiceFn> = Awaited<
  ReturnType<S> | undefined
>;
export type ServiceMetaFn<S extends ServiceFn, O = Parameters<S>> = () => {
  type: RequestType;
  route: string;
  name: string;
};

export type UseServiceOptions<O> =
  | {
      options?: O;
      lazyLoad?: boolean;
    }
  | undefined;

export type UseServiceReturnType<S extends ServiceFn> = {
  data: ServiceResult<S>;
  ready: boolean;
  processing: boolean;
  error: string | undefined;
};

export function useService<
  M extends ServiceMetaFn<S, O>,
  S extends ServiceFn,
  O = Parameters<S>,
>(
  metaFn: M,
  hookOptions: UseServiceOptions<O> = {},
  dependencies: unknown[] = [],
) {
  if (hookOptions.lazyLoad && dependencies.length) {
    console.warn(
      "WARN: lazyLoad and dependencies array not compatible and can result in unintended behavior.",
    );
  }

  const canExecute = useCallback(() => {
    if (hookOptions.lazyLoad) return false;
    for (const dependency of dependencies) {
      if (typeof dependency === "undefined") return false;
    }
    return true;
  }, [hookOptions.lazyLoad, dependencies]);

  const [serviceOptions, setServiceOptions] = useState<O | undefined>(
    hookOptions.options,
  );
  const [data, setData] = useState<ServiceResult<S>>(undefined);
  const [ready, setReady] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(canExecute());
  const [error, setError] = useState<string | undefined>(undefined);

  const meta = metaFn();

  const serviceFunction = async (options: O | undefined) => {
    setProcessing(true);

    const { data, error } = await runQuery({
      hookOptions: options,
      type: meta.type,
      name: meta.name,
      route: meta.route,
    });

    if (error) {
      setError(error);
    } else {
      setData(data as ServiceResult<S>);
    }
    setReady(true);
    setProcessing(false);

    return { data, error };
  };

  // Queue up service calls
  let runner = Promise.resolve();

  // Handle dependencies
  useEffect(() => {
    setServiceOptions(hookOptions.options);
  }, dependencies);

  // Main fetch/refetch loop
  useEffect(() => {
    if (!canExecute()) return;

    runner = runner.finally(() => serviceFunction(serviceOptions));
  }, [serviceOptions]);

  const service = (options: O | undefined) =>
    (runner = runner.finally(() => serviceFunction(options)));

  return {
    data,
    ready,
    processing,
    error,
    service,
  };
}
