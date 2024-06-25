import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Apibackendrequest from '../Pages/Apibackendrequest';
const apiUrl = import.meta.env.VITE_API_URL;
import { BiSolidShow } from 'react-icons/bi';

const OrgDetails = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [orgData, setOrgData] = useState([]);
    useEffect(() => {
       Apibackendrequest(`${apiUrl}/document/verification/data/`)
       .then((res) => {
        setOrgData(res.data.organization_verification);
      })
      }, []);
      console.log(orgData[1])
      
  return (
    <>
        <div className="w-full flex justify-center mt-8">
        <table className="border-separate border-spacing-y-3">
              <thead>
                <tr>
                <td className="text-left w-[140px] md:w-[120px]  lg:w-[140px] xl:w-[280px] truncate font-bold text-black  py-2 sm:px-4 px-1 sm:text-[15px] text-[12px]">
                    Organization:
                  </td>
                   <td className="text-left  min-w-[50px] truncate  font-bold text-black  py-2 sm:px-4 px-1 sm:text-[15px] text-[12px] sm:table-cell hidden">
                    Document Number:
                  </td>
                 
                      <td className="text-left  md:min-w-[100px]  lg:w-[100px] xl:w-[320px] truncate font-bold text-black  py-2 sm:px-4 px-1 sm:text-[15px] text-[12px] sm:table-cell">
                    Address:
                  </td>
                  <td className="sm:text-left text-right font-bold text-black py-2 sm:px-4 px-1 sm:w-auto sm:text-[15px] text-[12px]">
                    View:
                  </td>
                  {/* <td className="text-left font-bold text-black  py-2 px-4">Edit / Delete:</td> */}
                </tr>
              </thead>
    <tbody>
      {orgData.map((organization) => (
        <tr key={organization.organization_id} className=" bg-gray-100">
          <td className={`py-3 sm:px-2 px-1 rounded-l-lg border-l shadow-top-bottom-xl`}>
            <div className="flex justify-start items-center gap-2 w-[300px]">
              <div className="relative">
                <div className="h-12 w-12 lg:w-20 lg:h-20 md:w-16 md:h-16 rounded-full border-[2px] border-primary-100 overflow-hidden">
                  <img
                    src={organization.image}
                    alt="org-logo"
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h2 className="font-semibold sm:text-base w-[140px] md:w-[120px]  lg:w-[140px] xl:w-[280px] truncate text-[12px] text-primary-100">
                {organization.name}
              </h2>
            </div>
          </td>
          <td className={`py-3 sm:px-4 px-1 sm:text-base text-[12px] text-primary-100 font-semibold shadow-top-bottom-xl`}>
            <h1 className="w-[250px] hidden md:block truncate">{organization.document_number}</h1>
          </td>
          <td className={`py-3 w-[350px] sm:px-4 px-1 sm:text-base text-[12px] text-primary-100 font-semibold shadow-top-bottom-xl`}>
            <h1 className=" md:w-[100px] hidden md:block  lg:w-[100px] xl:w-[320px] truncate">
              {organization.area} {organization.city_Name} {organization.state_Name} {organization.pincode}
            </h1>
          </td> 
          <td className={`py-3 sm:px-2 px-1 text-primary-100 rounded-r-lg shadow-top-bottom-xl`}>
            <div className="flex gap-4 justify-start items-center">
              <NavLink
                to={`/verifyOrganization`}
                state={{
                  orgData: orgData,
                  orgId: organization.organization_id
                }}
              >
                <button className="text-white flex gap-1 bg-primary-100 font-semibold py-2 lg:px-6 px-4 rounded border border-primary-100 hover:bg-[#5559af] hover:shadow-sm hover:text-white text-sm">
                  <BiSolidShow className="h-5 w-5" />
                  View
                </button>
              </NavLink>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </>
  )
};

export default OrgDetails