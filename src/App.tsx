import "./App.css";
import "./index.css";

import { Layout } from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <LoadingProvider>
        <AuthProvider>
          <LinksProvider>
            <DrawerProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/home" element={<Landing />} />

                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/appearance" element={<Appearance />} />
                  <Route path="/admin/settings" element={<Settings />} />
                </Route>
                <Route path="/no-content" element={<ErrorPage/>} />
                  <Route path="/*" element={<PublicProfile />} />
              </Routes>
            </DrawerProvider>
          </LinksProvider>
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
