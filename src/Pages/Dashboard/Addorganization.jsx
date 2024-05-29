import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../Contextfile";

function Addorganization() {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const [orgregdata, Setorgregdata] = useState({
    user_id: userId
  });

  const [isOrganizationCreated, setIsOrganizationCreated] = useState(false);

  function orghadler(e) {
    const name = e.target.name;
    const value = e.target.value;
    Setorgregdata((values) => ({ ...values, [name]: value }));
  }

  // function filehandler(e) {
  //   const name = e.target.name;
  //   const value = e.target.files[0];
  //   Setorgregdata((values) => ({ ...values, [name]: value }));
  // }

  const filehandler = (e) => {
    const name = e.target.name;
    const value = e.target.files[0];
    Setorgregdata((values) => ({ ...values, [name]: value }));
  };
  const header = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  
  function orgregsubmit(event) {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('organization_image', orgregdata.organization_image);
    formData.append('document_file', orgregdata.document_file);
    
    axios.post(
      "https://api.evalvue.com/create/organization/",
      orgregdata,header
    )
      .then(res => {
        console.log(res);
        if (res.data.is_organization_register_successfull) {
          setIsOrganizationCreated(true);
          navigate("/dashboard/organization");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="max-w-full m-4 p-6 bg-white shadow-md rounded-lg">
        {isOrganizationCreated ? (
          <div className="flex items-center justify-center h-[calc(100svh-140px)] ">
            <div className="bg-zinc-200 rounded-lg shadow-lg p-6 max-w-sm w-full relative">
              <button className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="flex flex-col items-center">
                <img alt="check" src="https://placehold.co/100x100?text=✓" className="w-16 h-16 mb-4" />
                <h2 className="text-2xl font-bold text-zinc-800 mb-2">Awesome!</h2>
                <p className="text-zinc-600 mb-6">You are ready to proceed using CakeHR</p>
                <NavLink to="/dashboard/organization">
                  <button className="bg-primary-100 hover:bg-primary-100 text-white font-semibold py-2 px-4 rounded-full">Start CakeHR</button>
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <>
              <h1 className="text-xl font-semibold mb-4">Register your organization:</h1>
            <p className="mb-6 text-zinc-700 w-1/2">
              Welcome to our organization registration form! Whether you're a
              budding startup, a growing enterprise, or a well-established company,
              we invite you to join our community.
            </p>
            <form className="mt-10" onSubmit={orgregsubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Organization name:</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="organization_name"
                    value={orgregdata.organization_name}
                    onChange={orghadler}
                    className="w-full p-2 border  rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Organization Logo/image:</label>
                  <input
                    type="file"
                    className="w-full p-2 border  rounded-md"
                    name="organization_image"
                    // onChange={(e)=>{(filehandler(e))}}
                    onChange={filehandler} 
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Organization Sector:</label>
                  <select name="sector_id" onChange={orghadler} className="w-full p-2 border  rounded-md">
                    <option aria-readonly>Select any one</option>
                    <option value={1}>Gov</option>
                    <option value={2}>Private</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Organization Listed:</label>
                  <select name="listed_id" onChange={orghadler} className="w-full p-2 border  rounded-md">
                    <option aria-readonly>Select any one</option>
                    <option value={1}>It.</option>
                    <option value={2}>Pharmacy</option>
                    <option value={3}>Agriculture</option>
                    <option value={4}>Civil</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Document type:</label>
                  <select name="document_type_id" onChange={orghadler} className="w-full p-2 border  rounded-md">
                    <option aria-readonly>Select any one</option>
                    <option value={1}>Aadhar card</option>
                    <option value={2}>PAN Card</option>
                    <option value={3}>Driving Licence</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Document Number:</label>
                  <input
                    type="text"
                    placeholder="CA739543A"
                    name="document_number"
                    onChange={orghadler}
                    value={orgregdata.document_number}
                    className="w-full p-2 border  rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">GST Number (optional):</label>
                  <input
                    type="text"
                    placeholder="CA739543A525A"
                    name="gstin"
                    onChange={orghadler}
                    value={orgregdata.gst_number}
                    className="w-full p-2 border  rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Document File (any):</label>
                  <input
                    type="file"
                    className="w-full p-2 border  rounded-md"
                    name="document_file"
                    // onChange={(e)=>{(filehandler(e))}}
                    onChange={filehandler} 
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xl ">Address:</h3>
                </div>
                <br />
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Address:</label>
                  <input
                    type="text"
                    placeholder="Area Ex-148,teen puliya"
                    name="area"
                    onChange={orghadler}
                    value={orgregdata.area}
                    className="w-full p-2 border  rounded-md"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Country:</label>
                  <select name="country_id" onChange={orghadler} className="w-full p-2 border  rounded-md">
                    <option aria-readonly>Select any one</option>
                    <option value={1}>india</option>
                    <option value={2}>USA</option>
                    <option value={3}>China</option>
                    <option value={4}>Pakistan</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">State:</label>
                  <select name="state_id" onChange={orghadler} className="w-full p-2 border  rounded-md">
                    <option aria-readonly>Select any one</option>
                    <option value={1}>Madhya Pradesh</option>
                    <option value={2}> Andhra Pradesh</option>
                    <option value={3}>Bihar</option>
                    <option value={4}>Goa</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">City:</label>
                  <select name="city_id" onChange={orghadler} className="w-full p-2 border  rounded-md">
                    <option aria-readonly>Select any one</option>
                    <option value={313}>Indore</option>
                    <option value={2}>Bhopal</option>
                    <option value={3}>Harda</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">Pin Number:</label>
                  <input
                    type="text"
                    placeholder="462021"
                    name="pincode"
                    maxLength={6}
                    onChange={orghadler}
                    value={orgregdata.pincode}
                    className="w-full p-2 border  rounded-md"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-20 mb-7 w-full bg-primary-100 text-white font-semibold p-3 rounded-lg mt-4"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default Addorganization;
