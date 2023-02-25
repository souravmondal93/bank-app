import React, { ReactNode } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

type ModalProps = {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  body: ReactNode | string | null;
  footer: ReactNode | string | null;
};

const Modal = ({ onClose, isOpen, title, body, footer }: ModalProps) => {
  return (
    <ChakraModal colorScheme="purple" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {body}
          </ModalBody>
          <ModalFooter>
            {footer}
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
  );
};

export default Modal;