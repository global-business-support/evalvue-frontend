import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/evalvuelogo.jpg";
import Tittle from "../../Tittle";
import Apibackendrequest from "../Apibackendrequest";
const apiUrl = import.meta.env.VITE_API_URL;

function SearchByAadharCard() {
  Tittle("Search by Aadhaar - Evalvue");
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [empmappedbyaadhar, setempmappedbyaadhar] = useState(false);
  const navigate = useNavigate(); // Updated from useHistory to useNavigate
  const [error, setError] = useState();

  let value = "";
  const handleSearchChange = async (e) => {
    value = e.target.value.replace(/[^0-9]/g, "");
    setSearchTerm(value);

    if (value.length > 0) {
      try {
        Apibackendrequest(`${apiUrl}/search/employee/aadhar/`, {
          aadhar_number: value,
        }).then((response) => {
          if (response.data) {
            setEmployees(response.data.employees_list_by_aadhar);
            setempmappedbyaadhar(response.data.employees_mapped_to_aadhar);
          } else if (response.isexception) {
            setError(response.exceptionmessage.error);
          }
        });

        // const response = await axios.post(`${apiUrl}/search/employee/aadhar/`, {
        //   aadhar_number: value,
        // });
        // setEmployees(response.data.employees_list_by_aadhar);
        // setempmappedbyaadhar(response.data.employees_mapped_to_aadhar);
      } catch (error) {
        setError("Error fetching employee data", error);
      }
    } else {
      setEmployees([]);
    }
  };
  const handleEmployeeClick = (employeeId) => {
    navigate(`/dashboard/organization/employee/review`, {
      state: {
        empimage: employees[employeeId].employee_image,
        empname: employees[employeeId].employee_name,
        empdesignation: employees[employeeId].designation,
        empid: employees[employeeId].employee_id,
        emporgid: employees[employeeId].organization_id,
        aadhar: false,
        search_by_aa:true,
        createdOn: employees[employeeId].created_on,
        orgName: employees[employeeId].organization_name,
        orgImg: employees[employeeId].organization_image,
      },
    }); // Updated navigation logic
  };

  if (error) {
    return (
      <div>
        <h1 className="text-red-500 text-lg align-middle">{error}</h1>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-120px)] w-full flex justify-center ">
      {employees == undefined || employees.length == 0 ? (
        <div
          className="absolute inset-0 bg-white"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundPosition: "50% 75%",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "50%",
            backgroundPositionY: "80%",
            backgroundSize: "25%",
          }}
        >
          <div className="absolute inset-0 bg-blue-gray-700 opacity-10"></div>
        </div>
      ) : (
        ""
      )}

      <div className="w-full sticky  mx-1 md:w-full h-max px-4 dark:bg-zinc-800 rounded-lg">
        <div className="w-full sticky lg:top-0 top-[47px] lg:mt-0 mt-10 py-4 px-6 bg-primary-100 shadow-lg flex rounded justify-center items-center mb-5">
          <div className="ml-2 mx-8 w-full">
            <label
              htmlFor=""
              className="sm:text-lg text-sm text-white font-thin"
            >
              {" "}
              Enter Employee Aadhaar Number
            </label>
            <input
              type="text"
              pattern="[0-9]*"
              placeholder="Enter Aadhaar number"
              className=" px-3 text-lg  border-white flex-grow bg-white  text-gray-600 dark:text-zinc-300"
              value={searchTerm}
              maxLength={12}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => searchTerm.length === 0 && setIsFocused(false)} // Remove focus if searchTerm is empty
            />
          </div>
          <button
            className=" border-2 sm:px-8 px-5 sm:text-base text-sm bg-white text-primary-100 py-3 rounded-md  mt-7 font-semibold dark:text-primary-100"
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
            className={`mt-8 pt-5 xl:flex xl:flex-col grid  sm:grid-cols-2 grid-cols-1 gap-1 ${
              isFocused && value.length > 0 ? "h-[450px]" : ""
            }   scrollbar-custom  overflow-y-auto`}
          >
            {employees.map((employee, index) => (
              <div
                key={employee.employee_id}
                className=" py-5 md:px-5 px-3 m-0.5 lg:w-full w-50% bg-white mt-4 rounded-md shadow-lg"
              >
                <div className=" flex xl:flex-row flex-col justify-between items-center lg:gap-4 gap-2">
                  <div className="flex xl:flex-row flex-col items-center gap-4 xl:w-[20%] w-full justify-start">
                    <img
                      src={employee.employee_image}
                      className="lg:h-[70px] h-[80px] lg:max-w-[70px] w-[80px] border-[3px] border-primary-100 rounded-full object-fill"
                      alt=""
                    />
                    <div className="flex xl:flex-col">
                      <small className="font-bold sm:text-sm text-xs ">
                        Name :&nbsp;
                      </small>
                      <h3 className="font-bold sm:text-sm text-xs text-primary-100">
                        {employee.employee_name}
                      </h3>
                    </div>
                  </div>
                  <div className="xl:w-[20%] w-full flex xl:flex-col justify-start ">
                    <small className="font-bold sm:text-sm text-xs">
                      Designation :&nbsp;
                    </small>
                    <h3 className="font-bold sm:text-sm text-xs text-primary-100">
                      {" "}
                      {employee.designation}
                    </h3>
                  </div>
                  <div className="xl:w-[20%] w-full flex xl:flex-col justify-start">
                    <small className="font-bold sm:text-sm text-xs">
                      Aadhaar Number :&nbsp;
                    </small>
                    <h3 className="font-bold  sm:text-sm text-xs text-primary-100">
                      {employee.aadhar_number}
                    </h3>
                  </div>
                  {/* <div className="xl:w-[20%] w-full flex xl:flex-col justify-start">
                    <small className="font-bold sm:text-sm text-xs">
                      Mobile Number :&nbsp;
                    </small>
                    <h3 className="font-bold sm:text-sm text-xs text-primary-100">
                      {employee.mobile_number}
                    </h3>
                  </div> */}
                  <div className="flex lg:flex-row flex-col lg:w-auto w-full gap-[2px]">
                    {employee.status_id == 1 ? (
                      <button className="lg:w-auto w-full border-2 px-6 py-2 rounded-md font-bold bg-green-700 text-white">
                        Currently Active
                      </button>
                    ) : (
                     
                        
                        <NavLink
                          to={"/dashboard/addEmployee"}
                          state={{
                            addemp:true,
                            employee_id : employee.employee_id,
                            employee_name: employee.employee_name,
                            employee_designation : employee.designation,
                            employee_email : employee.email,
                            employee_mobileNumber : employee.mobile_number,
                            employee_aadhar_number : employee.aadhar_number,
                            employee_image : employee.employee_image
                          }}
                          className="lg:w-auto w-full text-center  border-2 px-2 py-2 rounded-md font-bold bg-primary-100 text-white"
                        >
                          Add to Organization
                        </NavLink>
                      
                    )}

                    <button
                      onClick={() => {
                        handleEmployeeClick(index);
                      }}
                      className="lg:w-auto w-full border px-7 py-2 rounded-md bg-primary-100 text-white"
                    >
                      view
                    </button>
                  </div>
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
          ""
        )}
      </div>
    </div>
  );
}

export default SearchByAadharCard;
