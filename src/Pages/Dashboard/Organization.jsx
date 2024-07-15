import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Addorganization from "./Addorganization";
import { UserContext } from "../../Contextfile";
import Loader from "../Loader";
import Tittle from "../../Tittle";
import { FaClock } from "react-icons/fa6";
import { BiSolidShow } from "react-icons/bi";
// import logo from '../assets/images/evalvuelogo.jpg'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoReceiptOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsCreditCard2Back } from "react-icons/bs";
import logo from "../../assets/images/evalvuelogo.jpg";
import { BsPatchExclamationFill } from "react-icons/bs";
import ThreeDotMenu from "./ThreeDotMenu";
import Apibackendrequest from "../Apibackendrequest";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "../../index.css";
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
  const [payment_response_list, setpayment_response_list] = useState([]);
  const componentRef = useRef();
  const { setStateOrgData } = useContext(UserContext);
  const [print, setPrint] = useState(false);
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
    console.log(print, "print again");

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
  }, [userId, print]);

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

  function CreatePayment(organizationId, planId) {
    if (planId == 1) {
      const confirmationpayment = confirm("Thank you for your payment. Please note that your payment has been automatically refunded.");
      if (confirmationpayment) {
        setLoading(true);
        const response = Apibackendrequest(
          `${apiUrl}/create/subscription/id/`,
          {
            user_id: parseInt(userId),
            organization_id: organizationId,
            plan_id: planId,
          }
        );
        // if(response)
        response.then((response) => {
          console.log(response.data);

          if (
            response.data.is_subscription_id_created_successfull ||
            response.data.is_subscription_id_already_exist
          ) {
            const subid =
              response.data.subscription_response_list[0].subscription_id;
            console.log(subid);

            if (subid) {
              setLoading(false);
              var options = {
                // key: "rzp_test_mHIc2FsOxWbBD7",
                key: "rzp_live_0KlxeEsfpZArko",
                subscription_id: `${subid}`,
                name: "Evalvue",
                description: "Monthly Test Plan",
                image: `${logo}`,
                // "subscription_card_change": 0,
                handler: function (response) {
                  // alert(response.razorpay_payment_id),
                  // alert(response.razorpay_subscription_id),
                  // alert(response.razorpay_signature);
                  console.log("payment successfull ");
                  setLoading(true);
                  const res = Apibackendrequest(`${apiUrl}/verify/payment/`, {
                    payment_id: response.razorpay_payment_id,
                    subscription_id: response.razorpay_subscription_id,
                    user_id: parseInt(userId),
                    organization_id: organizationId,
                  });
                  res.then((response) => {
                    console.log(response);
                    setLoading(false);
                    if (response.data.is_payment_response_sent_succefull) {
                      setpayment_response_list(
                        response.data.generate_reciept_data[0]
                      );
                      setPaymentSuccessfull(
                        response.data.is_payment_response_sent_succefull
                      );
                      // setLoading(false);
                    }
                    console.log(payment_response_list);
                  });
                  res.catch((err) => {
                    console.log(err);
                    if (err.isexception) {
                      setPaymentSuccessfull(
                        response.data.is_payment_response_sent_succefull
                      );
                      console.log(err.exceptionmessage);
                    }
                  });
                },
                prefill: {
                  name: "",
                  email: "",
                  contact: "",
                },
                theme: {
                  color: "#5134a9",
                },
              };

              var rzp1 = new Razorpay(options);
              rzp1.open();
              rzp1.on("payment.failed", function (response) {
                console.log("alert called");
                // alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
                setpayment_response_list({ reason: response.error.reason });
                console.log(payment_response_list);
                console.log("payment id called");
                const res = Apibackendrequest(`${apiUrl}/verify/payment/`, {
                  payment_id: response.error.metadata.payment_id,
                  user_id: parseInt(userId),
                  organization_id: organizationId,
                });
                res.then((response) => {
                  console.log(response);
                  setLoading(false);
                  if (response.data.is_payment_response_sent_succefull) {
                    setpayment_response_list(
                      response.data.generate_reciept_data[0]
                    );
                    setPaymentSuccessfull(
                      response.data.is_payment_response_sent_succefull
                    );
                    // setLoading(false);
                  }
                  console.log(payment_response_list);
                });
                res.catch((err) => {
                  console.log(err);
                  if (err.isexception) {
                    setPaymentSuccessfull(
                      response.data.is_payment_response_sent_succefull
                    );
                    console.log(err.exceptionmessage);
                  }
                });
                console.log("payment will be failed ");
              });
            }
          } else {
            alert(
              "Payment is not available at this time. Please try again later. "
            );
            setLoading(false);
          }
        });

        response.catch((err) => {
          console.log(err);
        });
      }
    } else {
      setLoading(true);
      const response = Apibackendrequest(`${apiUrl}/create/subscription/id/`, {
        user_id: parseInt(userId),
        organization_id: organizationId,
        plan_id: planId,
      });
      // if(response)
      response.then((response) => {
        console.log(response.data);

        if (
          response.data.is_subscription_id_created_successfull ||
          response.data.is_subscription_id_already_exist
        ) {
          const subid =
            response.data.subscription_response_list[0].subscription_id;
          console.log(subid);

          if (subid) {
            setLoading(false);
            var options = {
              // key: "rzp_test_mHIc2FsOxWbBD7",
              key: "rzp_live_0KlxeEsfpZArko",
              subscription_id: `${subid}`,
              name: "Evalvue",
              description: "Monthly Test Plan",
              image: `${logo}`,
              // "subscription_card_change": 0,
              handler: function (response) {
                // alert(response.razorpay_payment_id),
                // alert(response.razorpay_subscription_id),
                // alert(response.razorpay_signature);
                console.log("payment successfull ");
                setLoading(true);
                const res = Apibackendrequest(`${apiUrl}/verify/payment/`, {
                  payment_id: response.razorpay_payment_id,
                  subscription_id: response.razorpay_subscription_id,
                  user_id: parseInt(userId),
                  organization_id: organizationId,
                });
                res.then((response) => {
                  console.log(response);
                  setLoading(false);
                  if (response.data.is_payment_response_sent_succefull) {
                    setpayment_response_list(
                      response.data.generate_reciept_data[0]
                    );
                    setPaymentSuccessfull(
                      response.data.is_payment_response_sent_succefull
                    );
                    // setLoading(false);
                  }
                  console.log(payment_response_list);
                });
                res.catch((err) => {
                  console.log(err);
                  if (err.isexception) {
                    setPaymentSuccessfull(
                      response.data.is_payment_response_sent_succefull
                    );
                    console.log(err.exceptionmessage);
                  }
                });
              },
              prefill: {
                name: "",
                email: "",
                contact: "",
              },
              theme: {
                color: "#5134a9",
              },
            };

            var rzp1 = new Razorpay(options);
            rzp1.open();
            rzp1.on("payment.failed", function (response) {
              console.log("alert called");
              // alert(response.error.code);
              // alert(response.error.description);
              // alert(response.error.source);
              // alert(response.error.step);
              // alert(response.error.reason);
              // alert(response.error.metadata.order_id);
              // alert(response.error.metadata.payment_id);
              setpayment_response_list({ reason: response.error.reason });
              console.log(payment_response_list);
              console.log("payment id called");
              const res = Apibackendrequest(`${apiUrl}/verify/payment/`, {
                payment_id: response.error.metadata.payment_id,
                user_id: parseInt(userId),
                organization_id: organizationId,
              });
              res.then((response) => {
                console.log(response);
                setLoading(false);
                if (response.data.is_payment_response_sent_succefull) {
                  setpayment_response_list(
                    response.data.generate_reciept_data[0]
                  );
                  setPaymentSuccessfull(
                    response.data.is_payment_response_sent_succefull
                  );
                  // setLoading(false);
                }
                console.log(payment_response_list);
              });
              res.catch((err) => {
                console.log(err);
                if (err.isexception) {
                  setPaymentSuccessfull(
                    response.data.is_payment_response_sent_succefull
                  );
                  console.log(err.exceptionmessage);
                }
              });
              console.log("payment will be failed ");
            });
          }
        } else {
          alert(
            "Payment is not available at this time. Please try again later. "
          );
          setLoading(false);
        }
      });

      response.catch((err) => {
        console.log(err);
      });
    }
  }

  const notprint = () => {
    setPrint(true); // Set `print` to `true` when this function is called
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Payment Receipt",
    onAfterPrint: () => {
      console.log("Print success!");
      notprint();
      setPaymentSuccessfull(false);
    },
  });
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
            <div
              ref={componentRef}
              className={`fixed inset-0 flex items-center justify-center bg-black  bg-opacity-60 z-50`}
            >
              <div className="lg:min-w-[500px] md:min-w-[400px] min-w-[350px] min-h-[500px] bg-white p-5 rounded-lg shadow-lg max-w-md border-t-4 border-primary-100">
                <div className="w-full relative flex justify-center mb-2">
                <div className="absolute left-0"><img className="h-16 w-16" src={logo} alt="" /></div>
                  <div className="p-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <IoReceiptOutline className="text-4xl text-primary-100" />
                  </div>
                </div>
                <div className="h-full w-full mt-1">
                  <h1 className="text-[15px] font-bold">
                    Hello,{" "}
                    <span className="text-primary-100">
                      {payment_response_list.organization_name}
                    </span>
                  </h1>
                  <div className="text-sm text-gray-700 mt-2">
                    <p className="mb-3">
                      We are pleased to inform you that your recent payment of{" "}
                      <span className="font-semibold">
                        ₹{payment_response_list.amount}.00
                      </span>{" "}
                      has been successfully processed. Thank you for your prompt
                      payment. This receipt confirms the transaction.
                    </p>
                  </div>
                  <div className="bg-gray-100 w-full h-full my-5 text-sm p-3 flex gap-2 flex-col items-center justify-center rounded-lg">
                    <p className="w-full flex justify-between text-gray-700">
                      Order Id:
                      <span className="font-base">
                        {payment_response_list.razorpay_order_id}
                      </span>
                    </p>
                    <p className="w-full flex justify-between text-gray-700">
                      transaction Id:
                      <span className="font-base">
                        {payment_response_list.transaction_id}
                      </span>
                    </p>
                    <p className="w-full flex justify-between text-gray-700">
                      Billing Cycle:
                      <span className="font-base">Monthly</span>
                    </p>
                    <p className="w-full flex justify-between text-gray-700">
                      Payment Mode:
                      <span className="font-base">
                        {" "}
                        {payment_response_list.payment_mode}
                      </span>
                    </p>
                    <p className="w-full flex justify-between text-gray-700">
                      Date:
                      <span className="font-base">{payment_response_list.date}</span>
                    </p>
                    <div className="w-full mt-5 border-t-4 border-white">
                      <div className="flex items-center justify-between">
                        <h1 className="text-gray-900 text-base">Amount:</h1>
                        <h1 className="flex items-center text-md font-base text-gray-900">
                          <FaIndianRupeeSign className="text-sm" />
                          {payment_response_list.amount -
                            (payment_response_list.amount * 18) / 100}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-gray-900 text-base">Total GST:</h1>
                        <h1 className="flex items-center text-md font-base text-gray-900">
                          + <FaIndianRupeeSign className="text-sm" />
                          {(payment_response_list.amount * 18) / 100}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-gray-900 text-sm">CGST:</h1>
                        <h1 className="flex items-center text-md font-base text-gray-900">
                          - <FaIndianRupeeSign className="text-sm" />
                          {(payment_response_list.amount * 18) / 100 / 2}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-gray-900 text-sm">SGST:</h1>
                        <h1 className="flex items-center text-md font-base text-gray-900">
                          - <FaIndianRupeeSign className="text-sm" />
                          {(payment_response_list.amount * 18) / 100 / 2}
                        </h1>
                      </div>
                      <div className="w-full mt-2 border-t-2 border-gray-400"></div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-primary-100 text-base">
                          Total Amount:
                        </h1>
                        <h1 className="flex items-center text-lg font-base text-primary-100">
                          <FaIndianRupeeSign className="text-base" />
                          {payment_response_list.amount}.00
                        </h1>
                      </div>
                    </div>
                  </div>
                  {payment_response_list.transaction === "Successful" || payment_response_list.transaction === "refunded" ? (
                    <p className="text-[13px] text-green-600 font-semibold">
                      Paid Successfully 
                      <p>{payment_response_list.transaction === "refunded"?"this amount will we refundable":""}</p>
                    </p>
                  ) : (
                    <p className="text-[13px] text-red-600 font-semibold">
                      Payment Failed :{payment_response_list.reason}
                    </p>
                  )}
                  <hr />
                </div>
                <div className="w-full flex items-center justify-center text-center gap-5 mt-5 no-print">
                  <button
                    className="bg-primary-100 rounded-lg py-2 px-10 text-white font-semibold"
                    onClick={() => {
                      setPaymentSuccessfull(false);
                      notprint();
                    }}
                  >
                    Ok
                  </button>
                  <button
                    className="text-end my-2 border-2 border-primary-100 py-2 px-8 rounded-lg text-primary-100 hover:bg-primary-100 hover:text-white transition-all duration-300 text-sm"
                    onClick={handlePrint}
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between sticky lg:top-[55px] top-[46.5px] z-[2] items-center lg:mb-3 mb-12 bg-white p-4 rounded shadow-lg">
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
                    <span className="xl:ml-14 lg:mr-12 md:mr-20 mr-28">
                      View
                    </span>
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
                            onClick={() =>
                              handleReApply(organization.organization_id)
                            }
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
                              CreatePayment(
                                organization.organization_id,
                                count == 0 ? 1 : 2
                              );
                            }}
                          >
                            Pay
                            <span className="flex sm:text-lg text-base">
                              <FaIndianRupeeSign className="my-auto h-4 w-4" />
                              {count == 0 ? "5" : "99"}
                            </span>
                          </button>
                        )}

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
