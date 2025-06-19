import type { Naber } from '../types/base.types';
import { getCurrentWorkingNaber } from './naber';

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
	const currentWorkingNaber: Naber | null = getCurrentWorkingNaber();
	if (!currentWorkingNaber) throw new Error('현재 작업 중인 Naber가 없습니다');

	// 현재 Fiber의 hookIndex에 해당하는 상태를 가져오거나 초기값으로 설정합니다.
	const { memoizedState, hookIndex } = currentWorkingNaber;
	const oldState = memoizedState[hookIndex];
	const state: T = oldState === undefined ? initialValue : oldState;

	// setState 함수
	const setState = (param: T) => {
		if (typeof param === 'function') memoizedState[hookIndex] = param(state);
		else memoizedState[hookIndex] = param;

		reRender(currentWorkingNaber);
	};

	// 다음 useState 호출을 위해 hookIndex를 증가시킵니다.
	currentWorkingNaber.hookIndex++;

	return [state, setState];
}

export function reRender(currentWorkingNaber: Naber) {
	const { children: prevNaber, type: FC } = currentWorkingNaber;
	const nextNaber: Naber[] = (FC as Function)();

	// Diff는 아직 미구현
	Diff(prevNaber, nextNaber);
}
