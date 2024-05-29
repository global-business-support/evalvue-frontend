import React from 'react'

function Services() {
  return (
     <div className=" text-zinc-900 ">
                
     <section className="bg-cover bg-center py-20" >
       <div className="container mx-auto text-center">
         <h1 className="text-4xl font-bold mb-4">IT Solutions for Your Business</h1>
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
               <img src="https://placehold.co/64x64" alt="Corporate Solution" className="w-16 h-16"/>
             </div>
             <h3 className="text-xl font-semibold mb-2">Corporate Solution</h3>
             <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
           </div>
           <div className="bg-zinc-300  p-6 rounded-lg shadow-md">
             <div className="flex justify-center mb-4">
               <img src="https://placehold.co/64x64" alt="Call Center Solutions" className="w-16 h-16"/>
             </div>
             <h3 className="text-xl font-semibold mb-2">Call Center Solutions</h3>
             <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
           </div>
           <div className="bg-zinc-300 p-6 rounded-lg shadow-md">
             <div className="flex justify-center mb-4">
               <img src="https://placehold.co/64x64" alt="Cloud Development" className="w-16 h-16"/>
             </div>
             <h3 className="text-xl font-semibold mb-2">Cloud Development</h3>
             <p>There are many vundefinedtions of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</p>
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
             <h3 className="text-xl font-semibold mb-2">01 - High Quality Hardware</h3>
             <p>We use top-notch hardware to develop the most efficient apps for our customers.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">02 - Dedicated 24/7 Support</h3>
             <p>You can rely on our 24/7 tech support that will gladly solve any app issue you may have.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">03 - 30-Day Money-back Guarantee</h3>
             <p>If you are not satisfied with our apps, we will return your money in the first 30 days.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">04 - Agile and Fast Working Style</h3>
             <p>This type of approach to our work helps our specialists to quickly develop better apps.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">05 - Some Apps are Free</h3>
             <p>We also develop free apps that can be downloaded online without any payments.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">06 - High Level of Usability</h3>
             <p>All our products have high usability allowing users to easily operate the apps.</p>
           </div>
         </div>
       </div>
     </section>
     
     <section className="py-20">
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
     </section>
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
         <p>&copy; 2023 British Council. All rights reserved.</p>
         <p><a href="#" className="hover:underline">Terms and conditions of use</a> | <a href="#" className="hover:underline">Accessibility</a> | <a href="#" className="hover:underline">Privacy and cookies</a> | <a href="#" className="hover:underline">Sitemap</a></p>
       </div>
     </footer>
   </div>
  )
}

export default Services