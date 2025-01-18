import React, { useState, useEffect } from "react";
import api from "../../apis/api";
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    weekStart: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: "SmallBusinessOwners", label: "Small Business Owner" },
    { id: "Solopreneurs", label: "Solopreneur" },
    { id: "ContentCreators", label: "Content Creator" },
    { id: "SocialMediaManagers", label: "Social Media Manager" },
    { id: "MarketingProfessionals", label: "Marketing Professional" },
  ];

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRoleChange = (role) => {
    setFormValues((prev) => ({
      ...prev,
      role: role,
    }));
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user._id;

      setLoading(true);
      const response = await api.get(`/api/v1/user/user-get/${userId}`);
      setLoading(false);


      if (response.data && response.data.success) {
        const { name, email, phoneNumber, role, weekStart } = response.data.data.user;
        setFormValues({
          name: name || "",
          email: email || "",
          phoneNumber: phoneNumber || "",
          role: role || "",
          weekStart: weekStart || "Monday",
        });
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error fetching user data.");
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user._id;

      setLoading(true);
      const response = await api.put(`/api/v1/user/user-update/${userId}`, formValues);
      setLoading(false);

      if (response.data.success) {
        setSuccess("Profile updated successfully!");
        setIsEditable(false);
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error updating profile.");
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="antialiased grid place-items-center min-h-screen px-4 sm:px-0">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 dark:bg-bgCopnents dark:text-white" >
        <h1 className="text-3xl sm:text-4xl font-bold dark:text-white">Edit Your Profile</h1>
        <p className="text-slate-500 mt-3 dark:text-white">"Update your profile details and preferences."</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && <p className="text-blue-500 text-center mb-4">Loading...</p>}

        <form className="mt-7 flex flex-col space-y-3">
          {/* Name */}
          <label htmlFor="name">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">Full Name*</p>
            <input
              id="name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode  dark:border-borderDarkmode" 
              placeholder="Enter your full name"
              disabled={!isEditable}
              required
            />
          </label>

          {/* Email */}
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">Email*</p>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode  dark:border-borderDarkmode"
              placeholder="Enter your email"
              disabled={!isEditable}
              required
            />
          </label>

          {/* Phone Number */}
          <label htmlFor="phoneNumber">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">Phone Number*</p>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode  dark:border-borderDarkmode"
              placeholder="Enter your phone number"
              disabled={!isEditable}
              required
            />
          </label>

          {/* Week Start */}
          <label htmlFor="weekStart">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">Select Your Week Start Day</p>
            <select
              id="weekStart"
              name="weekStart"
              value={formValues.weekStart}
              onChange={handleInputChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:text-white dark:bg-darkmode  dark:border-borderDarkmode"
              disabled={!isEditable}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>

          {/* Role */}
          <div>
            <p className="font-medium text-slate-700 pb-2 dark:text-white">Role</p>
            <div className="flex flex-wrap gap-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => isEditable && handleRoleChange(role.id)}
                  className={`cursor-pointer flex items-center justify-center py-3 px-6 border rounded-lg transition-all hover:shadow-md dark:bg-bgbutton ${formValues.role === role.id ? "border-black dark:border-white  bg-gray-100" : " dark:text-white border-black dark:bg-bgbutton"
                    }`}
                >
                  <span className="text-sm font-medium text-slate-700  flex items-center dark:text-white">
                    {role.label}
                    {formValues.role === role.id && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-black ml-2 dark:text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-6">
            {isEditable ? (
              <button
                type="button"
                className="w-full py-3 px-6 text-white bg-slate-500 rounded-md hover:bg-gradient-to-l hover:from-gray-500 hover:via-gray-800 hover:to-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 transition-all duration-300 ease-in-out "
                onClick={handleSave}
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                className="w-full py-3 px-6 text-white bg-slate-500 rounded-md hover:bg-gradient-to-l hover:from-gray-500 hover:via-gray-800 hover:to-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 transition-all duration-300 ease-in-out"
                onClick={toggleEdit}
              >
                Edit Profile
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;