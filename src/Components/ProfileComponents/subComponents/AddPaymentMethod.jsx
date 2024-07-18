import React, { useState } from "react";

export default function AddPaymentMethod({ type }) {
  const [adding, setAdding] = useState(false);
  const [newMethodType, setNewMethodType] = useState("");
  const [newMethodDetails, setNewMethodDetails] = useState({});

  const handleNewMethod = (e) => {
    const { value } = e.target;
    setNewMethodDetails({
      id: value === "Credit Card" ? 1 : 2,
      type: value,
    });
    setNewMethodType(value);
  };

  const handleNewMethodDetailsChange = (e) => {
    const { name, value } = e.target;
    setNewMethodDetails((prevDetails) => ({
      ...prevDetails,
      details: {
        ...prevDetails.details,
        [name]: value,
      },
    }));
  };

  const handleAddNewMethod = async () => {
    const reqbody = newMethodDetails;
    console.log(reqbody)
    const addnewpaymentreq = await fetch(
      "https://multi-vendor-e-commerce-backend.vercel.app/api/users/addnewpayment",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody),
      }
    );
    const response = await addnewpaymentreq.text();
    if(addnewpaymentreq.status === 200){
      setAdding(false);
      setNewMethodType("");
      setNewMethodDetails({});
      window.location.reload()
    }
    
  };

  const handleCancelAdd = () => {
    setAdding(false);
    setNewMethodType("");
    setNewMethodDetails({});
  };

  const fieldCheck = (newMethodDetails &&
      ((newMethodDetails.type === "Credit Card" &&
        (!newMethodDetails.details ||
          (newMethodDetails.details &&
            (!newMethodDetails.details.Name || newMethodDetails.details.Name === "") ||
            (!newMethodDetails.details["Credit Card Number"] || newMethodDetails.details["Credit Card Number"] === "") ||
            (!newMethodDetails.details.Expiry || newMethodDetails.details.Expiry === "") ||
            (!newMethodDetails.details.Cvv || newMethodDetails.details.Cvv === "")))) ||
       (newMethodDetails.type === "PayPal" &&
        (!newMethodDetails.details ||
          (newMethodDetails.details &&
            (!newMethodDetails.details.Name || newMethodDetails.details.Name === "") ||
            (!newMethodDetails.details.Email || newMethodDetails.details.Email === "") ||
            (!newMethodDetails.details.Password || newMethodDetails.details.Password === ""))))))
  
  
  return (
    <div>
      {adding ? (
        <div className="w-full mt-4">
          <label className="block text-green-900 font-bold mb-2">
            Payment Method
          </label>
          <select
            value={newMethodType}
            onChange={handleNewMethod}
            className="border border-green-900 rounded p-2 mb-2 w-full"
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
          <label className="block text-green-900 font-bold mb-2">
            Payment Type
          </label>
          <select
            value={newMethodDetails.details && newMethodDetails.details[type]}
            onChange={handleNewMethodDetailsChange}
            className="border border-green-900 rounded p-2 mb-2 w-full"
            name={type}
          >
            <option value="">Select Payment Type</option>
            <option value={type}>{type}</option>
          </select>
          {newMethodType && (
            <>
              {newMethodType === "Credit Card" && (
                <>
                  <label className="block text-green-900 font-bold mb-2">
                    Credit Card Number
                  </label>
                  <input
                    type="text"
                    name="Credit Card Number"
                    value={
                      (newMethodDetails.details &&
                        newMethodDetails.details["Credit Card Number"]) ||
                      ""
                    }
                    onChange={handleNewMethodDetailsChange}
                    className="border border-green-900 rounded p-2 mb-2 w-full"
                  />
                  <label className="block text-green-900 font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={
                      (newMethodDetails.details &&
                        newMethodDetails.details.Name) ||
                      ""
                    }
                    onChange={handleNewMethodDetailsChange}
                    className="border border-green-900 rounded p-2 mb-2 w-full"
                  />
                  <label className="block text-green-900 font-bold mb-2">
                    Expiry
                  </label>
                  <input
                    type="text"
                    name="Expiry"
                    value={
                      (newMethodDetails.details &&
                        newMethodDetails.details.Expiry) ||
                      ""
                    }
                    onChange={handleNewMethodDetailsChange}
                    className="border border-green-900 rounded p-2 mb-2 w-full"
                    placeholder="MM/YY"
                  />
                  <label className="block text-green-900 font-bold mb-2">
                    Cvv
                  </label>
                  <input
                    type="password"
                    name="Cvv"
                    value={
                      (newMethodDetails.details &&
                        newMethodDetails.details.Cvv) ||
                      ""
                    }
                    onChange={handleNewMethodDetailsChange}
                    className="border border-green-900 rounded p-2 mb-2 w-full"
                    placeholder="123"
                  />
                </>
              )}
              {newMethodType === "PayPal" && (
                <>
                  <label className="block text-green-900 font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={
                      (newMethodDetails.details &&
                        newMethodDetails.details.Name) ||
                      ""
                    }
                    onChange={handleNewMethodDetailsChange}
                    className="border border-green-900 rounded p-2 mb-2 w-full"
                  />
                  <label className="block text-green-900 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    name="Email"
                    value={
                      (newMethodDetails.details &&
                        newMethodDetails.details.Email) ||
                      ""
                    }
                    onChange={handleNewMethodDetailsChange}
                    className="border border-green-900 rounded p-2 mb-2 w-full"
                  />
                  <label className="block text-green-900 font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="Password"
                    value={
                      (newMethodDetails.details &&
                        newMethodDetails.details.Password) ||
                      ""
                    }
                    onChange={handleNewMethodDetailsChange}
                    className="border border-green-900 rounded p-2 mb-2 w-full"
                  />
                </>
              )}

              <div className="flex items-center justify-end mt-4">
                <button
                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-300 mr-2"
                  onClick={handleAddNewMethod}
                  style = {{background:fieldCheck && 'grey'}}
                  disabled = {fieldCheck}
                >
                  Add Payment Method
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={handleCancelAdd}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          className="mt-4 bg-green-900 text-yellow-300 py-2 px-4 rounded hover:bg-green-700 transition duration-300"
          onClick={() => setAdding(true)}
        >
          Add Payment Method
        </button>
      )}
    </div>
  );
}
