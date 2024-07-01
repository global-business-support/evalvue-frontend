import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Addorganization from "./Addorganization";
import { UserContext } from "../../Contextfile";
import Loader from "../Loader";
import Tittle from "../../Tittle";
import { FaClock } from "react-icons/fa6";
import { BiSolidShow } from "react-icons/bi";
import ThreeDotMenu from "./ThreeDotMenu";
import Apibackendrequest from "../Apibackendrequest";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Organization() {
  Tittle("Organization - Evalvue");
  const [Orgdata, setOrgdata] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [Isorgmap, setIsorgmap] = useState(false);
  const { userId} = useContext(UserContext);
  const [error, setError] = useState();
  const { setStateOrgData } = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    Apibackendrequest(`${apiUrl}/organizations/`, { user_id: userId })
    .then((res) => {
      setOrgdata(res.data.organization_list);
      console.log(typeof(res))
      
      if (res.data.is_organization_mapped) {
        setIsorgmap(res.data.is_organization_mapped);
      }
      if(res.isexception){
        setError(res.exceptionmessage.error)
      }
    })
    .catch((err) => {
      setError(err);
    }).finally(()=>{setLoading(false)});
  }, [userId]);

  const handleEdit = (organizationId) => {
    navigate(`/dashboard/organization/addorganization`, {
      state: { organization_id: organizationId, editorg: true },
    });
  };

  const handleAddOrg = () => {
    navigate("/dashboard/organization/addorganization", {});
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

  if(error){
    return( <div>
      <h1 className="text-red-500 text-lg align-middle">{error}</h1>
    </div>)
  }

  if(Isorgmap) {
    return (
    <>
        <div className="lg:px-4 sm:px-2 relative rounded-lg mx-auto ">
          <div
            className="flex justify-between sticky z-[2] items-center mb-6 bg-white p-4 rounded shadow-lg"
            style={{ top: "56px" }}
          >
            <h2 className="sm:text-lg text-xs font-semibold">
              Total Organization: {Orgdata.length}
            </h2>
            <NavLink onClick={handleAddOrg}>
              <button className="bg-primary-100 sm:text-base text-[12px] text-white hover:bg-[#5559af] hover:shadow-sm border border-primary-100 font-semibold py-2 sm:px-4 px-2 rounded">
                + Add Organization
              </button>
            </NavLink>
          </div>
          <div className="flex flex-col overflow-x-auto">
              <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium border-white">
                        <tr>
                          <th scope="col" className="px-6 py-4">Organization</th>
                          <th scope="col" className="px-6 py-4  sm:table-cell hidden">Document Number</th>
                          <th scope="col" className="px-6 py-4  sm:table-cell hidden">Address</th>
                          <th scope="col" className="py-4">View</th>
                        </tr>
                      </thead>
                      <tbody>
                       {Orgdata.map((org)=>(
                        <tr className={`border-b border-white bg-${
                        org.organization_verified
                          ? ""
                          : "gray-300"
                      }`}>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                        <div className="flex justify-start items-center gap-2">
                          <div className="relative">
                          <div className=" h-12 w-12 rounded-full border-[2px] border-primary-100 overflow-hidden">
                              <img
                                src={org.image}
                                alt=""
                                className="h-full w-full object-cover rounded-full"
                              />
                            </div>
                          </div>
                          <h2 className="text-primary-100 font-bold sm:text-base w-[140px] md:w-[120px]  lg:w-[100px] xl:w-[200px] truncate">
                            {org.name}
                          </h2>
                        </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700 sm:table-cell hidden">
                          <h1>
                            {org.document_number}
                          </h1>
                          </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-700 sm:table-cell hidden">
                          <h1 className="md:w-[100px] lg:w-[100px] xl:w-[320px] truncate">
                            {org.area}, {org.city_name},{" "}
                          {org.state_name}, {org.pincode}
                          </h1>
                        </td>
                        <td className="whitespace-nowrap py-4 text-gray-700">
                        <div className="flex gap-4 justify-start items-center">
                        {org.organization_verified ? (
                          <NavLink
                            to={`/dashboard/organization/employee/${org.organization_id}`}
                            onClick={(()=>{
                              setStateOrgData({
                                  organization_name: org.name,
                                  orgarea: org.area,
                                  orgcity: org.city_name,
                                  orgstate: org.state_name,
                                  orgimg: org.image,
                                })
                            })}
                            state={{
                              organization_name: org.name,
                              orgarea: org.area,
                              orgcity: org.city_name,
                              orgstate: org.state_name,
                              orgimg: org.image,
                            }}
                          >
                            <button className=" text-white flex gap-1 bg-primary-100 font-semibold py-2 md:px-6 px-4 rounded border border-primary-100 hover:bg-[#5559af] hover:shadow-sm hover:text-white text-sm">
                              <BiSolidShow className=" h-5 w-5" />
                              View
                            </button>{" "}
                          </NavLink>
                        ) : (
                          <button
                            className="text-white flex gap-2 mr-7 bg-[#88898b]  font-semibold py-2 sm:px-2 px-1 rounded border transition duration-300 hover:text-white sm:text-sm text-[12px]"
                            disabled
                          >
                            <FaClock className="my-auto h-4 w-4" />
                            Pending...
                          </button>
                        )}
                        {org.organization_verified ? (
                          <ThreeDotMenu
                            onEdit={() =>
                              handleEdit(org.organization_id)
                            }
                          />
                        ) : (
                          ""
                        )}
                      </div>
                        </td>
                      </tr>
                       ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )}else{return(<Addorganization />)
  }
};
