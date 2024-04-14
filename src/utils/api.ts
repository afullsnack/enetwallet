const API_BASE_URL = "http://100.24.73.108:1444/api/v1";

type ApiFunction<P, R extends Record<string, any>> = (args: P) => R;

// Auth API functions
export namespace Auth {
  interface IEmailPasswordAuth {
    email: string;
    password: string;
  }
  export const emailPasswordAuth: ApiFunction<
    IEmailPasswordAuth,
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

      const response = await fetch(
        `${API_BASE_URL}/user/login-mobile`,
        options,
      );

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

      const response = await fetch(`${API_BASE_URL}/user/verify`, options);

      const json = (await response.json()) as Record<string, any>;

      console.log(json, ":::Result_VerifyEmail");
      return json;
    } catch (err: any) {
      console.log(err, ":::Error_VerifyEmail");
      throw new Error(err);
    }
  };

  interface IPrivateKeyStore {
    upload_style: string;
  }
  export const storePrivateKey: ApiFunction<
    IPrivateKeyStore,
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
  }
  export const setPin: ApiFunction<ISetPin, Record<string, any>> = async (
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
        method: "POST",
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
  export const create: ApiFunction<ICreateWallet, Record<string, any>> = async (
    args,
  ) => {
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
    toAddress: string;
    transfer_type: string;
    amount: string;
  }
  export const transactionInit: ApiFunction<
    ITransactionInit,
    Record<string, any>
  > = async (args) => {
    try {
      const options = {
        method: "POST",
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
}
