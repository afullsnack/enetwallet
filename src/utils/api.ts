const API_BASE_URL = "http://100.24.73.108:1444/api/v1";

type ApiFunction<P, R extends Record<string, any>> = (args: P) => R;

interface IEmailPasswordAuth {
  email: string;
  password: string;
}
export const EmailPasswordAuth: ApiFunction<
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

    const response = await fetch(`${API_BASE_URL}/user/login-mobile`, options);

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
export const PinAuth: ApiFunction<IPinAuth, Record<string, any>> = async (
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
