import React from 'react'
import SubServices from './SubServices'
import Footer from '../Footer'
import Tittle from '../../Tittle'
import { NavLink } from 'react-router-dom'

function Services() {
Tittle("Services-Evalvue")
  return (
     <div className=" text-zinc-900 ">
                
     <section className="bg-cover bg-center py-20" >
       <div className="container mx-auto text-center">
         <h1 className="text-4xl font-bold mb-4">Solutions For Your Business</h1>
         {/* <p className="mb-6">Since our establishment, we have been delivering high-quality and sustainable software solutions for corporate business purposes.</p> */}
         <div className="flex justify-center space-x-4">
          
           <NavLink to="/" className="bg-primary-100 text-white py-2 px-4 rounded hover:bg-[#5559af] hover:shadow-sm">Learn More</NavLink>
           <NavLink to="/contact" className=" text-zinc-900 border border-primary-100 py-2 px-4 rounded hover:bg-black transition duration-300 hover:shadow-sm hover:text-white">Get in Touch</NavLink>
         </div>
       </div>
     </section>

     <SubServices />
     
     <section className="bg-primary-100 text-white  py-20 mb-28">
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
             <h3 className="text-xl font-semibold mb-2">03 - Best Organization System</h3>
             <p>Simple, efficient, adaptable, clear categories, intuitive interfaces, easy resource management.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">04 - High Level Of Usability</h3>
             <p>
             High usability means an interface is easy to use, understand, and navigate, with minimal training needed, enhancing user experience and productivity.</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2">05 - Boosted Performance</h3>
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
     
     
     
     <Footer />
   </div>
  )
}

export default Services