import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contextfile";
import Loader from "../Loader";
import { select } from "@material-tailwind/react";
import Tittle from "../../Tittle";

function Addorganization() {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const [error, setError] = useState("");
  const [orgregdata, setOrgregdata] = useState({
    user_id: userId,
  });
  const [fileLogoName, setFileLogoName] = useState("");
  const [fileLogoPreview, setLogoFilePreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [loading, setloading] = useState(false);
  const [isOrganizationCreated, setIsOrganizationCreated] = useState(false);
  const [errors, setErrors] = useState({});
  const [documenttype, setdocumenttype] = useState([]);
  const [sectortype, setsectortype] = useState([]);
  const [listedtype, setlistedtype] = useState([]);
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);
  const [statedata, setstatedata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [iscity,setiscity]=useState(true);
  const [isstate,setisstate]=useState(true);

  Tittle("Add Organization - Evalvue")
  function populateState(id){
    var data = statedata;
    var tempList = []
    tempList.push(<option value="">--Please Select--</option>)
    Object.keys(data).forEach(function(key) {
      if(data[key].CountryId == id){
        tempList.push(<option value={key}>{data[key].Name}</option>);
      }
    });
    setisstate(false)
    setstate(tempList);
  }

  function populateCity(id){
    var data = citydata;
    var tempList = []
    tempList.push(<option value="">--Please Select--</option>)
    Object.keys(data).forEach(function(key) {
      if(data[key].StateId == id){
        tempList.push(<option value={key}>{data[key].Name}</option>);
      }
    });
    setiscity(false)
    setcity(tempList);
  }

  function orgHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setOrgregdata((values) => ({ ...values, [name]: value }));
    if(name == 'country_id'){
      populateState(value);
    }else if(name == 'state_id'){
      populateCity(value);
    }
    



    // Remove error for this field when user enters a value
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }

  const fileHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    if (file) {
      if (name === "organization_image") {
        setFileLogoName(file.name);
        setLogoFilePreview(URL.createObjectURL(file));
      } else if (name === "document_file") {
        setFileName(file.name);
        setFilePreview(URL.createObjectURL(file));
      }
      setOrgregdata((values) => ({ ...values, [name]: file }));
    } else {
      setFileName("");
      setFilePreview("");
      setFileLogoName("");
      setLogoFilePreview("");
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
    if (!orgregdata.document_type_id)
      newErrors.document_type_id = "Document type is required.";
    if (!orgregdata.document_number)
      newErrors.document_number = "Document number is required.";
    if (!orgregdata.document_file)
      newErrors.document_file = "Document file is required.";
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
  useEffect(() => {
    axios
      .post("https://api.evalvue.com/add/organization/")
      .then((res) => {

          // setdocumenttype(res.data.document_type);
          setdocumenttype(populateDropDown(res.data.document_type));
          setsectortype(populateDropDown(res.data.sector_type));
          setlistedtype(populateDropDown(res.data.listed_type));
          setcountry(populateDropDown(res.data.country));
          setstate(populateDropDown(res.data.state));
          setstatedata(res.data.state);
          setcity(populateDropDown(res.data.city));
          setcitydata(res.data.city)
         
        // console.log(doctype)
        // setdocumenttype(doctype);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  function populateDropDown(data){
    var tempList = []
    tempList.push(<option value="">--Please Select--</option>)
    Object.keys(data).forEach(function(key) {
      tempList.push(<option value={key}>{data[key].Name}</option>);
    });
    return tempList;
  }

  function orgRegSubmit(event) {
    console.log("abhishek")
    event.preventDefault();
    setloading(true);
    if (!validate()) return;

    const formData = new FormData();
    formData.append("organization_image", orgregdata.organization_image);
    formData.append("document_file", orgregdata.document_file);

    axios
      .post("https://api.evalvue.com/create/organization/", orgregdata, header)
      .then((res) => {
        if (res.data.is_organization_register_successfull) {
          setIsOrganizationCreated(true);
          navigate("/dashboard/organization");
          setloading(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
        setloading(false);
      });
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
          <h1 className="text-xl font-semibold mb-4">
            Register your organization:
          </h1>
          <p className="mb-6 text-zinc-700 w-full">
            Welcome to our organization registration form! Whether you're a
            budding startup, a growing enterprise, or a well-established
            company, we invite you to join our community.
          </p>
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
                    name="organization_name"
                    value={orgregdata.organization_name}
                    onChange={orgHandler}
                    className="w-full p-2 border  rounded-md"
                  />
                  {errors.organization_name && (
                    <span className="text-red-600 text-sm">
                      {errors.organization_name}
                    </span>
                  )}
                </div>
                <div className=" flex items-start ">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-zinc-700">
                      Organization Logo
                      <span className="text-[red]">*</span>
                    </label>
                    <div className="flex items-center">
                      <label className="custom-file-label bg-primary-100 text-white px-4 py-1 rounded-md cursor-pointer mr-2">
                        {fileLogoName || "Choose file"}
                        <input
                          type="file"
                          className="hidden"
                          name="organization_image"
                          onChange={fileHandler}
                        />
                      </label>
                      {/* </div> */}
                    </div>
                  </div>
                  {fileLogoPreview && (
                    <div className="ml-4">
                      <img
                        src={fileLogoPreview}
                        alt="Preview"
                        className="h-14 w-36 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>
                {errors.organization_image && (
                  <span className="text-red-600 text-sm">
                    {errors.organization_image}
                  </span>
                )}

                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Document type<span className="text-[red]">*</span>
                  </label>
                  <select
                    name="document_type_id"
                    onChange={orgHandler}
                    className="w-full p-2 border  rounded-md"
                  >
                    {/* {console.log(documenttype)} */}
                    {documenttype}
                    {/* {documenttype.map((value,docid) => {
                      <option value={docid}>{value[docid].Name}</option>;
                    })} */}
                    {/* {documenttype.map(function(doctype){
                      <option value={doctype.DocumentTypeId} key={doctype.DocumentTypeId}>{doctype.Name}</option>
                    })} */}
                  </select>
                  {errors.document_type_id && (
                    <span className="text-red-600 text-sm">
                      {errors.document_type_id}
                    </span>
                  )}
                </div>
                <div className=" flex items-start ">
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
                          onChange={fileHandler}
                        />
                      </label>
                    </div>
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
                {/* <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Organization Logo/image<span className="text-[red]">*</span>
                  </label>
                  <input
                    type="file"
                    className="w-full p-2 border  rounded-md"
                    name="organization_image"
                    onChange={fileHandler}
                  />
                  {errors.organization_image && (
                    <span className="text-red-600 text-sm">
                      {errors.organization_image}
                    </span>
                  )}
                </div> */}
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

                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Document Number<span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="CA739543A"
                    name="document_number"
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
                    GST Number (optional)<span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="CA739543A525A"
                    name="gstin"
                    onChange={orgHandler}
                    value={orgregdata.gst_number}
                    className="w-full p-2 border  rounded-md"
                  />
                </div>

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
                    <option value="1">1-10</option>
                    <option value="2">11-50</option>
                    <option value="3">51-200</option>
                  </select>
                  {errors.number_of_employee && (
                    <span className="text-red-600 text-sm">
                      {errors.number_of_employee}
                    </span>
                  )}
                </div>
                {/* <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Document File (any)<span className="text-[red]">*</span>
                  </label>
                  <input
                    type="file"
                    className="w-full p-2 border  rounded-md"
                    name="document_file"
                    onChange={fileHandler}
                  />
                  {errors.document_file && (
                    <span className="text-red-600 text-sm">
                      {errors.document_file}
                    </span>
                  )}
                </div> */}
                <br />
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
                    className="w-full p-2 border  rounded-md" disabled={isstate}
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
                    className="w-full p-2 border rounded-md" disabled={iscity}
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
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Organization Sector<span className="text-[red]">*</span>
                </label>
                <select
                  name="sector_id"
                  onChange={orgHandler}
                  className="w-full p-2 border rounded-md"
                >
                  <option aria-readonly>Select any one</option>
                  <option value="1">Pharma</option>
                  <option value="2">Education</option>
                </select>
                {errors.sector_id && (
                  <span className="text-red-600 text-sm">
                    {errors.sector_id}
                  </span>
                )}
              </div> */}
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Listed Organization<span className="text-[red]">*</span>
                </label>
                <select
                  name="listed_id"
                  onChange={orgHandler}
                  className="w-full p-2 border rounded-md"
                >
                  <option aria-readonly>Select any one</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
                {errors.listed_id && (
                  <span className="text-red-600 text-sm">
                    {errors.listed_id}
                  </span>
                )}
              </div> */}
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Document type<span className="text-[red]">*</span>
                </label>
                <select
                  name="document_type_id"
                  onChange={orgHandler}
                  className="w-full p-2 border rounded-md"
                >
                  <option aria-readonly>Select any one</option>
                  <option value="1">Certificate of Incorporation</option>
                  <option value="2">PAN</option>
                  <option value="3">TIN</option>
                  <option value="4">GST</option>
                </select>
                {errors.document_type_id && (
                  <span className="text-red-600 text-sm">
                    {errors.document_type_id}
                  </span>
                )}
              </div> */}
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Document Number<span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  name="document_number"
                  placeholder="Number"
                  value={orgregdata.document_number || ""}
                  onChange={orgHandler}
                  className="w-full p-2 border rounded-md"
                />
                {errors.document_number && (
                  <span className="text-red-600 text-sm">
                    {errors.document_number}
                  </span>
                )}
              </div> */}

              {/* <div>
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Address<span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="Address"
                  value={orgregdata.area || ""}
                  onChange={orgHandler}
                  className="w-full p-2 border rounded-md"
                />
                {errors.area && (
                  <span className="text-red-600 text-sm">{errors.area}</span>
                )}
              </div> */}
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Country<span className="text-[red]">*</span>
                </label>
                <select
                  name="country_id"
                  onChange={orgHandler}
                  className="w-full p-2 border rounded-md"
                >
                  <option aria-readonly>Select any one</option>
                  <option value="1">India</option>
                  <option value="2">UAE</option>
                  <option value="3">USA</option>
                </select>
                {errors.country_id && (
                  <span className="text-red-600 text-sm">
                    {errors.country_id}
                  </span>
                )}
              </div> */}
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  State<span className="text-[red]">*</span>
                </label>
                <select
                  name="state_id"
                  onChange={orgHandler}
                  className="w-full p-2 border rounded-md"
                >
                  <option aria-readonly>Select any one</option>
                  <option value="1">Rajasthan</option>
                  <option value="2">Maharashtra</option>
                  <option value="3">Gujrat</option>
                </select>
                {errors.state_id && (
                  <span className="text-red-600 text-sm">
                    {errors.state_id}
                  </span>
                )}
              </div> */}
            </div>
            <div className="flex justify-end mt-8">
              <input
                type="submit"
                className="bg-primary-100 hover:bg-primary-100 text-white font-semibold py-2 px-4 rounded-full"
                value="Submit"
              />
              
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Addorganization;
