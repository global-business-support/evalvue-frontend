import React from 'react'
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { FaReadme } from "react-icons/fa";



function SubServices() {
  return (
        <section className="py-14">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-14">
              Our{" "}
              <span className=" underline text-primary-100 underline-offset-2">
                {" "}
                Services
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="  p-6 rounded-lg shadow-lg border border-b-4 border-b-purple-900 hover:scale-105 transition-all duration-300 drop-shadow-lg">
                <div className="flex justify-center mb-4 p-2 ">
                  <div className="h-20 w-20 bg-primary-100 rounded-full p-6">
                    <BsBookmarkCheckFill className="h-8 w-8 mx-auto my-auto text-white" />
                  </div>

                  {/* <img src="https://placehold.co/64x64" alt="Corporate Solution" className="w-16 h-16"/> */}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                Employees Accomplishment
                </h3>
                <p className="">
                We track and recognize individual achievements, providing a platform for rewarding exceptional performance and milestones.
                </p>
              </div>
              <div className="  p-6 rounded-lg shadow-lg border border-b-4 hover:scale-105 transition-all duration-300 border-b-purple-900 drop-shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 bg-primary-100 rounded-full p-5">
                    <FaHandsHelping
                      heck
                      className="h-9 w-9 mx-auto my-auto text-white"
                    />
                  </div>

                  {/* <img src="https://placehold.co/64x64" alt="Call Center Solutions" className="w-16 h-16"/> */}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                Remove Fake Experiences
                </h3>
                <p>
                We helps in maintaining the integrity of employee records by detecting and eliminating fraudulent job history entries, ensuring accurate and trustworthy data for better decision-making.
                </p>
              </div>
              <div className=" p-6 rounded-lg shadow-lg border border-b-4 hover:scale-105 transition-all duration-300 border-b-purple-900 drop-shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 bg-primary-100 rounded-full p-6">
                    <FaReadme className="h-8 w-8 mx-auto my-auto text-white" />
                  </div>

                  {/* <img src="https://placehold.co/64x64" alt="Cloud Development" className="w-16 h-16"/> */}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                Show Good Employees
                </h3>
                <p>
                We highlights the top-performing staff based on performance metrics and feedback, enabling managers to recognize and reward excellence within the organization.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <a
                href="/services"
                className="bg-primary-100 text-white py-2 px-4 rounded"
              >
                See All Services
              </a>
            </div>
          </div>
        </section>
  )
}

export default SubServices