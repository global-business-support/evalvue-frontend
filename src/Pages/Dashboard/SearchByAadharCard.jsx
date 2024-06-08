import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/evalvuelogo.jpg";

function SearchByAadharCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [empmappedbyaadhar, setempmappedbyaadhar] = useState(false);
  const navigate = useNavigate(); // Updated from useHistory to useNavigate

  let value = "";
  const handleSearchChange = async (e) => {
    value=e.target.value.replace(/[^0-9]/g, '');
    setSearchTerm(value);

    if (value.length > 0) {
      try {
        const response = await axios.post(
          `https://api.evalvue.com/search/employee/aadhar/`,
          { aadhar_number: value }
        );
        setEmployees(response.data.employees_list_by_aadhar);
        setempmappedbyaadhar(response.data.employees_mapped_to_aadhar);
        console.log(response);
      } catch (error) {
        console.error("Error fetching employee data", error);
      }
    } else {
      setEmployees([]);
    }
  };
  console.log(employees);
  const handleEmployeeClick = (employeeId) => {
    navigate(`/dashboard/organization/employee/review`, {
      state: {
        empimage: employees[employeeId].employee_image,
        empname: employees[employeeId].employee_name,
        empdesignation: employees[employeeId].designation,
        empid: employees[employeeId].employee_id,
        emporgid: employees[employeeId].organization_id,
        aadhar:false
      },
    }); // Updated navigation logic
  };

  return (
    <div className="relative h-full w-full flex justify-center">
{/* {console.log(employees.length)} */}
      {employees==undefined || employees.length==0?
      (
      <div
        className="absolute inset-0  bg-white"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundPosition: "400px 200px",
          backgroundRepeat:"no-repeat",
          backgroundSize:"350px"
          
        }}
      >
        <div className="absolute inset-0 bg-blue-gray-700 opacity-20"></div>
      </div>):
      ""
      }

      <div
        className={`w-full mx-1 md:w-full  h-max mt-2 p-4 relative z-10  dark:bg-zinc-800 rounded-lg shadow-lg`}
      >
        <div className="w-full flex justify-center items-center ">
          <div className="ml-2  mx-8 w-full ">

          <label htmlFor="" className="text-lg font-thin"> Enter Employee Aadhaar Number</label>
          <input
            type="text"
            pattern="[0-9]*"
            placeholder="Enter Aadhaar number"
            className=" px-3 my-2 text-lg border-2 border-blue-gray-200 flex-grow bg-[#d6dadf] text-zinc-700 dark:text-zinc-300"
            value={searchTerm}
            maxLength={12}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => searchTerm.length === 0 && setIsFocused(false)} // Remove focus if searchTerm is empty
          />
            </div>
          <button
            className=" border-2 px-8 bg-primary-100 text-white py-3 rounded-md  mt-7 font-semibold dark:text-primary-100"
            onClick={() => {
              setSearchTerm("");
              setEmployees([]);
              setIsFocused(false);
            }}
          >
            Cancel
          </button>
        </div>

        {empmappedbyaadhar ? (
          <div
            className={`mt-8 ${
              isFocused&&(value.length>0) ? "h-[450px]" : ""
            }   scrollbar-custom  overflow-y-auto`}
          >
            {employees.map((employee, index) => (
              <div
                key={employee.employee_id}
                className="p-5 bg-white mt-4 rounded-md shadow-lg"
              >
                <div className=" flex justify-between items-center gap-4">
                  <div className="flex  items-center gap-4 w-[20%]">
                    <img
                      src={employee.employee_image}
                      className="h-16 w-16 border-[3px] border-primary-100 rounded-full object-fill"
                      alt=""
                    />
                    <div>
                      <small className="font-bold ">Name :</small>
                      <h3 className="font-bold text-sm text-primary-100">{employee.employee_name}</h3>
                      
                    </div>
                  </div>
                  <div className="w-[20%] ">
                    <small className="font-bold ">Designation :</small>
                   <h3 className="font-bold text-sm text-primary-100"> {employee.designation}</h3>
                  </div>
                  <div className="w-[20%]">
                    <small className="font-bold">Aadhaar Number :</small>
                    <h3 className="font-bold text-sm text-primary-100">{employee.aadhar_number}</h3>
                    </div>
                  <div className="w-[20%]">
                    <small className="font-bold">Mobile Number :</small>
                    <h3 className="font-bold text-sm text-primary-100">{employee.mobile_number}</h3>
                    </div>
                  <button
                    onClick={() => {
                      handleEmployeeClick(index);
                    }}
                    className="border px-8 py-2 rounded-md bg-primary-100 text-white"
                  >
                    view
                  </button>
                </div>
              </div>
              // <li
              // key={employee.id}
              //   className="flex items-center p-2 bg-blue-100 dark:bg-blue-900 rounded-lg cursor-pointer"
              //   onClick={() => handleEmployeeClick(employee.id)}
              //   >

              //   <span className="ml-2 text-zinc-700 dark:text-zinc-300">{employee.name}</span>
              // </li>
            ))}
          </div>
        ) : ""}
      </div>
    </div>
  );
}

export default SearchByAadharCard;
