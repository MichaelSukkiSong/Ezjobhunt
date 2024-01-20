"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "../../../icons";

const MobileMenubar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex justify-between items-center space-x-6 md:hidden mb-4">
      <div className="flex items-center space-x-6">
        <button
          onClick={onOpen}
          className="bg-gray-100 text-gray-600 p-1.5 rounded"
        >
          <HamburgerIcon boxSize={6} />
        </button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default MobileMenubar;
