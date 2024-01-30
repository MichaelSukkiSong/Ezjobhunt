const Page = () => {
  return (
    <div className="flex justify-center pt-4 pb-32 px-4 lg:px-0 bg-red-100">
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
              <div className="flex flex-col text-start w-full"></div>
              <hr className="flex flex-col my-8" />
              <span className="mb-4 text-gray-500 font-medium text-sm">
                Additional Information (Optional)
              </span>
              <div className="flex items-center w-full border border-gray-300 rounded-md space-x-4 px-4"></div>
              <div className="flex items-center w-full border border-gray-300 rounded-md space-x-4 px-4 mt-2"></div>
              <div className="flex items-center w-full border border-gray-300 rounded-md space-x-4 px-4 mt-2"></div>
              <hr className="flex flex-col my-8" />
              <div className="mb-4 flex items-center space-x-1"></div>
              <div></div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button className="flex-none font-medium rounded px-6 py-2 bg-gray-200 text-gray-500">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
