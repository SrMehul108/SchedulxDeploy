import React from "react";

export default function ManagePage() {
  const users = [
    {
      id: 1,
      name: "schedulx_demo",
      email: "schedulx@gmail.com",
      role: "Owner",
      twoStep: "Not Enabled",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/5 bg-gray-100 p-4 dark:bg-darkmode dark:text-white ">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-blue-500 text-2xl">👤</span>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white" >Users</h2>
        </div>
      </div>
      <div className="flex-1 p-4 dark:bg-bgCopnents">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Users</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700  dark:border-borderDarkmode dark:bg-bgbutton dark:hover:bg-white dark:hover:text-black">
            Invite a New User
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search Users"
            className="md:w-1/4 border w-full border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 dark:bg-ScocilMCompnent dark:border-borderDarkmode"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg dark:bg-ScocilMCompnent dark:border-borderDarkmode">
            <thead>
              <tr className="bg-gray-50 border-b text-gray-600 text-sm dark:bg-ScocilMCompnent dark:text-white dark:border-borderDarkmode">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Account Email</th>
                <th className="py-3 px-4 text-left">2 Step Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 dark:bg-ScocilMCompnent dark:text-white dark:border-borderDarkmode">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:text-white">
                      👤
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-white">{user.role}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-white">{user.email}</td>
                  <td className="py-3 px-4 flex items-center gap-1 text-red-500">
                    <span className="text-red-600 text-sm">●</span>
                    {user.twoStep}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
