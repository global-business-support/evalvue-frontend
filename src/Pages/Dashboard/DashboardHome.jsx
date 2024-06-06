import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { UserContext } from "../../Contextfile";
import { Rating } from "@material-tailwind/react";
function DashboardHome() {
  const [Feed, setFeed] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    axios
      .post("https://api.evalvue.com/dashboard/feed/", { user_id: userId })
      .then((res) => {
        if (res.data.is_review_mapped) {
          setFeed(res.data.dashboard_list);
          // console.log(res.data.dashboard_list);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <>
      {Feed.map(function (feed) {
        return (
          <>
            <div
              key={feed.review_id}
              className="flex flex-col p-3 justify-center mx-auto items-center  gap-5 mt-8"
            >
              <div className=" bg-white mx-auto rounded-3xl md:w-5/6 shadow-md overflow-hidden">
                <div className="p-4">
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
                    <div className="mt-4 bg-slate-200 min-h-[150px] bg-gray-200 rounded-xl">
                      <p className="text-zinc-800 text-sm p-3 break-words">
                        {feed.comment}
                      </p>
                    </div>
                    <div className="mt-2 p-3 flex gap-2">
                      <span className="text-gray-800 font-semibold text-md">
                        Overall Rating:{" "}
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
