import { useState, useEffect } from 'react';
import { Rating } from "@material-tailwind/react";

function Swiperr() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const Feed = [
    {
      "review_id": 257,
      "comment": "Check server status: Verify if the server is up and running, and check for any ongoing maintenance.\r\nClear browser cache: Cached data in your browser could sometimes cause issues; clearing the cache might help.\r\nCheck proxy settings: If you are using a proxy server, ensure it is configured correctly and can communicate with the upstream servers.",
      "image": "http://test.api.evalvue.com/media/review_images/ff683093-df7d-43be-95c5-a3e337dec599quintana-homepage.jpg",
      "rating": 3,
      "created_on": "06 July at 09:27 PM",
      "organization_id": 965,
      "organization_name": "PETER ENGLAND",
      "employee_id": 416,
      "employee_name": "ABHISHEK GURJAR",
      "designation": "WORKING ",
      "organization_image": "http://test.api.evalvue.com/media/organizations/2aeca36e-6fc2-4603-b10d-4410ad73d767th.jpeg",
      "employee_image": "http://test.api.evalvue.com/media/employees/f5997924-6486-41cf-ae19-31c0d21ca241Screenshot 2024-07-02 000320.png"
    },
    {
      "review_id": 256,
      "comment": "\"I had the pleasure of His technical skills are truly impressive; he consistently delivered high-quality code and innovative solutions that exceeded our expectations. Romesh's ability to troubleshoot complex issues was crucial to our project's success. His clear communication and collaborative approach ensured everyone was aligned and deadlines were consistently met. Romesh's professionalism and dedication were exemplary throughout our collaboration",
      "image": "http://test.api.evalvue.com/media/review_images/2da92303-70ac-43b6-9743-8fd036a4e18ddownload.png",
      "rating": 5,
      "created_on": "06 July at 05:29 PM",
      "organization_id": 936,
      "organization_name": "SOTHANKFULL PVT. LTD.",
      "employee_id": 349,
      "employee_name": "ROMESH SHARMA",
      "designation": "JAVA FULL STACK DEVELOPER",
      "organization_image": "http://test.api.evalvue.com/media/organizations/bbfde5ae-cff7-4e59-8715-d83de38e876c2.png",
      "employee_image": "http://test.api.evalvue.com/media/employees/fe8454a0-7eae-417a-b3a4-c4354bd9a0a2Social Seller Academy.png"
    },
    {
      "review_id": 255,
      "comment": "Dr. Raman Shandu has demonstrated a profound level of medical expertise in his role as a General Practitioner at Jeneal Hospital. His in-depth knowledge of a wide range of medical conditions, combined with his proficiency in diagnosis and treatment, ensures that patients receive high-quality care. Dr. Shandu's commitment to staying current with medical advancements is evident in his practice, contributing to effective patient outcomes.",
      "image": "http://test.api.evalvue.com/media/review_images/f97bcbbc-80ba-4171-9b81-9a9866d8025cCauses, Symptoms & Natural Treatment For High Blood Pressure.png",
      "rating": 5,
      "created_on": "06 July at 05:17 PM",
      "organization_id": 930,
      "organization_name": "JENEAL HOSPITAL",
      "employee_id": 413,
      "employee_name": "RAMAN SHANDU",
      "designation": "DR. MBBS",
      "organization_image": "http://test.api.evalvue.com/media/organizations/80e0a965-dcf3-4dbc-a96f-cd7cb36389c7f61dfa3a1167f50243e21692429c8416.jpg",
      "employee_image": "http://test.api.evalvue.com/media/employees/9699b1d1-73ff-45a5-b2f3-522017f5c36ePremium Photo _ Indian sikh man doctor smiling and giving handshake.jpg"
    },
    {
      "review_id": 254,
      "comment": "Mitesh has demonstrated excellent technical skills in frontend development. He has a strong understanding of HTML, CSS, and JavaScript, and is proficient in using modern frameworks such as React and Angular. His ability to create responsive and visually appealing web applications has been a significant asset to our projects.",
      "image": "http://test.api.evalvue.com/media/review_images/803f7755-9751-4063-a7ba-1ad7d9f3fd19Redsmin.png",
      "rating": 5,
      "created_on": "06 July at 04:48 PM",
      "organization_id": 936,
      "organization_name": "SOTHANKFULL PVT. LTD.",
      "employee_id": 412,
      "employee_name": "MITESH CHAWLA",
      "designation": "FRONT-END DEVLOPER",
      "organization_image": "http://test.api.evalvue.com/media/organizations/bbfde5ae-cff7-4e59-8715-d83de38e876c2.png",
      "employee_image": "http://test.api.evalvue.com/media/employees/8ca45f8e-6879-47b3-a661-f545d241ed36Photo of Sarwar.png"
    },
   
  ];

  useEffect(() => {
    let intervalId;
    if (!isPaused) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === Feed.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Adjust the interval duration as per your requirement (5 seconds here)
    }
    return () => clearInterval(intervalId);
  }, [isPaused, Feed]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="flex  flex-col xl:flex-row items-center justify-center bg-zinc-500 p-8 h-screen">
      <div className="w-full md:text-center lg:w-[80%] xl:w-[40%] p-4">
        <h2 className="text-3xl  font-bold mb-4">What Our Customers Say</h2>
        <p className="text-muted-foreground mb-6">
          Relation so in confined smallest children unpacked delicate. Why sir
          end believe uncivil respect. Always get adieus nature day course for
          common.
        </p>
        <button className="bg-gradient-to-r from-purple-500 to-orange-500 text-white py-2 px-4 rounded-lg">
          View More
        </button>
      </div>
      <div
        className=" lg:w-[80%] xl:w-[58%]  relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mt-10 h-[400px]  bg-red-400">
          {Feed.map((feed, index) => (
            <div
              key={feed.review_id}
              className={`absolute top-0 left-0 w-full h-full  transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className=" bg-white shadow-xl w-full rounded-lg h-full">
                <div className="p-4  h-full">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full border bg-zinc-100">
                      <img
                        className="h-full w-full rounded-full object-fit"
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
                  <div className=" h-[350px] w-full p-2 mt-3 mb-2 rounded-xl border-[6px] border-zinc-200">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full border bg-zinc-100">
                        <img
                          className="h-full w-full object-cover rounded-full"
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
                    {feed.image ? (
                      <div className="w-full flex gap-2 md:flex-row justify-between flex-col mt-4">
                        <div className="md:w-[48%] w-full bg-gray-200 p-2 rounded-lg">
                          <div className="flex justify-center items-center bg-slate-200 h-[100%] bg-white rounded-lg">
                            <p className="whitespace-pre-wrap text-zinc-800 text-sm p-3 break-words break-all">
                              {feed.comment}
                            </p>
                          </div>
                        </div>
                        <div className="bg-red-400 w-[1px] sm:block hidden h-vh"></div>
                        <div className="max-h-[200px] overflow-hidden md:w-[48%] w-full bg-gray-200 p-2 rounded-lg">
                          <img
                            src={feed.image}
                            alt="Review-Image"
                            className="rounded-lg object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 bg-gray-200  rounded-lg">
                        <p className="whitespace-pre-wrap text-zinc-800 text-sm p-3 break-words break-all">
                          {feed.comment}
                        </p>
                      </div>
                    )}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Swiperr;
