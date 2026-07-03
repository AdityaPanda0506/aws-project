import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Report from "./pages/Report";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="upload"
            element={<Upload />}
          />

          <Route
            path="history"
            element={<History />}
          />

          <Route
            path="report/:id"
            element={<Report />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}