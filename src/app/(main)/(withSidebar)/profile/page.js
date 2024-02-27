"use client";

import { useEffect, useState } from "react";
import {
  Icon,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import fb from "@/app/services/firebase";
import { FaLinkedin, FaGlobe, FaDollarSign } from "../../icons";
import { useAuth } from "@/app/hooks/useAuth";

const Page = () => {
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [file, setFile] = useState(null);
  const [submittable, setSubmittable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeURL, setResumeURL] = useState("");
  const user = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!currentUserUid) return;

    // check if there is a saved resume file by this user
    // get storage
    const storage = fb.getStorage();

    // create resumes reference
    const resumesRef = ref(storage, `users/${currentUserUid}/resume`);

    // get the resumeURL and set it as state
    getDownloadURL(resumesRef)
      .then((url) => {
        setResumeURL(url);
        setSubmitted(true);
      })
      .catch((err) => {
        // set file state to null
        setFile(null);
        // set submittable state back to false
        setSubmittable(false);
        // set submitted state to false
        setSubmitted(false);
        // initilize resumeURL state back to empty string
        setResumeURL("");
      });
  }, [currentUserUid]);

  useEffect(() => {
    if (user) {
      setCurrentUserUid(user?.uid);
    }
  }, [user]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setSubmittable(true);
  };

  const handleProfileSubmit = () => {
    // get storage
    const storage = fb.getStorage();

    // create resumes reference
    const resumesRef = ref(storage, `users/${currentUserUid}/resume`);

    // upload resume file to storage
    uploadBytes(resumesRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      toast({
        title: "Resume updated.",
        description: "Successfully updated resume.",
        status: "success",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });

      getDownloadURL(resumesRef).then((url) => {
        setResumeURL(url);
      });
    });

    // set submittable state back to false
    setSubmittable(false);
    setSubmitted(true);
  };

  const handleDeleteFile = () => {
    // get sotrage
    const storage = getStorage();

    // create resumes reference
    const resumesRef = ref(storage, `users/${currentUserUid}/resume`);

    // delete the file
    deleteObject(resumesRef)
      .then(() => {
        // set file state to null
        setFile(null);
        // set submittable state back to false
        setSubmittable(false);
        // set submitted state to false
        setSubmitted(false);
        // initilize resumeURL state back to empty string
        setResumeURL("");

        console.log("file deleted successfully!");
      })
      .catch((err) => {
        console.log("error while deleting file!");
      });

    // set file state to null
    setFile(null);
    // set submittable state back to false
    setSubmittable(false);
    // set submitted state to false
    setSubmitted(false);
    // initilize resumeURL state back to empty string
    setResumeURL("");

    toast({
      title: "Success",
      description: "Resume updated successfully.",
      status: "success",
      duration: 9000,
      position: "top-right",
      isClosable: true,
    });
  };

  return (
    <div className="flex justify-center pt-16 pb-32 px-4 lg:px-0 bg-red-100 h-full">
      <div className="flex flex-col flex-auto lg:max-w-2xl">
        <div className="flex flex-col p-8 bg-white rounded-md sm:rounded-lg md:rounded-2xl lg:rounded-3xl shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl">
          <div className="flex flex-col items-center">
            <a className="text-gray-800 text-sm font-medium underline"></a>
            <div className="flex flex-col w-full mt-4">
              <div className="relative">
                {submitted ? (
                  <div className="flex items-center space-x-8 justify-between border border-gray-300 rounded-md shadow-sm px-4 py-4 w-full">
                    <div className="block bg-white text-gray-900">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black underline font-medium"
                        href={resumeURL}
                        // get storage url and make it a ref here
                      >
                        Resume
                      </a>
                      <button
                        onClick={onOpen}
                        className="ml-4 font-bold text-red-500"
                      >
                        X
                      </button>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Delete resume</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            You can upload a new resume anytime. Are you sure
                            you want to delete your resume?
                          </ModalBody>

                          <ModalFooter>
                            <div className="flex items-center space-x-2">
                              <Button
                                colorScheme="red"
                                onClick={handleDeleteFile}
                              >
                                Delete Resume
                              </Button>
                              <Button mr={3} onClick={onClose}>
                                Cancel
                              </Button>
                            </div>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-end space-x-8 w-full px-4 py-4 bg-white border border-gray-300 rounded-md text-gray-900 shadow-sm focus:border-yellow-600 focus:outline-none">
                    <div className="flex flex-col w-full">
                      <span className="font-medium mb-2 text-sm text-gray-500">
                        Resume
                        <span className="text-red-600">*</span>
                      </span>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                        type="file"
                        placeholder="Resume"
                        accept="application/msword, application/pdf, .doc,.docx"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                )}
              </div>
              <button className="flex justify-center mt-8 text-red-600 font-medium">
                FAQ: Who can see my resume?
              </button>
              <hr className="my-8" />
              <span className="mb-4 text-gray-500 font-medium text-sm">
                Location Preferences
                <span className="text-red-600">*</span>
              </span>
              <div className="flex flex-col text-start w-full">
                <div className="flex flex-col w-full">
                  <span className="mt-2 text-sm">
                    📍 Current location
                    <span className="text-red-600">*</span>
                  </span>
                  <div>
                    <input
                      className="w-full p-2 border rounded my-2 outline-none z-50 pac-target-input"
                      type="text"
                      placeholder="Enter city/location..."
                      autoComplete="off"
                      id="resume_input"
                      disabled
                    />
                  </div>
                </div>
                {/* <div className="flex items-center text-sm mt-8 mb-2">
                  <span>Additional locations (Optional)</span>
                </div>
                <div className=" css-b62m3t-container"></div> */}
              </div>
              <hr className="flex flex-col my-8" />
              <span className="mb-4 text-gray-500 font-medium text-sm">
                Additional Information (Optional)
              </span>
              <div className="flex items-center w-full border border-gray-300 rounded-md space-x-4 px-4">
                <Icon as={FaLinkedin} className="text-black h-5 w-5" />
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  className="w-full py-2 text-gray-900 rounded-md shadow-sm focus:border-yellow-600 focus:outline-none"
                  disabled
                />
              </div>
              <div className="flex items-center w-full border border-gray-300 rounded-md space-x-4 px-4 mt-2">
                <Icon as={FaGlobe} className="text-black h-5 w-5" />
                <input
                  type="url"
                  placeholder="https://abc.com/..."
                  className="w-full py-2 text-gray-900 rounded-md shadow-sm focus:border-yellow-600 focus:outline-none"
                  disabled
                />
              </div>
              <div className="flex items-center w-full border border-gray-300 rounded-md space-x-4 px-4 mt-2">
                <Icon as={FaDollarSign} className="text-black h-5 w-5" />
                <input
                  type="text"
                  placeholder="Base salary expectation"
                  className="w-full py-2 text-gray-900 rounded-md shadow-sm focus:border-yellow-600 focus:outline-none"
                  disabled
                />
              </div>
              {/* <hr className="flex flex-col my-8" />
              <div className="mb-4 flex items-center space-x-1">
                <span className="text-gray-500 font-medium text-sm">
                  Hidden Companies (Optional)
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
                    placeholder="Email domain name (e.g. meta.com)"
                  />
                  <button
                    disabled
                    className="p-2 rounded bg-black text-white disabled:text-black focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <svg>+</svg>
                  </button>
                </div>
                <ul></ul>
              </div> */}
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={handleProfileSubmit}
              className={`flex-none font-medium rounded px-6 py-2 ${
                submittable
                  ? "bg-black text-white "
                  : "bg-gray-200 text-gray-500"
              } `}
              disabled={submittable ? false : true}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
