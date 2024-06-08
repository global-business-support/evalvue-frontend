import React, { useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import axios from "axios";

function SearchByAadharCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [empmappedbyaadhar, setempmappedbyaadhar] = useState(false);
  const navigate = useNavigate(); // Updated from useHistory to useNavigate

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 0) {
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
    navigate(`/dashboard/organization/employee/review`,
    {state:{empimage:employees[employeeId].employee_image,
      empname:employees[employeeId].employee_name,
      empdesignation:employees[employeeId].designation,
      empid:employees[employeeId].employee_id,
      emporgid:employees[employeeId].organization_id
    }}
    
    ); // Updated navigation logic
  };

  return (
    <div className="flex justify-center items-center h-full ">
      <div
        className={`w-1/2 mx-auto p-4 ${
          isFocused
            ? "fixed top-[20%] left-[55%] transform -translate-x-1/2"
            : "fixed top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2"
        } transition-transform duration-300 ease-in-out bg-white dark:bg-zinc-800 rounded-lg shadow-lg`}
      >
        <div className="w-full flex">
          <input
            type="text"
            placeholder="Enter Aadhaar number"
            className="ml-2 px-4 mx-2 flex-grow bg-transparent outline-none text-zinc-700 dark:text-zinc-300"
            value={searchTerm}
            maxLength={12}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => searchTerm.length === 0 && setIsFocused(false)} // Remove focus if searchTerm is empty
          />
          <button
            className="text-primary-100 font-semibold dark:text-primary-100"
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
          <div className={`mt-8 ${
            isFocused
              ? "h-[450px]"
              : ""
          }   scrollbar-custom  overflow-y-auto`  }>
            {employees.map((employee,index) => (
              <div
                key={employee.employee_id}
                className="p-5 bg-gray-100 mt-4 rounded-md shadow-lg"
              >
                <div className=" flex justify-between items-center gap-4">
                  <div className="flex justify-between items-center gap-4 ">

                  <img src={employee.employee_image} className="h-14 w-14 rounded-full object-fill" alt="" />
                  <div>
                    <h3>{employee.employee_name}</h3>
                    <h3>{employee.designation}</h3>
                  </div>
                  </div>

                  <button onClick={()=>{handleEmployeeClick(index)}}>view</button>

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
        ) : (
          <h2>Please Enter Aadhaar Number</h2>
        )}
      </div>
    </div>
  );
}

export default SearchByAadharCard;
