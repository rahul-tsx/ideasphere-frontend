import { ModalContext } from '@/components/ui/animated-modal';
import { useContext } from 'react';

export const useModal = <T = void>(id: string) => {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}

	const { modals, openModal, closeModal, modalData } = context;

	const isOpen = modals[id] || false;

	return {
		isOpen,
		modalData,
		openModal: (...args: T extends void ? [] : [T]) => openModal(id, ...args),
		closeModal: () => closeModal(id),
	};
};
