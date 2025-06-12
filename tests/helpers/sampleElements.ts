import {
	EMPTY_CHILDREN,
	TEXT_ELEMENT_TYPE,
	TEXT_NODE_VALUE,
} from './constants';

export const SAMPLE_TEXT_ELEMENT = {
	type: TEXT_ELEMENT_TYPE,
	props: {
		nodeValue: TEXT_NODE_VALUE,
		children: EMPTY_CHILDREN,
	},
	key: null,
};
