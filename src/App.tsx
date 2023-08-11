import "./App.css";
import "./index.css";
import React from "react";
import { Layout } from "./layout/Layout";
import { Routes, Route, useLocation } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Settings } from "./pages/Settings";
import { Landing } from "./pages/Landing";
import { Appearance } from "./pages/Appearance";
import { DrawerProvider } from "./providers/DrawerProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { LoadingProvider } from "./providers/LoadingProvider";
import { LinksProvider } from "./providers/LinksProvider";
import { PublicProfile } from "./pages/PublicProfile";
import { ErrorPage } from "./pages/ErrorPage";
import { EmailPasswordSignUp } from "./pages/EmailPasswordSignUp";
import { SignIn } from "./pages/SignIn";
import { Analytics } from "./pages/Analytics";
import { UserThemeProvider } from "./providers/UserThemeProvider";
import { Welcome } from "./pages/Welcome";
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  React.useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
function App() {
  return (
    <>
      <LoadingProvider>
        <AuthProvider>
          <UserThemeProvider>
            <LinksProvider>
              <DrawerProvider>
                <Wrapper>
                  <Routes>
                    <Route element={<Layout />}>
                      <Route path="/" element={<Landing />} />
                      <Route path="/home" element={<Landing />} />
                      <Route path="/signup" element={<EmailPasswordSignUp />} />
                      <Route path="/analytics" element={<Analytics />} />

                      <Route path="/signIn" element={<SignIn />} />
                      <Route path="/welcome" element={<Welcome />} />

                      <Route path="/admin" element={<Admin />} />
                      <Route path="/appearance" element={<Appearance />} />
                      <Route path="/settings" element={<Settings />} />
                    </Route>
                    <Route path="/no-content" element={<ErrorPage />} />
                    <Route path="/*" element={<PublicProfile />} />
                  </Routes>
                </Wrapper>
                <div style={{ height: "100px" }} />
              </DrawerProvider>
            </LinksProvider>
          </UserThemeProvider>
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
