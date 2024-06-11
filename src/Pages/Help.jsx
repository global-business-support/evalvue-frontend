import React from 'react'
import { NavLink,Link } from "react-router-dom";
import helpBgImage from '../assets/images/help-center-image.jpg'
import Footer from './Footer';
import Tittle from '../Tittle';

function Help() {
  Tittle("Help page - Evalvue")
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
                  <Footer />
                </div>
    )
}

export default Help