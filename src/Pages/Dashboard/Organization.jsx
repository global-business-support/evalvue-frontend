import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Addorganization from "./Addorganization";
import { UserContext } from "../../Contextfile";
import Loader from "../Loader";
import Tittle from "../../Tittle";
import { FaClock } from "react-icons/fa6";
import { BiSolidShow } from "react-icons/bi";

import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoReceiptOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

import { AiOutlineCloudUpload } from "react-icons/ai";

import { BsCreditCard2Back } from "react-icons/bs";
// import { FaIndianRupeeSign } from "react-icons/fa6";
// import { AiOutlineCloudUpload } from "react-icons/ai";
import logo from '../../assets/images/evalvuelogo.jpg'


import { BsPatchExclamationFill } from "react-icons/bs";

import ThreeDotMenu from "./ThreeDotMenu";
import Apibackendrequest from "../Apibackendrequest";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Organization() {
  Tittle("Organization - Evalvue");
  const [Orgdata, setOrgdata] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [Isorgmap, setIsorgmap] = useState(false);
  const { userId } = useContext(UserContext);
  const [paymentSuccessfull, setPaymentSuccessfull] = useState(false);
  const [address, setAddress] = useState({});
  const [error, setError] = useState();

  const { setStateOrgData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    Apibackendrequest(`${apiUrl}/organizations/`, { user_id: userId })
      .then((res) => {
        setOrgdata(res.data.organization_list);
        setCount(res.data.organizations_paid_count);

        if (res.data.is_organization_mapped) {
          setIsorgmap(res.data.is_organization_mapped);
        } else {
          setAddress(res.data);
        }
        if (res.isexception) {
          setError(res.exceptionmessage.error);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    // axios
    //   .post(`${apiUrl}/organizations/`, { user_id: userId })
    //   .then((res) => {
    //     setOrgdata(res.data.organization_list);
    //     if (res.data.is_organization_mapped) {
    //       setIsorgmap(res.data.is_organization_mapped);
    //     } else {
    //       setAddress(res.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoading(false); // Set loading state to false when request completes
    //   });
  }, [userId]);

  const handleEdit = (organizationId) => {
    // Navigate to the edit page
    navigate(`/dashboard/organization/addorganization`, {
      state: { organization_id: organizationId, editorg: true },
    });
    // navigate(`/dashboard/organization/edit/${organizationId}`)
  };

  const handleReApply = (organizationId) => {
    navigate("/dashboard/organization/reapply", {
      state: { 
        organization_id: organizationId,
        rejected: true,
       },
    });
};
  const handleAddOrg = () => {
    navigate("/dashboard/organization/addorganization", {});
  };

  function CreatePayment(organizationId) {

    const response = Apibackendrequest(`${apiUrl}/create/subscription/id/`, {
      user_id: userId,
      organization_id: organizationId,
      plan_id: 4,
    });
    // if(response)
    response.then(response=>{
      console.log(response.data)

      const subid=response.data.subscription_response_list[0].subscription_id;
      console.log(subid)

      if(subid){
        var options = {
          "key": "rzp_test_mHIc2FsOxWbBD7",
          "subscription_id": `${subid}`,
          "name": "Evalvue",
          "description": "Monthly Test Plan",
          "image": `${logo}`,
          // "subscription_card_change": 0,
          "handler": function(response) {
            alert(response.razorpay_payment_id),
            alert(response.razorpay_subscription_id),
            alert(response.razorpay_signature);
            const res=Apibackendrequest(`${apiUrl}/verify/payment/`,{
              payment_id:response.razorpay_payment_id,
              subscription_id:response.razorpay_subscription_id,
              user_id: userId,
              organization_id: organizationId,

            })
            console.log(res)
          },
          "prefill": {
            "name": "",
            "email": "",
            "contact": ""
          },
          "theme": {
            "color": "#5134a9"
          }
        };

      var rzp1 = new Razorpay(options);
        rzp1.open();

        
      }
      else{
        alert("Payment is not available at this time. Please try again later. ")
      }
    })

    response.catch(err=>{
      console.log(err)
    })

  }

  if (loading) {
    return (
      <>
        <div className="h-[calc(100vh-100px)] flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-red-500 text-lg align-middle">{error}</h1>
      </div>
    );
  }

  if (Isorgmap) {
    return (
      <>
        <div className="lg:px-4 sm:px-2 relative rounded-lg mx-auto">
          {paymentSuccessfull && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className=" lg:min-w-[500px] md:min-w-[400px] min-w-[350px]  min-h-[500px] bg-white p-5 rounded-lg shadow-lg max-w-md border-t-4 border-primary-100">
                <div className="w-full flex justify-center mb-2">
                  <div className="w-auto p-3 rounded-full bg-gray-200 flex items-center justify-center">
                    <IoReceiptOutline className="text-3xl text-primary-100" />
                  </div>
                </div>
                <hr className="" />
                <div className="h-full w-full mt-2">
                  <h1 className="text-lg">Hello, organization name</h1>
                  <div className="bg-gray-300 w-full h-full my-5 text-sm py-1 px-3 flex flex-col items-center justify-center rounded-lg ">
                    <p className="w-full flex justify-between">
                      Order Id :{" "}
                      <span className="font-semibold">455655555555555</span>
                    </p>
                    <p className="w-full flex justify-between">
                      Payment Id :{" "}
                      <span className="font-semibold">455655555555555</span>
                    </p>
                    <p className="w-full flex justify-between">
                      Subscription Id :{" "}
                      <span className="font-semibold">455655555555555</span>
                    </p>
                  <div className="w-full flex items-center justify-between mt-5">
                    <h1 className="text-primary-100 text-base">Amount</h1>
                    <h1 className="flex items-center text-xl font-semibold text-primary-100">
                      <FaIndianRupeeSign className="text-base" />
                      99
                    </h1>
                  </div>
                  </div>
                  <hr />
                  <div className="w-full flex flex-col items-center text-center gap-5 mt-5">
                    <h1 className="text-primary-100 font-semibold">
                      Amount Paid Successfully
                    </h1>
                    <button
                      className="bg-primary-100 w-40 rounded-lg py-2 px-5 text-white font-semibold"
                      onClick={() => setPaymentSuccessfull(false)}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between sticky lg:top-[55px] top-[48px] z-[2] items-center lg:mb-3 mb-12 bg-white p-4 rounded shadow-lg">
            <h2 className="sm:text-lg text-xs font-semibold">
              Total Organization: {Orgdata.length}
            </h2>
            <NavLink onClick={handleAddOrg}>
              <button className="bg-primary-100 sm:text-base text-[12px] text-white hover:bg-[#5559af] hover:shadow-sm border border-primary-100 font-semibold py-2 sm:px-4 px-2 rounded">
                + Add Organization
              </button>
            </NavLink>
          </div>

          <div className="mb-3 flex justify-center items-start overflow-y-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <td className="text-left w-[140px] md:w-[120px]  lg:w-[140px] xl:w-[280px] truncate font-bold text-black  py-2 sm:px-4 px-1 sm:text-[15px] text-[12px]">
                    Organization
                  </td>
                  <td className="text-left  min-w-[50px] truncate  font-bold text-black  py-2 sm:px-4 px-1 sm:text-[15px] text-[12px] md:table-cell hidden">
                    Document Number
                  </td>

                  <td className="text-left   md:min-w-[100px]  lg:w-[100px] xl:w-[320px] truncate font-bold text-black  py-2 sm:px-4 px-1 sm:text-[15px] text-[12px] md:table-cell hidden">
                    Address
                  </td>
                  <td className="md:text-center text-end font-bold  text-black justify-end py-2 px-1 sm:w-auto sm:text-[15px] text-[12px]">
                    <span className="xl:ml-14 lg:mr-12 md:mr-20 mr-28">View</span>
                  </td>
                  {/* <td className="text-left font-bold text-black  py-2 px-4">Edit / Delete:</td> */}
                </tr>
              </thead>
              <tbody>
                {Orgdata.map((organization, index) => (
                  <tr
                    key={organization.organization_id}
                    className="lg:px-6 sm:px-5 px-1 w-[100%]"
                  >
                    <td
                      className={`py-3 sm:px-2 px-1 max-w-[180px] bg-${
                        organization.organization_verified &&
                        organization.organization_paid
                          ? "white"
                          : "[#f3f7fc]"
                      } rounded-l-lg border-l  shadow-top-bottom-xl`}
                    >
                      <div className="flex justify-start items-center gap-2">
                        <div className="relative">
                          <div className=" h-12 w-12 lg:w-20  lg:h-20 md:w-16 md:h-16 rounded-full border-[2px] border-primary-100 overflow-hidden">
                            <img
                              src={organization.image}
                              alt=""
                              className="h-full w-full object-cover rounded-full"
                            />
                          </div>
                        </div>
                        <h2 className="font-semibold  sm:text-base w-[140px] md:w-[120px]  lg:w-[140px] xl:w-[280px] truncate text-[12px] text-primary-100">
                          {organization.name}
                        </h2>
                      </div>
                    </td>
                    <td
                      className={`py-3 sm:px-4 px-1  md:table-cell hidden sm:text-base text-[12px] max-w-[100px]  bg-${
                        organization.organization_verified &&
                        organization.organization_paid
                          ? "white"
                          : "[#f3f7fc]"
                      } text-primary-100 font-semibold  shadow-top-bottom-xl`}
                    >
                      <h1 className="hidden sm:block truncate">
                        {organization.document_number}
                      </h1>
                    </td>
                    <td
                      className={`py-3 sm:px-4 px-1 md:table-cell hidden  sm:text-base text-[12px] bg-${
                        organization.organization_verified &&
                        organization.organization_paid
                          ? "white"
                          : "[#f3f7fc]"
                      } text-primary-100  font-semibold  shadow-top-bottom-xl`}
                    >
                      <h1 className=" md:w-[100px] hidden md:block  lg:w-[100px] xl:w-[320px] truncate">
                        {organization.area}, {organization.city_name},{" "}
                        {organization.state_name}, {organization.pincode}
                      </h1>
                    </td>

                    <td
                      className={` py-3 sm:px-0 px-1 ${
                        organization.organization_verified &&
                        organization.organization_paid
                          ? "bg-white"
                          : "bg-[#f3f7fc]"
                      } text-primary-100 rounded-r-lg  shadow-top-bottom-xl`}
                    >
                      <div className="flex gap-4 justify-end items-center">
                        {organization.organization_rejected ? (
                          <button
                            className="text-white flex gap-2 mr-[45px]  font-semibold py-2 sm:px-2 px-1 rounded order-red-500 transition duration-300 bg-red-800 cursor-pointer hover:text-white sm:text-sm text-[12px]"
                            onClick={()=>handleReApply(organization.organization_id)}
                          >
                            <AiOutlineCloudUpload className="my-auto font-semibold h-5 w-5" />
                            {/* Rejected  */}
                            Re-Apply
                          </button>
                        ) : organization.organization_paid ? (
                          organization.organization_verified ? (
                            <NavLink
                              to={`/dashboard/organization/employee/${organization.organization_id}`}
                              state={{
                                organization_name: organization.name,
                                orgarea: organization.area,
                                orgcity: organization.city_name,
                                orgstate: organization.state_name,
                                orgimg: organization.image,
                              }}
                            >
                              <button className=" text-white flex gap-1 bg-primary-100 font-semibold py-2 sm:px-6 px-4 rounded border border-primary-100 hover:bg-[#5559af] hover:shadow-sm hover:text-white text-sm">
                                <BiSolidShow className=" h-5 w-5" />
                                View
                              </button>{" "}
                            </NavLink>
                          ) : (
                            <button
                              className="text-white flex gap-2 mr-10 bg-[#88898b]  font-semibold py-2 sm:px-2 px-1 rounded border transition duration-300 hover:text-white sm:text-sm text-[12px]"
                              disabled
                            >
                              <FaClock className="my-auto h-4 w-4" />
                              Pending...
                            </button>
                          )
                        ) : (
                          <button
                            className="flex items-center gap-2 mr-10 font-semibold py-1 sm:px-4 px-3 rounded border-2 border-primary-100 transition duration-300 bg-primary-100 text-white sm:text-base text-[14px]"
                            onClick={() => {
                              CreatePayment(organization.organization_id);
                            }}
                          >
                            Pay
                            <span className="flex sm:text-lg text-base">
                              <FaIndianRupeeSign className="my-auto h-4 w-4" />
                              {count == 0 ? "1" : "99"}
                            </span>
                          </button>
                        )}

                        {/* {organization.organization_verified ? (
                          <NavLink
                            to={`/dashboard/organization/employee/${organization.organization_id}`}
                            state={{
                              organization_name: organization.name,
                              orgarea: organization.area,
                              orgcity: organization.city_name,
                              orgstate: organization.state_name,
                              orgimg: organization.image,
                            }}
                          >
                            <button className=" text-white flex gap-1 bg-primary-100 font-semibold py-2 md:px-6 px-4 rounded border border-primary-100 hover:bg-[#5559af] hover:shadow-sm hover:text-white text-sm">
                              <BiSolidShow className=" h-5 w-5" />
                              View
                            </button>{" "}
                          </NavLink>
                        ) : (
                          <button
                            className="text-white flex gap-2 mr-10 bg-[#88898b]  font-semibold py-2 sm:px-2 px-1 rounded border transition duration-300 hover:text-white sm:text-sm text-[12px]"
                            disabled
                          >
                            <FaClock className="my-auto h-4 w-4" />
                            Pending...
                          </button>
                        )} */}

                        {organization.organization_verified &&
                        organization.organization_paid ? (
                          <ThreeDotMenu
                            onEdit={() =>
                              handleEdit(organization.organization_id)
                            }
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  } else {
    return <Addorganization />;
  }
}
