import React, { useState, useEffect } from "react";
import aboutimg from "../../assets/images/about-img.jpg";
import Loader from "../Loader";
import Apibackendrequest from "../Apibackendrequest";
import bgImg from '../../assets/images/FooterBackgroundImage.png'
const apiUrl = import.meta.env.VITE_API_URL;

function AddEmployee() {
  const [orgList, setOrgList] = useState([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [selectedOrg, setSelectedOrg] = useState({
    // user_id: userId,
    // organization_id: location.state?.organization_id || "",
    // gstin:""
  });
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   Apibackendrequest(`${apiUrl}/organizations/`)
  //     .then((res) => {
  //       setOrgList(res.data.organization_list);
  //       if (res.isexception) {
  //         setError(res.exceptionmessage.error);
  //       }
  //     })
  //     .catch((err) => {
  //       setError(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  function orgHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedOrg((values) => ({ ...values, [name]: value }));
    // Remove error for this field when user enters a value
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }

  const handleEmailSubmit = async (e) => {
    setError("");
    setLoading(true);
    if (e) e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/shoot/otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.otp_send_successfull) {
        setIsEmailSent(true);
        setUserId(data.user_id);
        setOtpSent(true);
        setTimeLeft(120);
        setShowResendButton(false);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Failed to send email. Please try again.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <div className="h-[calc(100vh-200px)] flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="h-full mx-auto w-[60%] bg-white p-2 rounded-lg flex flex-col items-center">
        <div className="h-28 w-full bg-gray-300 rounded-lg"></div>
        <div className="w-full flex flex-col items-center gap-5 mt-[-60px]">
          <img src={aboutimg} alt="" className="h-28 w-28 rounded-full" />
          <div className="mt-8 text-gray-800 space-y-1">
            <h1 className="text-xl">
             Aman
            </h1>
            <h1 className="text-sm">Front End Developer
            </h1>
            <h1 className="text-sm">amanchhalotre@gmail.com
            </h1>
            <h1 className="text-sm">
              Mobile No. : <span className="font-bold">7845125478</span>
            </h1>
            <h1 className="text-sm">
              Aadhar No. : <span className=" font-bold">458745874587</span>
            </h1>
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="organization"> Please select Organization : </label>
          <select
            name="organization"
            id="organization"
            onChange={() => orgHandler}
          >
            <option value="">--Please Select--</option>
            {orgList.map((org, index) => (
              <option key={index} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
          {errors?.org?.name && (
            <span className="text-red-600 text-sm">
              {errors.organization_image}
            </span>
          )}
        </div>
        {/* <div className="mt-5 p-5 outline outline-primary-100 rounded h-52 w-fit text-center space-y-10">
          <h1 className="text-lg font-medium">Please Enter Otp</h1>
          <div>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                className="w-10 bg-zinc-200 rounded mr-2 p-2 text-center"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
        </div> */}
        <div className="">
          <button className="mt-5 px-8 py-2 bg-primary-100 rounded-lg text-white">
            Sent otp
            Confirm
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
