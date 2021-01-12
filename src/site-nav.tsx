import * as React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";
import clsx from "clsx";
import useGreedyNav, { IMenuItem } from "./use-greedy-nav";

const useStyles = makeStyles((theme: Theme) => createStyles({
  horizontal: {
    "& .horiz-nav-item": {
      minWidth: "120px",
      borderBottom: `2px solid transparent`,
      "&.selected": {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
}));

export const menuItems: IMenuItem[] = [
  { name: "Menu One" },
  { name: "Menu Two" },
  { name: "Menu Three" },
  { name: "Menu Four" },
  { name: "Menu Five" },
  { name: "Menu Six" },
];

export function SiteNav() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selected, setSelected] = React.useState<IMenuItem>(menuItems[0]);
  const nav = useGreedyNav(menuItems);

  return (
    <Toolbar key="toolbar" ref={nav.container as React.MutableRefObject<HTMLDivElement>} className={classes.horizontal}>
      {nav.horizontal.map((item) => {
        const cn =`horiz-nav-item${item === selected ? " selected" : ""}`;
        return (
          <Button variant="text" color="primary" key={item.name} className={cn} onClick={() => setSelected(item)} onKeyDown={() => console.log("trap arrow keys")}>
            {item.name}
          </Button>
        );
      })}
      <Box flex="1 1 100%" />
      {nav.vertical.current.length > 0 && (
        <Box display="flex" alignItems="stretch" justifyContent="center" id="drop-down-toggle">
          <Button aria-controls="nav-drop-down" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)}>
            Menu
          </Button>
          <Menu id="nav-drop-down" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {nav.vertical.current.map((item) => (
              <VerticalMenuItem key={item.name} {...{item, selected, setSelected, setAnchorEl }} />
            ))}
          </Menu>
        </Box>
      )}
    </Toolbar>
  );
}


/**
 * Vertical menu item
 */
const useVertStyles = makeStyles((theme) => createStyles({
  verticalButton: {
    minWidth: "120px",
    borderBottom: `2px solid transparent`,
    "&.selected": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  }
}));

interface VerticalMenuProps {
  item: IMenuItem;
  selected: IMenuItem;
  setSelected: React.Dispatch<React.SetStateAction<IMenuItem>>;
  setAnchorEl: React.Dispatch<React.SetStateAction<null|HTMLElement>>;
}
const VerticalMenuItem = React.forwardRef<HTMLLIElement, VerticalMenuProps>((props, ref) => {
  const { item, selected, setSelected, setAnchorEl } = props;
  const classes = useVertStyles();
  const cn = clsx(classes.verticalButton, {"selected": item === selected});
  const onClick = () => {
    setSelected(item);
    setAnchorEl(null);
  };

  return <MenuItem ref={ref} className={cn} onClick={onClick}>{item.name}</MenuItem>;
});
