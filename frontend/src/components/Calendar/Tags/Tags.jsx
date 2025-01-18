import { Link } from "react-router-dom";

const Tags = () => {
    return (
        <div className=" items-center justify-center max-h-screen w-full">
            <div>
            <header className="mb-6 flex  justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Tags</h2>
                    <button
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:rs:"
                        data-state="closed"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-2"
                            strokeWidth="2.2"
                            aria-hidden="true"
                        >
                            <path
                                d="M5 12H19M12 5V19"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        New Tag
                    </button>
                </header>
            </div>
            <div className="text-center w-full items-center justify-center flex">
                
                <div className="w-full">
                    <img
                        src="https://buffer-publish.s3.amazonaws.com/images/empty-tags-overview.png"
                        alt="Empty tags illustration"
                        className="mx-auto mb-4 "
                    />
                    <h2 className="text-lg font-semibold text-gray-800">Organize your content</h2>
                    <div className="mt-2">
                        <p className="text-gray-600">
                            Use tags to organize, categorize, and track the success of different types of content.
                        </p>
                    </div>
                    <Link
                        href="https://support.buffer.com/article/585-creating-and-managing-campaigns?utm_source=buffer&amp;utm_medium=learn-more-link&amp;utm_campaign=learn-more"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-blue-500 hover:underline"
                        title="Learn more about tags"
                    >
                        Learn more about tags
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Tags;
