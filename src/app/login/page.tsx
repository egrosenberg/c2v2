import { signIn } from "@/auth";
import { Box } from "styled-system/jsx";

export default async function () {
  const signInAction = async () => {
    "use server";
    await signIn("logto");
  };

  signInAction();

  return <Box>Redirecting to login...</Box>;
}
