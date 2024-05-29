import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Loginfile from "./Components/Loginfile.jsx";
import Registration from "./Components/Registration.jsx";
import Landing from "./Pages/Landing.jsx";
import Contact from "./Pages/Contact.jsx";
import Help from "./Pages/Help.jsx";
import About from "./Pages/About.jsx";
import Services from "./Pages/Dashboard/Services.jsx";
import Employee from "./Pages/Dashboard/TermsAndCondition.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Dhashboardhome from "./Pages/Dashboard/DashboardHome.jsx";
import Organization from "./Pages/Dashboard/Organization.jsx";
import Vieworganization from "./Pages/Dashboard/Viewemp.jsx";
import Orgoutlet from "./Pages/Dashboard/Orgoutlet.jsx";
import Addorganization from "./Pages/Dashboard/Addorganization.jsx";
import Empoutlet from "./Pages/Dashboard/Empoutlet.jsx";
import Empform from "./Pages/Dashboard/Empform.jsx";
import Protected from "./Components/Protected.jsx";
import Passwordgenrate from "./Pages/Passwordgenrate.jsx";
import Passwordotp from "./Pages/Passwordotp.jsx";
import ParentComponent from "./Pages/Parentcomponent.jsx";
import Enpreviewoutlet from "./Pages/Enpreviewoutlet.jsx";
import Post from "./Pages/Dashboard/Post.jsx";
import Personalreview from "./Pages/Personalreview.jsx";
import CompanyList from "./CompanyList.jsx";
import { UserProvider } from "./Contextfile.jsx";
import { OrganizationProvider } from "./Pages/Dashboard/OrganizationContext.jsx";
import { IsverifiedProvider } from "./Isverified.jsx";
import TermsAndCondition from "./Pages/Dashboard/TermsAndCondition.jsx";
import SearchByAadharCard from "./Pages/Dashboard/SearchByAadharCard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
        {/* <Route index element={<Loginfile />} /> */}
        <Route path="organization" element={<ParentComponent />}>
          <Route index element={<Addorganization />} />
        </Route>
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/company" element={<CompanyList />} /> */}
        {/* <Route path="/help" element={<Help />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Dhashboardhome />} />
           <Route path="organization" element={<Orgoutlet />}>
           
            <Route index element={<Organization />} />
          
            {/* bg-[#23517823] */}

            <Route path="addorganization" element={<Addorganization />} />
            <Route path="employee" element={<Empoutlet />}>
              <Route path=":organization_id" element={<Vieworganization />} />
              <Route path="addemp" element={<Empform />} />
              <Route path="review" element={<Enpreviewoutlet />} >
              <Route index element={<Personalreview/>} />
              <Route path="newpost" element={<Post/>}/>
              </Route>
              {/* <Route path="review" element={<Enpreview/>}/> */}
            </Route>
           
          {/* <Route path='/dashboard/termsAndCondition' element={<TermsAndCondition />} /> */}
          {/* <Route path='/dashboard/privacy' element={<Privacy />} /> */}
          {/* <Route path='/dashboard/help' element={<Help />} /> */}
        </Route>
          {/* <Route path='/dashboard/searchByAadharCard' element={<SearchByAadharCard/>} /> */}
        {/* <Route path='/register' element={<Registration/>} /> */}
      </Route>
      </Route>
      <Route path="/login" element={<Loginfile />} />
      {/* <Route path="/forgotpassword" element={<Passwordotp />} /> */}
      <Route path="/verified"  element={<Passwordotp/>} />
      <Route path="/passgenerate" element={<Passwordgenrate />} />
      <Route path="/register" element={<Registration />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IsverifiedProvider>
    <UserProvider>
    <OrganizationProvider>
    <RouterProvider router={router} />
    </OrganizationProvider>
    </UserProvider>
    </IsverifiedProvider>
  </React.StrictMode>
);
