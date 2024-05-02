import App from "./App";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import {  REDIRECT_URL } from "./utils/constants";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const domain: string = process.env.DOMAIN!;
const clientId: string = process.env.CLIENT_ID!;

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: REDIRECT_URL,
      }}
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </BrowserRouter>
);
