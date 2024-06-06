import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Addorganization from "./Addorganization";
import { UserContext } from "../../Contextfile";
import Loader from '../Loader'

export default function Organization() {
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
          <div className="mb-3  flex justify-center items-start mt-14 overflow-y-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <td className="text-left font-semibold text-gray-600  py-2 px-4">
                    Organization:
                  </td>
                  <td className="text-left font-semibold text-gray-600  py-2 px-4">Document Number:</td>
                  <td className="text-left font-semibold text-gray-600  py-2 px-4">Address:</td>
                  <td className="text-left font-semibold text-gray-600  py-2 px-4">View:</td>
                </tr>
              </thead>
              <tbody className="mt-4 ">
                {Orgdata.map((organization, index) => (
                  <tr
                    key={organization.organization_id}
                    className="lg:px-6 sm:px-2"
                  >
                    <td className="py-3 px-4 w-[25%] bg-white rounded-l-lg border-l border-t border-b border-gray-400 shadow-top-bottom-xl">
                      <div className="flex justify-start items-center gap-2">
                      <div className="relative">
                        <div className="h-14 w-14 rounded-full border border-gray-500 overflow-hidden">
                          <img
                            src={organization.image}
                            alt=""
                            className="h-full w-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <h2 className="font-semibold text-gray-700">
                        {organization.name}
                      </h2>
                      </div>
                    </td>
                    <td className="py-3 px-4 w-[18%] bg-white text-gray-700 border-t border-b border-gray-400 shadow-top-bottom-xl">
                      810346564
                    </td>
                    <td className="py-3 px-4  bg-white text-gray-700  text-gray-700 border-t border-b border-gray-400 shadow-top-bottom-xl">
                      {organization.area}, {organization.city_name},{" "}
                      {organization.state_name}, {organization.pincode}
                    </td>
                    <td className="ml-10 py-3 px-4 w-[10%] bg-white rounded-r-lg text-gray-700 border-r border-t border-b border-gray-400 shadow-top-bottom-xl">
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
                        <button className=" hover:bg-primary-100 text-primary-100 font-semibold py-1 px-3 rounded border border-primary-100 transition duration-300 hover:text-white text-sm">
                          View
                        </button>
                      </NavLink>
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
