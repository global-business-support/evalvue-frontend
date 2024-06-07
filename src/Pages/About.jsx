import aboutImg from '../assets/images/about-img.jpg';
import aboutMission1 from '../assets/images/about-mission1.jpg';
import aboutMission2 from '../assets/images/about-mission2.jpg';
import aboutMission3 from '../assets/images/about-mission3.jpg';
import aboutVision4 from '../assets/images/about-vision4.jpg';
import aboutVision2 from '../assets/images/about-vision2.avif';
import aboutVision3 from '../assets/images/about-vision3.jpg';
function About() {
  return (
              <>
              
             <div className="p-3">

             <section className="h-[350px] lg:w-[90%] mx-auto m-4 relative rounded-xl text-start bg-gradient-to-r from-primary-100">
                      <img src={aboutImg} alt="about-img" className='absolute right-0 z-[-10] h-full'/>
                      <div className='pt-20 px-10 lg:w-[50%]  text-white'>
                      <h1 className="text-6xl font-bold mb-4">About Us</h1>
                      <p className="mb-6">Welcome to evalvue where employee feedback meets innovations, we are dedicated to transforming
                     the way companies understand and engage with their workforce. At evalvue we believe that every
                     voice matters and that constructive feedback is the cornerstone of a thriving workplace.</p>
                      </div>
              </section>
              
              {/* <section className=" py-16 bg-slate-500">
                <div className="container p-6 font-bold text-white rounded mx-auto text-center bg-gradient-to-tr from-primary-100">
                  <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
                  <p className="text-zinc-600 text-"> Welcome to evalvue where employee feedback meets innovations, we are dedicated to transforming
                     the way companies understand and engage with their workforce. At evalvue we believe that every
                     voice matters and that constructive feedback is the cornerstone of a thriving workplace.</p>
                </div>
              </section> */}
              
              <section className="py-16">
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 ">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-zinc-600 text-justify mr-4 dark:text-zinc-400">Empower everyone through exemplary employees by contrasting good employees with bad ones.
                       We add worldwide companies to assist in selecting the right employees, ensuring that each
                       organization is equipped with top talent to drive success. Moreover, we recognize that talent knows
                      no borders. By partnering with a diverse array of global companies, we expand the pool of
                      opportunities and resources available for organizations seeking to attract top talent. Whether it's
                      through targeted recruitment strategies, talent development initiatives, or access to specialized
                      expertise, our aim is to ensure that every organization is equipped with the best possible talent to
                      drive success.
                    </p>
                  </div>
                  <div className="md:w-1/2 grid grid-cols-2 gap-4">
                    <img src={aboutMission1} alt="Mission Image 1" className="w-[300px] h-[200px] rounded"/>
                    <img src={aboutMission2} alt="Mission Image 2" className="w-[300px] h-[200px] rounded"/>
                    <img src={aboutMission3} alt="Mission Image 3" className="w-[300px] h-[200px] rounded"/>
                  </div>
                </div>
              </section>

              <section className="py-16">
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 grid grid-cols-2 gap-4">
                    <img src={aboutVision4} alt="Mission Image 1" className="w-[300px] h-[200px] rounded"/>
                    <img src={aboutVision3} alt="Mission Image 2" className="w-[300px] h-[200px] rounded"/>
                    <div className='w-[300px] h-[200px] bg-white'></div>
                    <img src={aboutVision2} alt="Mission Image 3" className="w-[300px] h-[200px] rounded"/>
                  </div>
                  <div className="md:w-1/2 ml-4">
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-zinc-600 text-justify dark:text-zinc-400">
                      At Evalvue, our vision is to promote transparency and authenticity in the workplace. Our goal is to create a platform where companies can post reviews of their employees' performance when they leave a job, allowing potential employers to clearly see their identity and work experience when applying for a new position. Through Evalvue, we make it possible to identify individuals who provide fake experience, as their actual work history is displayed on our platform. Additionally, we provide ratings for good employees based on their work methods and background, showcasing their exceptional performance. We aim to build a platform that helps employers make informed and accurate hiring decisions while giving employees the opportunity to demonstrate their true potential. Through Evalvue, we strive to create a transparent, reliable, and fair job market for all.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* <section className="bg-zinc-200  py-16">
                <div className="container mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-8 underline">Meet Our Leaders</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <img src="https://placehold.co/150x150" alt="Leader 1" className="rounded-full mx-auto mb-4"/>
                      <h3 className="text-xl font-bold">Jonathan Warner</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">CEO</p>
                    </div>
                    <div className="text-center">
                      <img src="https://placehold.co/150x150" alt="Leader 2" className="rounded-full mx-auto mb-4"/>
                      <h3 className="text-xl font-bold">Tammy Johnson</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">CEO</p>
                    </div>
                    <div className="text-center">
                      <img src="https://placehold.co/150x150" alt="Leader 3" className="rounded-full mx-auto mb-4"/>
                      <h3 className="text-xl font-bold">David Hackett</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">CEO</p>
                    </div>
                    <div className="text-center">
                      <img src="https://placehold.co/150x150" alt="Leader 4" className="rounded-full mx-auto mb-4"/>
                      <h3 className="text-xl font-bold">Pamela Wagner</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">CEO</p>
                    </div>
                  </div>
                  <button className="mt-8 bg-primary-100 text-white px-4 py-2 rounded">View the team</button>
                </div>
              </section> */}
              
              {/* <section className="py-16">
                <div className="container mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-8">We're Hiring!</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex justify-between items-center bg-indigo-200 p-4 rounded">
                      <div>
                        <h3 className="text-xl font-bold">Product Designer</h3>
                        <p className="text-zinc-700">Locations: New York, Dallas, Los Angeles, Denver, Chicago, Sao Paolo, San Francisco</p>
                      </div>
                      <button className="bg-primary-100 text-white px-4 py-2 rounded">Apply</button>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-200 p-4 rounded">
                      <div>
                        <h3 className="text-xl font-bold">Product Designer</h3>
                        <p className="text-zinc-700">Locations: New York, Dallas, Los Angeles, Denver, Chicago, Sao Paolo, San Francisco</p>
                      </div>
                      <button className="bg-primary-100 text-white px-4 py-2 rounded">Apply</button>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-200 p-4 rounded">
                      <div>
                        <h3 className="text-xl font-bold">Product Designer</h3>
                        <p className="text-zinc-700">Locations: New York, Dallas, Los Angeles, Denver, Chicago, Sao Paolo, San Francisco</p>
                      </div>
                      <button className="bg-primary-100 text-white px-4 py-2 rounded">Apply</button>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-200 p-4 rounded">
                      <div>
                        <h3 className="text-xl font-bold">Product Designer</h3>
                        <p className="text-zinc-700">Locations: New York, Dallas, Los Angeles, Denver, Chicago, Sao Paolo, San Francisco</p>
                      </div>
                      <button className="bg-primary-100 text-white px-4 py-2 rounded">Apply</button>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-200 p-4 rounded">
                      <div>
                        <h3 className="text-xl font-bold">Product Designer</h3>
                        <p className="text-zinc-700">Locations: New York, Dallas, Los Angeles, Denver, Chicago, Sao Paolo, San Francisco</p>
                      </div>
                      <button className="bg-primary-100 text-white px-4 py-2 rounded">Apply</button>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-200 p-4 rounded">
                      <div>
                        <h3 className="text-xl font-bold">Product Designer</h3>
                        <p className="text-zinc-700">Locations: New York, Dallas, Los Angeles, Denver, Chicago, Sao Paolo, San Francisco</p>
                      </div>
                      <button className="bg-primary-100 text-white px-4 py-2 rounded">Apply</button>
                    </div>
                  </div>
                </div>
              </section> */}
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
                    <p>&copy; 2024 Evalvue. All rights reserved.</p>
                    <p><a href="#" className="hover:underline">Terms and conditions of use</a> | <a href="#" className="hover:underline">Accessibility</a> | <a href="#" className="hover:underline">Privacy and cookies</a> | <a href="#" className="hover:underline">Sitemap</a></p>
                  </div>
                </footer>
                </div>
              </>   
  )
}

export default About