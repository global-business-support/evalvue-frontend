import React, { useContext, useEffect, useState } from 'react';
import aboutimg from '../assets/images/about-img.jpg'
import { NavLink, useLocation } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
import Apibackendrequest from '../Pages/Apibackendrequest';
import { UserContext } from '../Contextfile';
import Loader from '../Pages/Loader';



const VerifyOrganization = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [org, setOrg] =  useState({});
  const [url, setUrl] = useState('')
  const [isOrganizationVerified, setIsOrganizationVerified] = useState(false)
  const { userId } = useContext(UserContext);

  const location = useLocation();
  const state = location.state;

  useEffect(()=>{

    const organization = state.orgData.filter((org)=>org.organization_id === state.orgId)
    
    setOrg(organization[0])
    setUrl(organization[0].document_file)
    setLoading(false)
  },[])
  console.log(org)
  
  const getImageExtension = (url) => {
    if (!url) return null;
    const lastDotIndex = url.lastIndexOf('.');
    if (lastDotIndex === -1) return null;
    const extension = url.substring(lastDotIndex + 1).toLowerCase();
    return extension;
  };

  const imageExtension = getImageExtension(url);
console.log(imageExtension)
  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  function showpdf() {
    window.open(
      {pdf},
      "_blank"
    );
  }

  function showpdf(url) {
    window.open(
      url,
      "_blank"
    );
  }

  function handleApproveClick(){
    Apibackendrequest(`${apiUrl}/verify/organization/`, {
      user_id : userId,
      organization_id : state.orgId
    })
    .then((res)=>{
      if(res.data){
        if(res.data.is_organization_verified_successfull == true){
          setIsOrganizationVerified(true)
        }
      }
      if(res.isexception){
        console.log(res.exceptionmessage.error)
      }
    })
  }

  if (loading) {
    return (
      <>
        <div className="h-[calc(100vh-200px)] flex justify-center items-center">
          <Loader />
        </div>
      </>
    )
  }
  return (
    <div className="flex justify-center items-center h-full p-5 relative">
      {
        (isOrganizationVerified)?
        <div className="flex items-center justify-center min-h-screen bg-zinc-100">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <button className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 focus:outline-none">
              <span className="sr-only">Close</span>
              <img undefinedhidden="true" alt="close-icon" src="https://openui.fly.dev/openui/24x24.svg?text=✖" />
            </button>
            <div className="flex flex-col items-center">
              <img undefinedhidden="true" alt="checkmark-icon" src="https://openui.fly.dev/openui/64x64.svg?text=✔" className="mb-4" />
              <h2 className="text-2xl font-semibold text-zinc-800 mb-2">Awesome!</h2>
              <p className="text-zinc-600 mb-6">Organization Verified Successfully</p>
              <NavLink 
              to={'/orgDetails'}
              className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none">Back to Unverified Organization List</NavLink>
            </div>
          </div>
        </div>
        :
        
      
        <>
      <div className="h-full w-full">
        <h1 className="p-2 text-2xl text-gray-800 font-semibold text-center mb-5">Verify Organization</h1>
        <div className="overflow-x-auto relative">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-start">Field</th>
                <th className="py-2 px-4 border-b text-start">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm min-w-[200px]">Organization Name</td>
                <td className="py-2 px-4 border-b font-bold  ">{org.name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Document Type</td>
                <td className="py-2 px-4 border-b font-bold">{org.document_name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Organization Sector</td>
                <td className="py-2 px-4 border-b font-bold">{org.sector_name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Organization Listed</td>
                <td className="py-2 px-4 border-b font-bold">{org.listed_name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">GST Number</td>
                <td className="py-2 px-4 border-b font-bold">{org?.gstin}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Number of Employees</td>
                <td className="py-2 px-4 border-b font-bold">{org?.number_of_employees}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Document Number</td>
                <td className="py-2 px-4 border-b font-bold">{org.document_number}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Document Image</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-start">
                    
                    <img
                      src={org.document_file}
                      alt="Preview"
                      className="h-80 w-80 border border-gray-300 rounded-md"
                      onClick={() => {(imageExtension === "pdf")? showpdf(org.document_file) : handleImageClick(org.document_file)}}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Organization Logo</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-start">
                    <img
                      src={org.image}
                      alt="Preview"
                      className="h-36 w-36 border border-gray-300 rounded-md"
                      onClick={() => handleImageClick(org.image)}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b" colSpan="2">
                  <h1 className="font-semibold text-xl">Address</h1>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Address</td>
                <td className="py-2 px-4 border-b font-bold">{org.area}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Country</td>
                <td className="py-2 px-4 border-b font-bold">{org.city_Name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">State</td>
                <td className="py-2 px-4 border-b font-bold">{org.state_Name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">City</td>
                <td className="py-2 px-4 border-b font-bold">{org.city_Name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b sm:text-base text-sm">Pin Code</td>
                <td className="py-2 px-4 border-b font-bold">{org.pincode}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="self-center space-x-5 mt-5">
          <button className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-5 py-2 rounded-lg font-semibold transition ease-in-out" onClick={()=> handleApproveClick()}>
            Approve
          </button>
          <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-lg font-semibold transition ease-in-out">
            Reject
          </button>
          <NavLink
          to={'/orgDetails'}
          className="border border-primary-100 text-primary-100 hover:bg-primary-100 hover:text-white px-5 py-2 rounded-lg font-semibold transition ease-in-out">
            Cancel
          </NavLink>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div className="bg-white p-5 rounded-md">
            
              <img src={modalImage} alt="Modal Preview" className="h-[600px] max-w-[600px]" />
              
          </div>
        </div>
      )}
      </>
      }
    </div>
  );
};

export default VerifyOrganization;
