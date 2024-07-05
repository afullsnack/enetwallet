import React from "react";
import { useStorageState } from "@/utils/useStorageState";
import { Auth, Wallet } from "@/utils/api";



export enum ChainID {
  ETHEREUM = 1,
  ETHEREUM_SEPOLIA = 11155111,
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  BSC = 56,
  BSC_TESTNET = 97,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
  SCROLL = 534352,
  SCROLL_SEPOLIA = 534351,
  ARBITRUM = 42161,
  ARBITRUM_SEPOLIA = 421614,
  OPTIMISM = 10,
  OPTIMISM_SEPOLIA = 11155420,
}
// Create the auth context
const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session: Record<string, any> | null;
  isLoading: boolean;
  defaultChainId: ChainID
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  defaultChainId: ChainID.OPTIMISM_SEPOLIA,
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
            console.log(result, ':::Login result');
            if (result?.success) {
              const addressResp = await Wallet.getAddress({
                user_token: result?.data?.token,
              });


              console.log(addressResp, ":::Address result");

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
        defaultChainId: ChainID.OPTIMISM_SEPOLIA,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
