import React from 'react'

function Contact() {
  return (
              <div className="bg-zinc-100 min-h-screen">
                <main className="container mx-auto px-4 py-8">
                  <h1 className="text-4xl font-bold mb-6">Contact us</h1>
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white shadow rounded-lg p-6">
                      <img src="https://i.pinimg.com/236x/1d/d8/01/1dd8013f6ac883c35758d59c94771d84.jpg"  alt="Online enquiry" className="w-40 h-40 object-contain rounded-lg mb-4"/>
                      <h2 className="text-xl font-semibold mb-2">Online enquiry</h2>
                      <p className="text-zinc-600 mb-4">We are here to help you with three working days.</p>
                      <button className="bg-primary-100 text-white px-4 py-2 rounded-lg">Send us a message</button>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                      <img src="https://i.pinimg.com/564x/3e/7e/0f/3e7e0f79a73507773d4fea4634950b37.jpg" alt="Call us" className="w-40 h-40 object-cover rounded-lg mb-4"/>
                      <h2 className="text-xl font-semibold mb-2">Call us</h2>
                      <p className="text-zinc-600 mb-4">+44 345 567 7775</p>
                      <p className="text-zinc-600 mb-4">Monday to Friday: 08:00 - 18:00 UK time</p>
                      <p className="text-zinc-600 mb-4">Closed on Wednesday: 11:00 - 12:00 UK time</p>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                      <img src="https://i.pinimg.com/236x/65/c5/ec/65c5ec44268717616785ec1cd6383ac2.jpg" alt="Write to us" className="w-40 h-40 object-cover rounded-lg mb-4"/>
                      <h2 className="text-xl font-semibold mb-2">Write to us</h2>
                      <p className="text-zinc-600 mb-4">British Council Customer Service UK, Bridgewater House, 58 Whitworth Street, Manchester, M1 6BB</p>
                    </div>
                  </div>
              <h2 className="text-2xl font-bold mb-6">Other requests</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Freedom of Information request</h3>
                  <p className="text-zinc-600 mb-4">How to make an FOI request to the British Council.</p>
                  <a href="#" className="text-primary-100 hover:underline">Make information request</a>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Complaint</h3>
                  <p className="text-zinc-600 mb-4">If you have a comment or complaint about our service, let us know.</p>
                  <a href="#" className="text-primary-100 hover:underline">Make a complaint</a>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Fraud concern</h3>
                  <p className="text-zinc-600 mb-4">If you suspect fraud or corruption, please report it to us.</p>
                  <a href="#" className="text-primary-100 hover:underline">Raise a fraud concern</a>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Media enquiry</h3>
                  <p className="text-zinc-600 mb-4">Our press office is available 24 hours a day for urgent media enquiries.</p>
                  <a href="#" className="text-primary-100 hover:underline">Make media enquiry</a>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Your local British Council office</h3>
                  <p className="text-zinc-600 mb-4">Find details for our local British Council offices.</p>
                  <a href="#" className="text-primary-100 hover:underline">Get contact details</a>
                </div>
              </div>
              
              <div className="bg-primary-100 text-white p-8 rounded-lg mb-12">
                <h2 className="text-2xl font-bold mb-4">How helpful were we today?</h2>
                <p className="mb-4">At British Council, your feedback matters! We're committed to providing you with the best experience possible, and we'd love to hear your thoughts.</p>
                <button className="bg-white text-primary-100 px-4 py-2 rounded-lg">Send us a message</button>
              </div>
                </main>
                
                <footer className="bg-zinc-300  py-8">
                  <div className="container mx-auto px-4 grid md:grid-cols-4 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-2">About us</h3>
                      <ul>
                        <li><a href="#" className="hover:underline">Who we are</a></li>
                        <li><a href="#" className="hover:underline">What we do</a></li>
                        <li><a href="#" className="hover:underline">Our history</a></li>
                        <li><a href="#" className="hover:underline">Our Press</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Work with us</h3>
                      <ul>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:underline">Partner with us</a></li>
                        <li><a href="#" className="hover:underline">Staff and alumni portal</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Research and policy insight</h3>
                      <ul>
                        <li><a href="#" className="hover:underline">Our research</a></li>
                        <li><a href="#" className="hover:underline">Policy insights</a></li>
                        <li><a href="#" className="hover:underline">Funding opportunities</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Contact us</h3>
                      <ul>
                        <li><a href="#" className="hover:underline">Contact details</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                        <li><a href="#" className="hover:underline">Feedback</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="container mx-auto px-4 mt-8 text-center text-zinc-500">
                    <p>&copy; 2023 British Council. All rights reserved.</p>
                    <p><a href="#" className="hover:underline">Terms and conditions of use</a> | <a href="#" className="hover:underline">Accessibility</a> | <a href="#" className="hover:underline">Privacy and cookies</a> | <a href="#" className="hover:underline">Sitemap</a></p>
                  </div>
                </footer>
              </div>
  )
}

export default Contact