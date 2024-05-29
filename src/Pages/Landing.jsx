
function Landing() {
  return (

     <>
     
     <div className="bg-white text-zinc-800">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">Optimize Your Operations with Our Employee Solutions</h1>
                        <p className="text-zinc-600">We provide comprehensive solutions that allow companies to seamlessly integrate their own employees, manage their performance, and gather insightful reviews. Our tailored services are designed to enhance efficiency, foster collaboration, and drive growth. Partner with us to streamline your operations, boost employee engagement, and achieve unparalleled success. .</p>
                        <div className="flex gap-6 pt-8">
                            <a href="#" className="bg-primary-100  text-white px-6 py-2 rounded-md">Join Now</a>
                            <a href="#" className="bg-transparent border text-primary-100 border-primary-100 hover:bg-zinc-100 px-6 py-2 rounded-md">Check Our Intro Video</a>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/564x/5b/6f/84/5b6f84ae598450a2ed19bcb9371c3b71.jpg" alt="Digital Agency" className="rounded-lg  h-[500px] shadow-lg"/>
                    </div>
                </div>
            </div>
        
            
            <div className="bg-zinc-100 py-5 mt-5 mb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-[60px] justify-center gap-10 ">
                        <img src="https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png?t=1631949260" alt="Palm Marina" className="mx-4 filter grayscale "/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" alt="utoPix" className="mx-4 filter grayscale"/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png" alt="SMARTICO" className="mx-4 filter grayscale"/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png" alt="SAUTER" className="mx-4 filter grayscale"/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Paytm_logo.jpg" alt="minimal" className="mx-4 filter grayscale"/>
                    </div>
                </div>
            </div>
        
       

{/* plan section */}

        <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
            <h2 className="text-center text-3xl font-bold text-zinc-800  mb-4">Find the <span className="text-blue-600">Right Plan</span>.</h2>
            <p className="text-center text-zinc-600  mb-8">Create your own website with the fastest page building platform.</p>
            <div className="flex justify-center items-center mb-8">
              <span className="mr-2 text-zinc-600 ">Billed yearly</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer"/>
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none  dark:peer-focus:ring-primary-100 rounded-full peer dark:bg-zinc-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-300 peer-checked:bg-primary-100"></div>
              </label>
              <span className="ml-2 text-zinc-600 ">Billed monthly</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-primary-100 text-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Professional</h3>
                <p className="text-2xl font-bold mb-4">$19.99</p>
                <ul className="mb-6">
                  <li className="flex items-center mb-2">
                    <img undefinedhidden="true" alt="check" src="/icons/check.svg" className="w-4 h-4 mr-2"/>
                    1 User
                  </li>
                  <li className="flex items-center mb-2">
                    <img undefinedhidden="true" alt="check" src="/icons/check.svg" className="w-4 h-4 mr-2"/>
                    10 TB of secure storage
                  </li>
                  <li className="flex items-center mb-2">
                    <img undefinedhidden="true" alt="check" src="/icons/check.svg" className="w-4 h-4 mr-2"/>
                    Premium productivity features and simple, secure file sharing
                  </li>
                </ul>
                <button className="bg-white text-primary-100 font-bold py-2 px-4 rounded-lg">Try free for 30 days</button>
              </div>
              
              <div className="bg-white dark:bg-zinc-200 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Standard</h3>
                <p className="text-2xl font-bold mb-4">$29.99</p>
                <ul className="mb-6">
                  <li className="flex items-center mb-2">
                    <img undefinedhidden="true" alt="check" src="/icons/check.svg" className="w-4 h-4 mr-2"/>
                    5 Users
                  </li>
                  <li className="flex items-center mb-2">
                    <img undefinedhidden="true" alt="check" src="/icons/check.svg" className="w-4 h-4 mr-2"/>
                    50 TB of secure storage
                  </li>
                  <li className="flex items-center mb-2">
                    <img undefinedhidden="true" alt="check" src="/icons/check.svg" className="w-4 h-4 mr-2"/>
                    Premium productivity features and simple, secure file sharing
                  </li>
                </ul>
                <button className="bg-primary-100 text-white font-bold py-2 px-4 rounded-lg">Try free for 30 days</button>
              </div>
              
              <div className="bg-white dark:bg-zinc-200 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Ultimate</h3>
                <p className="text-2xl font-bold mb-4">$99.99</p>
                <ul className="mb-6">
                  <li className="flex items-center mb-2">
                    <img undefinedhidden="true" alt="check" src="/icons/check.svg" className="w-4 h-4 mr-2"/>
                    Unlimited Users
                  </li>
                  <li className="flex items-center mb-2">
                    <img undefinedhidden="true" alt="check" src="/icons/check.svg" className="w-4 h-4 mr-2"/>
                    Unlimited secure storage
                  </li>
                  <li className="flex items-center mb-2">
                    <img undefinedhidden="true" alt="check" src="/icons/check.svg" className="w-4 h-4 mr-2"/>
                    Premium productivity features and simple, secure file sharing
                  </li>
                </ul>
                <button className="bg-primary-100 text-white font-bold py-2 px-4 rounded-lg">Try free for 30 days</button>
              </div>
            </div>
          </div>
        </div>

{/* after plan */}
        <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <img src="https://img.indiafilings.com/learn/wp-content/uploads/2015/07/12011038/starting-a-business-in-India-for-foreign-company-1024x683.jpg" alt="Integrated Digital Agency" className="rounded-lg shadow-lg"/>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-zinc-900">We Are Fully Integrated Digital Agency</h2>
                            <p className="text-zinc-600 pb-5">With a comprehensive approach to crafting solutions, we ensure that your business stands out in the digital marketplace. Our strategies are designed to meet the unique needs of our clients.</p>
                            <a href="#" className="bg-primary-100 mt-5 hover:bg-red-600 text-white px-6 py-2 rounded-md">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* footer section */}
        <div className="bg-zinc-100 text-zinc-600 py-10 px-5 md:px-20">
            <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
                <div>
                    <h6 className="text-lg font-semibold text-zinc-800 mb-4">Company</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-zinc-800">About Us</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Press</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Support</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-lg font-semibold text-zinc-800 mb-4">Clonables</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-zinc-800">All Products</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Templates</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Assets</a></li>
                        <li><a href="#" className="hover:text-zinc-800">UI Kits</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-lg font-semibold text-zinc-800 mb-4">Resources</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-zinc-800">Learning Center</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Promotion</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Integration</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Videos</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Submit</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-lg font-semibold text-zinc-800 mb-4">Store</h6>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-zinc-800">View the Store</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Forest UI Kit</a></li>
                        <li><a href="#" className="hover:text-zinc-800">Orbs Template</a></li>
                    </ul>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <h6 className="text-lg font-semibold text-zinc-800 mb-4">Follow our Socials</h6>
                    <div className="flex space-x-4">
                        <a href="#" className="text-zinc-600 hover:text-zinc-800"><img src="https://placehold.co/20x20/twitter" alt="Twitter"/></a>
                        <a href="#" className="text-zinc-600 hover:text-zinc-800"><img src="https://placehold.co/20x20/facebook" alt="Facebook"/></a>
                        <a href="#" className="text-zinc-600 hover:text-zinc-800"><img src="https://placehold.co/20x20/instagram" alt="Instagram"/></a>
                    </div>
                </div>
            </div>
            <div className="text-center text-zinc-500 mt-10">
                <p>Copyright © 2020 Flowbase - Powered by Webflow</p>
                <p className="mt-1">
                    <a href="#" className="hover:text-zinc-800">Privacy Policy</a> | 
                    <a href="#" className="hover:text-zinc-800">Affiliate Notice</a> | 
                    <a href="#" className="hover:text-zinc-800">Press Kit</a>
                </p>
            </div>
        </div>
        
             
       
        </>
  )
}

export default Landing