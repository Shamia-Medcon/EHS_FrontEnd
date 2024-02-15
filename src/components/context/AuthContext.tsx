// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";
import { post } from "@/handler/api.handler";
import {
  AuthValuesType,
  ErrCallbackType,
  LoginParams,
  RegisterParams,
  UserType,
} from "@/types/props.types";
import { routeConfig } from "../constant/route";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  const initAuth = async (): Promise<void> => {
    const storedToken = window.localStorage.getItem(
      routeConfig.storageTokenKeyName
    )!;
    if (storedToken) {
      setLoading(true);
      try {
        const res = await post(routeConfig.account.profile, null, storedToken);
        if (res && res.status_code == 200) {
          setLoading(false);
          setUser({ ...res.data });
          localStorage.setItem("userData", { ...res.data });
          localStorage.setItem("refreshToken", res.data.token);
          localStorage.setItem("accessToken", res.data.token);
        } else {
          localStorage.removeItem("userData");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");

          setUser(null);
          setLoading(false);
          if (
            routeConfig.onTokenExpiration === "logout" &&
            !router.pathname.includes("login")
          ) {
            router.replace("/");
          }
        }
      } catch (e: any) {
        setUser(null);
        setLoading(false);
        if (
          routeConfig.onTokenExpiration === "logout" &&
          !router.pathname.includes("login")
        ) {
          router.replace("/");
        }
      }
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const handleLogin = async (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    try {
      const res = await post(routeConfig.account.login, params, null);
      if (res && res.status_code == 200) {
        const returnUrl = router.query.returnUrl;
        setUser({ ...res.data });

        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL as string);
      }
    } catch (err: any) {
      if (errorCallback) errorCallback(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(routeConfig.storageTokenKeyName);
    router.push("/");
  };

  const handleRegister = (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    post(routeConfig.account.register, params, null)
      .then((res) => {
        if (res && res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin({ email: params.email, password: params.password });
        }
      })
      .catch((err: { [key: string]: string }) =>
        errorCallback ? errorCallback(err) : null
      );
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
