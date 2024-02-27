"use client";

import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <nav className="border-b border-orange-200 flex justify-between ">
        <div className="p-2 mr-2 ">
          <Link href="/">Ezjobhunt</Link>
        </div>
        <div className="flex">
          <div className="p-2 mr-2 hover:text-orange-500">
            <Link href="/jobs">Jobseekers</Link>
          </div>
          <div className="p-2 mr-2 hover:text-orange-500">
            <Link href="employers">Employers</Link>
          </div>
          <div className="p-2 mr-2 hover:text-orange-500">
            <Link
              href="https://github.com/MichaelSukkiSong/Ezjobhunt"
              target="_blank"
            >
              Github
            </Link>
          </div>
        </div>
      </nav>

      <header className="min-h-screen flex justify-center items-center pl-10">
        <div className="flex flex-col  max-w-lg p-4">
          <h1 className="text-bold text-6xl mb-10 font-semibold">
            Employ your potential
          </h1>
          <h2 className="mb-8">
            <p>Looking for a new role? Search quality jobs with ease.</p>
            <p>Hiring? Search for the best talent in the industry.</p>
          </h2>
          <div>
            <Link href="/jobs">
              <button className="rounded-sm bg-orange-400 hover:bg-orange-500 text-white p-3 mr-4">
                Search Job
              </button>
            </Link>
            <Link href="/employers">
              <button className="border rounded-sm border-orange-100 text-orange-400 p-3 hover:text-orange-500 hover:border-orange-200">
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
      {/* <main>
        <section className="min-h-60 bg-yellow-200 p-2">
          <div className="p-6 flex flex-col">
            <div className="flex justify-center items-center">
              <div className="flex flex-col bg-lime-800 w-1/2 p-2">
                <h2 className="text-5xl font-semibold mb-3">1. Build</h2>
                <span className="mb-3">
                  Build with Arbitrum Nitro, the OP Stack, or the Polygon CDK
                </span>
                <span className="mb-3">
                  Choose whether to opt for shared, decentralized sequencing at
                  inception
                </span>
                <span className="mb-3">
                  Lower fees by 10-100x by using Celestia, Eigen, or NEAR for DA
                </span>
                <span className="mb-3">
                  Choose any token as the native, fee-paying token of your chain
                </span>
              </div>
              <div className="flex justify-center items-center bg-violet-200 w-1/2">
                picture
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center bg-violet-200 w-1/2">
                picture
              </div>
              <div className="flex flex-col bg-lime-800 w-1/2 p-2">
                <h2 className="text-5xl font-semibold mb-3">1. Build</h2>
                <span className="mb-3">
                  Build with Arbitrum Nitro, the OP Stack, or the Polygon CDK
                </span>
                <span className="mb-3">
                  Choose whether to opt for shared, decentralized sequencing at
                  inception
                </span>
                <span className="mb-3">
                  Lower fees by 10-100x by using Celestia, Eigen, or NEAR for DA
                </span>
                <span className="mb-3">
                  Choose any token as the native, fee-paying token of your chain
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="min-h-60 bg-red-200 p-2">
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
        </section>
      </main>
      <footer className="min-h-60 bg-green-200 flex justify-center items-center p-10">
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
