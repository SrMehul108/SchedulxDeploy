import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon, Hash, SmileIcon, Music2, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { Icons } from "../../../constants/icons";
import Insta from "../Post-component/insta";
import Linkdin from "../Post-component/lindin";
import Printset from "../Post-component/pritset";
import Twitter from "../Post-component/twitter";
import Facebook from "../Post-component/facebook";
import api from "../../../apis/api";
import { FaInstagram } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Editer from "../imageEditor/Editer";

const Button = ({ children, variant = "primary", size = "md", ...props }) => {
  const baseClasses = "font-semibold rounded-xl transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-gray-700 hover:bg-gray-100",
  };
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    icon: "p-2",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

const RadioGroup = ({ children, ...props }) => (
  <div className="flex gap-4" {...props}>
    {children}
  </div>
);

const RadioGroupItem = ({ id, checked, onChange, ...props }) => (
  <input
    type="radio"
    id={id}
    checked={checked}
    onChange={onChange}
    className="sr-only peer"
    {...props}
  />
);

const Label = ({ children, htmlFor, ...props }) => (
  <label
    htmlFor={htmlFor}
    className="text-sm text-gray-700 cursor-pointer peer-checked:text-blue-500 peer-checked:font-semibold"
    {...props}
  >
    {children}
  </label>
);

const Input = (props) => (
  <input
    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
);

const InputCalendar = ({ props, value, onChange, placeholder }) => {
  const currentDateTime = new Date().toISOString().slice(0, 16); // Correctly define the variable outside JSX

  return (
    <input
      type="datetime-local"
      value={value}
      onChange={onChange}
      min={currentDateTime}
      className="w-full px-3 py-2 border mt-3 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-bgCopnents dark:text-white"
      placeholder="Schedule Date & Time"
      {...props}
    />
  );
};

const Textarea = ({ value, onChange, ...props }) => (
  <textarea
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
);

