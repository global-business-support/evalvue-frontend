import React, { useEffect, useState } from 'react';
import Apibackendrequest from '../Pages/Apibackendrequest';
import { PiEmptyBold } from 'react-icons/pi';
import Loader from '../Pages/Loader';
const apiUrl = import.meta.env.VITE_API_URL;

const Subscription = () => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    
    useEffect(()=> {
      Apibackendrequest(`${apiUrl}/subscription/history/data/`)
      .then((res)=>{
        console.log(res)
        if(res.data.subscription_history_data){
          setList(res.data.subscription_history_data)
        } else {
          setError("")
        }
      })
      .catch((error)=>{
        console.log(error)
      }).finally(() => { setLoading(false) });
    },[])
    
    if (loading) {
      return (
          <>
              <div className="h-[calc(100vh-100px)] flex justify-center items-center">
                  <Loader />
              </div>
          </>
      );
  }

    if(list.length == 0){
      return (
        <>
          <div className='h-[70%] flex justify-center items-center'>
            <div>
            <PiEmptyBold className='mx-auto text-5xl text-red-800'/>
            <p className='text-red-800 text-lg font-semibold'>There is no payment history!</p>
            </div>
          </div>
        </>
      )
    }
        return (
            
            <>

            <div className='flex justify-center mb-4 mt-12'>

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
                          <th scope="col" className="px-6 py-4">Start Date</th>
                          <th scope="col" className="px-6 py-4">Next Due Date</th>
                          <th scope="col" className="px-6 py-4">Billing Cycle</th>
                          <th scope="col" className="px-6 py-4">Amount</th>
                          <th scope="col" className="px-6 py-4">Status</th>

                          <th scope="col" className="px-6 py-4">Action</th>

                        </tr>
                      </thead>
                      <tbody>
                       {list.map((data)=>(
                        <tr className="border-b border-white">
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">{data?.organization_name}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">{data?.start_date}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">{data.next_due_date}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">Monthly</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">₹{data?.plan_id < 4 ? '1' : '99'}</td>
                        <td className={`whitespace-nowrap px-5 py-4`}><button className={`${(data.status == "active")? 'bg-green-700 px-[42px]' : 'bg-primary-100'} py-1 px-2 text-white rounded`}>{data.status}{(data.status == "active")? '': ' & unpaid'}</button></td>
                        {(data.status == "active")&&<td className="whitespace-nowrap px-6 py-4 text-gray-700"><button className='bg-red-400 py-1 px-2 text-white rounded'>Cancel</button></td>}
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