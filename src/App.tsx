import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import { ThemeProvider } from "./components/theme-provider";
import Dashboard from "./pages/Dashboard";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/link/:id" element={<Link />} />
            <Route path="/:id" element={<RedirectLink />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
