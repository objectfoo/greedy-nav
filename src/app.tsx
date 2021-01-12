import * as React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from "./theme";
import * as Layout from "./layout";
import { SiteNav } from "./site-nav";

import './app.css';

function App() {
	const theme = createTheme();

  return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout.LayoutHeader>
				<SiteNav />
			</Layout.LayoutHeader>
			<Layout.LayoutBody>
				Layout Body
			</Layout.LayoutBody>
			<Layout.LayoutFooter>
				Layout Footer
			</Layout.LayoutFooter>
		</ThemeProvider>
  );
}

export default App;
