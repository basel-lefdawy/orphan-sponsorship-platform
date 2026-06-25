import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { initAuth } from "./services/authService";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

import { DonationProvider } from "./context/DonationContext.jsx";

const rtlCache = createCache({
  key: "mui-rtl",
  stylisPlugins: [rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
});

document.dir = "rtl";

const routerBaseName =
  import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

function renderApp() {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <DonationProvider>
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter basename={routerBaseName}>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
      </DonationProvider>
    </StrictMode>
  );
}

// Initialize auth from refresh cookie, then render app.
initAuth().finally(() => {
  renderApp();
});
