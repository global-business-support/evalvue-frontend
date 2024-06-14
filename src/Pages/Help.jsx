import React, { useState } from 'react'
import { NavLink, Link } from "react-router-dom";
import helpBgImage from '../assets/images/help-center-image.jpg'
import Footer from './Footer';
import Tittle from '../Tittle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';







function Help() {
  const [expanded, setExpanded] = useState('')
  const [showCardId, setShowCardId] = useState()

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    console.log(panel)
    console.log(expanded)
  }



  Tittle("Help page - Evalvue")
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">

      <div className="container mx-auto flex justify-between items-center ">
        <div className="text-2xl font-bold">Help Center</div>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">FAQ</a>
        </nav>
      </div>
      <main className="container mx-auto py-12">
        <section className="h-[350px] mb-40  relative rounded-xl text-start bg-gradient-to-r from-primary-100">
          <img src={helpBgImage} alt="" className='absolute right-0 z-[-10] h-full' />
          <div className='pt-20 px-10 text-white'>
            <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
            <p className="mb-6">Find advice and answers from our support team fast or get in touch</p>
            <input type="text" placeholder="Search for answers..." className="w-full max-w-lg mx-auto p-4  rounded-lg shadow-lg border border-zinc-300 dark:border-zinc-700" />
          </div>
        </section>


        {/* <section className="mb-20">
                  <h2 className="text-2xl font-semibold mb-6 text-center">Featured Articles</h2>
                  <ul className="space-y-5">

                    <div>
                    <li onClick={()=> setShowCardId('1')} className={`${(showCardId == '1')?'rounded-b-none bg-white text-primary-100':'text-white bg-primary-100'} flex justify-between items-center   bg-primary-100 border border-primary-100  transition-all ease-in-out duration-300 p-4 rounded-lg  shadow-lg hover:shadow-xl`}>
                      <span>How does Evalvue work?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <h2  className={`${(showCardId == '1')? 'block h-auto' : 'hidden h-0'}  rounded-b-lg p-5 text-gray-700 border border-primary-100 font-medium`}>Provide a brief overview of how the platform functions, including how companies
                        post reviews of employees' performance and how potential employers can access this
                        information.
                    </h2>
                    </div>

                    <div>
                    <li onClick={()=> setShowCardId('2')} className={`${(showCardId == '2')?'rounded-b-none bg-white text-primary-100':'text-white bg-primary-100'} flex justify-between items-center   bg-primary-100 border border-primary-100  transition-all ease-in-out duration-300 p-4 rounded-lg  shadow-lg hover:shadow-xl`}>
                      <span>What information is available on Evalvue?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <h2  className={`${(showCardId == '2')? 'block h-auto transition-all ease-in-out duration-500' : 'hidden h-0'}  rounded-b-lg p-5 text-gray-700 border border-primary-100 font-medium`}>Provide a brief overview of how the platform functions, including how companies
                        post reviews of employees' performance and how potential employers can access this
                        information.
                    </h2>
                    </div>

                    <div>
                    <li onClick={()=> setShowCardId('3')} className={`${(showCardId == '3')?'rounded-b-none bg-white text-primary-100':'text-white bg-primary-100'} flex justify-between items-center   bg-primary-100 border border-primary-100  transition-all ease-in-out duration-300 p-4 rounded-lg  shadow-lg hover:shadow-xl`}>
                      <span>How can Evalvue benefit my company?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <h2  className={`${(showCardId == '3')? 'block h-auto' : 'hidden h-0'}  rounded-b-lg p-5 text-gray-700 border border-primary-100 font-medium`}>Provide a brief overview of how the platform functions, including how companies
                        post reviews of employees' performance and how potential employers can access this
                        information.
                    </h2>
                    </div>

                    <div>
                    <li onClick={()=> setShowCardId('4')} className={`${(showCardId == '4')?'rounded-b-none bg-white text-primary-100':'text-white bg-primary-100'} flex justify-between items-center   bg-primary-100 border border-primary-100  transition-all ease-in-out duration-300 p-4 rounded-lg  shadow-lg hover:shadow-xl`}>
                      <span>Is Evalvue secure and confidential?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <h2  className={`${(showCardId == '4')? 'block h-auto' : 'hidden h-0'}  rounded-b-lg p-5 text-gray-700 border border-primary-100 font-medium`}>Provide a brief overview of how the platform functions, including how companies
                        post reviews of employees' performance and how potential employers can access this
                        information.
                    </h2>
                    </div>

                    <div>
                    <li onClick={()=> setShowCardId('5')} className={`${(showCardId == '5')?'rounded-b-none bg-white text-primary-100':'text-white bg-primary-100'} flex justify-between items-center   bg-primary-100 border border-primary-100  transition-all ease-in-out duration-300 p-4 rounded-lg  shadow-lg hover:shadow-xl`}>
                      <span>How can I sign up for Evalvue?</span>
                      <span className="text-zinc-100 text-2xl">&rarr;</span>
                    </li>
                    <h2  className={`${(showCardId == '5')? 'block h-auto' : 'hidden h-0'}  rounded-b-lg p-5 text-gray-700 border border-primary-100 font-medium`}>Provide a brief overview of how the platform functions, including how companies
                        post reviews of employees' performance and how potential employers can access this
                        information.
                    </h2>
                    </div>

                    <div>
                    <li onClick={()=> setShowCardId('6')} className={`${(showCardId == '6')?'rounded-b-none bg-white text-primary-100':'text-white bg-primary-100'} flex justify-between items-center   bg-primary-100 border border-primary-100  transition-all ease-in-out duration-300 p-4 rounded-lg  shadow-lg hover:shadow-xl`}>
                      <span>Is customer support available for Evalvue users?</span>
                      <span className="text-zinc-100 text-2xl ">&rarr;</span>
                    </li>
                    <h2  className={`${(showCardId == '6')? 'block h-auto' : 'hidden h-0'}  rounded-b-lg p-5 text-gray-700 border border-primary-100 font-medium`}>Provide a brief overview of how the platform functions, including how companies
                        post reviews of employees' performance and how potential employers can access this
                        information.
                    </h2>
                    </div>

                  </ul>
                </section> */}


        <div className='mb-20'>


          <Accordion >
            <AccordionSummary

              aria-controls="panel1-content"
              id="panel1-header"
              className='border-none'
            >
              <li className={`${(expanded === 'panel1') ? ' bg-white text-primary-100 ' : 'bg-primary-100 text-white'} group w-full flex justify-between items-center hover:bg-white hover:text-primary-100 bg-primary-100 border border-primary-100  transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl hover:left-1`}>
                <span>How does Evalvue work?</span>
                <span className="text-zinc-100 text-2xl">&rarr;</span>
              </li>
            </AccordionSummary>
            <AccordionDetails>
              <h1 className='p-3 rounded-b-lg  text-gray-700 font-medium'>
                Evalvue operates by leveraging employees' work experiences. All companies upload reviews of their employees here, delineating their work methodologies and updates via posts. When an employee departs from the company, their review is appended by the company. Consequently, if they proceed for an interview elsewhere, the prospective employer can preview their data, facilitating the acquisition of a suitable employee for the company.
              </h1>
            </AccordionDetails>
          </Accordion>

          <Accordion >
            <AccordionSummary
              expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')}
              aria-controls="panel2-content"
              id="panel2-header"
              className='border-none'
            >
              <li className="group w-full flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl hover:left-1">
                <span>What information is available on Evalvue?</span>
                <span className="text-zinc-100 text-2xl">&rarr;</span>
              </li>
            </AccordionSummary>
            <AccordionDetails>
              <h1 className='p-3 rounded-b-lg  text-gray-700 font-medium'>
                On Evalvue, clients can expect to find various types of information, such as employee performance reviews, ratings, work methods, background details, and an assessment of the employee's behavior and goal achievement for tasks performed for the company. This biodata assists other companies in selecting employees.
              </h1>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expanded={expanded === 'panel3'} onChange={handleChange('panel3')}
              aria-controls="panel3-content"
              id="panel3-header"
              className='border-none'
            >
              <li className="group w-full flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl hover:left-1">
                <span>How can Evalvue benefit my company?</span>
                <span className="text-zinc-100 text-2xl">&rarr;</span>
              </li>
            </AccordionSummary>
            <AccordionDetails>
              <h1 className='p-3 rounded-b-lg  text-gray-700 font-medium'>
                Verify candidates' work experience, identify fake experience, and make informed hiring decisions based on performance ratings.
              </h1>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expanded={expanded === 'panel4'} onChange={handleChange('panel4')}
              aria-controls="panel4-content"
              id="panel4-header"
              className='border-none'
            >
              <li className="group w-full flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl hover:left-1">
                <span>Is Evalvue secure and confidential?</span>
                <span className="text-zinc-100 text-2xl">&rarr;</span>
              </li>
            </AccordionSummary>
            <AccordionDetails>
              <h1 className='p-3 rounded-b-lg  text-gray-700 font-medium'>
                Dear Client,<br/>
                <br/>
                We want to assure you that our platform has stringent security measures and confidentiality policies in place to protect your employees' sensitive information. We prioritize the security of your data and take the following steps:<br/>
                <br/>
                <b>Advanced Encryption Technology </b>: We use advanced encryption technology to ensure that your information is secure and can only be accessed by authorized users.<br/>
                <br/>
                <b>Privacy Policies</b>: Our privacy policies are clear and strict, ensuring that your data is never shared without your consent.<br/>
                <br/>
                <b>Regular Security Audits</b>: We conduct regular security audits and tests to ensure the integrity of our systems.<br/>
                <br/>
                <b>Trained Security Team</b>: We have an expert security team that is always ready to identify and prevent any potential security threats.<br/>
                <br/>
                <b>Data Access Control</b>: Only authorized personnel have access to the data, and even then, they can only view the data as necessary.<br/>
                <br/>
                With us, you can be confident that your employees' sensitive information is fully protected. If you have any questions or concerns, please do not hesitate to contact us.<br/>
                <br/>
                Best regards,
                [Global Business Support]
              </h1>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expanded={expanded === 'panel5'} onChange={handleChange('panel5')}
              aria-controls="panel5-content"
              id="panel5-header"
              className='border-none'
            >
              <li className="group w-full flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl hover:left-1">
                <span>How can I sign up for Evalvue?</span>
                <span className="text-zinc-100 text-2xl">&rarr;</span>
              </li>
            </AccordionSummary>
            <AccordionDetails>
              <h1 className='p-3 rounded-b-lg  text-gray-700 font-medium'>
              To use Evalvue, You need to create an account. The user must be the owner or HR of the company. Then, they need to log in and choose a plan.
              </h1>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expanded={expanded === 'panel6'} onChange={handleChange('panel6')}
              aria-controls="panel6-content"
              id="panel6-header"
              className='border-none'
            >
              <li className="group w-full flex justify-between items-center text-white hover:text-primary-100 bg-primary-100 border border-primary-100 hover:bg-white transition-all ease-in-out duration-300 p-4 rounded-lg shadow-lg hover:shadow-xl hover:left-1">
                <span>Is customer support available for Evalvue users?</span>
                <span className="text-zinc-100 text-2xl">&rarr;</span>
              </li>
            </AccordionSummary>
            <AccordionDetails>
              <h1 className='p-3 rounded-b-lg  text-gray-700 font-medium'>
              Customer support is available to address any queries or issues they may encounter while using the platform. Contact our customer support.<br/>
              <br/>
              <b>Email: contact@evalvue.com</b>
              </h1>
            </AccordionDetails>
          </Accordion>


        </div>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">Didn't find an answer to your question?</h2>
          <p className="mb-6">Get in touch with us for details on additional services and custom work pricing</p>
          <Link to='/contact' className="bg-primary-100 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#5559af] hover:shadow-sm">Contact Us</Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Help