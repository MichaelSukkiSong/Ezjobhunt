"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MdArrowOutward,
  CheckIcon,
  ArrowForwardIcon,
  FaSearch,
  MdSmartToy,
  MdOutlineSummarize,
  GiDeerTrack,
  BsMeta,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  SiSemanticuireact,
  FaGithub,
} from "../(main)/icons";

const LandingPage = () => {
  const [isZoomed1, setIsZoomed1] = useState(false);
  const [isZoomed2, setIsZoomed2] = useState(false);
  const [isZoomed3, setIsZoomed3] = useState(false);
  const [isFeaturesInView, setIsFeaturesInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const image1 = document.getElementById("zoomImage1");
      const image2 = document.getElementById("zoomImage2");
      const image3 = document.getElementById("zoomImage3");
      const windowHeight = window.innerHeight;
      const imageTop1 = image1?.getBoundingClientRect().top;
      const imageTop2 = image2?.getBoundingClientRect().top;
      const imageTop3 = image3?.getBoundingClientRect().top;
      const imageBottom1 = image1?.getBoundingClientRect().bottom;
      const imageBottom2 = image2?.getBoundingClientRect().bottom;
      const imageBottom3 = image3?.getBoundingClientRect().bottom;

      if (imageTop1 < windowHeight && imageBottom1 > 0) {
        setIsZoomed1(true);
      } else {
        setIsZoomed1(false);
      }

      if (imageTop2 < windowHeight && imageBottom2 > 0) {
        setIsZoomed2(true);
      } else {
        setIsZoomed2(false);
      }

      if (imageTop3 < windowHeight && imageBottom3 > 0) {
        setIsZoomed3(true);
      } else {
        setIsZoomed3(false);
      }

      const featuresSection = document.getElementById("features");
      const featuresTop = featuresSection?.getBoundingClientRect().top;

      if (featuresTop < windowHeight) {
        setIsFeaturesInView(true);
      } else {
        setIsFeaturesInView(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on page load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="border-b border-orange-200 flex justify-between ">
        <div className="p-2 mr-2 hover:text-orange-600 transition duration-300">
          <Link href="/" className="flex text-orange-700">
            <div className="flex justify-center items-center mr-2 ">
              <SiSemanticuireact />
            </div>
            Ezjobhunt
          </Link>
        </div>
        <div className="flex">
          <div className="p-2 mr-2 hover:text-orange-600 transition duration-300  flex items-center justify-center">
            <Link
              href="https://github.com/MichaelSukkiSong/Ezjobhunt"
              target="_blank"
              className="flex justify-center items-center"
            >
              <FaGithub className="mr-2" />
              <span className="mr-1 flex">Github</span>
              <div className="flex justify-center items-center text-sm ">
                <MdArrowOutward />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <header className="min-h-screen flex justify-center items-center pl-10">
        <div className="flex flex-col  max-w-lg p-4">
          <h1 className="text-bold text-5xl md:text-6xl mb-10 font-semibold">
            Unlock Your Future
          </h1>
          <h2 className="mb-8 text-sm md:text-base">
            <p>Looking for a new role? Search quality jobs with ease.</p>
            <p>Hiring? Search for the best talent in the industry.</p>
          </h2>
          <div>
            <Link href="/jobs">
              <button className="rounded-sm bg-orange-400 hover:bg-orange-500 font-bold text-white p-4 mr-4 transition duration-300 md:text-2xl text-md">
                Search Jobs
              </button>
            </Link>
            <Link href="/employers">
              <button className="border rounded-sm border-orange-100 text-orange-400 p-4 hover:text-orange-500 hover:border-orange-200 transition duration-300 md:text-2xl text-md">
                I am a Employer
              </button>
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <dotlottie-player
            src="https://lottie.host/281473d4-add5-45c1-834a-50826735405f/8M8oA1me8G.json"
            background="transparent"
            speed="1"
            style={{
              width: 500 + "px",
              height: 500 + "px",
            }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </header>

      <main>
        <section className="min-h-60  py-40 md:px-10 bg-orange-50">
          <div className="p-6 flex flex-col">
            <div className="md:flex justify-center items-center mb-20">
              <div className="flex flex-col md:w-100 p-10  rounded-3xl md:mr-10">
                <h2 className="text-center text-2xl md:text-5xl font-semibold mb-10 text-orange-900">
                  Search / Filter Jobs
                </h2>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3">
                    Search and filter quality Jobs with ease
                  </span>
                </div>
                <div className="flex  pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">
                    Categorized and summarized by AI
                  </span>
                </div>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">Easy to read Job descriptions</span>
                </div>
              </div>
              <div className=" md:flex hidden justify-center items-center  md:w-100 overflow-hidden shadow-orange-900 shadow-2xl">
                <Image
                  src={"/landing/searchAndFilter.png"}
                  alt="searchAndFilter"
                  width="500"
                  height="400"
                  className={`transition duration-500 scale-${
                    isZoomed1 ? "125" : "100"
                  } hover:scale-150`}
                  id="zoomImage1"
                />
              </div>
            </div>
            <div className="md:flex justify-center items-center mb-20">
              <div className="md:flex hidden justify-center items-center  md:w-100 md:mr-10 overflow-hidden shadow-orange-900 shadow-2xl">
                <Image
                  src={"/landing/resumeSubmission.png"}
                  alt="resumeSubmission"
                  width="500"
                  height="400"
                  // className="hover:scale-110 transition duration-500"
                  className={` transition duration-500 scale-${
                    isZoomed2 ? "125" : "100"
                  } hover:scale-150`}
                  id="zoomImage2"
                />
              </div>
              <div className="flex flex-col md:w-100 p-10  rounded-3xl">
                <h2 className="text-center text-2xl md:text-5xl font-semibold mb-10 text-orange-900">
                  Perfect Match
                </h2>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">
                    Just submit your resume for the perfect match
                  </span>
                </div>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">Parsed and Analyzed by AI</span>
                </div>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">
                    Match with potential employers for the perfect fit
                  </span>
                </div>
              </div>
            </div>
            <div className="md:flex justify-center items-center mb-20">
              <div className="flex flex-col md:w-100 p-10  rounded-3xl md:mr-20">
                <h2 className="text-center text-2xl md:text-5xl font-semibold mb-2 text-orange-900">
                  Track Applications
                </h2>
                <h2 className="text-center text-2xl md:text-5xl font-semibold mb-10 text-orange-900">
                  Track Candidates
                </h2>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">Track Applications / Candidates</span>
                </div>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">Save / Mark / Hide Jobs</span>
                </div>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">Write notes</span>
                </div>
              </div>
              <div className="md:flex hidden justify-center items-center  md:w-100 overflow-hidden shadow-orange-900 shadow-2xl">
                <Image
                  src={"/landing/applicationTracker.png"}
                  alt="applicationTracker"
                  width="500"
                  height="400"
                  // className=" hover:scale-110 transition duration-500"
                  className={` transition duration-500 scale-${
                    isZoomed3 ? "125" : "100"
                  } hover:scale-150`}
                  id="zoomImage3"
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-20">
              <Link href="/jobs">
                <button className="flex justify-center items-center rounded-2xl  bg-orange-400 hover:bg-orange-500  text-white py-4 px-8 mr-4 transition duration-300 md:text-2xl text-md hover:-translate-y-1 shadow-2xl hover:shadow-lg active:translate-y-0">
                  <span className="">Explore Jobs</span>
                  <div className="ml-2  flex">
                    <ArrowForwardIcon />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="min-h-60  py-40 md:px-10 ">
          <div className="mb-10 flex justify-center text-xs text-orange-800 ">
            <span className="bg-orange-50 p-1 rounded-3xl px-3 border-x border-t border-orange-50">
              Features
            </span>
          </div>
          <h2 className="text-center text-4xl mb-10 font-semibold text-orange-900">
            All the Essentials
          </h2>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
            <div className="flex flex-col p-4  border-x border-t border-orange-50  rounded-2xl cursor-pointer group hover:shadow transition delay-100">
              <div className="mb-5 text-orange-400 relative w-8 h-8">
                <div
                  className={` absolute -top-[11px] -left-[11px] w-3 h-3 group-hover:border-b group-hover:border-r group-hover:border-orange-300 transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-b border-r border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  } `}
                ></div>
                <div
                  className={` absolute -top-[11px] -right-[11px] w-3 h-3 group-hover:border-b group-hover:border-orange-300 group-hover:border-l transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-b border-l border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={` absolute -bottom-[11px] -left-[11px] w-3 h-3 group-hover:border-t group-hover:border-orange-300 group-hover:border-r transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-t border-r border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={` absolute -bottom-[11px] -right-[11px] w-3 h-3 group-hover:border-t group-hover:border-orange-300 group-hover:border-l transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-t border-l border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={`absolute  top-0 left-0  w-full h-full  flex items-center justify-center border border-orange-50 group-hover:border-orange-300 transition-all duration-700  ease-in ${
                    isFeaturesInView
                      ? "border-orange-300 transition-all duration-1000  ease-in"
                      : ""
                  }`}
                >
                  <FaSearch />
                </div>
              </div>
              <h3 className="mb-2 text-orange-900">Job Search & Filtering</h3>
              <span className="text-xs text-orange-300">
                Easily search and filter through thousands of job listings to
                find the perfect match for your skills and preferences.
              </span>
            </div>
            <div className="flex flex-col p-4  border-x border-t border-orange-50  rounded-2xl cursor-pointer group hover:shadow transition delay-100">
              <div className="mb-5 text-orange-400 relative w-8 h-8">
                <div
                  className={` absolute -top-[11px] -left-[11px] w-3 h-3 group-hover:border-b group-hover:border-r group-hover:border-orange-300 transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-b border-r border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  } `}
                ></div>
                <div
                  className={` absolute -top-[11px] -right-[11px] w-3 h-3 group-hover:border-b group-hover:border-orange-300 group-hover:border-l transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-b border-l border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={` absolute -bottom-[11px] -left-[11px] w-3 h-3 group-hover:border-t group-hover:border-orange-300 group-hover:border-r transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-t border-r border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={` absolute -bottom-[11px] -right-[11px] w-3 h-3 group-hover:border-t group-hover:border-orange-300 group-hover:border-l transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-t border-l border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={`absolute  top-0 left-0  w-full h-full  flex items-center justify-center border border-orange-50 group-hover:border-orange-300 transition-all duration-700  ease-in ${
                    isFeaturesInView
                      ? "border-orange-300 transition-all duration-1000  ease-in"
                      : ""
                  }`}
                >
                  <MdSmartToy />
                </div>
              </div>
              <h3 className="mb-2 text-orange-900">Smart Recommendations</h3>
              <span className="text-xs text-orange-300">
                Discover tailored job listings based on your profile and search
                history, making job hunting more efficient
              </span>
            </div>

            <div className="flex flex-col p-4  border-x border-t border-orange-50  rounded-2xl cursor-pointer group hover:shadow transition delay-100">
              <div className="mb-5 text-orange-400 relative w-8 h-8">
                <div
                  className={` absolute -top-[11px] -left-[11px] w-3 h-3 group-hover:border-b group-hover:border-r group-hover:border-orange-300 transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-b border-r border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  } `}
                ></div>
                <div
                  className={` absolute -top-[11px] -right-[11px] w-3 h-3 group-hover:border-b group-hover:border-orange-300 group-hover:border-l transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-b border-l border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={` absolute -bottom-[11px] -left-[11px] w-3 h-3 group-hover:border-t group-hover:border-orange-300 group-hover:border-r transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-t border-r border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={` absolute -bottom-[11px] -right-[11px] w-3 h-3 group-hover:border-t group-hover:border-orange-300 group-hover:border-l transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-t border-l border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={`absolute  top-0 left-0  w-full h-full  flex items-center justify-center border border-orange-50 group-hover:border-orange-300 transition-all duration-700  ease-in ${
                    isFeaturesInView
                      ? "border-orange-300 transition-all duration-1000  ease-in"
                      : ""
                  }`}
                >
                  <MdOutlineSummarize />
                </div>
              </div>
              <h3 className="mb-2 text-orange-900">ChatGPT Summarization</h3>
              <span className="text-xs text-orange-300">
                Get quick and concise summaries of job descriptions, helping you
                make informed decisions faster
              </span>
            </div>
            <div className="flex flex-col p-4  border-x border-t border-orange-50  rounded-2xl cursor-pointer group hover:shadow transition delay-100">
              <div className="mb-5 text-orange-400 relative w-8 h-8">
                <div
                  className={` absolute -top-[11px] -left-[11px] w-3 h-3 group-hover:border-b group-hover:border-r group-hover:border-orange-300 transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-b border-r border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  } `}
                ></div>
                <div
                  className={` absolute -top-[11px] -right-[11px] w-3 h-3 group-hover:border-b group-hover:border-orange-300 group-hover:border-l transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-b border-l border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={` absolute -bottom-[11px] -left-[11px] w-3 h-3 group-hover:border-t group-hover:border-orange-300 group-hover:border-r transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-t border-r border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={` absolute -bottom-[11px] -right-[11px] w-3 h-3 group-hover:border-t group-hover:border-orange-300 group-hover:border-l transition-all duration-1000 ease-in ${
                    isFeaturesInView
                      ? "border-t border-l border-orange-300 transition-all duration-1000 ease-in"
                      : ""
                  }`}
                ></div>
                <div
                  className={`absolute  top-0 left-0  w-full h-full  flex items-center justify-center border border-orange-50 group-hover:border-orange-300 transition-all duration-700  ease-in ${
                    isFeaturesInView
                      ? "border-orange-300 transition-all duration-1000  ease-in"
                      : ""
                  }`}
                >
                  <GiDeerTrack />
                </div>
              </div>
              <h3 className="mb-2 text-orange-900">Application Tracker</h3>
              <span className="text-xs text-orange-300">
                Keep track of all your job applications in one place, from
                initial submission to final decision
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col min-h-60  justify-center items-center py-20 md:px-10 bg-orange-50">
        <h2 className="text-center text-3xl mb-20 font-semibold text-orange-900">
          Ezjobhunt
        </h2>
        <div className="md:flex justify-center  md:space-x-20 w-full bg-orange-200 md:[clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] px-2 py-20 bg-gradient-to-r from-orange-800 to-orange-300 text-white md:text-2xl text-lg">
          <div className="flex flex-col justify-start items-center ">
            <div className="border-b border-white pb-2 flex w-72">
              <div className="mr-2  flex justify-center items-center">
                <SiSemanticuireact />
              </div>
              Ezjobhunt
            </div>
            <div className="flex flex-col text-sm mt-2">
              <span>Michael is a developer based in California</span>
            </div>
            <div className="mt-6">
              <ul className="flex space-x-6">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="bg-white rounded-full p-2 text-orange-600">
                    <BsMeta />
                  </li>
                </a>
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="bg-white rounded-full p-2 text-orange-600">
                    <FaTwitter />
                  </li>
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="bg-white rounded-full p-2 text-orange-600">
                    <FaInstagram />
                  </li>
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className="bg-white rounded-full p-2 text-orange-600">
                    <FaYoutube />
                  </li>
                </a>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center mt-8 md:mt-0">
            <span className="border-b border-white pb-2 mb-2">About</span>
            <div className="text-base">About</div>
            <div className="text-base">FAQ</div>
          </div>
          <div className="flex flex-col justify-start items-center mt-8 md:mt-0">
            <span className="border-b border-white pb-2 mb-2">Services</span>
            <div className="text-base">Refer a Friend</div>
            <div className="text-base">Partnerships</div>
            <div className="text-base">FAQ</div>
          </div>

          <div className="flex flex-col  justify-start items-center mt-8 md:mt-0">
            <span className="border-b border-white pb-2 mb-2">Support</span>
            <div className="text-base">Blog</div>
            <div className="text-base">Developer</div>
            <div className="text-base">Press</div>
            <div className="text-base">Contact</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
