import "./App.css";
import "./index.css";

import { Layout } from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Settings } from "./pages/Settings";
import { Landing } from "./pages/Landing";
import { DisplayedLink } from "./components/DisplayedLink/DisplayedLink";
import { Appearance } from "./pages/Appearance";
import { DrawerProvider } from "./providers/DrawerProvider";

function App() {
  return (
    <>
        <DrawerProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/appearance" element={<Appearance />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route
            path="*"
            element={
              <div>
                <DisplayedLink />
                <DisplayedLink />
              </div>
            }
          />
        </Route>
      </Routes>
        </DrawerProvider>
    </>
  );
}

export default App;
