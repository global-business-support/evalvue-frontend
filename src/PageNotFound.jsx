import React from 'react'
import Tittle from './Tittle'

function PageNotFound() {
  Tittle("page not found")
  return (
              <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-white dark:bg-zinc-900">
                <div className="text-center">
                  <h1 className="text-9xl font-bold text-zinc-900 dark:text-white">404</h1>
                  <p className="text-xl text-zinc-600 font-bold dark:text-zinc-300 mt-2">Page not found</p>
                  <p className="text-zinc-500 mx-auto dark:text-zinc-400 mt-4 w-5/6 md:w-[56%]">
                    The page you are looking for doesn't exist or an other error occurred. 
                    <a href="#" className="text-blue-500 font-semibold hover:underline"> Go back</a>, or head over to 
                    <a href="/" className="text-blue-500 font-semibold hover:underline"> home</a> to choose a new direction.
                  </p>
                </div>
              </div>
  )
}

export default PageNotFound