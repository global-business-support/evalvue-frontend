import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { FaReadme } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Footer from "./Footer";
import SubServices from "./Dashboard/SubServices";

function Landing() {
  return (
    <>
      <div className="bg-white text-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
                Optimize Your Operations with Our Employee Solutions
              </h1>
              <p className="text-zinc-600">
                Weoffer the best services related to employee work experience.
                When employees leave a company, wehelp organizations post
                reviews about their performance and the reasons for their
                departure. This information helps other companies access the
                employee's biodata during the hiring process, making it easier
                to select top talent. Join us to improve your employee community
                and foster organizational growth.
              </p>
              <div className="flex gap-6 pt-8">
                <a
                  href="/register"
                  className="bg-primary-100  text-white px-6 py-2 rounded-md"
                >
                  Join Now
                </a>
                {/* <a href="" className="bg-transparent border text-primary-100 border-primary-100 hover:bg-zinc-100 px-6 py-2 rounded-md">Check Our Intro Video</a> */}
              </div>
            </div>
            <div>
              <img
                src="https://i.pinimg.com/564x/5b/6f/84/5b6f84ae598450a2ed19bcb9371c3b71.jpg"
                alt="Digital Agency"
                className="rounded-lg  h-[500px] shadow-lg"
              />
            </div>
          </div>
        </div>
        {/* services section */}
        <SubServices />

        {/* plan section */}

        <div className="max-w-4xl mx-auto p-6   rounded-lg shadow-md">
          <h2 className="text-center text-4xl font-bold text-zinc-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-300">
            No contracts. No surprise fees.
          </p>
          <div className="flex flex-col md:flex-row justify-center mt-8">
            <div className="flex flex-col items-center w-1/2 md:items-start bg-gray-100 p-6 rounded-lg">
              <div className="flex space-x-2 mb-4">
                <button className="px-4 py-2 bg-primary-100 text-white rounded-full">
                  Monthly
                </button>
                <button className="px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full">
                  Yearly
                </button>
              </div>
              <ul className="space-y-6 w-full text-zinc-900 dark:text-white">
                <li className="flex items-center">
                  <span className="mr-2">All limited links</span>
                  <span className="ml-auto">
                    <input
                      type="radio"
                      name="plan1"
                      className="custom-checkbox"
                    />
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">Own analytics platform</span>
                  <span className="ml-auto">
                    <input
                      type="radio"
                      name="plan2"
                      className="custom-checkbox"
                      checked
                    />
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">Chat support</span>
                  <span className="ml-auto">
                    <input
                      type="radio"
                      name="plan3"
                      className="custom-checkbox"
                      checked
                    />
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">Optimize hashtags</span>
                  <span className="ml-auto">
                    <input
                      type="radio"
                      name="plan4"
                      className="custom-checkbox"
                      disabled
                    />
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">Unlimited users</span>
                  <span className="ml-auto">
                    <input
                      type="radio"
                      name="plan5"
                      className="custom-checkbox"
                      disabled
                    />
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start w-1/2 p-6 rounded-lg ml-0 md:ml-6 mt-6 md:mt-0">
              <div className="w-full mb-4">
                <div className="flex items-center justify-between bg-primary-100 text-white p-4 rounded-lg">
                  <div className="flex justify-center items-center gap-4">
                    <FaCircleCheck className="h-6 w-6" />
                    <div>
                      <span className="text-lg  font-semibold ">Intro</span>
                      <div className="text-center border px-2 py-1 rounded-full text-[10px] text-white">
                        Save $20
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold text-3xl">
                    ₹99 <span className="text-sm">/Month</span>
                  </span>
                </div>
              </div>
              {/* <div className="w-full mb-4">
                <div className="flex items-center justify-between border-2  p-4 rounded-lg">
                  <div className="flex ">
                    <RxCross2 className="h-6 w-6" />
                    <div className="ml-2">
                      <span className="text-lg font-semibold ">Base</span>
                      <div className="text-center border px-2 text-red-300 py-1 rounded-full text-[10px]">
                        Save $20
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold text-3xl">
                    ₹199 <span className="text-sm">/Month</span>
                  </span>
                </div>
              </div>
              <div className="w-full mb-4">
                <div className="flex items-center justify-between border-2  p-4 rounded-lg">
                  <div className="flex ">
                    <RxCross2 className="h-6 w-6" />
                    <div className="ml-2">
                      <span className="text-lg text-capital font-semibold ">
                        Popular
                      </span>
                      <div className="text-center text-red-300 border px-2 py-1 rounded-full text-[10px]">
                        Save $20
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold text-3xl">
                    ₹299 <span className="text-sm">/Month</span>
                  </span>
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex items-center justify-center mt-8">
            <button className="px-6 py-2 bg-primary-100 text-white rounded-lg">
              Choose Plan
            </button>
          </div>
        </div>

        {/* after plan */}
        <div className="py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://img.indiafilings.com/learn/wp-content/uploads/2015/07/12011038/starting-a-business-in-India-for-foreign-company-1024x683.jpg"
                  alt="Integrated Digital Agency"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-zinc-900">
                  We Support to Your Business with best employees.
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
                  className="bg-primary-100 mt-5 hover:bg-red-600 text-white px-6 py-2 rounded-md"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer section */}
      <Footer/>
    </>
  );
}

export default Landing;
