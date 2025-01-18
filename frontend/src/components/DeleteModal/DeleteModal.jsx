const DeleteModal = ({ onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onClose(); 
  };

  return (
    <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 relative dark:bg-bgCopnents ">
        <div className="my-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 fill-red-500 inline"
            viewBox="0 0 286.054 286.054"
          >
            <path
              fill="#e2574c"
              d="M143.027 0C64.04 0 0 64.04 0 143.027c0 78.996 64.04 143.027 143.027 143.027 78.996 0 143.027-64.022 143.027-143.027C286.054 64.04 222.022 0 143.027 0zm0 259.236c-64.183 0-116.209-52.026-116.209-116.209S78.844 26.818 143.027 26.818s116.209 52.026 116.209 116.209-52.026 116.209-116.209 116.209zm.009-196.51c-10.244 0-17.995 5.346-17.995 13.981v79.201c0 8.644 7.75 13.972 17.995 13.972 9.994 0 17.995-5.551 17.995-13.972V76.707c-.001-8.43-8.001-13.981-17.995-13.981zm0 124.997c-9.842 0-17.852 8.01-17.852 17.86 0 9.833 8.01 17.843 17.852 17.843s17.843-8.01 17.843-17.843c-.001-9.851-8.001-17.86-17.843-17.86z"
            />
          </svg>
          <h4 className="text-lg text-gray-800 font-semibold mt-6 dark:text-white">
            Your account will be deleted permanently!
          </h4>
          <p className="text-sm text-gray-500 mt-2 dark:text-white">Are you sure to proceed?</p>
        </div>
        <div className="flex max-sm:flex-col gap-4">
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg w-full tracking-wide text-gray-800 text-sm border-none outline-none bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            I am not sure
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg w-full tracking-wide text-white text-sm border-none outline-none bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            Remove my account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;