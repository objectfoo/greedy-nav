# site-nav

Explore use-site-nav hook.

Create menu items manager that will split menu items into vertical and horizontal based on how many items will fit in the navigation container.

## first run (init)
```js
containerRef = React.createRef()
verticalRef = React.createRef()

// available / used
available = containerRef?.current.clientWidth ?? 0
used = containerRef?.current.scrollWidth ?? 0
const [available, setAvailable] = React.useState(available);

// horiz & vert
const [horizontal, setHorizontal] = React.useState(props.initialHOrizontal ?? []);
verticalRef.current = props.initialVertical ?? []

return {
	horizontal,
	vertical: verticalRef.current,
	containerRef,
};

```
