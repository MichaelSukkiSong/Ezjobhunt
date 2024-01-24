"use client";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { BsPencil } from "../../icons";

const JDcard_etc_at = () => {
  const [notesText, setNotesText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleWriteNote = (event) => {
    setNotesText(event.target.value);
  };

  return (
    <>
      {notesText ? (
        <button
          onClick={onOpen}
          className="flex items-center space-x-2 py-1.5 text-xs rounded text-blue-600"
        >
          <BsPencil className="h-4 w-4 flex-none" />
          <span>Your Notes</span>
        </button>
      ) : (
        <button
          onClick={onOpen}
          className="flex items-center space-x-2 py-1.5 text-xs rounded border text-yellow-600 px-2"
        >
          <BsPencil className="h-4 w-4 flex-none" />
          <span>Write Notes</span>
        </button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col mb-4">
              <textarea
                onChange={handleWriteNote}
                value={notesText}
                className="h-72 border border-1 rounded w-full p-2 resize-none focus:border-none focus:ring-0 focus:outline-gray-200"
              ></textarea>
              {notesText && (
                <div className="flex flex-items space-x-2 justify-end mt-4">
                  <button className="py-2 w-28 rounded bg-black text-white font-medium text-sm">
                    Save
                  </button>
                  <button className="py-2 w-28 rounded bg-red-500 text-white font-medium text-sm">
                    Clear
                  </button>
                </div>
              )}
            </div>
          </ModalBody>

          {/* <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default JDcard_etc_at;
