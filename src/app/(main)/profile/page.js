"use client";

import { useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import fb from "@/app/services/firebase";
import { FaLinkedin, FaGlobe, FaDollarSign } from "../icons";
import { ref, uploadBytes } from "firebase/storage";

const Page = () => {
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    // select input element
    const inputElement = document.getElementById("resume_input");

    const handleFile = () => {
      const selectedFile = document.getElementById("resume_input").files[0];
      setResumeFile(selectedFile);
    };

    // add event listener to input element
    inputElement.addEventListener("change", handleFile);

    return () => {
      // remove event listener
      inputElement.removeEventListener("change", handleFile);
    };
  }, []);

  const handleProfileSubmit = () => {
    // get storage
    const storage = fb.getStorage();

    // create resumes reference
    const resumesRef = ref(storage, "resumes");

    // upload file
    uploadBytes(resumesRef, resumeFile).then((snapshot) => {
      console.log("Uploaded a blob or file!");
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
                    />
                  </div>
                </div>
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
                />
              </div>
              <div className="flex items-center w-full border border-gray-300 rounded-md space-x-4 px-4 mt-2">
                <Icon as={FaGlobe} className="text-black h-5 w-5" />
                <input
                  type="url"
                  placeholder="https://abc.com/..."
                  className="w-full py-2 text-gray-900 rounded-md shadow-sm focus:border-yellow-600 focus:outline-none"
                />
              </div>
              <div className="flex items-center w-full border border-gray-300 rounded-md space-x-4 px-4 mt-2">
                <Icon as={FaDollarSign} className="text-black h-5 w-5" />
                <input
                  type="text"
                  placeholder="Base salary expectation"
                  className="w-full py-2 text-gray-900 rounded-md shadow-sm focus:border-yellow-600 focus:outline-none"
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
              className="flex-none font-medium rounded px-6 py-2 bg-gray-200 text-gray-500"
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
