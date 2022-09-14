import { createContext, useEffect, useState } from "react";
import { service } from "../service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [code, setCode] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    if (!code) return;

    const login = async () => {
      const res = await service.login(code);
      setAccessToken(res?.data.accessToken);
      setRefreshToken(res?.data.refreshToken);
      setExpiresIn(res?.data.expiresIn);
      window.history.pushState({}, null, "/");
    };

    login();
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      const refresh = async () => {
        const res = await service.refresh(refreshToken);
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
      };

      refresh();
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return (
    <AuthContext.Provider
      value={{ code, setCode, accessToken, refreshToken, expiresIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
