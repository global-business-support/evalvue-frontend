import React from 'react'
import Footer from './Footer'
import Tittle from '../Tittle'

function Contact() {
  const handleSendEmail = () => {
    const recipientEmail = 'contact@evalvue.com'; 
    const subject = 'Subject';
    const body = 'Describe your query or concern in details';
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailComposeUrl, '_blank');
  };
  Tittle("Contact Page - Evalvue")
  return (
              <div className="bg-zinc-100 min-h-screen">
                <main className="container mx-auto px-4 py-8">
                  <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-bglight-100 shadow- rounded-lg p-6">
                      <img src="https://i.pinimg.com/236x/1d/d8/01/1dd8013f6ac883c35758d59c94771d84.jpg"  alt="Online enquiry" className="w-40 h-40 object-contain rounded-lg mb-4"/>
                      <h2 className="text-xl font-semibold mb-2">Online Enquiry</h2>
                      <p className="text-zinc-600 mb-4">We are here to help you with three working days.</p>
                      <button className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-[#5559af] hover:shadow-sm"
                        onClick={handleSendEmail}  >
                        Send us a message
                      </button>
                    </div>
                    <div className="bg-bglight-100 shadow rounded-lg p-6">
                      <img src="https://i.pinimg.com/564x/3e/7e/0f/3e7e0f79a73507773d4fea4634950b37.jpg" alt="Call us" className="w-40 h-40 object-cover rounded-lg mb-4"/>
                      <h2 className="text-xl font-semibold mb-2">Call Us</h2>
                      <p className="text-zinc-600 mb-4">(+91) 6263767770</p>
                      <p className="text-zinc-600 mb-4">Monday to Friday: 9am to 9pm </p>
                      <p className="text-zinc-600 mb-4">Closed on Saturday and Sunday</p>
                    </div>
                    <div className="bg-bglight-100 shadow rounded-lg p-6">
                      <img src="https://i.pinimg.com/236x/65/c5/ec/65c5ec44268717616785ec1cd6383ac2.jpg" alt="Write to us" className="w-40 h-40 object-cover rounded-lg mb-4"/>
                      <h2 className="text-xl font-semibold mb-2">Write To Us</h2>
                      <p className="text-zinc-600 mb-4">Email: contact@evalvue.com</p>
                      <p className="text-zinc-600 mb-4">Global Bussiness Support, 518, 5th Floor Shagun Tower, Above Apna Sweet Vijay Nagar, Indore (M.P)</p>
                    </div>
                  </div>
              <h2 className="text-2xl font-bold mb-6">Another Requests</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-bglight-100 shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Complaint</h3>
                  <p className="text-zinc-600 mb-4">If you have a comment or complaint about our service, let us know.</p>
                  {/* <a href="#" className="text-primary-100 hover:underline">Make a complaint</a> */}
                </div>
                <div className="bg-bglight-100 shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Documents</h3>
                  <p className="text-zinc-600 mb-4">If you need any documents or have questions about your documentation, let us know.</p>
                  {/* <a href="#" className="text-primary-100 hover:underline"> Request a document</a> */}
                </div>
                <div className="bg-bglight-100 shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2"> Policy Related</h3>
                  <p className="text-zinc-600 mb-4">If you have any questions or comments about our policies, we are here to help.</p>
                  {/* <a href="#" className="text-primary-100 hover:underline"> Ask about policies</a> */}
                </div>
                <div className="bg-bglight-100 shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Services Related</h3>
                  <p className="text-zinc-600 mb-4">Services Related If you have inquiries or issues related to our services, please contact us.</p>
                  {/* <a href="#" className="text-primary-100 hover:underline">Service inquiry</a> */}
                </div>
              </div>
              
              <div className="bg-primary-100 text-white p-8 rounded-lg mb-12">
                <h2 className="text-2xl font-bold mb-4">How helpful were we today?</h2>
                <p className="mb-4">At evalvue.com, your feedback matters! We're committed to providing you with the best experience possible, and we'd love to hear your thoughts.</p>
                <button className="bg-white text-primary-100 px-4 py-2 rounded-lg hover:text-black"
                  onClick={handleSendEmail}  >
                  Send us a message
                </button>
              </div>
                </main>
                <Footer />
              </div>
  )
}

export default Contact