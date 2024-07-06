import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
import Apibackendrequest from "../Pages/Apibackendrequest";
import { UserContext } from "../Contextfile";
import { RxCross1 } from "react-icons/rx";
import { MdVerified } from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";
import Loader from "../Pages/Loader";

const VerifyOrganization = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [org, setOrg] = useState({});
  const [url, setUrl] = useState("");
  const [rejected, setRejected] = useState(false);
  const [rejectedMsg, setRejectedMsg] = useState(null);
  const [isOrganizationVerified, setIsOrganizationVerified] = useState(false);
  const [isOrganizationRejected, setIsOrganizationRejected] = useState(false);
  const { userId } = useContext(UserContext);
  const [error, setError] = useState("");

  const location = useLocation();
  const state = location.state;
  console.log(org)
  useEffect(() => {
    const organization = state?.orgData.filter(
      (org) => org.organization_id === state.orgId
    );

    setOrg(organization[0]);
    setUrl(organization[0].document_file);
    setLoading(false);
  }, []);

  const getImageExtension = (url) => {
    if (!url) return null;
    const lastDotIndex = url.lastIndexOf(".");
    if (lastDotIndex === -1) return null;
    const extension = url.substring(lastDotIndex + 1).toLowerCase();
    return extension;
  };

  const imageExtension = getImageExtension(url);
  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  function showpdf() {
    window.open({ pdf }, "_blank");
  }

  function showpdf(url) {
    window.open(url, "_blank");
  }

  const handleChange = (e) => {
      setRejectedMsg(e.target.value);
  };

  const checkValidation = () =>{
    if(rejectedMsg?.length < 50){
      setError("Minimum 50 characters are required")
    }
    if(rejectedMsg == null){
      setError("Please Give Reason for Rejecting the Organization")
    } else{
      handleVerifyClick(false)
      setError(null)
    }
  }

  function handleVerifyClick(isApprove) {
    Apibackendrequest(`${apiUrl}/verify/organization/`, {
      user_id: userId,
      organization_id: state.orgId,
      approve: isApprove,
      message : !isApprove ? rejectedMsg : null
    }).then((res) => {
      if (res.data) {
        if (res.data.is_organization_verified_successfull == true) {
          setIsOrganizationVerified(
            res.data.is_organization_verified_successfull
          );
        }
        if (res.data.is_organization_rejected_successfull == true) {
          setIsOrganizationRejected(
            res.data.is_organization_rejected_successfull
          );
          setRejected(false)
        }
      }
      if (res.isexception) {
        setError(res.exceptionmessage.error);
      }
    });
  }

  // function handleRejectReason(e){
  //   e.preventDefault()
  // }
