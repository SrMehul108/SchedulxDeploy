import React from "react";
import { Link } from "react-router-dom";

const Billing = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 p-4 min-h-screen">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-start ">Billing</h2>
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2 border-b-2 pb-3">Plans</h3>
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-medium">Free Trial</h3>
              </div>
              <div>
                <button className="bg-black text-white font-bold px-4 py-2 rounded-md hover:bg-gray-700">
                  Trial
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Your free trial ends in <span className="font-bold">9 days</span>{" "}
              on <span className="font-bold">December 27, 2024</span>.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-700">
                We noticed that your billing address is missing. To make sure we
                comply with tax regulations in your region,{" "}
                <Link
                  to={""}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  please add your billing address
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 border-b-2 pb-6">
              <div className="text-center p-4 border rounded-md">
                <p className="font-semibold">Users</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="text-center p-4 border rounded-md">
                <p className="font-semibold">Channels</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="text-center p-4 border rounded-md">
                <p className="font-semibold">First bill after trial</p>
                <p className="text-sm text-gray-500">Usage Changes</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                Cancel Trial
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700">
                Change Plan
              </button>
            </div>
          </div>
        </section>
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-medium mb-4 border-b-2 pb-4 ">Business Information</h3>
          <div>
            <div className="mb-2 border-b-2 pb-4">
              <p className="font-semibold pb-2">Address</p>
              <p className="text-sm text-gray-500">
                You haven't added your address yet.{" "}
                <Link
                  to={""}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Add Your Address
                </Link>
              </p>
            </div>
            <div className="border-b-2 pb-4">
              <p className="font-semibold pb-2">Business Status</p>
              <p className="text-sm text-gray-500 mb-2">
                Your business status helps us determine if we need to charge you
                VAT (Value Added Tax) or the applicable sales tax in your
                region.
              </p>
              <p className="text-sm text-gray-700 font-semibold">
                Not a business
              </p>
              <p className="text-sm text-gray-500 ">
                Your business status helps us determine if we need to charge you
                VAT (Value Added Tax) or the applicable sales tax in your
                region.
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Update Information
            </button>
          </div>
        </section>
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-medium mb-4">Invoices & Receipts</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left text-gray-500 p-2">Date</th>
                <th className="text-left text-gray-500 p-2">Amount</th>
                <th className="text-left text-gray-500 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">December 13, 2024</td>
                <td className="p-2">$0.00</td>
                <td className="p-2">
                  <Link
                    to={""}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    View
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Billing;
