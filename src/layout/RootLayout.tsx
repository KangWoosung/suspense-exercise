/*  2024-08-08 03:30:40

    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RootFrame>
          <NavBar />
          <ScrollRestoration />
          <MainFrame className="flex flex-col">
            {state === "loading" && (
              <LoadingMain message="useNavigationState" />
            )}
            <Suspense fallback={<LoadingMain message="Suspense loading" />}>
              <Outlet />
            </Suspense>
          </MainFrame>
          <Footer />
        </RootFrame>
      </ThemeProvider>
    </AuthProvider>

*/

import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "./header/NavBar";
import Footer from "./footer/Footer";
import RootFrame from "./RootFrame";
import LoadingMain, { LoadingFallback } from "../components/main/LoadingMain";
import MainFrame from "./main/MainFrame";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { Suspense } from "react";
import useCustomLoading from "@/hooks/useCustomLoading";

const RootLayout = () => {
  // const { state } = useNavigation();
  const { activeLoader, setIsSuspenseLoading, isSuspenseActive } =
    useCustomLoading();

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RootFrame>
          <NavBar />
          <ScrollRestoration />
          <MainFrame className="flex flex-col">
            {activeLoader === "navigation" ? (
              !isSuspenseActive ? (
                <LoadingMain message="useNavigationState" />
              ) : (
                <Outlet />
              )
            ) : (
              <Suspense
                fallback={
                  <LoadingFallback
                    setIsSuspenseLoading={setIsSuspenseLoading}
                    message="Suspense loading"
                  />
                }
              >
                <Outlet />
              </Suspense>
            )}
          </MainFrame>
          <Footer />
        </RootFrame>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default RootLayout;
