import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const AuthProvider = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
