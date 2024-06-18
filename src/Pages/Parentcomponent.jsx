import { useLocation, useNavigate } from "react-router-dom";
import Addorganization from "./Dashboard/Addorganization";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../Contextfile";
import Apibackendrequest from "./Apibackendrequest";
const apiUrl = import.meta.env.VITE_API_URL;

function ParentComponent() {
  const location = useLocation();
  const {userId}=useContext(UserContext);
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [Isorganizationmapped,setIsorganizationmapped]=useState(false);
  const {  is_login_successful } = location.state || {};

  useEffect(()=>{

    Apibackendrequest(`${apiUrl}/organizations/`,{user_id:userId})
    .then(res=>{
      if(res.data){
        setIsorganizationmapped(res.data.is_organization_mapped);
      } else if(res.isexception){
        console.log(res.exceptionmessage)
      }
      })
      
      setLoading(false);

    // axios.post(`${apiUrl}/organizations/`,{user_id:userId})
    // .then(res=>{
    //   setIsorganizationmapped(res.data.is_organization_mapped);
    // })
    // .catch(err=>{
    //   // console.log(err);
    // })
    // .finally(() => {
    //   setLoading(false);
    // });
  },[userId])
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      {Isorganizationmapped?navigate("/dashboard"):<Addorganization/>}

    </div>
  );
}

export default ParentComponent;
