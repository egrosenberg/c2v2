"use client";

let idx = 0;

export type Listener = {
  id: number;
  route: string;
  refetch: () => any;
};

const listeners = globalThis as unknown as { listeners?: Listener[] };

const getListeners = () => {
  if (!listeners.listeners) listeners.listeners = [];
  return listeners.listeners;
};

export function addListener(listener: Omit<Listener, "id">) {
  const id = idx++;
  getListeners().push({ ...listener, id });
  return id;
}

export async function triggerListeners(route: string, ignoreId?: number) {
  const toTrigger = getListeners().filter(
    (l) => l.id !== ignoreId && l.route.includes(route),
  );

  for (const listener of toTrigger) {
    await listener.refetch();
  }
}
