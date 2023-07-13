import { createVNode, render, App } from "vue";
import LoadingConstructor from "./Mask.vue";

function createElement(props = {}) {
	const container = document.createElement("div");
	container.className = `loading`;
	const vm = createVNode(LoadingConstructor, props, null);
	render(vm, container);
	const element: Element = container.firstElementChild as Element;
	return element;
}

export default {
	install(app: App) {
		app.directive("loading", {
			mounted(el: HTMLElement, binding) {
				const { value: isAppend } = binding;
				const text = el.getAttribute("loading-text");
				el.removeAttribute("loading-text");
				// @ts-ignore
				el._element = createElement({
					text: text || undefined,
				});
				if (isAppend) {
					append(el);
				}
			},
			updated(el, binding) {
				if (binding.value !== binding.oldValue) {
					binding.value ? append(el) : remove(el);
				}
			},
		});
	},
};

function append(el: HTMLElement) {
	const style = getComputedStyle(el);
	const name = LoadingConstructor.name;
	// @ts-ignore
	el._lastPosition = style.position;
	if (!["absolute", "fixed", "relative"].includes(style.position)) {
		el.style.position = "relative";
	}
	// @ts-ignore
	el.appendChild(el._element);
}

function remove(el: HTMLElement) {
	const name = LoadingConstructor.name;
	// @ts-ignore
	el.style.position = el._lastPosition;
	// @ts-ignore
	el.removeChild(el._element);
}
