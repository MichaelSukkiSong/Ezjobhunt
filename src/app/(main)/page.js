"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdArrowOutward, CheckIcon } from "../(main)/icons";

const LandingPage = () => {
  const [isZoomed1, setIsZoomed1] = useState(false);
  const [isZoomed2, setIsZoomed2] = useState(false);
  const [isZoomed3, setIsZoomed3] = useState(false);

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
          <Link href="/">Ezjobhunt</Link>
        </div>
        <div className="flex">
          <div className="p-2 mr-2 hover:text-orange-600 transition duration-300">
            <Link href="/jobs">Jobseekers</Link>
          </div>
          <div className="p-2 mr-2 hover:text-orange-600 transition duration-300">
            <Link href="employers">Employers</Link>
          </div>
          <div className="p-2 mr-2 hover:text-orange-600 transition duration-300">
            <Link
              href="https://github.com/MichaelSukkiSong/Ezjobhunt"
              target="_blank"
              className="flex"
            >
              <span className="mr-1">Github</span>
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
        <section className="min-h-60  pt-40 pb-40 bg-orange-50">
          <div className="p-6 flex flex-col">
            <div className="md:flex justify-center items-center mb-20">
              <div className="flex flex-col md:w-100 p-10  rounded-3xl md:mr-10">
                <h2 className="text-center text-4xl md:text-5xl font-semibold mb-10 text-orange-900">
                  1. Search / Filter
                </h2>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3">Search and filter Jobs with ease</span>
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
                <h2 className="text-center text-4xl md:text-5xl font-semibold mb-10 text-orange-900">
                  2. Submit
                </h2>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">
                    Submit and Store resume in Database
                  </span>
                </div>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">Parsed by AI</span>
                </div>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">
                    Match with employers for the perfect fit
                  </span>
                </div>
              </div>
            </div>
            <div className="md:flex justify-center items-center mb-20">
              <div className="flex flex-col md:w-100 p-10  rounded-3xl md:mr-20">
                <h2 className="text-center text-4xl md:text-5xl font-semibold mb-10 text-orange-900">
                  3. Track
                </h2>
                <div className="flex pl-10 md:pl-2">
                  <div className="">
                    <CheckIcon color="orange.400" mr={2} />
                  </div>
                  <span className="mb-3 ">Track Application status</span>
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
                <button className="rounded-2xl  bg-orange-400 hover:bg-orange-500 font-bold text-white p-4 mr-4 transition duration-300 md:text-2xl text-md hover:-translate-y-1 shadow-2xl hover:shadow-lg active:translate-y-0">
                  Explore Jobs
                </button>
              </Link>
            </div>
          </div>
        </section>
        {/* <section className="min-h-60 bg-red-200 p-2">
          <h2 className="text-center text-4xl mb-6">Everything You Need</h2>
          <div className="grid md:grid-cols-4 grid-cols-2">
            <div className="p-2">
              <div>Icon</div>
              <h3>Block Explorer</h3>
              <span>View and analyze transaction history and state</span>
            </div>
            <div className="p-2">
              <div>Icon</div>
              <h3>Block Explorer</h3>
              <span>View and analyze transaction history and state</span>
            </div>
            <div className="p-2">
              <div>Icon</div>
              <h3>Block Explorer</h3>
              <span>View and analyze transaction history and state</span>
            </div>
            <div className="p-2">
              <div>Icon</div>
              <h3>Block Explorer</h3>
              <span>View and analyze transaction history and state</span>
            </div>
          </div>
        </section> */}
      </main>
      {/* <footer className="min-h-60 bg-green-200 flex justify-center items-center p-10">
        <div className="flex justify-evenly space-x-20">
          <div className="flex flex-col justify-start items-center bg-orange-300">
            <div>Ezjobhunt</div>
            <div>links</div>
          </div>
          <div className="flex flex-col justify-start items-center bg-orange-300">
            <span>Jobseekers</span>
            <div>How Ezjobhunt Works</div>
            <div>Refer a Friend</div>
            <div>Partnerships</div>
            <div>FAQ</div>
          </div>
          <div className="flex  flex-col justify-start items-center bg-orange-300">
            <span>Employers</span>
            <div>Why Ezjobhunt</div>
            <div>Pricing</div>
            <div>FAQ</div>
          </div>
          <div className="flex flex-col  justify-start items-center bg-orange-300">
            <span>Company</span>
            <div>Support</div>
            <div>About Ezjobhunt</div>
            <div>Careers</div>
            <div>Press</div>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default LandingPage;
