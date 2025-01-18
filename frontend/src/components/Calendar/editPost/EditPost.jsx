import React, { useState, useEffect, useCallback } from "react";
import { FaInstagram } from "react-icons/fa";
import api from "../../../apis/api";
import { Icons } from "../../../constants";
import { ImageIcon, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Editer from "../imageEditor/Editer";

const Button = ({ children, ...props }) => {
  return (
    <button
      className="font-semibold rounded-xl px-4 py-2 border hover:bg-slate-200"
      {...props}
    >
      {children}
    </button>
  );
};

const InputCalendar = ({ value, onChange, ...props }) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const currentDateTime = getCurrentDateTime();
  console.log(currentDateTime)
  return (
    <input
      type="datetime-local"
      value={value || currentDateTime}
      onChange={onChange}
      min={currentDateTime}
      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};

const channelIcons = {
  Instagram: <FaInstagram className="text-black text-3xl" />,
  Linkedin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="24"
      height="24"
      fill="#0077B5"
    >
      <path d="M100.28 448H7.4V149.9h92.88zm-46.4-340.77A53.5 53.5 0 0 1 0 53.7 53.53 53.53 0 0 1 53.88 0a53.5 53.5 0 0 1 53.88 53.7 53.53 53.53 0 0 1-53.88 53.53zm394.72 340.77h-92.88V302.4c0-34.7-.7-79.34-48.3-79.34-48.3 0-55.7 37.74-55.7 76.7v148.3h-92.78V149.9h89.06v40.7h1.3c12.4-23.4 42.6-48.3 87.6-48.3 93.7 0 110.8 61.7 110.8 141.9zm0 0" />
    </svg>
  ),
  XTwitter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="#000000"
    >
      <path d="M23.523 0H16.91l-4.41 8.47L7.781 0H.477l7.732 10.6L.023 24h6.592l5.264-9.748L17.891 24h5.685l-8.151-11.207L23.523 0z" />
    </svg>
  ),
  Pinterest: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      width="24"
      height="24"
      fill="#BD081C"
    >
      <path d="M248 8C111 8 0 119.1 0 256c0 110.5 69.8 204.8 167 240.5-2.3-20.5-4.3-51.9.9-74.3 4.6-19.7 29.6-125.1 29.6-125.1s-7.4-14.8-7.4-36.7c0-34.4 20-60.2 44.9-60.2 21.2 0 31.4 15.9 31.4 34.9 0 21.3-13.6 53.2-20.6 82.8-5.8 24.8 12.3 45 36.5 45 43.8 0 73.3-56 73.3-122.3 0-50.5-34-88.3-96.2-88.3-70 0-113.8 52.3-113.8 110.8 0 20.2 6 34.5 15.4 45.5 4.3 5 4.9 7 3.3 12.7-1.1 4.2-3.5 14.2-4.5 18.2-1.5 5.8-6.2 7.9-11.4 5.7-31.8-13-46.4-47.9-46.4-87.2 0-64.8 54.6-141.8 162.6-141.8 86.9 0 144.3 62.8 144.3 130.5 0 89.6-49.6 156.5-122.9 156.5-24.7 0-47.9-13.4-55.8-28.4 0 0-13.3 52.7-16 63.1-5.7 20.6-21 46.1-31.4 61.7 23.5 7.3 48.3 11.4 74.3 11.4 137 0 248-111 248-248S385 8 248 8z" />
    </svg>
  ),
  Facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width="24"
      height="24"
      fill="#1877F2"
    >
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12-50.06 52.24-50.06H293V6.26S268.43 0 243.72 0c-73.61 0-121.28 44.78-121.28 126.34v71H32v92.66h90.44V512h108.08V288z" />
    </svg>
  ),
};

