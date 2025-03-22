import { useCallback, useEffect } from 'react';

type useCloseProps = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpen, onClose, rootRef }: useCloseProps) {
	const eventClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				event instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(event)
			) {
				onClose();
			}
		},
		[onClose, rootRef]
	);

	const eventKeyEscape = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener('keydown', eventKeyEscape);
		document.addEventListener('mousedown', eventClickOutside);

		return () => {
			document.removeEventListener('keydown', eventKeyEscape);
			document.removeEventListener('mousedown', eventClickOutside);
		};
	}, [isOpen, eventKeyEscape, eventClickOutside]);
}
