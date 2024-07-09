import { useState, useEffect } from 'react';
import { Rating } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';

function Swiperr() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const Feed = [
    {
      "review_id": 257,
      "comment": "\"ABHISHEK GURJAR consistently goes above and beyond to ensure our customers are delighted. Her empathetic approach and dedication to problem-solving have earned her glowing feedback from numerous clients. Jane's commitment to excellence sets a high standard for our customer service team.\"",
      "image": "https://res.cloudinary.com/people-matters/image/upload/fl_immutable_cache,w_624,h_351,q_auto,f_auto/v1705058808/1705058806.jpg",
      "rating": 3,
      "created_on": "01 dec at 09:27 PM",
      "organization_id": 965,
      "organization_name": "PETER INDIA",
      "employee_id": 416,
      "employee_name": "ABHISHEK GURJAR",
      "designation": "Customer Service Representative ",
      "organization_image": "https://i0.wp.com/www.bornorganic.com.au/wp-content/uploads/dummy-logoArtboard-1born-logo.png?ssl=1",
      "employee_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqEO5wtMqNhonAnZ030yc1F_YYRJlJLy9Mew&s"
    },
    {
      "review_id": 256,
      "comment": "\"Anjali Sharma consistently delivers high-quality code and innovative solutions to complex challenges. His technical expertise and collaborative spirit have been crucial in launching our latest product ahead of schedule. Michael's contributions reflect our commitment to excellence in software development.\"",
      "image": "https://www.womencamaraderie.com/images/gallery/9.jpg",
      "rating": 5,
      "created_on": "20 feb at 05:29 PM",
      "organization_id": 936,
      "organization_name": "SOTHANKFULL PVT. LTD.",
      "employee_id": 349,
      "employee_name": "Anjali Sharma",
      "designation": "senior Software Developer",
      "organization_image": "https://i0.wp.com/belapay.com/wp-content/uploads/2021/04/166-1665242_fakery-logo-transparent-dummy-logo-png-clipart.jpg",
      "employee_image": "data:image/jpeg;base64,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"
    },
    {
      "review_id": 255,
      "comment": "\"Riya Sharma consistently produces visually stunning designs that captivate our audience. Her creativity and attention to detail shine through in every project she undertakes. Rebecca's designs have not only enhanced our brand's image but have also set a new standard for visual excellence.\"",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHHRsCO1Q_-G2tyrWTeSXjLkkz-j3LnEhJ9Q&s",
      "rating": 5,
      "created_on": "10 jan at 05:17 PM",
      "organization_id": 930,
      "organization_name": "JENEAL",
      "employee_id": 413,
      "employee_name": "Riya Sharma",
      "designation": " Graphic Designer",
      "organization_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjL4g1vnsArrgRmLL1mfFsDy_IUZ1A-UteYw&s",
      "employee_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_rr72rWGbtfQq6AzwnF4nl471DEDYI466Q&s"
    },
    {
      "review_id": 254,
      "comment": "\"MITESH CHAWLA meticulous financial analyses and strategic insights have been instrumental in guiding our fiscal decisions. His ability to interpret complex data and present actionable recommendations has proven invaluable to our financial planning. Daniel's contributions have ensured our financial stability and growth.\"",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmXjBAMuxByR0DThP6Ttujb5CzZaeZZC_KmIG3Z-ZllZRjGNXeta32THp5kuoU2ul_pAA&usqp=CAUg",
      "rating": 5,
      "created_on": "08 Jun at 04:48 PM",
      "organization_id": 936,
      "organization_name": "SOTHANKFULL PVT. LTD.",
      "employee_id": 412,
      "employee_name": "MITESH CHAWLA",
      "designation": "Financial Analyst",
      "organization_image": "https://img.freepik.com/free-vector/black-en-yellow-abstract-logo_23-2147493308.jpg",
      "employee_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaeLc2fsm2CrUrr2cihGHR83_njcRH7XLeQw&s"
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
    <>
      <h1 className='text-center text-[36px] font-semibold mt-7 mb-7'>Empowering Growth <span className='text-primary-100 underline'>Through Feedback</span></h1>
    <div className="flex flex-col xl:gap-0 gap-2 xl:flex-row items-center justify-center bg-zinc-500 p-8">
      <div className=" w-full lg:w-[80%] xl:w-[40%] p-4">
        <h2 className="text-3xl  font-bold mb-4">Paving the path to success, one feedback at a time.</h2>
        <p className="text-muted-foreground mb-6">
        "we value transparency and continuous improvement. Our employee reviews and feedback process ensures that every team member receives constructive input and recognition for their contributions. We believe in fostering a supportive environment where feedback is a catalyst for growth. Explore how we nurture talent and celebrate achievements through our comprehensive review system."
        </p>
        <NavLink to="/login">

        <button className="bg-gradient-to-r from-blue-500 to-primary-100 text-white py-2 px-4 rounded-lg">
          View More
        </button>
        </NavLink>
      </div>
      <div
        className=" lg:w-[80%] xl:w-[58%] w-full h-full relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mt-10 md:h-[400px] h-full ">
          {Feed.map((feed, index) => (
            <div
              key={feed.review_id}
              className={`absolute top-0 left-0 w-full h-full  transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className=" bg-white shadow-xl w-full rounded-lg h-fit">
                <div className="p-4 h-fit">
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
                  <div className=" xl:h-[350px] h-fit w-full p-2 mt-3 mb-2 rounded-xl border-[6px] border-zinc-200">
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
                        <div className="w-[1px] sm:block hidden h-vh"></div>
                        <div className="max-h-[200px] overflow-hidden md:w-[48%] w-full bg-gray-200 p-2 rounded-lg">
                          <img
                            src={feed.image}
                            alt="Review-Image"
                            className="rounded-lg object-fill w-full h-full"
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
    </>
  );
}

export default Swiperr;