const EditPost = ({ closePopup, editData, onAdd, onUpdate }) => {
  const [postContent, setPostContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [mediaUrls, setMediaUrls] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (editData) {
      const { platformSpecific, post, platformName } = editData.extendedProps;

      setPostContent(platformSpecific.text || platformSpecific.content || "");
      setScheduledTime(new Date(post.scheduledTime).toISOString().slice(0, 16));
      setSelectedChannels([platformName]);

      const existingImages =
        platformSpecific.mediaUrls?.map((url) => `${backendUrl}/${url}`) || [];
      setPreviewImages(existingImages);
    }
  }, [editData, backendUrl]);


  const uploadImages = async () => {
    try {
      if (mediaUrls.length === 0) {
        console.error("No media URLs found in local storage.");
        throw new Error("No media URLs to upload.");
      }
      const response = await api.post("/api/v1/upload/img-download", {
        image: mediaUrls[0],
      });
      if (response.status === 200 && response.data.imagePath) {
        console.log("Uploaded image:", response.data.imagePath);
        setMediaUrls(response.data);
        return response.data;
      } else {
        console.error("Invalid response from server:", response.data);
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert(
        "Error uploading images. Please check your internet connection or file size."
      );
      return null;
    }
  };


  const handleEditorSave = ({ postContent, mediaUrls }) => {
    setPostContent(postContent);
    if (mediaUrls.length > 0) {
      setMediaUrls(mediaUrls);
      setPreviewImages(mediaUrls);
    }
    setIsEditorOpen(false);
  };

  const handleSave = async (status) => {
    try {
      console.log("mediaUrls", mediaUrls.length);
      let uploadedMediaUrl = null;
      if (mediaUrls.length !== 0) {
        // Upload images and get the URLs
        uploadedMediaUrl = await uploadImages();
        console.log("uploadedMediaUrl", uploadedMediaUrl);

        if (!uploadedMediaUrl && uploadedFiles.length > 0) {
          alert("Image upload failed.");
          return;
        }
      }
      const platforms = {
        xtwitter: {
          accountKey: "xtwitter",
          platformName: "XTwitter",
          postData: async (socialMediaID) => {
            const postData = {
              socialMediaId: socialMediaID,
              text: postContent,
            };

            if (mediaUrls.length !== 0) {
              postData.mediaUrls = uploadedMediaUrl
                ? [uploadedMediaUrl.imagePath]
                : mediaUrls;
            }

            return postData;
          },
        },
        linkedin: {
          accountKey: "linkedin",
          platformName: "LinkedIn",
          postData: async (socialMediaID) => {
            const postData = {
              socialMediaId: socialMediaID,
              text: postContent,
              content: postContent,
              altText: "Default alt text", 
            };
            if (mediaUrls.length !== 0) {
              postData.mediaUrls = uploadedMediaUrl
                ? [uploadedMediaUrl.imagePath]
                : mediaUrls;
            }

            return postData;
          },
        },
        // Add more platforms here as needed
      };

      const platformData = {};

      // Iterate through selected platforms and prepare data
      for (const platform of selectedChannels) {
        const platformKey = platform.toLowerCase();
        const config = Object.values(platforms).find(
          (p) => p.accountKey === platformKey
        );

        if (!config) {
          console.error(`Platform ${platform} not supported.`);
          continue;
        }

        const account = editData?.extendedProps?.post?.platformSpecific?.[
          platformKey
        ];

        if (!account) {
          alert(`No ${config.platformName} account connected.`);
          return;
        }

        const socialMediaID = account._id;
        platformData[platformKey] = await config.postData(socialMediaID);
      }

      // Prepare updated payload
      const updatedData = {
        userId: editData?.extendedProps?.post?.userId,
        platformSpecific: {
          ...editData?.extendedProps?.post?.platformSpecific,
          ...platformData,
        },
        postContent: postContent,
        scheduledTime: scheduledTime || new Date().toISOString(),
        status,
      };

      console.log("Updated Payload:", updatedData);

      // Update the post via API
      const response = await api.put(
        `/api/v1/post/post-update/${editData.extendedProps.post._id}`,
        updatedData
      );

      if (response.data.success) {
        closePopup();
        onUpdate();
      } else {
        alert("Failed to update the post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const removeFile = (index) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    if (index < uploadedFiles.length) {
      const updatedFiles = [...uploadedFiles];
      updatedFiles.splice(index, 1);
      setUploadedFiles(updatedFiles);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previewImages]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg dark:bg-bgCopnents ">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold dark:text-white">Edit Post</h2>
          <button
            onClick={closePopup}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Selected Platform */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-700 dark:text-white">Selected Platform</h3>
          <div className="flex gap-4 mt-2">
            {selectedChannels.map((channel) => {
              const normalizedChannel = channel.toLowerCase(); // Normalize channel to lowercase
              const iconKey = Object.keys(channelIcons).find(
                (key) => key.toLowerCase() === normalizedChannel
              );
              const IconComponent = channelIcons[iconKey] || (
                <div className="text-sm text-gray-500 dark:text-white">Icon Not Found</div>
              ); // Fallback icon or message

              return (
                <div key={channel} className="flex flex-col items-center">
                  <button className="relative rounded-full p-2 border border-blue-500 bg-blue-50">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                      {IconComponent}
                    </div>
                    {selectedChannels.includes(channel) && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                        <span className="text-white text-xs sm:text-sm">✓</span>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Image Uploader */}
        <div
          {...getRootProps()}
          onClick={() => setIsEditorOpen(true)}
          className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300"
            }`}
        >
          <input {...getInputProps()} />
          {previewImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-2">
              {previewImages.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-500">
                Drag & drop or click to select files
              </p>
            </>
          )}
        </div>
        {/* Content */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-700 dark:text-white">Content</h3>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Update your post content here"
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-ScocilMCompnent"
          />
        </div>
        {/* Scheduled Time */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-700 dark:text-white">Scheduled Time</h3>
          <InputCalendar
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="dark:bg-ScocilMCompnent dark:text-white border border-gray-300 w-full rounded-xl p-3"
          />
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button onClick={closePopup}  className="font-bold text-slate-800 p-2 rounded-xl border hover:bg-slate-200 dark:bg-bgbutton border-borderDarkmode dark:text-white">Cancel</Button>
          <Button onClick={() => handleSave("scheduled")}  className="font-bold text-slate-800 p-2 rounded-xl border hover:bg-slate-200 dark:bg-bgbutton border-borderDarkmode dark:text-white">Schedule Post</Button>
        </div>
        {isEditorOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <Editer
                onSave={handleEditorSave}
                onClose={() => setIsEditorOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;