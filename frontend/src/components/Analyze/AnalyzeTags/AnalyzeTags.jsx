import { Link } from 'react-router-dom';
import analyze from '../../../assets/images/tags_analyze1.webp'

const AnalyzeTags = () => {
    return (
        <>
            <div className=" items-center justify-center max-h-screen w-full">
                <div className="text-center w-full items-center justify-center flex">
                    <div className="w-full">
                        <div className=' mb-2'>
                            <img
                                src={analyze}
                                alt="Empty tags illustration"
                                className="mx-auto mb-4 "
                                loading="lazy"
                            />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white">Analyze your Channel</h2>
                        <div className="mt-2">
                            <p className="text-gray-600 dark:text-white">
                                Get an overview of your Channel at a glance, measure and report across multiple channels and skip all manual calculations
                            </p>
                        </div>
                        <div className='mt-4'>
                            <button
                                className=" text-white font-bold py-2 px-4 rounded-md dark:text-white" >
                                <Link
                                    to={'/channel'}
                                    className="relative inline-flex items-center justify-start px-2 py-2 overflow-hidden font-normal transition-all bg-slate-500 rounded-xl group"
                                >
                                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-slate-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-slate-600 rounded-2xl group-hover:mb-10 group-hover:translate-x-0"></span>
                                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white flex items-center">
                                        <span >Manage Channel</span>
                                    </span>
                                </Link>
                            </button>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnalyzeTags;