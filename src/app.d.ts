declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onconsider?: (event: CustomEvent<number> & { target: EventTarget & T }) => any;
		onfinalize?: (event: CustomEvent<number> & { target: EventTarget & T }) => any;
	}
}
