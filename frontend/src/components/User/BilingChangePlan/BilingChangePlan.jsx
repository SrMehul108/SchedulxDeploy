const BilingChangePlan = () =>{
    return (
        <>
        <div className="font-[sans-serif]">
      <div className="max-w-5xl max-lg:max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-gray-800 text-3xl font-bold mb-3">Choose a Subscription</h2>
          <p className="text-sm text-gray-500">Change your plant according your needs</p>
        </div>

        <div className="flex mx-auto mt-12 bg-gray-100 rounded-full max-w-[200px]">
          <button className="text-white w-full text-sm bg-blue-600 py-2.5 px-5 rounded-full">
            Regular</button>
          <button
            className="text-gray-500 w-full text-sm py-2.5 px-5 rounded-full">
            Premium</button>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-6 max-sm:max-w-sm max-sm:mx-auto">
          <div className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-lg overflow-hidden transition-all duration-500 hover:scale-105">
            <div className="h-32 bg-gray-700 text-center p-4">
              <h3 className="text-2xl text-white mb-1">Starter</h3>
              <p className="text-xs text-white">1 Month</p>
            </div>

            <div className="h-24 w-24 mx-auto -mt-12 shadow-xl rounded-full bg-gray-700 text-white border-[3px] flex flex-col items-center justify-center border-white">
              <h3 className="text-2xl">$10</h3>
            </div>

            <div className="px-6 py-4 mt-4">
              <ul className="space-y-4">
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  50 Page Unlock
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  10 GB Storage
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  6 Team Members
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited Book Mark
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited basic feature
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited updates
                </li>
              </ul>

              <button type="button" className="w-full mt-8 px-5 py-2.5 text-sm text-white bg-gray-700 hover:bg-gray-800 rounded-full">Get Started</button>
            </div>
          </div>

          <div className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-lg overflow-hidden transition-all duration-500 hover:scale-105 relative">
            <span className="px-2 py-1 text-[10px] font-semibold text-white bg-orange-400 rounded-lg ml-3 absolute -left-4 top-0">Most popular</span>
            <div className="h-32 bg-blue-600 text-center p-4">
              <h3 className="text-2xl text-white mb-1">Professional</h3>
              <p className="text-xs text-white">2 Months</p>
            </div>

            <div className="h-24 w-24 mx-auto -mt-12 shadow-xl rounded-full bg-blue-600 text-white border-[3px] flex flex-col items-center justify-center border-white">
              <p className="text-[10px] font-bold">Save 29%</p>
              <h3 className="text-2xl">$70</h3>
            </div>

            <div className="px-6 py-4 mt-4">
              <ul className="space-y-4">
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  500 Page Unlock
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  100 GB Storage
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  15 Team Members
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited Book Mark
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited basic feature
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited updates
                </li>
              </ul>

              <button type="button" className="w-full mt-8 px-5 py-2.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-full">Get Started</button>
            </div>
          </div>

          <div className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-lg overflow-hidden transition-all duration-500 hover:scale-105">
            <div className="h-32 bg-pink-700 text-center p-4">
              <h3 className="text-2xl text-white mb-1">Business</h3>
              <p className="text-xs text-white">3 Month</p>
            </div>

            <div className="h-24 w-24 mx-auto -mt-12 shadow-xl rounded-full bg-pink-700 text-white border-[3px] flex flex-col items-center justify-center border-white">
              <p className="text-[10px] font-bold">Save 33%</p>
              <h3 className="text-2xl">$99</h3>
            </div>

            <div className="px-6 py-4 mt-4">
              <ul className="space-y-4">
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  800 Page Unlock
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  300 GB Storage
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  50 Team Members
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited Book Mark
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited basic feature
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-3 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                  </svg>
                  Unlimited updates
                </li>
              </ul>

              <button type="button" className="w-full mt-8 px-5 py-2.5 text-sm text-white bg-pink-700 hover:bg-pink-800 rounded-full">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}