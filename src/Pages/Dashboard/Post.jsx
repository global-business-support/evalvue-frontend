import axios from "axios";
import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contextfile";
import { button } from "@material-tailwind/react";
import { Rating } from "@material-tailwind/react";
import Loader from "../Loader";

function Post() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [rating, setrating] = useState(0);
  const [loading,setloading]=useState(false)
  const [comment, setcomment] = useState("");
  const [msg,setmsg]=useState("none");
  const { userId } = useContext(UserContext);
  // console.log(state);
  // const [postdata, setpostdata] = useState(
  //   {
  //     user_id: userId,
  //     organization_id: state.emporgid,
  //     employee_id: state.empid,
  //     rating:rating
  //   }
  // );
  let pay = {
    user_id: userId,
    organization_id: state.emporgid,
    employee_id: state.empid,
    rating: rating,
    comment: comment,
  };

  function postsubmit(e) {
    e.preventDefault();
    setloading(true)
    if(comment.length<250){
      setmsg("block");
    }
    else{
      axios
      .post("https://api.evalvue.com/create/review/", pay)
      .then((res) => {
        if (res.data.is_review_added_successfull) {
          // navigate('organization/employee/review')
          // console.log("hello");
          navigate("/dashboard/organization/employee/review/", {
            state,
          });
        } else {
          // console.log("byyy");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    setloading(false)
  }
  function handleBackClick(){
      navigate(-1)
  }
  if (loading) {
    return (
      <>
      <div className="h-[calc(100vh-350px)] flex justify-center items-center">
        <Loader/>
      </div>
      </>
    ) 
  }
  return (
    <form onSubmit={postsubmit}>
      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
          <img
            src={state.empimage}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="text-zinc-900 dark:text-zinc-100 font-semibold">
              {state.empname}
            </div>
          </div>
          </div>
          <div onClick={handleBackClick} className="cursor-pointer">
        <h1 className="text-xl text-gray-800 font-semibold">X</h1>
      </div>
        </div>
        <textarea
          className="w-full p-2 border-4 border-indigo-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 "
          rows="8"
          placeholder="What do you want to talk about?"
          name="comment"
          maxLength={500}
          onChange={(event) => {
            setcomment(event.target.value); // Update the comment state with event.target.value
          }}
        ></textarea>
        <div className="flex justify-between">

        <p className="text-gray-500">Minimum characters (250/{comment.length})</p>
        <p className="text-[red] " style={{display:msg}}>
           Minimum 250 characters are required
        </p>
        </div>
        <div className="mx-1 my-4">
          <Rating
            value={0}
            onChange={(value) => {
              setrating(value);
            }}
          />
        </div>

        <div className="flex items-center mt-4">
          <button
            type="submit"
            className="mx-auto px-10 border-primary-100 border-2 rounded-md text-md hover:text-white transition duration-300 hover:bg-primary-100 text-primary-100 font-semibold py-1"
          >
            post
          </button>
        </div>
      </div>
    </form>
  );
}

export default Post;
