import React, { useState } from 'react';

const Subscription = () => {
    const [list, setList] = useState([
        {orgName:"Zara",subscriptionId:"987431254586457", amount:"1", billingCycle:"Monthly", nextDueDate:"30/06/2024"},{orgName:"Flying Machine",subscriptionId:"987431254586457", amount:"99", billingCycle:"Yearly", nextDueDate:"30/06/2024"},{orgName:"Peter England",subscriptionId:"987431254586457", amount:"99", billingCycle:"Monthly", nextDueDate:"30/06/2024"},{orgName:"Van Hussen",subscriptionId:"987431254586457", amount:"99", billingCycle:"Weekly", nextDueDate:"30/06/2024"},{orgName:"Global Bussiness Support",subscriptionId:"987431254586457", amount:"99", billingCycle:"Daily", nextDueDate:"30/06/2024"},
    ])
    
        return (
            <>
            <div className='flex justify-center mb-4'>
              <h1 className='text-[#5559AF] text-2xl font-bold'>Active Subscription</h1>
            </div>
            <div className="flex flex-col overflow-x-auto">
              <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium border-white">
                        <tr>
                          <th scope="col" className="px-6 py-4">Organization Name</th>
                          <th scope="col" className="px-6 py-4">Subscription Id</th>
                          <th scope="col" className="px-6 py-4">Amount</th>
                          <th scope="col" className="px-6 py-4">Billing Cycle</th>
                          <th scope="col" className="px-6 py-4">Next Due Date</th>
                          <th scope="col" className="px-6 py-4">Cancel</th>
                        </tr>
                      </thead>
                      <tbody>
                       {list.map((i)=>(
                        <tr className="border-b border-white">
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">{i.orgName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">{i.subscriptionId}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">₹{i.amount}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">{i.billingCycle}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">{i.nextDueDate}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700"><button className='bg-red-400 py-1 px-2 text-white rounded'>Cancel</button></td>
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

export default Subscription;