const channelIcons = {
  Instagram: <FaInstagram className=" text-3xl" />,
  LinkedIn: (
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

function NewPost({ closePopup, initialChannels = [], userData, preview }) {
  const [selectedChannels, setSelectedChannels] = useState(initialChannels);
  const [scheduledTime, setScheduledTime] = useState(""); // Add this line
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [postType, setPostType] = useState("post");
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiPromptActive, setIsAiPromptActive] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [mediaUrls, setMediaUrls] = useState([]);
  const [error, setError] = useState()
  const [isPosting, setIsPosting] = useState(false); // State to manage loader visibility

  const channels = [
    "Instagram",
    "LinkedIn",
    "XTwitter",
    "Pinterest",
    "Facebook",
  ];

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.user?._id;
      if (!userId) throw new Error("User ID not found in token");

      const response = await api.get(`/api/v1/user/user-get/${userId}`);
      setData(response.data.data);

    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.response?.data?.message || "Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Check if the channel is connected
  const ConnectChannels = (channel) => {
    if (!data?.socialMedia) return false;
    return data.socialMedia.some(
      (connection) =>
        connection.platformName.toLowerCase() === channel.toLowerCase()
    );
  };

  useEffect(() => {

  }, [userData]);

  const handleChannelClick = (channel) => {
    if (!ConnectChannels(channel)) {
      alert(`${channel} is not connected. Please connect it first.`);
      return;
    }

    setSelectedChannels(
      (prevSelected) =>
        prevSelected.includes(channel)
          ? prevSelected.filter((c) => c !== channel)
          : [...prevSelected, channel]
    );
  };

  const handleSelectAll = () => {
    const connectedChannels = channels.filter((channel) =>
      ConnectChannels(channel)
    );

    if (selectedChannels.length === connectedChannels.length) {
      setSelectedChannels([]);
    } else {
      setSelectedChannels(connectedChannels);
    }
  };

  // Handle AI Assistant Toggle
  // const handleAIClick = () => {
  //   setIsAiPromptActive((prev) => !prev);

  //   if (!isAiPromptActive) {
  //     setAiPrompt("");
  //     setPostContent("");
  //   } else if (aiPrompt.trim() !== "") {
  //     fetchAIContent(aiPrompt);
  //   }
  // };

  // const handleAiPromptChange = (e) => {
  //   setAiPrompt(e.target.value);
  // };

  const handleTextareaChange = (e) => {
    setPostContent(e.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);

    const newPreviewImages = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages((prev) => [...prev, ...newPreviewImages]);
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
  });

  const removeFile = (index) => {
    setUploadedFiles((files) => files.filter((_, i) => i !== index));
    setPreviewImages((previews) => previews.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      previewImages.forEach(URL.revokeObjectURL);
    };
  }, [previewImages]);

  const handleEmojiClick = (emojiObject) => {
    setPostContent((prevContent) => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const uploadImages = async () => {
    try {
      const response = await api.post("/api/v1/upload/img-download", {
        image: mediaUrls.length > 0 ? mediaUrls[0] : null,
      });

      if (response.status === 200) {

        localStorage.removeItem("mediaUrls");
        return response.data;
      } else {
        console.error("Error from server:", response.data);
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert(
        "Error uploading images. Please check your internet connection or file size."
      );
      return null;
    }
  };

  const fetchAIContent = async (prompt) => {
    try {
      setIsLoadingAI(true);
      const response = await api.post("/api/v1/openai/generate-response", {
        input: prompt,
      });
      setPostContent(response.data.responseData || "");
    } catch (error) {
      console.error("Error calling AI API:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleAiButtonClick = () => {
    if (!postContent.trim()) {
      alert("Please enter some text or a prompt to generate AI content.");
      return;
    }
    fetchAIContent(postContent);
  };

  const handleSubmit = async (status) => {
    try {
      setIsPosting(true);
      const uploadedMediaUrl = await uploadImages();

      if (!uploadedMediaUrl && uploadedFiles.length > 0) {
        alert("Image upload failed.");
        return;
      }

      const platforms = {
        xtwitter: {
          accountKey: "xtwitter",
          platformName: "XTwitter",
          postData: async (socialMediaID) => ({
            socialMediaId: socialMediaID,
            text: postContent || "Default Content",
            mediaUrls: [uploadedMediaUrl.imagePath],
          }),
        },
        linkedin: {
          accountKey: "linkedin",
          platformName: "LinkedIn",
          postData: async (socialMediaID) => ({
            socialMediaId: socialMediaID,
            content: editedContent || postContent || "Default Content",
            mediaUrls: [uploadedMediaUrl.imagePath],

            altText: "Default alt text",
          }),
        },
        // Add more platforms here as needed
      };

      const platformData = {}; // To hold platform-specific data
      // Iterate through selected channels and prepare platform-specific data
      for (const platform of selectedChannels) {
        const platformKey = platform.toLowerCase();
        const config = Object.values(platforms).find(
          (p) => p.accountKey === platformKey
        );

        if (!config) {
          console.error(`Platform ${platform} not supported`);
          continue;
        }

        const account = userData?.socialMedia?.find(
          (acc) =>
            acc.platformName.toLowerCase() === config.platformName.toLowerCase()
        );

        if (!account) {
          alert(`No ${config.platformName} account connected.`);
          return;
        }

        const socialMediaID = account._id;
        platformData[platformKey] = await config.postData(socialMediaID);
      }

      const defaultScheduledTime = new Date().toISOString();

      // Prepare the unified payload
      const postData = {
        userId: userData?.user?._id,
        platformSpecific: platformData,
        postContent: editedContent || postContent,
        mediaUrls: mediaUrls,
        scheduledTime: scheduledTime || defaultScheduledTime,
        status,
      };



      const response = await api.post("/api/v1/post/post-add", postData);
      closePopup();
    } catch (error) {
      console.error("Error creating post:", error);

      if (error.response) {
        console.error("Server Response:", error.response.data);
        alert(`Server error: ${error.response.data.error}`);
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setIsPosting(false); // Hide loader
    }
  };

  const handleEditorSave = ({ postContent, mediaUrls }) => {
    setEditedContent(postContent);
    setMediaUrls(mediaUrls);
    setIsEditorOpen(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row dark:bg-bgCopnents dark:text-white">
            <div className="flex-1 p-6 transition-all duration-300 max-h-[820px] overflow-y-auto">
              <div className="max-w-3xl mx-auto">
                <span
                  onClick={closePopup}
                  className="flex justify-end mb-4 hover:cursor-pointer"
                >
                  {Icons.cross}
                </span>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-semibold">Build Your Post</h1>
                </div>

                <div className="mb-6">
                  <Button
                    variant="outline"
                    className="mb-5 bg-slate-100 text-sm px-4 border py-2 rounded-xl dark:bg-bgbutton border-borderDarkmode"
                    onClick={handleSelectAll}
                  >
                    {selectedChannels.length ===
                      channels.filter(ConnectChannels).length
                      ? "Deselect All Channels"
                      : "Pick All Connected Channels"}
                  </Button>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex flex-wrap gap-4 justify-center">
                      {channels.map((channel) => {
                        const isConnected = ConnectChannels(channel);
                        return (
                          <div
                            key={channel}
                            className="flex flex-col items-center text-center"
                          >
                            <button
                              onClick={() => handleChannelClick(channel)}
                              className={`relative rounded-full border p-1 ${selectedChannels.includes(channel)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200"
                                } transition-all duration-300`}
                              disabled={!isConnected}
                            >
                              <div
                                className="flex items-center justify-center rounded-full w-10 h-10 xs:w-10 xs:h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                              >
                                {channelIcons[channel] || "N/A"}
                              </div>
                              {selectedChannels.includes(channel) && (
                                <div
                                  className="absolute -top-1 -right-1 bg-blue-500 rounded-full flex items-center justify-center  w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                                >
                                  <span className="text-white text-xs sm:text-sm">✓</span>
                                </div>
                              )}
                            </button>

                            <span
                              className={`text-xs mt-1 xs:text-sm sm:text-base md:text-lg ${isConnected ? "text-green-500" : "text-red-500"
                                }`}
                            >
                              {isConnected && (
                                <span
                                  className="relative flex ml-2  h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4"
                                >
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full bg-rose-500 h-full w-full"></span>
                                </span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                </div>

                {selectedChannels.length === 0 ? (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Select a Channel to create a post.
                  </p>
                ) : (
                  <>
                    <div className="mb-6">
                      {selectedChannels.length === 1 &&
                        selectedChannels[0] === "Instagram" && (
                          <RadioGroup>
                            {["post", "reel", "story"].map((type) => (
                              <div
                                key={type}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={type}
                                  id={type}
                                  name="postType"
                                  checked={postType === type}
                                  onChange={() => setPostType(type)}
                                />
                                <Label htmlFor={type}>
                                  <span
                                    className={`px-3 py-2 rounded-xl transition-colors ${postType === type
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                      }`}
                                  >
                                    {type.charAt(0).toUpperCase() +
                                      type.slice(1)}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                    </div>

                    <div className="space-y-4">
                      <div
                        {...getRootProps()}
                        onClick={() => setIsEditorOpen(true)}
                        className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${isDragActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                          }`}
                      >
                        {previewImages.length > 0 || mediaUrls.length > 0 ? (
                          <div className="grid grid-cols-2 gap-4">
                            {mediaUrls.map((url, index) => (
                              <div key={`media-${index}`} className="relative">
                                <img
                                  src={url}
                                  alt={`Uploaded Media ${index + 1}`}
                                  className="w-full h-40 object-cover rounded-xl"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMediaUrls((prev) =>
                                      prev.filter((_, i) => i !== index)
                                    );
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}

                            {previewImages.map((preview, index) => (
                              <div
                                key={`preview-${index}`}
                                className="relative"
                              >
                                <img
                                  src={preview}
                                  alt={`Preview Image ${index + 1}`}
                                  className="w-full h-40 object-cover rounded-xl"
                                />

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                  <X className="h-4 w-4 text-black dark:text-white" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-gray-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
                              <ImageIcon className="text-gray-400 dark:text-black" />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-white">
                              {isDragActive
                                ? "Drop the files here"
                                : "Drag & drop or click to select files"}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="flex gap-4">
                        {[Hash, Music2].map((Icon, index) => (
                          <Button key={index} variant="outline" size="icon" className="px-2 py-2 border rounded-xl hover:bg-slate-50 flex items-center justify-center space-x-1   dark:bg-bgbutton  dark:border-borderDarkmode">
                            <Icon className="h-4 w-4" />
                          </Button>
                        ))}


                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="px-2 py-2 border rounded-xl hover:bg-slate-50 flex items-center justify-center    dark:bg-bgbutton  dark:border-borderDarkmode"
                        >
                          <SmileIcon className="h-4 w-4" />
                        </Button>
                        {/* <Button
                          variant="outline"
                          size="icon"
                          onClick={handleAIClick}
                          disabled={isLoadingAI} // Disable button while 
                          className="px-2 py-2 border rounded-xl hover:bg-slate-50 flex items-center justify-center space-x-1   dark:bg-bgbutton  dark:border-borderDarkmode"
                        >
                          <div className="flex items-center gap-2">
                            {isLoadingAI ? (
                              <>
                                <span className="h-4 w-4">{Icons.magic}</span>
                                <span className="hidden sm:block">AI Assistant</span>
                              </>
                            ) : (
                              <>
                                <span className="h-4 w-4">{Icons.magic}</span>
                                <span className="hidden sm:block">AI Assistant</span>
                              </>
                            )}
                          </div>
                        </Button> */}
                      </div>

                      {showEmojiPicker && (
                        <div className="relative">
                          <div className="absolute z-10 text-white dark:text-white hover:dark:text-white">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                          </div>
                        </div>
                      )}

                      {/* Textarea for AI Prompt */}
                      {/* {isAiPromptActive && (
                        <div className="space-y-4">
                          <div className="p-[2px] rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 ">
                            <Textarea
                              value={aiPrompt}
                              onChange={handleAiPromptChange}
                              placeholder="Type your AI prompt here..."
                              className="w-full px-3 py-2 border-none rounded-md focus:outline-none dark:bg-bgCopnents"
                            />
                          </div>
                          <Button
                            onClick={() => fetchAIContent(aiPrompt)}
                            disabled={!aiPrompt.trim() || isLoadingAI}
                            className={`px-6 py-2 font-medium text-white rounded-lg shadow-md transition-all duration-150 hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500  ${isLoadingAI
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 "
                              }`}
                          >
                            {isLoadingAI ? "Loading..." : "Generate Content"}
                          </Button>
                        </div>
                      )}
                      <div className="p-1 rounded-lg border">
                        <Textarea
                          value={postContent}
                          onChange={(e) => {
                            
                            setPostContent(e.target.value);
                          }}
                          placeholder="Start writing or use the AI Assistant"
                          className="min-h-[100px] rounded-lg w-full p-2 focus:outline-none dark:bg-bgCopnents"
                        />
                      </div> */}
                      <div className="space-y-4">
                        <div className="relative">
                          <Textarea
                            value={postContent}
                            onChange={handleTextareaChange}
                            rows={3}
                            placeholder="Type your content or AI prompt here..."
                            className="placeholder:text-sm w-full px-3 py-2 border border-gray-300 dark:bg-bgCopnents rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <Button
                            onClick={handleAiButtonClick}
                            disabled={isLoadingAI}
                            className="absolute right-[-5px] top-[-50px] text-xs bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white px-3 py-2 rounded-xl flex items-center gap-2 transition-all duration-300"
                          >
                            {isLoadingAI ? (
                              <>
                                <span className="loader animate-spin"></span>
                                Generating...
                              </>
                            ) : (
                              <>
                                {Icons.magic}
                                AI Assistant
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {selectedChannels.length === 1 &&
                      selectedChannels[0] === "Instagram" && (
                        <div className="space-y-4 mt-4">
                          <div className="flex gap-2">
                            <Input placeholder="Add first comment" />
                            <Input placeholder="Add Music" />
                          </div>
                          <div>
                            <Input placeholder="Add location" />
                          </div>
                        </div>
                      )}
                    <InputCalendar
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      placeholder="Add date"
                      className="dark:bg-bgCopnents dark:text-black"
                      iconClassName="text-red-600"
                    />

                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        className="font-bold text-slate-800 p-2 rounded-xl border hover:bg-slate-200 dark:bg-bgbutton border-borderDarkmode dark:text-white"
                        onClick={() => handleSubmit("draft")}
                      >
                        Save as Draft
                      </Button>
                      <Button
                        className="font-bold text-slate-800 rounded-xl  p-2 border hover:bg-slate-200  dark:bg-bgbutton border-borderDarkmode dark:text-white hidden sm:inline"
                        onClick={() => handleSubmit("scheduled")}
                      >
                        <span className="">
                          Schedule Post Now
                        </span>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {selectedChannels.length === 1 && (
              <div className="hidden md:block w-[400px] bg-gray-50 border-l p-6 transition-all duration-300 rounded-e-xl dark:bg-bgCopnents dark:text-white">
                <div className="sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">
                      {selectedChannels.join(", ")} Preview
                    </h3>
                    <Button variant="ghost" size="sm">
                      <SmileIcon className="h-4 w-4  dark:text-white hover:dark:text-black" />
                    </Button>
                  </div>

                  <div
                    className="rounded-xl p-4 min-h-[400px] flex flex-col items-center justify-start overflow-y-auto bg-cover bg-center"
                    style={{
                      backgroundImage:
                        mediaUrls[0] || previewImages[0]
                          ? "none"
                          : 'url("https://buffer-publish.s3.amazonaws.com/images/post-preview-generic-inv.png")',
                    }}
                  >
                    {selectedChannels.includes("Instagram") && (
                      <Insta
                        previewImage={mediaUrls[0] || previewImages[0] || null}
                        postContent={postContent}
                        data={data}
                      />
                    )}
                    {selectedChannels.includes("LinkedIn") && (
                      <Linkdin
                        previewImage={mediaUrls[0] || previewImages[0] || null}
                        postContent={postContent}
                        data={data}
                      />
                    )}
                    {selectedChannels.includes("XTwitter") && (
                      <Twitter
                        previewImage={mediaUrls[0] || previewImages[0] || null}
                        postContent={postContent}
                        data={data}
                      />
                    )}
                    {selectedChannels.includes("Pinterest") && (
                      <Printset
                        previewImage={mediaUrls[0] || previewImages[0] || null}
                        postContent={postContent}
                        data={data}
                      />
                    )}
                    {selectedChannels.includes("Facebook") && (
                      <Facebook
                        previewImage={mediaUrls[0] || previewImages[0] || null}
                        postContent={postContent}
                        data={data}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isEditorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg dark:bg-ScocilMCompnent">
            <Editer
              onSave={handleEditorSave}
              onClose={() => setIsEditorOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default NewPost;