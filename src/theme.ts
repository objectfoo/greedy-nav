import { createMuiTheme } from "@material-ui/core/styles";

export function createTheme() {
	const theme = createMuiTheme({
		overrides:{
			MuiCssBaseline: {
				"@global": {
					"html, body, #root": {
						height: "100%",
					},
					"#root": {
						display: "flex",
						flexDirection: "column",
						height: "100%",
					},
				},
			},
		},
		palette: {
			primary: {
				main: "#0078bf",
			},
		},
	});

	return theme;
}
