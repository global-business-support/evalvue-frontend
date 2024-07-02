import aboutImg from '../assets/images/about-img.jpg';
import aboutMission1 from '../assets/images/about-mission1.jpg';
import aboutMission2 from '../assets/images/about-mission2.jpg';
import aboutMission3 from '../assets/images/about-mission3.jpg';
import aboutVision4 from '../assets/images/about-vision4.jpg';
import aboutVision2 from '../assets/images/about-vision2.avif';
import aboutVision3 from '../assets/images/about-vision3.jpg';
import Footer from './Footer';
import Tittle from '../Tittle';
function About() {
  Tittle("About page-Evalvue")
  return (
              <>
              <div>
             <div className='lg:px-0 px-6'>
             <section className="pb-10 lg:w-[90%] mx-auto m-4 relative rounded-xl text-start bg-gradient-to-r from-primary-100">
                      <img src={aboutImg} alt="about-img" className='absolute right-0 z-[-10] h-full'/>
                      <div className='pt-20 px-10 lg:w-[50%]  text-white'>
                      <h1 className="text-6xl font-bold mb-4">About Us</h1>
                      <p className="mb-6">Welcome to evalvue where employee feedback meets innovations, we are dedicated to transforming
                     the way companies understand and engage with their workforce. At evalvue we believe that every
                     voice matters and that constructive feedback is the cornerstone of a thriving workplace.</p>
                      </div>
              </section>
              <div className='lg:mx-[75px]'>
              <section className="py-16">
                <div className="container mx-auto flex flex-col gap-2 md:flex-row items-center">
                  <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-zinc-600 text-justify md:mr-4 dark:text-zinc-400">Empower everyone through exemplary employees by contrasting good employees with bad ones.
                       We add worldwide companies to assist in selecting the right employees, ensuring that each
                       organization is equipped with top talent to drive success. Moreover, we recognize that talent knows
                      no borders. By partnering with a diverse array of global companies, we expand the pool of
                      opportunities and resources available for organizations seeking to attract top talent. Whether it's
                      through targeted recruitment strategies, talent development initiatives, or access to specialized
                      expertise, our aim is to ensure that every organization is equipped with the best possible talent to
                      drive success.
                    </p>
                  </div>
                  <div className="md:w-1/2 grid grid-cols-2 gap-4 lg:mr-12">
                    <img src={aboutMission1} alt="Mission Image 1" className="w-[300px] h-[200px] rounded"/>
                    <img src={aboutMission2} alt="Mission Image 2" className="w-[300px] h-[200px] rounded"/>
                    <img src={aboutMission3} alt="Mission Image 3" className="w-[300px] h-[200px] rounded"/>
                  </div>
                </div>
              </section>

              <section className="py-16">
                <div className="container gap-2 mx-auto flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 grid grid-cols-2 gap-4">
                    <img src={aboutVision4} alt="Mission Image 1" className="w-[300px] h-[200px] rounded"/>
                    <img src={aboutVision3} alt="Mission Image 2" className="w-[300px] h-[200px] rounded"/>
                    <div className='w-[300px] h-[200px] bg-white'></div>
                    <img src={aboutVision2} alt="Mission Image 3" className="w-[300px] h-[200px] rounded"/>
                  </div>
                  <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-4 xl:px-0 px-2">Our Vision</h2>
                    <p className="text-zinc-600 text-justify dark:text-zinc-400 xl:px-0 px-2">
                      At Evalvue, our vision is to promote transparency and authenticity in the workplace. Our goal is to create a platform where companies can post reviews of their employees' performance when they leave a job, allowing potential employers to clearly see their identity and work experience when applying for a new position. Through Evalvue, we make it possible to identify individuals who provide fake experience, as their actual work history is displayed on our platform. Additionally, we provide ratings for good employees based on their work methods and background, showcasing their exceptional performance. We aim to build a platform that helps employers make informed and accurate hiring decisions while giving employees the opportunity to demonstrate their true potential. Through Evalvue, we strive to create a transparent, reliable, and fair job market for all.
                    </p>
                  </div>
                </div>
              </section>
              </div>
              </div>
              
              <Footer />
                </div>
              </>   
  )
}

export default About