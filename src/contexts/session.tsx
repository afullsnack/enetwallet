import React from "react";
import { useStorageState } from "@/utils/useStorageState";

// Create the auth context
const AuthContext = React.createContext<{
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          // Perform sign-in logic here
          setSession("xxx");
        },
        signOut: async () => {
          // revoke logic for any OAuth2 accounts
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
