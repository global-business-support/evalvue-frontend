import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Addorganization from "./Addorganization";
import { UserContext } from "../../Contextfile";
import deleteIcon from '../../assets/images/delete6.png';
import editIcon from '../../assets/images/edit2.png';
import Loader from "../Loader";
import Tittle from "../../Tittle";

export default function Organization() {
  Tittle("Organization - Evalvue")
  const [Orgdata, setOrgdata] = useState([]);
  const [Isorgmap, setIsorgmap] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [address, setAddress] = useState({});
  const { userId } = useContext(UserContext);

  useEffect(() => {
    axios
      .post("https://api.evalvue.com/organizations/", { user_id: userId })
      .then((res) => {
        setOrgdata(res.data.organization_list);
        if (res.data.is_organization_mapped) {
          console.log(res.data)
          setIsorgmap(res.data.is_organization_mapped);
        } else {
          setAddress(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when request completes
      });
  }, []);

  if (loading) {
    return (
      <>
      <div className="h-[calc(100vh-100px)] flex justify-center items-center">
        <Loader/>
      </div>
      </>
    ) 
  }

  return (
    <>
      {Isorgmap ? (
        <div className="lg:px-6 sm:px-2 py-10 rounded-lg mx-auto">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Total Organization: {Orgdata.length}</h2>
            <NavLink to={`/dashboard/organization/addorganization`}>
              <button className="bg-primary-100 text-white transition duration-300 border border-primary-100 text-primary-100 font-semibold py-2 px-4 rounded">
                + Add Organization
              </button>
            </NavLink>
          </div>
          <div className="mb-3  flex justify-center items-start mt-8 overflow-y-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <td className="text-left font-bold text-black  py-2 px-4">
                    Organization:
                  </td>
                  <td className="text-left font-bold text-black  py-2 px-4">Document Number:</td>
                  <td className="text-left font-bold text-black  py-2 px-4">Address:</td>
                  <td className="text-left font-bold text-black  py-2 px-4">View:</td>
                  {/* <td className="text-left font-bold text-black  py-2 px-4">Edit / Delete:</td> */}
                </tr>
              </thead>
              <tbody className=" ">
                {Orgdata.map((organization, index) => (
                  <tr
                    key={organization.organization_id}
                    className="lg:px-6 sm:px-2"
                  >
                    <td className="py-3 px-4 w-[25%] bg-white rounded-l-lg border-l  shadow-top-bottom-xl">
                      <div className="flex justify-start items-center gap-2">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full border-[2px] border-primary-100 overflow-hidden">
                          <img
                            src={organization.image}
                            alt=""
                            className="h-full w-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <h2 className="font-semibold text-sm text-primary-100">
                        {organization.name}
                      </h2>
                      </div>
                    </td>
                    <td className="py-3 px-4 w-[18%] text-sm bg-white text-primary-100 font-semibold  shadow-top-bottom-xl">
                      8103112050
                    </td>
                    <td className="py-3 px-4 text-sm bg-white text-primary-100  font-semibold  shadow-top-bottom-xl">
                      {organization.area}, {organization.city_name},{" "}
                      {organization.state_name}, {organization.pincode}
                    </td>
                    <td className="ml-10 py-3 px-4 w-[10%] bg-white text-primary-100  shadow-top-bottom-xl">
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
                        <button className="  text-white bg-primary-100  font-semibold py-2 px-5 rounded border border-primary-100 transition duration-300 hover:text-white text-sm">
                          View
                        </button>
                      </NavLink>
                    </td>
                    {/* <td className="py-3 px-4  bg-white text-primary-100  rounded-r-lg  shadow-top-bottom-xl">
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
      ) : (
        <Addorganization userId={userId} />
      )}
    </>
  );
}
