"use client";

let idx = 0;

export type Listener = {
  id: number;
  route: string;
  refetch: () => any;
};

const listeners = globalThis as unknown as { listeners?: Listener[] };

const getListners = () => {
  if (!listeners.listeners) listeners.listeners = [];
  return listeners.listeners;
};

export function addListener(listner: Omit<Listener, "id">) {
  const id = idx++;
  getListners().push({ ...listner, id });
  return id;
}

export async function triggerListeners(route: string, ignoreId?: number) {
  const toTrigger = getListners().filter(
    (l) => l.id !== ignoreId && l.route.includes(route),
  );

  for (const listener of toTrigger) {
    await listener.refetch();
  }
}