console.log(error)
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
    <div className="flex justify-center items-center h-full p-5 relative">
      {rejected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" lg:min-w-[60%] md:min-w-[70%] w-[80%] sm:min-h-[400px] min-h-[300px] bg-white p-8 rounded-lg shadow-lg max-w-md">
            <button
              onClick={() => setRejected(false)}
              className="rounded-full bg-gray-600 p-2 mb-2"
            >
              <RxCross1 className="text-xl text-white font-extrabold" />
            </button>
            <h1 className="sm:text-xl text-sm text-black font-medium">Give Reason for Rejecting the Organization Approval</h1>
            <div
              className="w-full flex flex-col items-center gap-3"
            >
              <textarea
                name=""
                id=""
                className="h-[200px] w-full p-2 resize-none bg-gray-200 outline-none rounded-lg sm:text-base text-sm placeholder:text-gray-500 placeholder:sm:text-base placeholder:text-sm"
                maxLength={500}
                minLength={50}
                placeholder="Enter your reason here..."
                onChange={(e) => handleChange(e)}
              ></textarea>
              <div className="text-start w-full">
                <p className="text-gray-500 sm:text-base text-sm">Minimum characters (50/{rejectedMsg?.length})</p>
              </div>
              {error&&<span className="text-red-600 sm:text-sm text-xs">
                      {error}
                    </span>}
              <button
                className="py-2 w-52 bg-primary-100 text-white font-semibold rounded-lg"
                onClick={()=> checkValidation()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {isOrganizationVerified || isOrganizationRejected ? (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex flex-col items-center">
              <img
                undefinedhidden="true"
                alt="checkmark-icon"
                src="https://openui.fly.dev/openui/64x64.svg?text=✔"
                className="mb-4"
              />
              {isOrganizationVerified && (
                <p className="text-zinc-600 text-xl mb-6">
                  Organization Verified Successfully
                </p>
              )}
              {isOrganizationRejected && (
                <p className="text-zinc-600 text-xl mb-6">
                  Organization Rejected Successfully
                </p>
              )}
              <NavLink
                to={"/orgDetails"}
                className="bg-primary-100 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none"
              >
                Back to Unverified Organization List
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="h-full w-full">
            <h1 className="p-2 text-2xl text-gray-800 font-semibold text-center mb-5">
              Verify Organization
            </h1>
            <div className="overflow-x-auto relative">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b text-start">Field</th>
                    <th className="py-2 px-4 border-b text-start">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm min-w-[200px]">
                      Organization Name
                    </td>
                    <td className="py-2 px-4 border-b font-bold  ">
                      {org.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Document Type
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org.document_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Organization Sector
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org.sector_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Organization Listed
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org.listed_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      GST Number
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org?.gstin}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Number of Employees
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org?.number_of_employee}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Document Number
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org.document_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Registration Date & Time
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org.date_time}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Document Image
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex justify-start">
                        <img
                          src={org.document_file}
                          alt="Preview"
                          className="h-80 w-80 border border-gray-300 rounded-md"
                          onClick={() => {
                            imageExtension === "pdf"
                              ? showpdf(org.document_file)
                              : handleImageClick(org.document_file);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Organization Logo
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex justify-start">
                        <img
                          src={org.image}
                          alt="Preview"
                          className="h-36 w-36 border border-gray-300 rounded-md"
                          onClick={() => handleImageClick(org.image)}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b" colSpan="2">
                      <h1 className="font-semibold text-xl">Address</h1>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Address
                    </td>
                    <td className="py-2 px-4 border-b font-bold">{org.area}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Country
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org.country_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      State
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org.state_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      City
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org.city_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Pin Code
                    </td>
                    <td className="py-2 px-4 border-b font-bold">
                      {org.pincode}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b sm:text-base text-sm">
                      Status
                    </td>
                  <td className={`py-2 px-4 border-b font-bold `}>
                    <h1 className={`px-2 py-1 w-fit text-white `}>
                      {org.paid?
                      <span className="text-green-500 flex items-center gap-2"><MdVerified /> Paid</span>
                        :
                      <span className="text-red-500 flex items-center gap-2"><FaCircleExclamation />Unpaid</span>}
                    </h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="self-center sm:space-x-5 space-x-3 mt-5">
              {org.paid? 
                <>
                {!org.rejected&&<button
                className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-5 py-2 rounded-lg font-semibold transition ease-in-out sm:text-base text-xs"
                onClick={() => handleVerifyClick(true)}
              >
                Approve
              </button>}
              {!org.verified&&<button
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-lg font-semibold transition ease-in-out sm:text-base text-xs"
                onClick={() => setRejected(true)}
              >
                Reject
              </button>}
              
              </> : ''}
              
                
              
              
              
              <NavLink
                to={"/orgDetails"}
                className="border border-primary-100 text-primary-100 hover:bg-primary-100 hover:text-white px-5 py-2 rounded-lg font-semibold transition ease-in-out sm:text-base text-xs"
              >
                Cancel
              </NavLink>
            </div>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={handleCloseModal}
            >
              <div className="bg-white p-5 rounded-md">
                <img
                  src={modalImage}
                  alt="Modal Preview"
                  className="h-[600px] max-w-[600px]"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyOrganization;
