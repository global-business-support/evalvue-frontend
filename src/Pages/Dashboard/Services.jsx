import React from 'react'
function Services() {
  return (
     <div className=" text-zinc-900 ">
                
     <section className="bg-cover bg-center py-20" >
       <div className="container mx-auto text-center">
         <h1 className="text-4xl font-bold mb-4">Solutions for Your Business</h1>
         <p className="mb-6">Since our establishment, we have been delivering high-quality and sustainable software solutions for corporate business purposes.</p>
         <div className="flex justify-center space-x-4">
           <a href="#" className="bg-primary-100 text-white py-2 px-4 rounded">Learn More</a>
           <a href="#" className=" text-zinc-900 border border-primary-100 py-2 px-4 rounded">Get in Touch</a>
         </div>
       </div>
     </section>
     
     <section className="py-20">
       <div className="container mx-auto text-center">
         <h2 className="text-3xl font-bold mb-10">Our Services</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-zinc-300  p-6 rounded-lg shadow-md">
             <div className="flex justify-center mb-4">
               <img src="https://as2.ftcdn.net/v2/jpg/07/71/17/43/1000_F_771174329_OuYsd44S6Vw5HcH7h1bq3OcE5TJoAsxS.jpg" alt="Corporate Solution" 
               className="w-16 h-16 rounded-full"/>
             </div>
             <h3 className="text-xl font-semibold mb-2">Employees Accomplishment</h3>
             <p>We track and recognize individual achievements, providing a platform for rewarding exceptional performance and milestones.</p>
           </div>
           <div className="bg-zinc-300  p-6 rounded-lg shadow-md">
             <div className="flex justify-center mb-4">
               <img src="https://img.freepik.com/free-vector/flat-design-online-games-addiction-concept_23-2148526602.jpg?t=st=1717673431~exp=1717677031~hmac=cd799d5f75b738887398d600e8d0e4557754b19e78bf8c1d1be0f857ef88e77a&w=740" alt="Call Center Solutions" 
               className="w-16 h-16 rounded-full"/>
             </div>
             <h3 className="text-xl font-semibold mb-2">Remove Fake Experiences</h3>
             <p>We helps in maintaining the integrity of employee records by detecting and eliminating fraudulent job history entries, ensuring accurate and trustworthy data for better decision-making.</p>
           </div>
           <div className="bg-zinc-300 p-6 rounded-lg shadow-md">
             <div className="flex justify-center mb-4">
               <img src="https://img.freepik.com/premium-vector/applause-ovation-claps-winner-business-man-with-gold-medal-waving-his-hands-audience_284092-1918.jpg?w=740" alt="Cloud Development" 
               className="w-16 h-16 rounded-full"/>
             </div>
             <h3 className="text-xl font-semibold mb-2">Show Good Employees</h3>
             <p>We highlights the top-performing staff based on performance metrics and feedback, enabling managers to recognize and reward excellence within the organization.</p>
           </div>
         </div>
         <div className="mt-10">
           <a href="#" className="bg-primary-100 text-white py-2 px-4 rounded">See All Services</a>
         </div>
       </div>
     </section>
     
     <section className="bg-primary-100 text-white  py-20">
       <div className="container mx-auto text-center">
         <h2 className="text-3xl font-bold underline underline-offset-2 mb-10">Why Choose Us</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div>
             <h3 className="text-xl font-semibold mb-2">01 - End-to-End Data Encryption</h3>
             <p>
             End-to-end data encryption ensures data is encrypted on the sender's device and decrypted only on the recipient's device, preventing any intermediary access.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">02 - Dedicated 24/7 Support</h3>
             <p>Dedicated 24/7 support provides round-the-clock assistance for prompt issue resolution and reliable customer service. </p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">03 - Best organization system</h3>
             <p>Best organization system: Simple, efficient, adaptable; clear categories, intuitive interfaces, easy resource management.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">04 - High level of usability</h3>
             <p>
             High usability means an interface is easy to use, understand, and navigate, with minimal training needed, enhancing user experience and productivity.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">05 - Boosted performance</h3>
             <p>Boosted performance means making a website faster, easier to navigate, and better organized, both in content and behind the scenes.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">06 -  Scalability</h3>
             <p>Our organization is designed to grow with your needs, ensuring seamless 
                performance and responsiveness as your user base expands.</p>
           </div>
         </div>
       </div>
     </section>
     
     {/* <section className="py-20">
       <div className="container mx-auto text-center">
         <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
           <div className="flex items-center justify-center">
             <img src="https://placehold.co/200x200" alt="10 Years Of Experience" className="w-48 h-48"/>
           </div>
           <div>
             <h3 className="text-3xl font-bold mb-4">10 Years Of Experience</h3>
             <ul className="text-left space-y-2">
               <li><strong>2K</strong> Apps Developed</li>
               <li><strong>40</strong> Consultants</li>
               <li><strong>160</strong> Employers</li>
             </ul>
           </div>
         </div>
       </div>
     </section> */}
     <footer className="bg-zinc-300 text-zinc-700  py-8">
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
         <p>&copy; 2024 Evalvue. All rights reserved.</p>
         <p><a href="#" className="hover:underline">Terms and conditions of use</a> | <a href="#" className="hover:underline">Accessibility</a> | <a href="#" className="hover:underline">Privacy and cookies</a> | <a href="#" className="hover:underline">Sitemap</a></p>
       </div>
     </footer>
   </div>
  )
}

export default Services