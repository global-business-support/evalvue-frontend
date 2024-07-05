import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Apibackendrequest from '../Pages/Apibackendrequest';
const apiUrl = import.meta.env.VITE_API_URL;
import { BiSolidShow } from 'react-icons/bi';
import Loader from '../Pages/Loader';

const OrgDetails = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [orgData, setOrgData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filterVerified, setFilteredVerified] = useState([]);
    const [filterRejected, setFilteredRejected] = useState([]);
    const [filterPending, setFilteredPending] = useState([]);
    const [filterType, setFilterType] = useState('');
    
    useEffect(() => {
        Apibackendrequest(`${apiUrl}/document/verification/data/`)
            .then((res) => {
                if (res.data) {
                    setOrgData(res.data.organization_verification);
                }
                if (res.isexception) {
                    setError(res.exceptionmessage.error)
                };
            })
            .catch((err) => {
                setError(err);
            }).finally(() => { setLoading(false) });
    }, []);


    const handleVerified = () => {
        const verifiedItems = orgData.filter(item => item.verified === true);
        setFilteredVerified(verifiedItems);
        setFilterType('verified');
    };
    const handleRejected = () => {
        const rejectedItems = orgData.filter(item => item.rejected == true);
        setFilteredRejected(rejectedItems);
        setFilterType('rejected');
    };
    const handlePending = () => {
        const pendingItems = orgData.filter(item => (item.rejected == false) && (item.verified == false));
        setFilteredPending(pendingItems);
        setFilterType('pending');
    };
    useEffect(() => {
        setFilteredData(filterVerified);
    }, [filterVerified]);
    useEffect(() => {
        setFilteredData(filterRejected);
    }, [filterRejected]);
    useEffect(() => {
        setFilteredData(filterPending);
    }, [filterPending]);

    useEffect(() => {
        let filteredResults = [];
        if (filterType === 'verified') {
            filteredResults = filterVerified.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (filterType === 'rejected') {
            filteredResults = filterRejected.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (filterType === 'pending') {
            filteredResults = filterPending.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            filteredResults = orgData.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredData(filteredResults);
    }, [searchTerm, filterVerified, filterRejected, filterPending, filterType, orgData]);

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
        return (<div>
            <h1 className="text-red-500 text-lg align-middle">{error}</h1>
        </div>)
    }

    return (
        <>
            <div className='flex justify-center'>
                <button onClick={handleVerified} className='bg-green-800 px-2 mx-4 mt-1 text-white rounded'>Verified</button>
                <button onClick={handlePending} className='bg-primary-100 px-2 mx-4 mt-1 text-white rounded'>Pending</button>
                <button onClick={handleRejected} className='bg-red-800 px-2 mx-4 mt-1 text-white rounded'>Rejected</button>
            </div>
            <div className='w-full flex justify-center mt-8'>
                <div className=''>
                    <input
                        type="text"
                        placeholder="Search by organization name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <table className="border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <td className="text-left w-[50px] md:w-[80px]  lg:w-[140px] xl:w-[280px] truncate font-bold text-black  py-2 sm:px-4 px-1 sm:text-[18px] text-[18px]">
                                Organization
                            </td>
                            <td className="text-left  min-w-[50px] truncate  font-bold text-black  py-2 sm:px-4 px-1 sm:text-[18px] text-[12px] md:table-cell hidden">
                                Document Number
                            </td>

                            <td className="text-left  md:min-w-[100px]  lg:w-[100px] xl:w-[320px] truncate font-bold text-black  py-2 sm:px-4 px-1 sm:text-[18px] text-[12px] md:table-cell hidden">
                                Address
                            </td>
                            <td className="sm:text-left text-right font-bold text-black py-2 sm:px-4 px-1 sm:w-auto sm:text-[18px] text-[12px] md:table-cell hidden">
                                View
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((organization) => (
                            <tr key={organization.organization_id} className=" bg-gray-100">
                                <td className={`py-3 sm:px-2 px-1 rounded-l-lg border-l shadow-top-bottom-xl`}>
                                    <div className="flex justify-start items-center gap-2 lg:w-[300px]">
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
                                    <h1 className="w-[250px] hidden md:block truncate">
                                        {organization.document_number}
                                    </h1>
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
                                            <button className={`text-white flex gap-1 ${(organization.rejected && "bg-red-800") || (organization.verified && "bg-green-800") || "bg-primary-100"} font-semibold py-2 lg:px-6 px-4 rounded hover:shadow-sm text-sm`}>
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