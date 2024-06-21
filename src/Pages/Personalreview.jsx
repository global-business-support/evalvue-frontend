import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { UserContext } from '../Contextfile';
import { Rating } from '@material-tailwind/react';
import axios from 'axios';
import Loader from './Loader';
import Tittle from '../Tittle';
import Apibackendrequest from './Apibackendrequest';
const apiUrl = import.meta.env.VITE_API_URL;
function Personalreview() {
  Tittle("reviews - Evalvue")
  const { state } = useLocation();
  const { userId } = useContext(UserContext);
  const { updateReviewCount } = useOutletContext();
  // const { overallRating  } = useOutletContext();
  const [loading,setloading]=useState(false);
  const [isReviewMapped, setIsReviewMapped] = useState(false);
  const [ReviewList, setReviewList] = useState([]);
  const [EmployeeList, setEmployeeList] = useState(null);
  const [error, setError] = useState();
 
  
  // function calcoverallrating(reviews){
  //   var count=0;
  //   reviews.map(function(review){
  //     count=count+review.rating;
  //   })
  //   console.log(parseInt(count/5));
  //   return parseInt(count/5);

  // }
  useEffect(() => {
    setloading(true)
    const fetchData = async () => {

      Apibackendrequest(`${apiUrl}/reviews/`, {
          user_id: userId,
          organization_id: state.emporgid,
          employee_id: state.empid,
        })
        .then((response)=>{
          if(response.data){
            setloading(false)
            if (response.data.is_review_mapped_to_employee_successfull) {
            
                  setIsReviewMapped(true);
                  setReviewList(response.data.review_list);
                  setEmployeeList(response.data.employee_list[0]);
                  updateReviewCount(response.data.review_list.length);
                  // overallRating(calcoverallrating(response.data.review_list))
                  
                   // Update review count
                }
          } else if(response.isexception){
            setError(response.exceptionmessage)
          }
        })
        
        

      // try {
      //   const response = await axios.post(`${apiUrl}/reviews/`, {
      //     user_id: userId,
      //     organization_id: state.emporgid,
      //     employee_id: state.empid,
      //   });
      //   setloading(false)
      //   if (response.data.is_review_mapped_to_employee_successfull) {
        
      //     setIsReviewMapped(true);
      //     setReviewList(response.data.review_list);
      //     setEmployeeList(response.data.employee_list[0]);
      //     updateReviewCount(response.data.review_list.length);
      //     // overallRating(calcoverallrating(response.data.review_list))
          
      //      // Update review count
      //   }
      // } catch (err) {
      //   // console.log(err);
      // }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
      <div className="h-[calc(100vh-350px)] flex justify-center items-center">
        <Loader/>
      </div>
      </>
    ) 
  }

  if (isReviewMapped) {
    return ( !state.aadhar ? 
      <>
      {ReviewList.map((review) => (
            <div
              key={review.review_id}
              className="flex flex-col p-3 justify-center mx-auto items-center  gap-5  mb-18"
            >
              <div className=" bg-white mx-auto rounded-lg md:w-5/6 w-full shadow-md overflow-hidden">
                <div className="p-4 l">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full  border bg-zinc-100">
                      <img
                        className="h-full w-full rounded-full object-fit "
                        src={state.orgImg}
                        alt="Company Logo"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-zinc-900">
                        {state.orgName}
                      </p>
                      <p className="text-xs text-zinc-500">{state.createdOn}</p>
                    </div>
                  </div>
                  <div className=" h-full w-full p-2 mt-3  rounded-xl   border-[6px] border-zinc-200">
                    <div className=" flex items-center">
                      <div className="h-10 w-10 rounded-full border bg-zinc-100">
                        <img
                          className="h-full w-full object-cover rounded-full "
                          src={EmployeeList.employee_image}
                          alt="Company Logo"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-zinc-900">
                        {EmployeeList.employee_name}
                        </p>
                        <p className="text-xs text-zinc-500">
                        {EmployeeList.designation}
                        </p>
                      </div>
                    </div>

                    {review.image ? (
                    <div className=" w-full flex gap-2 md:flex-row justify-between flex-col mt-4">
                      <div className="md:w[48%] w-full bg-gray-200 p-2 rounded-lg ">
                        <div className="flex justify-center items-center  bg-slate-200 h-[100%] bg-white rounded-lg">
                          <p className="whitespace-pre-wrap text-zinc-800 text-sm p-3 break-words break-all">
                            {review.comment}
                          </p>
                        </div>
                      </div>

                      <div className="bg-red-400 w-[1px] sm:block hidden h-vh"></div>

                      <div className=" max-h-[400px] overflow-hidden  md:w[48%] w-full bg-gray-200 p-2 rounded-lg">
                          <img src={review.image} alt="Review-Image"
                            className="rounded-lg object-scale-down w-full h-full "
                          />
                      </div>
                    </div>
                    ) : 
                    (
                      <div className="mt-4 bg-gray-200 h-[100%] rounded-lg">
                          <p className="whitespace-pre-wrap text-zinc-800 text-sm p-3 break-words break-all">
                            {review.comment}
                          </p>
                        </div>
                    )
                    }
                    <div className="mt-2 p-3 flex gap-2">
                      <span className="text-gray-800 font-semibold text-md">
                        Rating:{" "}
                      </span>
                      <span>
                        <Rating value={review.rating} readonly />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </>
    // ======================else==============
    :
      <>
        {ReviewList.map((review) => (
          <div className="m-3" key={review.review_id}>
            <div className="md:w-[90%] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-2">
                <div className="h-full w-full p-2 mt-1 rounded-xl border-[6px] border-bglight-200">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full border bg-zinc-100">
                      <img
                        className="h-full w-full object-cover rounded-full"
                        src={EmployeeList.employee_image}
                        alt="Company Logo"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-zinc-900">{EmployeeList.employee_name}</p>
                      <p className="text-xs text-zinc-500">{EmployeeList.designation}</p>
                    </div>
                  </div>
                  {review.image ? (
                    <div className=" w-full flex gap-2 md:flex-row justify-between flex-col mt-4">
                      <div className="md:w[48%] w-full bg-gray-200 p-2 rounded-lg ">
                        <div className="flex justify-center items-center  bg-slate-200 h-[100%] bg-white rounded-lg">
                          <p className="whitespace-pre-wrap text-zinc-800 text-sm p-3 break-words break-all">
                            {review.comment}
                          </p>
                        </div>
                      </div>

                      <div className="bg-red-400 w-[1px] sm:block hidden h-vh"></div>

                      <div className=" max-h-[400px] overflow-hidden  md:w[48%] w-full bg-gray-200 p-2 rounded-lg">
                          <img src={review.image} alt="Review-Image"
                            className="rounded-lg object-scale-down w-full h-full "
                          />
                      </div>
                    </div>
                    ) : 
                    (
                      <div className="mt-4 bg-gray-200 h-[100%] rounded-lg">
                          <p className="whitespace-pre-wrap text-zinc-800 text-sm p-3 break-words break-all">
                            {review.comment}
                          </p>
                        </div>
                    )
                    }
                  <div className="mt-1 p-3 flex gap-2">
                    <span className="text-gray-800 font-semibold lg:text-lg sm:text-base">Rating:</span>
                    <Rating value={review.rating} readonly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>

    );
  }


  // =======================================================
  return (
    <div className="flex h-[50vh] justify-center items-center">
      <h3 className='text-xl font-bold text-red-500'>No review</h3>
    </div>
  );
}

export default Personalreview;
