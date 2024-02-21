import { CiSettings, FaRegFileLines } from "../../../(main)/icons";

export function Hit({ hit }) {
  return (
    <div className="relative flex flex-col lg:max-w-sm items-start justify-start text-start">
      <div className="flex flex-col items-start w-full rounded-3xl pt-2 overflow-auto hide-scrollbar border hover:border-yellow-600">
        <div className="flex flex-col text-start items-start px-4">
          <span className="font-bold text-start">{hit.name}</span>
          <button className="flex items-center space-x-1 text-start font-light text-sm">
            <span>@ {hit.headline}</span>
            <CiSettings className="h-4 w-4 flex-none text-yellow-600" />
          </button>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col mt-2 px-4 space-y-2 text-sm">
            <div>
              📍
              <button className="text-start text-sm underline font-medium">
                {hit.about}
              </button>
            </div>
            <div>
              💰
              <button className="text-start text-sm underline font-medium">
                {hit.top_skills}
              </button>
            </div>
          </div>
          <div>
            <a target="_blank">
              <button className="flex items-center space-x-1.5 mx-4 mt-4 text-sm">
                <FaRegFileLines />
                <span className="font-medium">View Full Resume</span>
              </button>
            </a>
          </div>
          <div className="flex text-sm items-center space-x-4 px-4 pb-4 mt-4">
            <button className="px-4 py-2 rounded font-medium bg-gray-200 ">
              <a target="_blank">Get Contact Info</a>
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <article>
    //   <h1>{hit.role}</h1>
    //   <h1>{hit.experience}</h1>
    //   <h1>{hit.industry}</h1>
    //   <h1>{hit.education}</h1>
    //   <h1>{hit.projects}</h1>
    //   <h1>{hit.skills}</h1>
    //   <h1>{hit.contact_info}</h1>
    // </article>
  );
}
