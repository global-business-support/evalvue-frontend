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
 
  
  // function calcoverallrating(reviews){
  //   var count=0;
  //   reviews.map(function(review){
  //     count=count+review.rating;
  //   })
  //   console.log(parseInt(count/5));
  //   return parseInt(count/5);

  // }

console.log(state)
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
            console.log(response.exceptionmessage)
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
    return (
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
                  <div className="mt-4 bg-bglight-200 rounded-md min-h-24 break-words">
                    <p className="text-gray-800 text-sm  p-3">{review.comment}</p>
                  </div>
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
  return (
    <div className="flex justify-center">
      <h3>No review</h3>
    </div>
  );
}

export default Personalreview;
