import * as React from "react";
import Box from "@material-ui/core/Box";

export function LayoutHeader(props: React.PropsWithChildren<{}>) {
	return (
		<Box flex="none">
			{props.children}
		</Box>
	);
}

export function LayoutBody(props: React.PropsWithChildren<{}>) {
	return (
		<Box flex="1 1 100%">
			{props.children}
		</Box>
	);
}

export function LayoutFooter(props: React.PropsWithChildren<{}>) {
	return (
		<Box flex="none">
			{props.children}
		</Box>
	);
}
