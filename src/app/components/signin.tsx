"use client";

export function SignIn({
  signInAction,
}: {
  signInAction: (...args: any) => any;
}) {
  return <button onClick={signInAction}>Sign in button</button>;
}
