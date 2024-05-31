import { NavLink, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Addorganization from "./Addorganization";
import { UserContext } from "../../Contextfile";

export default function Organization() {
  const [Orgdata, setOrgdata] = useState([]);
  const [Isorgmap, setIsorgmap] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(UserContext);
  const header = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  useEffect(() => {
    axios
      .post("https://api.evalvue.com/organizations/", { user_id: userId },header)
      .then((res) => {
        // // console.log(res.data);
        setOrgdata(res.data.organization_list);

        // setOrganization(res.data.organization_list);
        setIsorgmap(res.data.is_organization_mapped);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {Isorgmap ? (
        <div className="px-8 py-6 rounded-lg mx-auto">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl">
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
                  <td className="text-left font-semibold text-gray-600  py-2 px-4">Address:</td>
                  <td className="text-left font-semibold text-gray-600  py-2 px-4">View:</td>
                </tr>
              </thead>
              <tbody className="mt-4 ">
                {Orgdata.map((organization, index) => (
                  <tr
                    key={organization.organization_id}
                    className="hover:bg-blue-gray-50 transition duration-300 bg-white shadow-sm"
                  >
                    <td className="py-3 px-4 flex justify-start items-center gap-2 rounded-l-lg">
                      <div className="h-14 w-14 p-1 rounded-full border-2 border-gray-500">
                        <img
                          src={organization.image}
                          alt=""
                          className="h-full w-full object-contain rounded-full"
                        />
                      </div>
                      <h2 className="font-semibold text-gray-900">
                        {organization.name}
                      </h2>
                    </td>
                    <td className="py-3 px-4 w-2/4 text-gray-700">
                      {organization.area}, {organization.city_name},{" "}
                      {organization.state_name}, {organization.pincode}
                    </td>
                    <td className="py-3 px-4 ">
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
                        <button className="hover:bg-primary-100 text-primary-100 font-semibold py-1 px-3 rounded border border-primary-100 transition duration-300 hover:text-white text-sm">
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
