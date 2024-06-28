import React, { useState } from 'react';

export default function TransactionHistory() {
const [list, setList] = useState([
    {sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},{sNo:"1",orgName:"LensKart LensKart LensKart",orderId:"455655555555555",paymentId:"455655555555555",subscriptionId:"455655555555555",billingCycle:"Monthly",amount:"99",status:"Active"},
])

    return (
        <>
        <div className='flex justify-center mb-4'>
          <h1 className='text-[#5559AF] text-2xl font-bold'>Transaction History</h1>
        </div>
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium border-white">
                    <tr>
                      <th scope="col" className="px-6 py-4">Organization Name</th>
                      <th scope="col" className="px-6 py-4">Order Id</th>
                      <th scope="col" className="px-6 py-4">Payment Id</th>
                      <th scope="col" className="px-6 py-4">Subscription Id</th>
                      <th scope="col" className="px-6 py-4">Billing Cycle</th>
                      <th scope="col" className="px-6 py-4">Amount</th>
                      <th scope="col" className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                   {list.map((i)=>(
                    <tr className="border-b border-white">
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">{i.orgName}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">{i.orderId}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">{i.paymentId}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">{i.subscriptionId}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">{i.billingCycle}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">₹{i.amount}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700"><button className='bg-green-600 py-1 px-2 text-white rounded'>{i.status}</button></td>
                  </tr>
                   ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </>
      );
};