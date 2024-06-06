import React from 'react'
import { NavLink,Link } from "react-router-dom";
import helpBgImage from '../assets/images/help-center-image.jpg'

function Help() {
    return (
                <div className="min-h-screen bg-zinc-100 p-3 text-zinc-900">
                  
                    <div className="container mx-auto flex justify-between items-center ">
                      <div className="text-2xl font-bold">Help Center</div>
                      <nav className="space-x-4">
                        <a href="#" className="hover:underline">FAQ</a>
                      </nav> 
                    </div>
                  <main className="container mx-auto py-12">
                    <section className="h-[350px] mb-40  relative rounded-xl text-start bg-gradient-to-r from-primary-100">
                      <img src={helpBgImage} alt="" className='absolute right-0 z-[-10] h-full'/>
                      <div className='pt-20 px-10 text-white'>
                      <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
                      <p className="mb-6">Find advice and answers from our support team fast or get in touch</p>
                      <input type="text" placeholder="Search for answers..." className="w-full max-w-lg mx-auto p-4  rounded-lg shadow-lg border border-zinc-300 dark:border-zinc-700"/>
                      </div>
                    </section>
               
                
                <section className="mb-20">
                  <h2 className="text-2xl font-semibold mb-6 text-center">Featured Articles</h2>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border hover:border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl hover:left-1">
                      <span>How does Evalvue work?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <li className="flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border hover:border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl">
                      <span>What information is available on Evalvue?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <li className="flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border hover:border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl">
                      <span>How can Evalvue benefit my company?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <li className="flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border hover:border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl">
                      <span>Is Evalvue secure and confidential?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <li className="flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border hover:border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl">
                      <span>How can I sign up for Evalvue?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <li className="flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border hover:border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl">
                      <span>Is customer support available for Evalvue users?</span>
                      <span className="text-zinc-100 text-2xl ">&rarr;</span>
                    </li>
                  </ul>
                </section>
                
                <section className="text-center mb-12">
                  <h2 className="text-2xl font-semibold mb-4">Didn't find an answer to your question?</h2>
                  <p className="mb-6">Get in touch with us for details on additional services and custom work pricing</p>
                  <Link to='/contact' className="bg-primary-100 text-white px-6 py-3 rounded-lg shadow-lg">Contact Us</Link>
                </section>
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
                    <p>&copy; Evalvue. All rights reserved.</p>
                    <p><a href="#" className="hover:underline">Terms and conditions of use</a> | <a href="#" className="hover:underline">Accessibility</a> | <a href="#" className="hover:underline">Privacy and cookies</a> | <a href="#" className="hover:underline">Sitemap</a></p>
                  </div>
                </footer>
                </div>
    )
}

export default Help