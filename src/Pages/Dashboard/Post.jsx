import axios from "axios";
import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contextfile";
import { button } from "@material-tailwind/react";
import { Rating } from "@material-tailwind/react";
import Loader from "../Loader";
import Tittle from "../../Tittle";
import Apibackendrequest from "../Apibackendrequest";
const apiUrl = import.meta.env.VITE_API_URL;

function Post() {
  Tittle("New Review - Evalvue")
  const { state } = useLocation();
  const navigate = useNavigate();
  const [rating, setrating] = useState(0);
  const [loading, setloading] = useState(false)
  const [error, setError] = useState('')
  const [comment, setcomment] = useState("");
  const [msg, setmsg] = useState("none");
  const [ratMsg, setRatMsg] = useState("none");
  const { userId } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imgName, setImgName] = useState("");
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
  if(selectedImage){
    pay.image = selectedImage
  }
  const formData = new FormData();
  Object.keys(pay).forEach(key => {
    formData.append(key, pay[key]);
  });
  function postsubmit(e) {
    e.preventDefault();
    setloading(true)
    if (comment.length < 250) {
      setmsg("block");
    }
    else if (rating == 0) {
      setRatMsg("block")
    }

    else {

      Apibackendrequest(`${apiUrl}/create/review/`, formData)
        .then((res) => {
          if (res.data) {

            if (res.data.is_review_added_successfull) {
              // navigate('organization/employee/review')
              // console.log("hello");
              navigate("/dashboard/organization/employee/review/", {
                state,
              });
            }
          } else if (res.isexception) {
            setError(res.exceptionmessage.error)
          }
        })

      // axios
      // .post(`${apiUrl}/create/review/`, pay)
      // .then((res) => {
      //   if (res.data.is_review_added_successfull) {
      //     // navigate('organization/employee/review')
      //     // console.log("hello");
      //     navigate("/dashboard/organization/employee/review/", {
      //       state,
      //     });
      //   } else {
      //     // console.log("byyy");
      //   }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    }
    setloading(false)
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImgName(file.name)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreviewUrl(null);
    }
  };

  function handleBackClick() {
    navigate(-1)
  }
  if (loading) {
    return (
      <>
        <div className="h-[calc(100vh-350px)] flex justify-center items-center">
          <Loader />
        </div>
      </>
    )
  }
  return (
    <form onSubmit={postsubmit}>
      <div className="max-w-3xl mt-4 mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4">
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
        <div className="flex items-end">
          <div>
            <label className="block mb-4 font-medium">
              Upload Image
            </label>
            <div className="flex items-center">
              <label className="custom-file-label w-[113px]  truncate bg-primary-100 text-white px-4 py-1 rounded-md cursor-pointer mr-2">
                {imgName || "Choose file"}
                <input
                  type="file"
                  className="hidden"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          {previewUrl && (
            <div className="ml-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-14 w-24 border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>

        <textarea
          className="w-full p-2 border-4 mt-4 border-indigo-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
          rows="8"
          placeholder="What do you want to talk about?"
          name="comment"
          maxLength={500}
          onChange={(event) => {
            setcomment(event.target.value); // Update the comment state with event.target.value
          }}
        >
        </textarea>
        <div className="flex justify-between">

          <p className="text-gray-500">Minimum characters (250/{comment.length})</p>
          <p className="text-[red] " style={{ display: msg }}>
            Minimum 250 characters required.
          </p>
          <p className="text-[red] " style={{ display: ratMsg }}>
            Rating employee is compulsory
          </p>

        </div>
        <div className="mx-1 my-4">
          <h3>Select rating : <span className="text-red-500">*</span></h3>
          <Rating
            aria-required
            value={0}
            onChange={(value) => {
              setrating(value);
            }}
          />
        </div>
        <p className="text-[red] w-full text-end">
          {error}
        </p>
        <div className="flex items-center mt-4">
          <button
            type="submit"
            className="mx-auto px-10 border-primary-100 border-2 rounded-md text-md hover:text-white transition duration-300 hover:bg-primary-100 text-primary-100 font-semibold py-1"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default Post;
