import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Report from "./pages/Report";

import LoadingScreen from "./components/LoadingScreen";
import api from "./services/api";

export default function App() {

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Starting CloudGuard...");

  useEffect(() => {

    const messages = [
      "🚀 Starting CloudGuard...",
      "☁️ Connecting to backend...",
      "📦 Preparing services...",
      "📊 Loading dashboard...",
      "✅ Almost ready..."
    ];

    let messageInterval;

    const sleep = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const checkBackend = async () => {

      // First quick check (don't show loader yet)
      try {
        await api.get("/health", {
          timeout: 1000,
        });

        return setLoading(false);

      } catch (err) {
        // Backend is probably sleeping
      }

      // Wait 1 second before showing loading screen
      await sleep(1000);

      setLoading(true);

      let i = 0;

      messageInterval = setInterval(() => {
        setMessage(messages[i % messages.length]);
        i++;
      }, 2500);

      // Keep retrying until backend responds
      while (true) {

        try {

          await api.get("/health", {
            timeout: 10000,
          });

          clearInterval(messageInterval);

          setLoading(false);

          break;

        } catch (err) {

          await sleep(5000);

        }

      }

    };

    checkBackend();

    return () => {
      if (messageInterval) {
        clearInterval(messageInterval);
      }
    };

  }, []);

  if (loading) {
    return <LoadingScreen message={message} />;
  }

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