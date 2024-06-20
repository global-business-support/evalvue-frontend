import { useLocation, useNavigate } from "react-router-dom";
import Addorganization from "./Dashboard/Addorganization";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../Contextfile";
import Apibackendrequest from "./Apibackendrequest";
import Loader from "./Loader";
const apiUrl = import.meta.env.VITE_API_URL;

function ParentComponent() {
  const location = useLocation();
  const {userId}=useContext(UserContext);
  const navigate=useNavigate();
  const [loading, setLoading] = useState(true);
  const [Isorganizationmapped,setIsorganizationmapped]=useState(false);
  const {  is_login_successful } = location.state || {};
  const [error, setError] = useState(null);

  useEffect(()=>{
    Apibackendrequest(`${apiUrl}/organizations/`,{user_id:userId})
    .then(res=>{
      if(res.data){
        setIsorganizationmapped(res.data.is_organization_mapped);
      } else if(res.isexception){
        setError(res.exceptionmessage)
      }
      }).finally(()=>{setLoading(false);});
      
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
    return (
      <>
        <div className="h-[calc(100vh-100px)] flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  }

  if(Isorganizationmapped){return (
    <div >
      {navigate("/dashboard")}
    </div>
  )}else{return(<Addorganization/>)
  }
}

export default ParentComponent;
