import React, { useContext } from "react";
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
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Dhashboardhome from "./Pages/Dashboard/DashboardHome.jsx";
import Organization from "./Pages/Dashboard/Organization.jsx";
import Vieworganization from "./Pages/Dashboard/Viewemp.jsx";
import Orgoutlet from "./Pages/Dashboard/Orgoutlet.jsx";
import Addorganization from "./Pages/Dashboard/Addorganization.jsx";
import Empoutlet from "./Pages/Dashboard/Empoutlet.jsx";
import Empform from "./Pages/Dashboard/Empform.jsx";
import Passwordgenrate from "./Pages/Passwordgenrate.jsx";
import Passwordotp from "./Pages/Passwordotp.jsx";
import ParentComponent from "./Pages/Parentcomponent.jsx";
import Enpreviewoutlet from "./Pages/Enpreviewoutlet.jsx";
import Post from "./Pages/Dashboard/Post.jsx";
import Personalreview from "./Pages/Personalreview.jsx";
import { UserProvider } from "./Contextfile.jsx";
import { IsverifiedProvider } from "./Isverified.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
import PageNotFound from "./PageNotFound.jsx";
import Address from "./Pages/Dashboard/Address.jsx";
import SearchByAadharCard from "./Pages/Dashboard/SearchByAadharCard.jsx";
import VerifyOrganization from "./AdminPanel/VerifyOrganization.jsx";
import OrgDetails from "./AdminPanel/OrgDetails.jsx"
import ProtectedAadhaarRoute from "./Pages/ProtectedAadhaarRoute.jsx";
import AddEmployee from "./Pages/Dashboard/AddEmployee.jsx";
import PrivateRoute from "./AdminPanel/PrivateRoute.jsx";
import TransactionHistory from "./Payment/TransactionHistory.jsx";
import Subscription from "./Payment/Subscription.jsx";

import Clock from "./Components/Clock.jsx";

// import OrgRepeat from "./Pages/Dashboard/OrgRepeat.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
        <Route path="organization" element={<ParentComponent />}>
          <Route index element={<Addorganization />} />
        </Route>
          {/* <Route path="orgRepeat" element={<OrgRepeat />}></Route> */}
      
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard/>}/>}>
            <Route path="transactionHistory" element={<TransactionHistory />}/>
            <Route path="subscription" element={<Subscription />}/>
          <Route index element={<Dhashboardhome />} />
          <Route path="organization" element={<Orgoutlet />}>
            <Route index element={<Organization />} />
            <Route path="addorganization" element={<Addorganization />} />
            <Route path="employee" element={<Empoutlet />}>
              <Route path=":organization_id" element={<Vieworganization />} />
              <Route path="addemp" element={<Empform />} />
              <Route path="review" element={<Enpreviewoutlet />} >
                <Route index element={<Personalreview />} />
                <Route path="newpost" element={<Post />} />
              </Route>
            </Route>
          </Route>
          <Route path="searchByAadharCard" element={<ProtectedAadhaarRoute element={<SearchByAadharCard />} />} />
          <Route path="addEmployee" element={<AddEmployee />} />
        </Route>
       
      <Route path="/contact" element={<Contact/>} />
      <Route path="/help" element={<Help/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="*" element={<PageNotFound/>} />
      <Route path="/orgDetails" element={<PrivateRoute element={<OrgDetails />} />}/>
      <Route path="/verifyOrganization" element={<VerifyOrganization />}/>
      {/* navbar */}
      </Route>
      <Route path="/login" element={<Loginfile />} />
      <Route path="/verified" element={<Passwordotp />} />
      <Route path="/passgenerate" element={<Passwordgenrate />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/clock" element={<Clock />} />
      <Route path="/address" element={<Address />} />
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IsverifiedProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </IsverifiedProvider>
  </React.StrictMode>
);