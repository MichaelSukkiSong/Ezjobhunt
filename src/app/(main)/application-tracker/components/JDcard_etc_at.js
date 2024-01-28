"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import fb from "@/app/services/firebase";
import { BsPencil } from "../../icons";

const JDcard_etc_at = ({ jobId, memo, currentUserUid, onJobDataChange }) => {
  const [notesText, setNotesText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setNotesText(memo);
  }, [memo]);

  const handleWriteNote = (event) => {
    setNotesText(event.target.value);
  };

  const handleSaveMemoClick = async () => {
    const db = fb.getFirestore();
    // get job object ref for this particular job
    const docRef = doc(db, "jobs", jobId);
    // update job object to save memo inside job.memos array along with the user id
    await updateDoc(docRef, {
      memos: arrayUnion({ currentUserUid, memo: notesText }),
    });
    setNotesText(notesText);
    onJobDataChange();
    toast({
      title: "Note Saved",
      description: "Your note has been saved.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };

  const handleClearMemoClick = async () => {
    const db = fb.getFirestore();
    // get job object ref for this particular job
    const docRef = doc(db, "jobs", jobId);
    // update job object to remove memo inside job.memos array
    await updateDoc(docRef, {
      memos: arrayRemove({ currentUserUid, memo: notesText }),
    });
    setNotesText("");
    onJobDataChange();
    toast({
      title: "Note Cleared",
      description: "Your note has been cleared.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };

  const renderButtonContent = () => {
    const buttonContent = notesText ? (
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
    );
    return buttonContent;
  };

  return (
    <>
      {renderButtonContent()}

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
                  <button
                    onClick={handleSaveMemoClick}
                    className="py-2 w-28 rounded bg-black text-white font-medium text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleClearMemoClick}
                    className="py-2 w-28 rounded bg-red-500 text-white font-medium text-sm"
                  >
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
