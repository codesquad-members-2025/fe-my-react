export type VNode = {
	type: string;
	props: {
		[key: string]: unknown;
		children: VNode[];
	};
};

export type TextVNode = {
	type: 'TEXT_ELEMENT';
	props: {
		nodeValue: string;
		children: [];
	};
};
