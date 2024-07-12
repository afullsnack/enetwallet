import { ChainID } from "@/contexts/session";

const API_BASE_URL = "http://enetwallet.com/api/v1";

type ApiFunction<P, R extends Record<string, any>> = (args: P) => R;

// Auth API functions
export namespace Auth {
  interface IRegister {
    // email: string;
    data: Record<string, any>;
  }
  export const register: ApiFunction<
    IRegister,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ ...args.data }),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/user/register-mobile`,
        options,
      );


      console.log(response, ":::Response from register function");

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_Register");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_Register");
      throw new Error(err);
    }
  };

  interface IEmailPasswordAuth {
    email: string;
    password: string;
  }
  export const emailPasswordAuth: ApiFunction<
    IEmailPasswordAuth,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/user/login-mobile`,
        options,
      );


      // console.log(response, ":::Login response");

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_EmailPAsswordAuth");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_EmailPasswordAuth");
      throw new Error(err);
    }
  };

  interface IPinAuth {
    email: string;
    pin: string;
  }
  export const pinAuth: ApiFunction<IPinAuth, Record<string, any>> = async (
    args,
  ) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/pin-login`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_EmailPAsswordAuth");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_EmailPasswordAuth");
      throw new Error(err);
    }
  };

  interface IVerifyOtp {
    email: string;
    otp: string;
  }
  export const verifyOTP: ApiFunction<IVerifyOtp, Record<string, any>> = async (
    args,
  ) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/verify-otp`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_VerifyOTP");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_VerifyOTP");
      throw new Error(err);
    }
  };

  interface IVerifyEmail {
    email: string;
    otp: string;
  }
  export const verifyEmail: ApiFunction<
    IVerifyEmail,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/verify`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_VerifyEmail");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_VerifyEmail");
      throw new Error(err);
    }
  };

  interface ISetEncryptPassword {
    token: string;
    data: { secret_password: string; confirm_secret_password: string };
  }
  export const setEncryptPassword: ApiFunction<
    ISetEncryptPassword,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args.data),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.token,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/user/secret-password`,
        options,
      );

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_SecretPassword");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_SecretPassword");
      throw new Error(err);
    }
  };

  interface IPrivateKeyStore {
    token: string;
    data: { upload_style: string };
  }
  export const createPrivateKey: ApiFunction<
    IPrivateKeyStore,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args.data),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.token,
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/priv_key`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_PrivateKey");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_StorePrivateKey");
      throw new Error(err);
    }
  };

  interface ISetPin {
    new_pin: string;
    confirm_pin: string;
    token: string;
  }
  export const setPin: ApiFunction<
    ISetPin,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          new_pin: args.new_pin ?? "123456",
          confirm_pin: args.confirm_pin ?? "123456",
        }),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.token,
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/pin`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_SetPin");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_StorePin");
      throw new Error(err);
    }
  };

  interface IResetPin {
    email: string;
    password: string;
    new_pin: string;
    confirm_pin: string;
  }
  export const resetPin: ApiFunction<IResetPin, Record<string, any>> = async (
    args,
  ) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/reset-pin`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_SetPin");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_StorePin");
      throw new Error(err);
    }
  };

  interface ISetPassword {
    token: string;
    data: {
      new_password: string;
      confirm_password: string;
      phone_number: string;
    };
  }
  export const setPassword: ApiFunction<
    ISetPassword,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args.data),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.token,
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/password`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_set_poassword");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_set_Password");
      throw new Error(err);
    }
  };

  interface IResetPassword {
    token: string;
    new_password: string;
    confirm_password: string;
  }
  export const resetPassword: ApiFunction<
    IResetPassword,
    Record<string, any>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/reset`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_REset_poassword");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_ResetPassword");
      throw new Error(err);
    }
  };

  interface IRecoverPassword {
    email: string;
  }
  export const recoverPassword: ApiFunction<
    IRecoverPassword,
    Record<string, any>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/recover`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_Recover_poassword");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_Recover_poassword");
      throw new Error(err);
    }
  };

  interface IResendVerification {
    email: string;
  }
  export const resendVerification: ApiFunction<
    IResendVerification,
    Record<string, any>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/resend`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_Resend");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_Resend");
      throw new Error(err);
    }
  };
}

// User API functions
export namespace User {
  interface IUserDetails {
    user_token: string;
  }
  export const getDetails: ApiFunction<
    IUserDetails,
    Record<string, any>
  > = async (args) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(`${API_BASE_URL}/user`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_UserDetails");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_UserDetails");
      throw new Error(err);
    }
  };

  interface IUpdate {
    user_id: string;
    user_token: string;
    data: Record<string, any>;
  }
  export const updateData: ApiFunction<IUpdate, Record<string, any>> = async (
    args,
  ) => {
    try {
      const options = {
        method: "PUT",
        body: JSON.stringify(args.data),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/info?id=${args.user_id}`,
        options,
      );

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_Update");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_Update");
      throw new Error(err);
    }
  };

  interface IDelete {
    user_id: string;
    user_token: string;
  }
  export const deleteData: ApiFunction<IDelete, Record<string, any>> = async (
    args,
  ) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/info?id=${args.user_id}`,
        options,
      );

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_Delete");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_Delete");
      throw new Error(err);
    }
  };
}

// Wallet API functions
export namespace Wallet {
  interface ICreateWallet {
    user_token: string;
  }
  export const create: ApiFunction<
    ICreateWallet,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(`${API_BASE_URL}/wallet/create`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_WalletCreate");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_WalletCreate");
      throw new Error(err);
    }
  };

  interface ITransactionInit {
    user_token: string;
    data: {
      transactions: {
        toAddress: string;
        walletAddress: string;
        amount: string;
        transfer_type?: string | undefined;
        token_address?: string | undefined;
      }[];
    };
  }
  export const transactionInit: ApiFunction<
    ITransactionInit,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args.data),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(`${API_BASE_URL}/wallet/transfer`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_WalletTransfer");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_WalletTransfer");
      throw new Error(err);
    }
  };

  interface ISwapInit {
    user_token: string;
    data: {
      walletAddress: string;
      amount: string;
      chain_id: number;
      token0Address: string;
      token1Address: string;
      token0Decimals: number;
      token1Decimals: number;
      token0Symbol: string;
      token1Symbol: string;
      token0Name: string;
      token1Name: string;
    };
  }
  export const swapInit: ApiFunction<
    ISwapInit,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args.data),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(`${API_BASE_URL}/wallet/swap`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_WalletSwap");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_WalletSwap");
      throw new Error(err);
    }
  };

  interface IGetBalance {
    user_token: string;
    chainId:ChainID
  }
  export const getBalance: ApiFunction<
    IGetBalance,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/wallet/get-balance/${args.chainId}`,
        options,
      );

      const json = (await response.json()) as Record<string, any>;

      console.log(json, json?.data?.items[0], ":::Result_WalletBalance");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_WalletBalance");
      throw new Error(err);
    }
  };

  interface IGetAddress {
    user_token: string;
  }
  export const getAddress: ApiFunction<
    IGetAddress,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(`${API_BASE_URL}/wallet/get`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_WalletAddress");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_WalletAddress");
      throw new Error(err);
    }
  };

  // Token list
  interface IGetTokenList {
    user_token: string;
  }
  export const getTokenList: ApiFunction<
    IGetTokenList,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/wallet/get-currencies`,
        options,
      );

      const json = (await response.json()) as Record<string, any>;

      // console.log(json, ":::Result_TokenList");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_TokenList");
      throw new Error(err);
    }
  };

  interface IGetSingleToken {
    user_token: string;
    tokenId: string;
  }
  export const getSingleToken: ApiFunction<
    IGetSingleToken,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/wallet/get-currency/${args.tokenId}`,
        options,
      );

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_SingleToken");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_SingleToken");
      throw new Error(err);
    }
  };

  // Beneficiaries
  interface IGetBeneficiaries {
    user_token: string;
  }
  export const getBeneficiaries: ApiFunction<
    IGetBeneficiaries,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/wallet/get-beneficiaries`,
        options,
      );

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_WalletGetBeneficiaries");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_WalletGetBeneficiaries");
      throw new Error(err);
    }
  };

  interface IDeleteBeneficiary {
    user_token: string;
    data: { wallet_address: string };
  }
  export const deleteBeneficiary: ApiFunction<
    IDeleteBeneficiary,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "DELETE",
        body: JSON.stringify(args.data),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/wallet/delete-beneficiaries`,
        options,
      );

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_WalletDeleteBeneficiaries");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_WalletDeleteBeneficiaries");
      throw new Error(err);
    }
  };

  interface ICreateBeneficiary {
    user_token: string;
    data: { recipient_address: string };
  }
  export const createBeneficiary: ApiFunction<
    ICreateBeneficiary,
    Promise<Record<string, any>>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(args.data),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": args.user_token,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/wallet/create-beneficiaries`,
        options,
      );

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_WalletCreateBeneficiaries");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_WalletCreateBeneficiaries");
      throw new Error(err);
    }
  };
}
