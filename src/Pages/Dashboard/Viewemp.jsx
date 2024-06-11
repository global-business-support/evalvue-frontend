import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams, useLocation } from "react-router-dom";
import deleteIcon from '../../assets/images/delete6.png';
import editIcon from '../../assets/images/edit2.png';
import Loader from "../Loader";
import Tittle from "../../Tittle";

function Viewemp() {
  Tittle("Employees - Evalvue")
  const [Employees, setEmployees] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { organization_id } = useParams();
  const location = useLocation();
  const state=location.state
  const [topFive,setTopFive] = useState(false);
  // console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://api.evalvue.com/employees/", {
          organization_id,
        });
        setEmployees(response.data.employee_list || []);
        // console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organization_id]);

  if (loading) {
    return (
      <>
      <div className="h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader/>
      </div>
      </>
    ) 
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (Employees.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center flex-col items-center ">
        <p className="text-2xl text-zinc-300">No employees</p>
        <NavLink
          to="/dashboard/organization/employee/addemp"
          state={{ organization_id: organization_id ,state:state}}
        >
          <button className=" border hover:text-whitebg-primary-100 transition duration-300 border-primary-100 text-primary-100 font-semibold px-1 py-2 rounded-lg">
            + Add Employee
          </button>
        </NavLink>
      </div>
       </div>
    );
  }

  return (
    <>
      <div className="lg:px-6 sm:px-2 px-1 py-6 mt-6">
        <div className="flex justify-between items-center mb-6 bg-white sm:p-4 p-2 rounded-lg">
          <div className="flex justify-center items-center sm:gap-5 gap-2">
            <div className="sm:h-20 h-14 sm:w-20 w-14 border-primary-100 border-[3px] rounded-full">
              <img
                src={state.orgimg}
                alt=""
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="sm:text-xl font-semibold text-primary-100">
                {state.organization_name}
              </h1>
              <p className="text-xs  text-primary-100 ">
                {state.orgarea}, {state.orgcity}, {state.orgstate}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
              <p className="sm:text-base text-xs font-semibold">
                Total Employee : {Employees.length}
              </p>
              
              <NavLink
                to="/dashboard/organization/employee/addemp"
                state={{ organization_id: organization_id,
                
                }}
              >
                <button className="border bg-primary-100 text-white sm:text-base text-sm font-semibold px-5 py-2 rounded-lg">
                  <span className="font-bold sm:text-xl text-sm"> + </span> Add Employee
                </button>
              </NavLink>
          </div>
        </div>
        <div className="mb-3 flex justify-center items-start mt-3  overflow-x">
          <table className=" border-separate min-w-full border-spacing-y-3">
            <thead>
              <tr className=" align-text-bottom">
                <td className="text-left font-semibold text-black  py-2 sm:px-4 px-1 sm:text-base text-[12px] ">
                  Employee Name :
                </td>
                <td className="text-left font-semibold text-black  py-2 sm:px-4 px-1 sm:text-base text-[12px] ">Aadhaar Number :</td>
                <td className="text-left font-semibold text-black  py-2 sm:px-4 px-1 sm:text-base text-[12px] ">Designation :</td>
                <td className="text-left font-semibold text-black  py-2 sm:px-4 px-1 sm:text-base text-[12px] ">Reviews :</td>
                {/* <td className="text-left font-semibold text-black  py-2 px-4">Edit / Delete :</td> */}
              </tr>
            </thead>
            <tbody className="mt-4">
              {Employees.map((employee, index) => (
                <tr
                  key={employee.organization_id}
                  className=""
                >
                  <td className="py-3 sm:px-4 px-2 flex justify-start items-center gap-2 bg-white roundeblack shadow-top-bottom-xl rounded-l-lg">
                    <div className="relative">
                      <div className="sm:h-16 h-12 sm:w-16 w-12 ml-2 rounded-full border-[3px] border-primary-100 overflow-hidden">
                        <img
                          src={employee.image}
                          alt=""
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <h2 className="font-semibold sm:text-sm text-[12px] text-primary-100">
                      {employee.name}
                    </h2>
                  </td>
                  <td className="py-3 sm:px-4 px-2 w-[20%] bg-white font-semibold sm:text-sm text-[12px] text-primary-100 shadow-top-bottom-xl">
                      {employee.aadhar_number}
                    </td>
                  <td className="py-3 sm:px-4 px-2 w-[20%] text-primary-100 font-semibold sm:text-sm text-[12px] bg-white shadow-top-bottom-xl">
                    {employee.designation}
                  </td>
                  <td className="ml-10 py-3 sm:px-4 px-2 w-[20%] bg-white  shadow-top-bottom-xl rounded-r-lg">
                    <NavLink
                      to={`/dashboard/organization/employee/review`}
                      state={{
                        empname: employee.name,
                        empdesignation: employee.designation,
                        empimage: employee.image,
                        empid: employee.employee_id,
                        emporgid: organization_id,
                        aadhar:true
                        
                      }}
                    >
                      <button className="  text-white bg-primary-100 font-semibold py-2 sm:px-5 px-2 rounded border border-primary-100 transition duration-300 hover:text-white sm:text-sm text-[12px]">
                        Review
                      </button>
                    </NavLink>
                  </td>
                  {/* <td className="px-4 bg-white text-gray-700  rounded-r-lg  shadow-top-bottom-xl">
                      <NavLink to={""}>
                        <div className="flex gap-3 lg:ml-4">
                          <button><img src={editIcon} alt="edit-icon" className="w-7 h-7" /></button>
                          <button><img src={deleteIcon} alt="delete-icon" className="w-7 h-7"/></button> 
                        </div>
                      </NavLink>
                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default Viewemp;
