import "@/styles/globals.css";
import { useState, useContext, useEffect } from "react";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { UIProvider } from "../context/ui";
import { EntriesProvider } from "../context/entries";

import { lightTheme, darkTheme } from "@/theme";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={ darkTheme }>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
};

export default App;
