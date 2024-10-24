import { cubicOut } from 'svelte/easing'
import type { EasingFunction, TransitionConfig } from 'svelte/transition'

function assign<T, S>(tar: T, src: S): T & S {
	for (const k in src) {
		tar[k as keyof S] = src[k]
	}
	return tar as T & S
}

export interface CrossfadeParams {
	delay?: number
	duration?: number | ((len: number) => number)
	easing?: EasingFunction
}

type ClientRectMap = Map<any, { rect: DOMRect }>

export function crossfade({
	fallback,
	...defaults
}: CrossfadeParams & {
	fallback?: (node: Element, params: CrossfadeParams, intro: boolean) => TransitionConfig
}): [
	(
		node: Element,
		params: CrossfadeParams & {
			key: any
		}
	) => () => TransitionConfig,
	(
		node: Element,
		params: CrossfadeParams & {
			key: any
		}
	) => () => TransitionConfig
] {
	const to_receive: ClientRectMap = new Map()
	const to_send: ClientRectMap = new Map()

	function crossfade(
		target: DOMRect,
		node: Element,
		params: CrossfadeParams,
		inTransition: boolean
	): TransitionConfig {
		const {
			delay = 0,
			duration = (d: number) => Math.sqrt(d) * 30,
			easing = cubicOut
		} = assign(assign({}, defaults), params)

		const from = node.getBoundingClientRect()
		const dx = target.left - from.left
		const dy = target.top - from.top
		const dw = target.width - from.width
		const dh = target.height - from.height
		const d = Math.sqrt(dx * dx + dy * dy)

		const style = getComputedStyle(node)
		const transform = style.transform === 'none' ? '' : style.transform

		return {
			delay,
			duration: typeof duration === 'function' ? duration(d) : duration,
			easing,
			css: (t, u) => `
					position: absolute;
					z-index: 10;
					opacity: ${inTransition ? 1 : 0};
					width: ${from.width + u * dw}px;
					height: ${from.height + u * dh}px;
					transform: ${transform} translate(${u * dx}px,${u * dy}px);
				`
		}
	}

	function transition(items: ClientRectMap, counterparts: ClientRectMap, inTransition: boolean) {
		return (node: Element, params: CrossfadeParams & { key: any }) => {
			items.set(params.key, {
				rect: node.getBoundingClientRect()
			})

			return (): TransitionConfig => {
				if (counterparts.has(params.key)) {
					const { rect } = counterparts.get(params.key)!
					counterparts.delete(params.key)

					return crossfade(rect, node, params, inTransition)
				}

				// if the node is disappearing altogether
				// (i.e. wasn't claimed by the other list)
				// then we need to supply an outro
				items.delete(params.key)

				//@ts-ignore
				return fallback && fallback(node, params, inTransition)
			}
		}
	}

	return [
		transition(to_send, to_receive, false), // Out transition
		transition(to_receive, to_send, true) // In transition
	]
}
