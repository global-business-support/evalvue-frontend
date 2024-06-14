import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Addorganization from "./Addorganization";
import { UserContext } from "../../Contextfile";
import Loader from "../Loader";
import Tittle from "../../Tittle";
import { FaClock } from "react-icons/fa6";
import { BiSolidShow } from "react-icons/bi";
import ThreeDotMenu from "./ThreeDotMenu";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Organization() {
  Tittle("Organization - Evalvue");
  const [Orgdata, setOrgdata] = useState([]);
  const [Isorgmap, setIsorgmap] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [address, setAddress] = useState({});
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${apiUrl}/organizations/`, { user_id: userId })
      .then((res) => {
        setOrgdata(res.data.organization_list);
        if (res.data.is_organization_mapped) {
          setIsorgmap(res.data.is_organization_mapped);
        } else {
          setAddress(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when request completes
      });
  }, []);

  const handleEdit = (organizationId) => {
    // Navigate to the edit page
    navigate(`/dashboard/organization/addorganization`, {
      state: { organization_id: organizationId, editorg: true },
    });
    // navigate(`/dashboard/organization/edit/${organizationId}`)
  };

  const handleDelete = (organizationId) => {
    // Navigate to the delete page or handle deletion logic
    navigate(`/dashboard/organization/delete/${organizationId}`);
  };
  const handleAddOrg = () => {
    navigate('/dashboard/organization/addorganization', {
    });
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

  return (
    <>
      {Isorgmap ? (
        <div className="lg:px-6 sm:px-2 py-10 rounded-lg mx-auto mt-10">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
            <h2 className="sm:text-lg text-xs font-semibold">
              Total Organization: {Orgdata.length}
            </h2>
            <NavLink onClick={handleAddOrg}>
              <button className="bg-primary-100 sm:text-base text-[12px] text-white hover:bg-[#5559af] hover:shadow-sm border border-primary-100 font-semibold py-2 sm:px-4 px-2 rounded">
                + Add Organization
              </button>
            </NavLink>
          </div>
          <div className="mb-3 flex justify-center items-start mt-8 overflow-y-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <td className="text-left font-bold text-black  py-2 sm:px-4 px-1 sm:text-base text-[12px]">
                    Organization:
                  </td>
                  <td className="text-left font-bold text-black  py-2 sm:px-4 px-1 sm:text-base text-[12px]">
                    Document Number:
                  </td>
                  <td className="text-left font-bold text-black  py-2 sm:px-4 px-1 sm:text-base text-[12px]">
                    Address:
                  </td>
                  <td className="text-left font-bold text-black  py-2 sm:px-4 px-1 sm:text-base text-[12px]">
                    View:
                  </td>
                  {/* <td className="text-left font-bold text-black  py-2 px-4">Edit / Delete:</td> */}
                </tr>
              </thead>
              <tbody>
                {Orgdata.map((organization, index) => (
                  <tr
                    key={organization.organization_id}
                    className="lg:px-6 sm:px-5 px-1"
                  >
                    <td
                      className={`py-3 sm:px-4 px-1 w-[25%] bg-${
                        organization.organization_verified
                          ? "white"
                          : "[#f3f7fc]"
                      } rounded-l-lg border-l  shadow-top-bottom-xl`}
                    >
                      <div className="flex justify-start items-center gap-2">
                        <div className="relative">
                          <div className="sm:h-16 sm:w-16 w-12 rounded-full border-[2px] border-primary-100 overflow-hidden">
                            <img
                              src={organization.image}
                              alt=""
                              className="h-full w-full object-cover rounded-full"
                            />
                          </div>
                        </div>
                        <h2 className="font-semibold sm:text-base text-[12px] text-primary-100">
                          {organization.name}
                        </h2>
                      </div>
                    </td>
                    <td
                      className={`py-3 sm:px-4 px-1 sm:text-base text-[12px] w-[18%] bg-${
                        organization.organization_verified
                          ? "white"
                          : "[#f3f7fc]"
                      } text-primary-100 font-semibold  shadow-top-bottom-xl`}
                    >
                      {organization.document_number}
                    </td>
                    <td
                      className={`py-3 sm:px-4 px-1  sm:text-base text-[12px] bg-${
                        organization.organization_verified
                          ? "white"
                          : "[#f3f7fc]"
                      } text-primary-100  font-semibold  shadow-top-bottom-xl`}
                    >
                      <h1 className="sm:w-52 w-20 sm:text-wrap truncate">
                        {organization.area}, {organization.city_name},{" "}
                        {organization.state_name}, {organization.pincode}

                      </h1>
                    </td>
                    <td
                      className={` py-3 sm:px-0 px-1 ${
                        organization.organization_verified
                          ? "bg-white"
                          : "bg-[#f3f7fc]"
                      } text-primary-100  shadow-top-bottom-xl`}
                    >
                      <NavLink
                        to={`/dashboard/organization/employee/${organization.organization_id}`}
                        state={{
                          organization_name: organization.name,
                          orgarea: organization.area,
                          orgcity: organization.city_name,
                          orgstate: organization.state_name,
                          orgimg: organization.image,
                        }}
                      >
                        {organization.organization_verified ? (
                          <button className=" text-white flex gap-1 bg-primary-100 font-semibold py-2 lg:px-6 px-4 rounded border border-primary-100 hover:bg-[#5559af] hover:shadow-sm hover:text-white text-sm">
                            <BiSolidShow className=" h-5 w-5" />
                            View
                          </button>
                        ) : (
                          <button
                            className="text-white flex gap-2  bg-[#88898b]  font-semibold py-2 sm:px-2 px-1 rounded border transition duration-300 hover:text-white sm:text-sm text-[12px]"
                            disabled
                          >
                            <FaClock className="my-auto h-4 w-4" />
                            Pending...
                          </button>
                        )}
                      </NavLink>
                    </td>
                    <td
                      className={` py-3 sm:px-4 px-1 bg-${
                        organization.organization_verified
                          ? "white"
                          : "[#f3f7fc]"
                      } text-primary-100 rounded-r-lg  shadow-top-bottom-xl`}
                    >
                      {organization.organization_verified ? (
                        <ThreeDotMenu
                          onEdit={() =>
                            handleEdit(organization.organization_id)
                          }
                          onDelete={() =>
                            handleDelete(organization.organization_id)
                          }
                        />
                      ) : (
                        <div></div>
                      )}
                    </td>
                        
                      </td>
                      <td className={` py-3 sm:px-0 px-1 ${organization.organization_verified? "bg-white":"bg-[#f3f7fc]"} text-primary-100  shadow-top-bottom-xl`}>
                      <div className="flex gap-4 justify-center items-center">
                        <NavLink
                          to={`/dashboard/organization/employee/${organization.organization_id}`}
                          state={{
                            organization_name: organization.name,
                            orgarea: organization.area,
                            orgcity: organization.city_name,
                            orgstate: organization.state_name,
                            orgimg: organization.image,
                          }}
                        >
                          {organization.organization_verified ?
                          <button className=" text-white flex gap-1 bg-primary-100 font-semibold py-2 lg:px-6 px-4 rounded border border-primary-100 hover:bg-[#5559af] hover:shadow-sm hover:text-white text-sm">
                          <BiSolidShow className=" h-5 w-5"/>View 
                          </button>:
                           <button className="text-white flex gap-2 mr-7 bg-[#88898b]  font-semibold py-2 sm:px-2 px-1 rounded border transition duration-300 hover:text-white sm:text-sm text-[12px]" disabled>

                           <FaClock className="my-auto h-4 w-4"/>Pending...
                           </button>  
                        }
                        </NavLink>
                        {organization.organization_verified ?
                    <ThreeDotMenu
                    onEdit={() => handleEdit(organization.organization_id)}
                    onDelete={() => handleDelete(organization.organization_id)}
                  /> : <div></div>}
                  </div>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Addorganization userId={userId} />
      )}
    </>
  );
}
