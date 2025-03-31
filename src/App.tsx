import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import { ThemeProvider } from "./components/theme-provider";
import Dashboard from "./pages/Dashboard";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";
import { AuthProvider } from "./context";
import RequiredAuth from "./components/RequiredAuth";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              <Route
                path="/dashboard"
                element={
                  <RequiredAuth>
                    <Dashboard />
                  </RequiredAuth>
                }
              />
              <Route
                path="/link/:id"
                element={
                  <RequiredAuth>
                    <Link />
                  </RequiredAuth>
                }
              />

              <Route path="/:id" element={<RedirectLink />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
