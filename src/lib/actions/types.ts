import type { Boundary, OffsetOptions } from '@floating-ui/dom';
import type { Readable } from 'svelte/motion';

/**
 * The floating element configuration.
 * @see https://floating-ui.com/
 * When `null`, the element won't use floating-ui.
 */
export type FloatingConfig = {
	/**
	 * The initial placement of the floating element.
	 * @defaultValue `"top"`
	 *
	 * @see https://floating-ui.com/docs/computePosition#placement
	 */
	placement?:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end';

	/**
	 * The strategy to use for positioning.
	 * @defaultValue `"absolute"`
	 *
	 * @see https://floating-ui.com/docs/computePosition#placement
	 */
	strategy?: 'absolute' | 'fixed';

	/**
	 * The offset of the floating element.
	 *
	 * @see https://floating-ui.com/docs/offset#options
	 */
	offset?: OffsetOptions;

	/**
	 * The main axis offset or gap between the reference and floating elements.
	 * @defaultValue `5`
	 *
	 * @see https://floating-ui.com/docs/offset#options
	 */
	gutter?: number;

	/**
	 * The virtual padding around the viewport edges to check for overflow.
	 * @defaultValue `8`
	 *
	 * @see https://floating-ui.com/docs/detectOverflow#padding
	 */
	overflowPadding?: number;

	/**
	 * Whether to flip the placement.
	 * @defaultValue `true`
	 *
	 * @see https://floating-ui.com/docs/flip
	 */
	flip?: boolean;

	/**
	 * Whether the floating element can overlap the reference element.
	 * @defaultValue `false`
	 *
	 * @see https://floating-ui.com/docs/shift#options
	 */
	overlap?: boolean;

	/**
	 * Whether to make the floating element same width as the reference element.
	 * @defaultValue `false`
	 *
	 * @see https://floating-ui.com/docs/size
	 */
	sameWidth?: boolean;

	/**
	 * Whether the floating element should fit the viewport.
	 * @defaultValue `false`
	 *
	 * @see https://floating-ui.com/docs/size
	 */
	fitViewport?: boolean;

	/**
	 * The overflow boundary of the reference element.
	 *
	 * @see https://floating-ui.com/docs/detectoverflow#boundary
	 */
	boundary?: Boundary;
} | null;

export type EscapeKeydownConfig = {
	/**
	 * Whether the listener is active.
	 *
	 * @defaultValue `true`
	 */
	enabled?: boolean | Readable<boolean>;

	/**
	 * Callback when user presses the escape key element.
	 */
	handler?: (evt: KeyboardEvent) => void;

	/**
	 * A predicate function or a list of elements that should not trigger the event.
	 */
	ignore?: ((e: KeyboardEvent) => boolean) | Element[];
};
