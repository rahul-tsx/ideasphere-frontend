import { ModalContext } from "@/components/ui/animated-modal";
import { useContext } from "react";

export const useModal = (id: string) => {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}

	const { modals, openModal, closeModal } = context;

	const isOpen = modals[id] || false;

	return {
		isOpen,
		openModal: () => openModal(id),
		closeModal: () => closeModal(id),
	};
};