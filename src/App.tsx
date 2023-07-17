import "./App.css";
import "./index.css";

import { Layout } from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Landing } from "./pages/Landing";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing/>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="*" element={<div>Page does not exist</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
