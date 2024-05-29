import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Contextfile";
import { Rating } from "@material-tailwind/react";
import axios from "axios";
function Personalreview() {
  const { state } = useLocation();
  const { userId } = useContext(UserContext);
  const [isreviewmapped,setisreviewmapped]=useState(false);
  const [Reviewlist,setReviewlist]=useState([]);
  const [Employeelist,setEmployeelist]=useState(null);
  console.log(state)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://api.evalvue.com/reviews/", {
          user_id:userId,
          organization_id:state.emporgid,
          employee_id:state.empid
        });
        if(response.data.is_review_mapped_to_employee_successfull){
            setisreviewmapped(true)
            setReviewlist(response.data.review_list)
            console.log(response.data.review_list)
            setEmployeelist(response.data.employee_list[0])
            console.log(response.data.employee_list)
        }
      } catch (err) {
        console.log(err)
      } finally {
        console.log("loading")
      }
    }
    fetchData()
},[]);

  if(isreviewmapped){
  return (
    <>
    {Reviewlist.map(function(review){

   return <>
   <div className="m-8">

   
      <div key={review.review_id} className=" w-4/6 mx-auto bg-white rounded-3xl shadow-md overflow-hidden">
        <div className="p-2">
          {/* <div className="flex items-center">
            <div className="h-10 w-10 rounded-full p-1 border bg-zinc-100">
              <img
                className="h-full w-full object-fit "
                src={logo}
                alt="Company Logo"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-zinc-900">
                Tata Consultancy Services{" "}
              </p>
              <p className="text-xs text-zinc-500">22-March at 2:39pm</p>
            </div>
          </div> */}
          <div className=" h-full w-full p-2 mt-1  rounded-xl   border-[6px] border-bglight-200">
            <div className=" flex items-center">
              <div className="h-10 w-10 rounded-full border bg-zinc-100">
                <img
                  className="h-full w-full object-cover rounded-full "
                  src={Employeelist.image}
                  alt="Company Logo"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-zinc-900">
                 {Employeelist.name}
                </p>
                <p className="text-xs text-zinc-500">{Employeelist.designation}</p>
              </div>
            </div>
            <div className="mt-4 bg-bglight-200 rounded-md min-h-24">
              <p className="text-zinc-800 text-sm p-3">
                {review.comment}
              </p>
            </div>
            <div className="mt-1 p-3 flex gap-2">
              <span className="text-gray-800 font-semibold text-md">Overall rating:</span>
              <span >
                
                <Rating
            value={review.rating}
            readonly
            
          />
              </span>
             
            </div>
          </div>
        </div>
      </div>
      </div>
      </>
        })} 
    </>)
  }
        return (
            <>
            <div className="flex justify-center"><h3>No review</h3></div>
            </>
        )
  ;
}

export default Personalreview;
