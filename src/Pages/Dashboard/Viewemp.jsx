import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams, useLocation } from "react-router-dom";

function Viewemp() {
  const [Employees, setEmployees] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { organization_id } = useParams();
  const location = useLocation();
  const state=location.state
  console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://api.evalvue.com/employees/", {
          organization_id,
        });
        setEmployees(response.data.employee_list || []);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organization_id]);

  if (loading) {
    return <p>Loading...</p>;
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
          <button className="border hover:text-white hover:bg-primary-100 transition duration-200 border-primary-100 text-primary-100 font-semibold px-4 py-2 rounded-lg">
            + Add Employee
          </button>
        </NavLink>
      </div>
       </div>
    );
  }

  return (
    <>
      <div className="px-8 py-6">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl">
          <div className="flex justify-center items-center gap-5">
            <div className="h-16 w-16 border-2 border-gray-500 rounded-full p-1">
              <img
                src={state.orgimg}
                alt=""
                className="h-full w-full object-contain rounded-full"
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
                <button className="border bg-primary-100 text-white font-semibold px-4 py-2 rounded-lg">
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
                <td className="text-left font-semibold text-gray-600  py-2 px-4">Designations:</td>
                <td className="text-left font-semibold text-gray-600  py-2 px-4">Reviews:</td>
              </tr>
            </thead>
            <tbody className="mt-4">
              {Employees.map((employee, index) => (
                <tr
                  key={employee.organization_id}
                  className="hover:bg-blue-gray-50 transition duration-300 bg-white shadow-sm"
                >
                  <td className="py-3 px-4 flex justify-start items-center gap-2 rounded-l-lg">
                    <div className="h-14 w-14 p-1 rounded-full border-2 border-gray-500">
                      <img
                        src={employee.image}
                        alt=""
                        className="h-full w-full object-contain rounded-full"
                      />
                    </div>
                    <h2 className="font-semibold text-gray-900">
                      {employee.name}
                    </h2>
                  </td>
                  <td className="py-3 px-4 w-2/4 text-gray-700">
                    {employee.designation}
                  </td>
                  <td className="py-3 px-4 ">
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
                      <button className="px-4 py-1 w-fit border border-primary-100 rounded-md text-primary-100 font-semibold">
                        Review
                      </button>
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
