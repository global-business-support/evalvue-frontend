import { FaCircleCheck } from "react-icons/fa6";
import Footer from "./Footer";
import SubServices from "./Dashboard/SubServices";
import Tittle from "../Tittle";
import { FaCheck } from "react-icons/fa6";
import homeimg from "../assets/images/homeimg.jpg";
import homeVideo from "../assets/videos/home-video.mp4";
import Swiper from "../Components/Swiperr";
function Landing() {
  Tittle("Home page -Evalvue");

  return (
    <>
      <div className="bg-white text-zinc-800">
        <section className="h-[100vh] w-full relative top-[0px] left-[0px] z-[2]">
          <div className="">
            <video
              loop
              muted
              autoPlay
              playsInline
              className="h-[100vh] w-full object-cover object-[10px 25px] absolute top-[0px] left-[0px] z-[-1]"
            >
              <source src={homeVideo} type="video/mp4" />
              Your browser does not support the video...
            </video>
          </div>
          <div className="h-[100vh] w-full flex absolute bg-[#000000a5] justify-center items-center">
            <div className="space-y-4 sm:max-w-[700px] max-w-[300px] text-center">
              <h1 className="text-2xl md:text-5xl font-bold text-white">
                Optimize Your <span className="text-white ">Operations</span>{" "}
                With Our <span className="text-white ">Employee</span> Solutions
              </h1>
              <p className="text-white">
                We offer the best services related to employee work experience.
                When employees leave a company, we help organizations post
                reviews about their performance and the reasons for their
                departure.
              </p>
              <div className="flex justify-center gap-6 pt-8">
                <a
                  href="/register"
                  className="bg-primary-100  text-white px-6 py-2 rounded-md hover:bg-[#5559af] hover:shadow-sm"
                >
                 Try 1 Month Free
                </a>
                {/* <a href="" className="bg-transparent border text-primary-100 border-primary-100 hover:bg-zinc-100 px-6 py-2 rounded-md">Check Our Intro Video</a> */}
              </div>
            </div>
          </div>
        </section>
        {/* <div className="lg:mx-10 mx-0 max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
                Optimize Your{" "}
                <span className="text-primary-100 ">Operations</span> With Our{" "}
                <span className="text-primary-100 ">Employee</span> Solutions
              </h1>
              <p className="text-zinc-600">
                We offer the best services related to employee work experience.
                When employees leave a company, we help organizations post
                reviews about their performance and the reasons for their
                departure. This information helps other companies access the
                employee's bio-data during the hiring process, making it easier
                to select top talent. Join us to improve your employee community
                and foster organizational growth.
              </p>
              <div className="flex gap-6 pt-8">
                <a
                  href="/register"
                  className="bg-primary-100  text-white px-6 py-2 rounded-md hover:bg-[#5559af] hover:shadow-sm"
                >
                  Join Now
                </a>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <img
                src={homeimg}
                alt="Digital Agency"
                className="rounded-lg  h-[500px] shadow-lg"
              />
            </div>
          </div>
        </div> */}
        <div className="xl:h-fit lg:h-[750px] md:h-[800px] sm:h-[900px] h-[1100px] sm:mb-5">
          <Swiper />
        </div>
        {/* services section */}
        <SubServices />

        {/* plan section */}

        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
          <h2 className="text-center text-4xl font-bold text-zinc-900 dark:text-white">
            Simple,{" "}
            <span className="text-primary-100 underline">
              transparent pricing
            </span>
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-300">
            No contracts. No surprise fees.
          </p>
          <div className="flex flex-col md:flex-row justify-center mt-8">
            <div className="flex flex-col items-center w-full md:items-start bg-gray-100 p-6 rounded-lg">
              <div className="flex space-x-2 mb-4">
                <button className="px-4 py-2 bg-primary-100 dark:bg-zinc-800 text-zinc-900  text-white rounded-full">
                  Yearly
                </button>
              </div>
              <ul className="space-y-6 w-full text-zinc-900 dark:text-white">
                <li className="flex items-center">
                  <span className="mr-2">One Organization Register</span>
                  <span className="ml-auto">
                    <FaCheck className="text-primary-100" />
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">Add unlimited Employees</span>
                  <span className="ml-auto">
                    <FaCheck className="text-primary-100" />
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">Chat support</span>
                  <span className="ml-auto">
                    <FaCheck className="text-primary-100" />
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">Data end-to-end Encryption</span>
                  <span className="ml-auto">
                    <FaCheck className="text-primary-100" />
                  </span>
                </li>
                {/* <li className="flex items-center">
                  <span className="mr-2">Unlimited users</span>
                  <span className="ml-auto">
                  <RxCross1 className="text-gray-500"/>
                  </span>
                </li> */}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center md:items-center w-full p-6 rounded-lg ml-0 md:ml-6 mt-6 md:mt-0">
              <div className="w-full mb-4">
                <div className="h-full flex items-center justify-between bg-primary-100 text-white p-4 rounded-lg">
                  <div className="flex justify-center items-center gap-4">
                    <FaCircleCheck className="h-6 w-6" />
                    <div>
                      <span className="text-lg  font-semibold ">Basic</span>
                      {/* <div className="text-center border px-2 py-1 rounded-full text-[10px] text-white">
                        Save $20
                      </div> */}
                    </div>
                  </div>
                  <span className="font-semibold text-3xl">
                    ₹99 <span className="text-sm">/Month</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center justify-center mt-8">
            <button className="px-6 py-2 bg-primary-100 text-white rounded-lg hover:bg-[#5559af] hover:shadow-sm">
              Choose Plan
            </button>
          </div> */}
        </div>

        {/* after plan */}
        <div className="py-28">
          <div className="lg:mx-10 mx-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <iframe
                  width="100%" // Adjust width as per your design
                  height="315" // Adjust height as per your design
                  // https://www.youtube.com/watch?v=NnNGpfRrgLw
                  src="https://www.youtube.com/embed/NnNGpfRrgLw" // Replace with your YouTube video ID
                  frameborder="0"
                  allowfullscreen
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-zinc-900">
                  We Support To Your{" "}
                  <span className="text-primary-100">Business </span> With Best
                  Employees.
                </h2>
                <p className="text-zinc-600 pb-5">
                  You realize you have made the right decision by partnering
                  with us, as we ensure complete transparency with your
                  employees. Our services help you maintain clear communication,
                  foster trust, and enhance overall efficiency within your
                  organization. Join us to experience a seamless and open work
                  environment that benefits both your employees and your
                  business growth .
                </p>
                <a
                  href="#"
                  className="bg-primary-100 mt-5 hover:bg-red-600 transition duration-300 text-white px-6 py-2 rounded-md"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer section */}
      <Footer />
    </>
  );
}

export default Landing;
