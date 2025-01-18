import { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Icons } from "../../constants";

function ShareButton({ redirectUrl }) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const toggleShareOptions = () => {
    setIsShareOpen(!isShareOpen);
  };

  return (
    <div className="relative group">
      <button
        onClick={toggleShareOptions}
        className="px-2 py-2 border rounded-xl hover:bg-slate-50 flex items-center justify-center space-x-1 dark:bg-bgbutton dark:border-borderDarkmode"
      >
        <span className="">{Icons.send}</span>
      </button>

      {/* Share Options */}
      {isShareOpen && (
        <div className="absolute top-12 left-0 bg-white border rounded-lg shadow-lg p-3 space-y-2 dark:bg-bgbutton dark:border-borderDarkmode">
          <FacebookShareButton url={redirectUrl}>
            <div className="flex items-center space-x-2">
              <FaFacebook className="text-blue-600" />
              <span>Facebook</span>
            </div>
          </FacebookShareButton>

          <TwitterShareButton url={redirectUrl}>
            <div className="flex items-center space-x-2">
              <FaTwitter className="text-blue-400" />
              <span>Twitter</span>
            </div>
          </TwitterShareButton>

          <WhatsappShareButton url={redirectUrl}>
            <div className="flex items-center space-x-2">
              <FaWhatsapp className="text-green-500" />
              <span>WhatsApp</span>
            </div>
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
}

export default ShareButton;