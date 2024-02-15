import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AuthMiddleware({ children }: any) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (auth.user === null && !window.localStorage.getItem("userData")) {
        if (router.asPath !== "/") {
          router.replace({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace("/login");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, auth.user]
  );

  return children;
}

export default AuthMiddleware;
