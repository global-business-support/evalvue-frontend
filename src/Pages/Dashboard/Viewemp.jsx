import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Tittle from "../../Tittle";
import ThreeDotMenu from "./ThreeDotMenu";
import Apibackendrequest from "../Apibackendrequest";
import { UserContext } from "../../Contextfile";
const apiUrl = import.meta.env.VITE_API_URL;

function Viewemp() {
  const navigate = useNavigate();
  Tittle("Employees - Evalvue");
  const [Employees, setEmployees] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { organization_id } = useParams();
  const location = useLocation();
  const state = location.state;
  console.log(state);
  const status = false; /*Remove this variable */
  const [delEmp, setDelEmp] = useState(false);
  const [terminated, setTerminated] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(`${apiUrl}/employees/`, {
  //         organization_id,
  //       });
  //       setEmployees(response.data.employee_list || []);
  //       // console.log(response.data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    Apibackendrequest(`${apiUrl}/employees/`, { organization_id })
      .then((res) => {
        setEmployees(res.data.employee_list || []);
        if (res.isexception) {
          setError(res.exceptionmessage.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    setTerminated(false);
  }, [terminated]);

  const handleEdit = (empId, OrgId) => {
    // Navigate to the edit page
    navigate(`/dashboard/organization/employee/addemp`, {
      state: {
        employee_id: empId,
        organization_id: OrgId,
        addEmp: false,
        orgimg: state.orgimg,
        organization_name: state.organization_name,
        orgarea: state.orgarea,
        orgcity: state.orgcity,
        orfstate: state.orgstate,
      },
    });
  };
  const handleTerminate = (empId, OrgId, empname) => {
    const delId = { organization_id: OrgId, employee_id: empId };
    const confirmuser = confirm(
      `Are you sure you want to delete ${empname}'S employment? `
    );
    if (confirmuser) {
      Apibackendrequest(`${apiUrl}/terminate/employee/`, delId)
        .then((res) => {
          if (res) {
            if (res.exceptionmessage.is_employee_terminated_successfull) {
              window.location.reload();
            } else if (res.isexception) {
              setError(res.exceptionmessage.error);
            }
          }
        })
        .finally(() => setLoading(false));
    }
  };

  if (loading) {
    return (
      <>
        <div className="h-[calc(100vh-100px)] flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-red-500 text-lg align-middle">{error}</h1>
      </div>
    );
  }

  if (Employees?.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
        <div className="flex justify-center flex-col items-center ">
          <p className="text-2xl text-zinc-300">No employees</p>
          <NavLink
            to="/dashboard/organization/employee/addemp"
            state={{
              organization_id: organization_id,
              state: state,
              orgimg: state.orgimg,
              organization_name: state.organization_name,
              orgarea: state.orgarea,
              orgcity: state.orgcity,
              orfstate: state.orgstate,
              addEmp: true,
            }}
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
      <div className="lg:px-6 sm:px-2">
        <div className="lg:mb-0 mb-14 flex justify-between items-center bg-white sm:p-4 p-2 rounded z-[2] sticky lg:top-[56px] top-[48px]">
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
              state={{
                organization_id: organization_id,
                orgimg: state.orgimg,
              organization_name: state.organization_name,
              orgarea: state.orgarea,
              orgcity: state.orgcity,
              orfstate: state.orgstate,
                addEmp: true,
              }}
            >
              <button className="border bg-primary-100 text-white sm:text-base text-xs font-semibold px-5 py-2 rounded-lg hover:bg-[#5559af] hover:shadow-sm">
                <span className="font-bold sm:text-xl text-xs"> + </span> Add
                Employee
              </button>
            </NavLink>
          </div>
        </div>
        <div className="mb-3 flex justify-center items-start mt-3  overflow-x">
          <table className=" border-separate min-w-full border-spacing-y-3">
            <thead>
              <tr className=" align-text-bottom">
                <td className=" text-left font-semibold text-black  py-2 sm:px-4 px-1 sm:text-base  ">
                  Employee Name
                </td>
                <td className="text-left font-semibold text-black sm:w-auto w-full py-2 sm:px-2 px-1 sm:text-base">
                  Aadhaar Number
                </td>
                <td className="text-left font-semibold text-black  py-2 sm:px-2 px-1 sm:text-base sm:table-cell hidden">
                  Designation
                </td>
                <td className="text-left font-semibold text-black  py-2 sm:px-8 px-1 sm:text-base">
                  Reviews
                </td>
                {/* <td className="text-left font-semibold text-black  py-2 px-4">Edit / Delete :</td> */}
              </tr>
            </thead>
            <tbody className="mt-4">
              {Employees.map((employee) => (
                <tr key={Employees.employee_id} className="">
                  <td className="py-3 sm:px-4 px-1 flex justify-start items-center gap-2 bg-white roundeblack shadow-top-bottom-xl rounded-l-lg">
                    <div className="relative">
                      <div className="sm:h-16 h-12 sm:w-16 w-12 ml-2 rounded-full border-[3px] border-primary-100 overflow-hidden">
                        <img
                          src={employee.employee_image}
                          alt=""
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <h2 className="font-semibold sm:text-sm text-[12px] md:w-auto w-[120px] truncate text-primary-100">
                      {employee.employee_name}
                    </h2>
                  </td>
                  <td className="py-3 sm:px-2 px-1 w-[20%] bg-white font-semibold sm:text-sm text-[12px] text-primary-100 shadow-top-bottom-xl">
                    {employee.aadhar_number}
                  </td>
                  <td className="py-3 sm:px-2 px-1 w-[20%] text-primary-100 font-semibold sm:text-sm text-[12px] bg-white shadow-top-bottom-xl sm:table-cell hidden">
                    {employee.designation}
                  </td>

                  <td className="ml-10 py-3 sm:px-4 px-2 w-[20%] bg-white rounded-r-lg shadow-top-bottom-xl">
                    <div className="flex gap-4 justify-center items-center">
                      <NavLink
                        to={`/dashboard/organization/employee/review`}
                        state={{
                          empname: employee.employee_name,
                          empdesignation: employee.designation,
                          empimage: employee.employee_image,
                          empid: employee.employee_id,
                          emporgid: organization_id,
                          aadhar: true,
                        }}
                      >
                        <button className="  text-white bg-primary-100 font-semibold py-2 sm:px-5 px-3 rounded border border-primary-100 hover:bg-[#5559af] hover:shadow-sm sm:text-sm text-[11px]">
                          Review
                        </button>
                      </NavLink>
                      <ThreeDotMenu
                        onEdit={() =>
                          handleEdit(employee.employee_id, organization_id)
                        }
                        onDelete={() =>
                          handleTerminate(
                            employee.employee_id,
                            organization_id,
                            employee.employee_name
                          )
                        }
                        organizationId={organization_id}
                        setTerminated={setTerminated}
                      />
                    </div>
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
