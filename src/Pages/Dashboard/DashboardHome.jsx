import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { UserContext } from "../../Contextfile";
import { Rating } from "@material-tailwind/react";
import Loader from "../Loader";
import Tittle from "../../Tittle";
import Apibackendrequest from "../Apibackendrequest";
import feedImg from '../../assets/images/about-mission1.jpg'
const apiUrl = import.meta.env.VITE_API_URL;
function DashboardHome() {
  Tittle("Feed - Evalvue")
  const [Feed, setFeed] = useState([]);
  const { userId } = useContext(UserContext);
  const [loading, setloading] = useState(true)

  useEffect(() => {
    Apibackendrequest(`${apiUrl}/dashboard/feed/`, { user_id: userId })
      .then((res) => {
        if (res.data.is_review_mapped) {
          setFeed(res.data.dashboard_list);
        }
        if (res.isexception) {
          setError(res.exceptionmessage)
        }
      })
      .finally(() => {

        setloading(false)
      })
  }, []);


  if (loading) {
    return (
      <>
        <div className="h-[calc(100vh-200px)] flex justify-center items-center">
          <Loader />
        </div>
      </>
    )
  }

  return (
    <>
      {Feed.map(function (feed) {
        return (
          <>
            <div
              key={feed.review_id}
              className="flex flex-col p-3 justify-center mx-auto items-center  gap-5  mb-18"
            >
              <div className=" bg-white mx-auto rounded-lg md:w-5/6 w-full shadow-md overflow-hidden">
                <div className="p-4 l">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full  border bg-zinc-100">
                      <img
                        className="h-full w-full rounded-full object-fit "
                        src={feed.organization_image}
                        alt="Company Logo"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-zinc-900">
                        {feed.organization_name}
                      </p>
                      <p className="text-xs text-zinc-500">{feed.created_on}</p>
                    </div>
                  </div>
                  <div className=" h-full w-full p-2 mt-3  rounded-xl   border-[6px] border-zinc-200">
                    <div className=" flex items-center">
                      <div className="h-10 w-10 rounded-full border bg-zinc-100">
                        <img
                          className="h-full w-full object-cover rounded-full "
                          src={feed.employee_image}
                          alt="Company Logo"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-zinc-900">
                          {feed.employee_name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {feed.designation}
                        </p>
                      </div>
                    </div>

                    {feed.review_image ? (
                    <div className=" w-full flex gap-2 md:flex-row justify-between flex-col mt-4">
                      <div className="md:w[48%] w-full bg-gray-200 p-2 rounded-lg ">
                        <div className="flex justify-center items-center  bg-slate-200 h-[100%] bg-white rounded-lg">
                          <p className="whitespace-pre-wrap text-zinc-800 text-sm p-3 break-words break-all">
                            {feed.comment}
                          </p>
                        </div>
                      </div>

                      <div className="bg-red-400 w-[1px] sm:block hidden h-vh"></div>

                      <div className=" max-h-[400px] overflow-hidden  md:w[48%] w-full bg-gray-200 p-2 rounded-lg">
                          <img src={feed.image} alt="Review-Image"
                            className="rounded-lg object-scale-down w-full h-full "
                          />
                      </div>
                    </div>
                    ) : 
                    (
                      <div className="mt-4 bg-gray-200 h-[100%] rounded-lg">
                          <p className="whitespace-pre-wrap text-zinc-800 text-sm p-3 break-words break-all">
                            {feed.comment}
                          </p>
                        </div>
                    )
                    }
                    <div className="mt-2 p-3 flex gap-2">
                      <span className="text-gray-800 font-semibold text-md">
                        Rating:{" "}
                      </span>
                      <span>
                        <Rating value={feed.rating} readonly />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default DashboardHome;
