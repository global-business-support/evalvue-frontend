import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contextfile";
import Loader from "../Loader";
import Tittle from "../../Tittle";
import Apibackendrequest from "../Apibackendrequest";

const apiUrl = import.meta.env.VITE_API_URL;

function Empform() {
  Tittle("Add Employee - Evalvue")
  const { userId } = useContext(UserContext);
  const location = useLocation();
  const [loading, setloading] = useState(false);
  const organization_id = location.state;
  const navigate = useNavigate();
  const [empregdata, Setempregdata] = useState({
    user_id: userId,
    employee_id: location.state.employee_id,
    organization_id: organization_id.organization_id,
  });
  const [editEnable, setEditEnable] = useState(!location.state.addEmp);
  const [fileLogoName, setFileLogoName] = useState("");
  const [fileLogoPreview, setLogoFilePreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState("");
  const [serverError, setServerError] = useState("");

  function emphadler(event) {
    const name = event.target.name;
    const value = event.target.value;
    Setempregdata((values) => ({ ...values, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  }

  const fileHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    if (file) {
      if (name === "employee_image") {
        setFileLogoName(file.name);
        setLogoFilePreview(URL.createObjectURL(file));
      }
      Setempregdata((values) => ({ ...values, [name]: file }));
    } else {
      setFileLogoName("");
      setLogoFilePreview("");
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const editData = {
    employee_id: location.state.employee_id,
    user_id: userId
  };

  useEffect(() => {
    if (editEnable) {
      Apibackendrequest(`${apiUrl}/employee/editable/data/`, editData)
        .then(res => {
          Setempregdata((pre) => ({
            ...pre,
            ...res.data.employee_list[0]
          }))
          setFileName(getFileNameFromUrl(res.data.employee_list[0].employee_image))
          setEditEnable(res.data.employee_editable_data_send_successfull)
          if (res.isexception) {
            setErrors(exceptionmessage);
          };
        });
    };
  }, [editData.employee_id]);

  function validateForm() {
    const newErrors = {};
    if (!empregdata.first_name) newErrors.first_name = "First name is required";
    if (!empregdata.last_name) newErrors.last_name = "Last name is required";
    if (!empregdata.email) newErrors.email = "Email is required";
    if (!empregdata.mobile_number) newErrors.mobile_number = "Mobile number is required";
    if (!empregdata.aadhar_number) newErrors.aadhar_number = "Aadhar number is required";
    if (!editEnable) {
      if (empregdata.aadhar_number !== empregdata.confirm_aadhar_number) {
        newErrors.confirm_aadhar_number = "Aadhar numbers do not match";
      }
    }
    if (!empregdata.designation) newErrors.designation = "Designation is required";
    if (!empregdata.employee_image) newErrors.employee_image = "Image is required";
    return newErrors;
  }

  function empregsubmit(event) {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setServerError(null);

    // Convert to FormData
    const formData = new FormData();
    Object.keys(empregdata).forEach(key => {
      formData.append(key, empregdata[key]);
    });

    Apibackendrequest(`${apiUrl}${editEnable ? `/employee/edit/` : `/create/employees/`}`, formData)
      .then(res => {
        if (res.data) {
          if (res.data.is_employee_register_successfull || res.data.employee_edit_sucessfull) {
            navigate(`/dashboard/organization/employee/${organization_id.organization_id}`, { state: location.state });
          }
        } else if (res.isexception) {
          setServerError(res.exceptionmessage.error)
        }
      })
  }

  if (loading) {
    return (
      <div className="h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-4/5 mx-auto mt-4 p-4 bg-white shadow rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Employee Details</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
        onSubmit={empregsubmit}
      >
        <div>
          <label className="block mb-1 font-medium">First Name<span className="text-[red]">*</span></label>
          <input
            type="text"
            placeholder="First name"
            name="first_name"
            onChange={emphadler}
            value={empregdata.first_name || ''}
            className="w-full p-2 border rounded"
          />
          {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Last Name<span className="text-[red]">*</span></label>
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            onChange={emphadler}
            value={empregdata.last_name || ''}
            className="w-full p-2 border rounded"
          />
          {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email<span className="text-[red]">*</span></label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            onChange={emphadler}
            value={empregdata.email || ''}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Mobile Number<span className="text-[red]">*</span></label>
          <input
            type="tel"
            placeholder="9754504587"
            name="mobile_number"
            maxLength={10}
            onChange={emphadler}
            value={empregdata.mobile_number || ''}
            className="w-full p-2 border rounded"
          />
          {errors.mobile_number && <p className="text-red-500">{errors.mobile_number}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Aadhar Number<span className="text-[red]">*</span></label>
          <input
            readOnly={editEnable && true}
            type="tel"
            placeholder="854933256268"
            name="aadhar_number"
            onChange={emphadler}
            value={empregdata.aadhar_number || ''}
            maxLength={12}
            className="w-full p-2 border rounded"
          />
          {errors.aadhar_number && <p className="text-red-500">{errors.aadhar_number}</p>}
        </div>
        <div className={editEnable == true ? `hidden` : `block`}>
          <label className="block mb-1 font-medium">Confirm Aadhar Number<span className="text-[red]">*</span></label>
          <input
            type="tel"
            placeholder="854933256268"
            name="confirm_aadhar_number"
            maxLength={12}
            onChange={emphadler}
            value={empregdata.confirm_aadhar_number || ''}
            className="w-full p-2 border rounded"
          />
          {errors.confirm_aadhar_number && <p className="text-red-500">{errors.confirm_aadhar_number}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Designation<span className="text-[red]">*</span></label>
          <input
            type="text"
            placeholder="Front-end developer"
            name="designation"
            onChange={emphadler}
            value={empregdata.designation || ''}
            className="w-full p-2 border rounded"
          />
          {errors.designation && <p className="text-red-500">{errors.designation}</p>}
        </div>
        <div className="flex items-end">
          <div>
            <label className="block mb-4 font-medium">
              Image
              <span className="text-[red]">*</span>
            </label>
            <div className="flex items-center">
              <label className="custom-file-label w-[113px] truncate bg-primary-100 text-white px-4 py-1 rounded-md cursor-pointer mr-2">
                {fileLogoName || fileName || "Choose file"}
                <input
                  type="file"
                  className="hidden"
                  name="employee_image"
                  onChange={fileHandler}
                />
              </label>
            </div>
            {errors.employee_image && (
              <span className="text-red-600 text-sm">
                {errors.employee_image}
              </span>
            )}
          </div>
          {(fileLogoPreview || fileName) && (
            <div className="ml-4">
              <img
                src={fileLogoPreview == "" ? empregdata.employee_image : fileLogoPreview}
                alt="Preview"
                className="h-14 w-24 border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
          {
            editEnable == true ?
              <button
                type="submit"
                className="w-full bg-primary-100 text-white font-regular p-3 rounded-lg mt-4">
                Update Employee
              </button> :
              <button
                type="submit"
                className="w-full bg-primary-100 text-white font-regular p-3 rounded-lg mt-4">
                Add Employee
              </button>
          }
        </div>
      </form>
    </div>
  );
}

export default Empform;
