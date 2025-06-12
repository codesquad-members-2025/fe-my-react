export type VNode = {
	type: string;
	props: {
		[key: string]: unknown;
		children: VNode[];
	};
	key: string | null;
};

export type TextVNode = {
	type: 'TEXT_ELEMENT';
	props: {
		nodeValue: string;
		children: [];
	};
	key: null;
};
