import React, { useEffect, useState } from "react";
import Loader from "../Pages/Loader";
import Apibackendrequest from "../Pages/Apibackendrequest";
import { PiEmptyBold } from "react-icons/pi";
import { Helmet } from "react-helmet-async";

const apiUrl = import.meta.env.VITE_API_URL;

export default function TransactionHistory() {
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Apibackendrequest(`${apiUrl}/payment/history/`)
      .then((res) => {
        if (res.data.is_payment_history_sent_successfull) {
          setPaymentData(res.data.payment_history_list);
        }
        if (res.isexception) {
          setError(res.exceptionmessage.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[100%] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1 className="text-red-500 text-lg align-middle">{error}</h1>
      </div>
    );
  }
  return (
    <>
      <Helmet>
      <link rel="canonical" href="https://evalvue.com/" />
      <meta name="robots" content="nofollow" />
      </Helmet>
      {paymentData.length == 0 ? (
        <>
          <div className="h-[70%] flex justify-center items-center">
            <div>
              <PiEmptyBold className="mx-auto text-5xl text-red-800" />
              <p className="text-red-800 text-lg font-semibold">
                There is no payment history!
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center mb-4 mt-12">
            <h1 className="text-[#5559AF] text-2xl font-bold">
              Payment History
            </h1>
          </div>
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium border-white">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Organization Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Order Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Subscription Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Created On
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentData.map((pay) => {
                        return (
                          <tr
                            key={pay.order_id}
                            className="border-b border-white"
                          >
                            <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                              {pay.org_name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                              {pay.order_id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                              {pay.subscription_id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                              {pay.amount}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                              {pay.created_on}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                              <span className="bg-green-700 py-1 px-2 text-white rounded">
                                {pay.payment_status == "captured"
                                  ? "Completed"
                                  : pay.payment_status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
