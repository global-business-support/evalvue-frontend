import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams, useLocation } from "react-router-dom";
import deleteIcon from '../../assets/images/delete6.png';
import editIcon from '../../assets/images/edit2.png';

function Viewemp() {
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
      <div className="px-8 py-6 mt-6">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
          <div className="flex justify-center items-center gap-5">
            <div className="h-16 w-16 border border-gray-500 rounded-full">
              <img
                src={state.orgimg}
                alt=""
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {state.organization_name}
              </h1>
              <p className="text-xs text-gray-500">
                {state.orgarea}, {state.orgcity}, {state.orgstate}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-semibold">
                Total Employee: {Employees.length}
              </p>
              
              <NavLink
                to="/dashboard/organization/employee/addemp"
                state={{ organization_id: organization_id }}
              >
                <button className="border bg-primary-100 text-white font-semibold px-4 py-2 sm:px-2 rounded-lg">
                  + Add Employee
                </button>
              </NavLink>
          </div>
        </div>
        <div className="mb-3 flex justify-center items-start mt-3 w-full">
          <table className=" border-separate w-full border-spacing-y-3">
            <thead>
              <tr>
                <td className="text-left font-semibold text-gray-600  py-2 px-4">
                  Employee Name:
                </td>
                <td className="text-left font-semibold text-gray-600  py-2 px-4">Aadhaar Number:</td>
                <td className="text-left font-semibold text-gray-600  py-2 px-4">Designation:</td>
                <td className="text-left font-semibold text-gray-600  py-2 px-4">Reviews:</td>
                <td className="text-left font-semibold text-gray-600  py-2 px-4">Edit / Delete:</td>
              </tr>
            </thead>
            <tbody className="mt-4">
              {Employees.map((employee, index) => (
                <tr
                  key={employee.organization_id}
                  className=""
                >
                  <td className="py-3 px-4 flex justify-start items-center gap-2 bg-white rounded-l-lg border-b border-t border-l border-gray-400 shadow-top-bottom-xl">
                    <div className="relative">
                      <div className="h-14 w-14 ml-2 rounded-full border border-gray-500 overflow-hidden">
                        <img
                          src={employee.image}
                          alt=""
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <h2 className="font-semibold text-gray-900">
                      {employee.name}
                    </h2>
                  </td>
                  <td className="py-3 px-4 w-[20%] bg-white text-gray-700 border-t border-b border-gray-400 shadow-top-bottom-xl">
                      810346564
                    </td>
                  <td className="py-3 px-4 w-[20%] text-gray-700 bg-white border-t border-b border-gray-400 shadow-top-bottom-xl">
                    {employee.designation}
                  </td>
                  <td className="ml-10 py-3 px-4 w-[20%] bg-white border-t border-b border-gray-400 shadow-top-bottom-xl">
                    <NavLink
                      to={`/dashboard/organization/employee/review`}
                      state={{
                        empname: employee.name,
                        empdesignation: employee.designation,
                        empimage: employee.image,
                        empid: employee.employee_id,
                        emporgid: organization_id,
                        
                      }}
                    >
                      <button className=" hover:bg-primary-100 text-primary-100 font-semibold py-1 px-3 rounded border border-primary-100 transition duration-300 hover:text-white text-sm">
                        Review
                      </button>
                    </NavLink>
                  </td>
                  <td className="px-4 bg-white text-gray-700 border-t border-b border-r rounded-r-lg border-gray-400 shadow-top-bottom-xl">
                      <NavLink to={""}>
                        <div className="flex gap-3 lg:ml-4">
                          <button><img src={editIcon} alt="edit-icon" className="w-7 h-7" /></button>
                          <button><img src={deleteIcon} alt="delete-icon" className="w-7 h-7"/></button> 
                        </div>
                      </NavLink>
                    </td>
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
