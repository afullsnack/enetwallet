import React from "react";
import { useStorageState } from "@/utils/useStorageState";
import { Auth, Wallet } from "@/utils/api";

// Create the auth context
const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session: Record<string, any> | null;
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
  if (process.env.APP_ENV !== "production") {
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
        signIn: async (email, password) => {
          try {
            // Perform sign-in logic here
            const result = await Auth.emailPasswordAuth({ email, password });
            if (result?.success) {
              const addressResp = await Wallet.getAddress({
                user_token: result?.data?.token,
              });

              if (addressResp?.success) {
                setSession(
                  JSON.stringify({
                    ...result?.data,
                    wallet_address: addressResp?.data,
                  }),
                );
              }
              setSession(JSON.stringify(result?.data));
            } else {
              throw new Error(result?.message);
            }
          } catch (err: any) {
            throw new Error(err);
          }
        },
        signOut: async () => {
          // revoke logic for any OAuth2 accounts
          setSession(null);
        },
        session: JSON.parse(session),
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
