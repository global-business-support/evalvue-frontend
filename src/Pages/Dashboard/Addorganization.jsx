import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contextfile";
import Loader from "../Loader";
import { select } from "@material-tailwind/react";
import Tittle from "../../Tittle";
import Apibackendrequest from "../Apibackendrequest";
const apiUrl = import.meta.env.VITE_API_URL;
function Addorganization() {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const [error, setError] = useState("");
  
  const location = useLocation();
  const [orgregdata, setOrgregdata] = useState({
    user_id: userId,
    organization_id: location.state?.organization_id || "",
    gstin:""
  });
  const [fileLogoName, setFileLogoName] = useState("");
  const [fileLogoPreview, setLogoFilePreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [loading, setloading] = useState(false);
  const [isOrganizationCreated, setIsOrganizationCreated] = useState(false);
  const [errors, setErrors] = useState("");
  const [documenttype, setdocumenttype] = useState([]);
  const [sectortype, setsectortype] = useState([]);
  const [listedtype, setlistedtype] = useState([]);
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);
  const [statedata, setstatedata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [iscity, setiscity] = useState(true);
  const [isstate, setisstate] = useState(true);
  // const [editOrgData, seteditOrgData] = useState('');
  const [editOrgEnabled, seteditOrgEnabled] = useState(
    location.state?.editorg ?? false
  );

  Tittle("Add Organization - Evalvue");
  function populateState(id) {
    var data = statedata;
    var tempList = [];
    tempList.push(<option value="">--Please Select--</option>);
    Object.keys(data).forEach(function (key) {
      if (data[key].CountryId == id) {
        tempList.push(<option value={key}>{data[key].Name}</option>);
      }
    });
    setisstate(false);
    setstate(tempList);
  }

  function populateCity(id) {
    var data = citydata;
    var tempList = [];
    tempList.push(<option value="">--Please Select--</option>);
    Object.keys(data).forEach(function (key) {
      if (data[key].StateId == id) {
        tempList.push(<option value={key}>{data[key].Name}</option>);
      }
    });
    setiscity(false);
    setcity(tempList);
  }

  function orgHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setOrgregdata((values) => ({ ...values, [name]: value }));
    if (name == "country_id") {
      populateState(value);
    } else if (name == "state_id") {
      populateCity(value);
    }
    // Remove error for this field when user enters a value
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }

  if(editOrgEnabled){
    const filelogoHandler = (e) => {
      const name = e.target.name;
      const file = e.target.files[0];
      if (file) {
        if (name === "organization_image") {
          setFileLogoName(file.name);
          setLogoFilePreview(URL.createObjectURL(file));
          setOrgregdata((values) => ({ ...values, [name]: file }));
        }
       } else {
        setFileLogoName("");
        setLogoFilePreview("");
        setOrgregdata((values) => ({ ...values, [name]: "" }));
  
        validate()
      }
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };
  }
  
  const filelogoHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    if (file) {
      if (name === "organization_image") {
        setFileLogoName(file.name);
        setLogoFilePreview(URL.createObjectURL(file));
        setOrgregdata((values) => ({ ...values, [name]: file }));
      }
     } else {
      setFileLogoName("");
      setLogoFilePreview("");
      setOrgregdata((values) => ({ ...values, [name]: "" }));

      validate()
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const filedocumentHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    if (file) {
      if (name === "document_file") {
        setFileName(file.name);
        setFilePreview(URL.createObjectURL(file));
        setOrgregdata((values) => ({ ...values, [name]: file }));
      } 
     } else {
      setFileName("");
      setFilePreview("");
      setOrgregdata((values) => ({ ...values, [name]: "" }));

      validate()
      
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const header = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  // var doctype=[];
  function validate() {
    const newErrors = {};
    if (!orgregdata.organization_name)
      newErrors.organization_name = "Organization name is required.";
    if (!orgregdata.organization_image)
      newErrors.organization_image = "Organization image is required.";
    if (!orgregdata.sector_id)
      newErrors.sector_id = "Organization sector is required.";
    if (!orgregdata.listed_id)
      newErrors.listed_id = "Organization listed is required.";

    if(!editOrgEnabled){
      if (!orgregdata.document_type_id)
        newErrors.document_type_id = "Document type is required.";
      if (!orgregdata.document_number)
        newErrors.document_number = "Document number is required.";
      if (!orgregdata.document_file)
        newErrors.document_file = "Document file is required.";
    }

    if (!orgregdata.number_of_employee)
      newErrors.number_of_employee = "Number of employee is required.";
    if (!orgregdata.area) newErrors.area = "Address is required.";
    if (!orgregdata.country_id) newErrors.country_id = "Country is required.";
    if (!orgregdata.state_id) newErrors.state_id = "State is required.";
    if (!orgregdata.city_id) newErrors.city_id = "City is required.";
    if (!orgregdata.pincode) newErrors.pincode = "Pin number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  if (editOrgEnabled) {
    const editdata = {
      organization_id: location.state.organization_id || "",
      user_id: userId,
    };
    useEffect(() => {
      Apibackendrequest(`${apiUrl}/organization/editable/data/`, editdata)
      .then((res) => {
            setOrgregdata((pre)=>({
              ...pre,
              ...res.data.organization_list[0]
            }));
            setFileLogoName(getFileNameFromUrl(res.data.organization_list[0].organization_image))
  
            seteditOrgEnabled(
              res.data.organization_editable_data_send_succesfull
            );
            if(res.isexception){
              setError(res.exceptionmessage.error)
            }
          })
        }, [editdata.organization_id]);
      }
         
      // axios
      //   .post(`${apiUrl}/organization/editable/data/`, editdata)
      //   .then((res) => {
      //     // console.log(res)
      //     setOrgregdata((pre)=>({
      //       ...pre,
      //       ...res.data.organization_list[0]
      //     }));
      //     setFileLogoName(getFileNameFromUrl(res.data.organization_list[0].organization_image))

      //     seteditOrgEnabled(
      //       res.data.organization_editable_data_send_succesfull
      //     );
      //   })
      //   .catch((err) => {
      //     console.log(err);setError(err.response.data.error);
      //   });

  useEffect(() => {

    Apibackendrequest(`${apiUrl}/add/organization/`)
    .then((res) => {
      if(res.data){
        setdocumenttype(populateDropDown(res.data.document_type));
        setsectortype(populateDropDown(res.data.sector_type));
        setlistedtype(populateDropDown(res.data.listed_type));
        setcountry(populateDropDown(res.data.country));
        setstate(populateDropDown(res.data.state));
        setstatedata(res.data.state);
        setcity(populateDropDown(res.data.city));
        setcitydata(res.data.city);
        if(res.isexception){
          setError(res.exceptionmessage.error);
        }
      }
        });

    // axios
    //   .post(`${apiUrl}/add/organization/`)
    //   .then((res) => {
    //     // setdocumenttype(res.data.document_type);
    //     setdocumenttype(populateDropDown(res.data.document_type));
    //     setsectortype(populateDropDown(res.data.sector_type));
    //     setlistedtype(populateDropDown(res.data.listed_type));
    //     setcountry(populateDropDown(res.data.country));
    //     setstate(populateDropDown(res.data.state));
    //     setstatedata(res.data.state);
    //     setcity(populateDropDown(res.data.city));
    //     setcitydata(res.data.city);

    //     // console.log(doctype)
    //     // setdocumenttype(doctype);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [userId]);

  function populateDropDown(data) {
    var tempList = [];
    tempList.push(
      <option key={tempList.length + 1} value="">
        --Please Select--
      </option>
    );
    Object.keys(data).forEach(function (key) {
      tempList.push(
        <option
          key={tempList.length + 1}
          selected={orgregdata.document_type_id == key}
          value={key}
        >
          {data[key].Name}
        </option>
      );
    });
    return tempList;
  }
  const getFileNameFromUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      const segments = pathname.split("/");
      return segments.pop() || ""; // Return the last segment which is the file name
    } catch (error) {
      setErrors("Invalid URL:", error);
      return "";
    }
  };
  const formData = new FormData();
    Object.keys(orgregdata).forEach(key => {
      formData.append(key, orgregdata[key]);
    });

  function orgRegSubmit(event) {
    event.preventDefault();
    setloading(true);
    
    // const formData = new FormData();
    // formData.append("organization_image", orgregdata.organization_image);
    // formData.append("document_file", orgregdata.document_file);
    
    setloading(false);
    if (!validate()) return;

    Apibackendrequest(`${apiUrl}${editOrgEnabled ? "/organization/edit/" : "/create/organization/"}`, formData)
        .then((res) => {
          if(res.data){
            if (res.data.is_organization_register_successfull || res.data.organization_edit_sucessfull) {
              setIsOrganizationCreated(true);
              navigate("/dashboard/organization");
              setloading(false);
            }
          } else if(res.isexception){
                setloading(false);
              
                setError(res.exceptionmessage.error);
                
                validate();
              }
            })
            

    // axios
    //   .post(
    //     `${apiUrl}${
    //       editOrgEnabled ? "/organization/edit/" : "/create/organization/"
    //     }`,
    //     orgregdata,
    //     header
    //   )
    //   .then((res) => {
    //     if (res.data.is_organization_register_successfull || res.data.organization_edit_sucessfull) {
    //       setIsOrganizationCreated(true);
    //       navigate("/dashboard/organization");
    //       setloading(false);
    //       console.log("successfull");
    //     }
    //   })
    //   .catch((err) => {
    //     setloading(false);
        
    //       setError(err.response.data.error);
          
    //       console.log(error);
    //       validate();
    //   });
  }

  if (loading) {
    return (
      <div className="h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-full m-4 p-6 bg-white shadow-md rounded-lg">
      {isOrganizationCreated ? (
        <div className="flex items-center justify-center h-[calc(100svh-140px)]">
          <div className="bg-zinc-200 rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="flex flex-col items-center">
              <img
                alt="check"
                src="https://placehold.co/100x100?text=✓"
                className="w-16 h-16 mb-4"
              />
              <h2 className="text-2xl font-bold text-zinc-800 mb-2">
                Awesome!
              </h2>
              <p className="text-zinc-600 mb-6">
                You are ready to proceed using CakeHR
              </p>
              <NavLink to="/dashboard/organization">
                <button className="bg-primary-100 hover:bg-primary-100 text-white font-semibold py-2 px-4 rounded-full">
                  Start CakeHR
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <>
          {editOrgEnabled ? (
            <h1 className="text-xl font-semibold mb-4">
              Update your organization:
            </h1>
          ) : (
            <>
              <h1 className="text-xl font-semibold mb-4">
                Register your organization:
              </h1>
              <p className="mb-6 text-zinc-700 w-full">
                Welcome to our organization registration form! Whether you're a
                budding startup, a growing enterprise, or a well-established
                company, we invite you to join our community.
              </p>
            </>
          )}

          <form className="mt-10" onSubmit={orgRegSubmit}>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Organization name<span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    maxLength={50}
                    name="organization_name"
                    value={orgregdata.organization_name || orgregdata.name}
                    onChange={orgHandler}
                    className="w-full p-2 border  rounded-md"
                  />
                  {errors.organization_name && (
                    <span className="text-red-600 text-sm">
                      {errors.organization_name}
                    </span>
                  )}
                </div>
                <div className="flex items-end">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-700">
                      Organization Logo
                      <span className="text-[red]">*</span>
                    </label>
                    <div className="flex items-center">
                      <label className="custom-file-label w-[114px] truncate bg-primary-100 text-white px-4 py-1 rounded-md cursor-pointer mr-2">
                        {fileLogoName || "Choose file"}
                        <input
                          type="file"
                          className="hidden"
                          name="organization_image"
                          onChange={filelogoHandler}
                        />
                      </label>
                      {/* </div> */}
                    </div>
                    {errors.organization_image && (
                      <span className="text-red-600 text-sm">
                        {errors.organization_image}
                      </span>
                    )}
                  </div>
                  {(fileLogoPreview || fileLogoName) && (
                    <div className="ml-4">
                      <img
                        src={fileLogoPreview == "" ? orgregdata.organization_image : fileLogoPreview}
                        alt="Preview"
                        className="h-14 w-36 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>

                    {editOrgEnabled?"":
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Document type<span className="text-[red]">*</span>
                  </label>
                  <select
                    name="document_type_id"
                    onChange={orgHandler}
                    disabled={editOrgEnabled}
                    className="w-full p-2 border  rounded-md"
                  >
                    {documenttype}
                  </select>

                  {errors.document_type_id && (
                    <span className="text-red-600 text-sm">
                      {errors.document_type_id}
                    </span>
                  )}
                </div>
                }
                  {editOrgEnabled?"":
                <div className=" flex items-end ">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-700">
                      Document file
                      <span className="text-[red]">*</span>
                    </label>
                    <div className="flex items-center ">
                      <label className="custom-file-label bg-primary-100 text-white px-4 py-1 rounded-md cursor-pointer mr-2">
                        {fileName || "Choose file"}
                        
                        <input
                          type="file"
                          className="hidden"
                          name="document_file"
                          disabled={editOrgEnabled}
                          onChange={filedocumentHandler}
                        />
                      </label>
                    </div>
                    {editOrgEnabled?"Not Changeable":""}
                    {errors.document_file && (
                      <span className="text-red-600 text-sm">
                        {errors.document_file}
                      </span>
                    )}
                  </div>
                  {filePreview && (
                    <div className="ml-4">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="h-16 w-36 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>
}
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Organization Sector<span className="text-[red]">*</span>
                  </label>
                  <select
                    name="sector_id"
                    onChange={orgHandler}
                    className="w-full p-2 border  rounded-md"
                  >
                    {sectortype}
                  </select>
                  {errors.sector_id && (
                    <span className="text-red-600 text-sm">
                      {errors.sector_id}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Organization Listed<span className="text-[red]">*</span>
                  </label>
                  <select
                    name="listed_id"
                    onChange={orgHandler}
                    className="w-full p-2 border  rounded-md"
                  >
                    {listedtype}
                  </select>
                  {errors.listed_id && (
                    <span className="text-red-600 text-sm">
                      {errors.listed_id}
                    </span>
                  )}
                </div>
                {editOrgEnabled?"":
                <>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Document Number<span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="CA739543A"
                    name="document_number"
                    maxLength={25}
                    disabled={editOrgEnabled}
                    onChange={orgHandler}
                    value={orgregdata.document_number}
                    className="w-full p-2 border  rounded-md"
                  />
                  {errors.document_number && (
                    <span className="text-red-600 text-sm">
                      {errors.document_number}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    GST Number (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="CA739543A525A"
                    name="gstin"
                    maxLength={15}
                    disabled={editOrgEnabled}
                    onChange={orgHandler}
                    value={orgregdata.gst_number}
                    className="w-full p-2 border  rounded-md"
                  />
                </div>
                </>
}
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Number of employee<span className="text-[red]">*</span>
                  </label>
                  <select
                    name="number_of_employee"
                    onChange={orgHandler}
                    className="w-full p-2 border rounded-md"
                  >
                    <option aria-readonly>Select any one</option>
                    <option value="50">1-50</option>
                    <option value="100">50-100</option>
                    <option value="200">100-200</option>
                    <option value="300">200-300</option>
                    <option value="500">300-500</option>
                    <option value="1000">500-1000</option>
                  </select>
                  {errors.number_of_employee && (
                    <span className="text-red-600 text-sm">
                      {errors.number_of_employee}
                    </span>
                  )}
                </div>
                {editOrgEnabled?"":<div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Referral Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="referral_code"
                    placeholder="Referral Code"
                    value={orgregdata.Referral_code || ""}
                    onChange={orgHandler}
                    maxLength={8}
                    className="w-full p-2 border rounded-md"
                  />
                  
                </div>}
                <div>
                  <h3 className="font-semibold text-xl ">
                    Address<span className="text-[red]">*</span>
                  </h3>
                </div>
                <br />
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Address<span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Area Ex-148,teen puliya"
                    name="area"
                    onChange={orgHandler}
                    value={orgregdata.area}
                    className="w-full p-2 border  rounded-md"
                  />
                  {errors.area && (
                    <span className="text-red-600 text-sm">{errors.area}</span>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Country<span className="text-[red]">*</span>
                  </label>
                  <select
                    name="country_id"
                    onChange={orgHandler}
                    className="w-full p-2 border  rounded-md"
                  >
                    {country}
                  </select>
                  {errors.country_id && (
                    <span className="text-red-600 text-sm">
                      {errors.country_id}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    State<span className="text-[red]">*</span>
                  </label>
                  <select
                    name="state_id"
                    onChange={orgHandler}
                    className="w-full p-2 border  rounded-md"
                    disabled={isstate}
                  >
                    {state}
                  </select>
                  {errors.state_id && (
                    <span className="text-red-600 text-sm">
                      {errors.state_id}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    City<span className="text-[red]">*</span>
                  </label>
                  <select
                    name="city_id"
                    onChange={orgHandler}
                    className="w-full p-2 border rounded-md"
                    disabled={iscity}
                  >
                    {city}
                  </select>
                  {errors.city_id && (
                    <span className="text-red-600 text-sm">
                      {errors.city_id}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Pin Code<span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pin number"
                    value={orgregdata.pincode || ""}
                    onChange={orgHandler}
                    maxLength={6}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.pincode && (
                    <span className="text-red-600 text-sm">
                      {errors.pincode}
                    </span>
                  )}
                </div>
               
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-8">
              {error && <span className="text-red-600 text-sm">{"*" + error}</span>}
              {editOrgEnabled?
              <input
                type="submit"
                className="bg-primary-100 hover:bg-primary-100 text-white font-semibold py-2 px-4 rounded-full"
                value="Save & Update"
              />:
              <input
                type="submit"
                className="bg-primary-100 hover:bg-primary-100 text-white font-semibold py-2 px-4 rounded-full"
                value="Submit"
              />}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Addorganization;
