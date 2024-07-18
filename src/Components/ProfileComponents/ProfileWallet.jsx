import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddPaymentMethod from "./subComponents/AddPaymentMethod";

const Wallet = () => {
  const userPaymentOptions = useSelector(
    (state) => state.user.user.paymentoptions
  );
  const id = useSelector((state) => state.user.user._id);
  const email = useSelector((state) => state.user.user.email);

  const [editing, setEditing] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleEditClick = (key, value) => {
    setEditing(true);
    setEditingCard({ ...value, key });
    console.log(editingCard);
  };

  const handleSaveClick = async () => {
    // Save logic here
    // console.log(editingCard, userId);
    console.log(editingCard);
    const reqBody = JSON.stringify({ email, editingCard, id });
    console.log(reqBody);
    const updatepayment = await fetch(
      "https://multi-vendor-e-commerce-backend.vercel.app/api/users/updatepaymentmethod",
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: reqBody,
      }
    );
    const response = await updatepayment.text();
    window.location.reload()
    console.log(response);
    setEditing(false);
    setEditingCard(null);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditingCard(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCard((prevCard) => ({
      ...prevCard,
      details: {
        ...prevCard.details,
        [name]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl text-green-900 font-bold mb-2">My Wallet</h1>

      <div className="mb-8">
        <h2 className="text-2xl text-green-900 font-bold mb-4">
          Payment Options
        </h2>
        <div className="bg-white border border-green-900 rounded-lg p-4">
          {Object.entries(userPaymentOptions).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-start justify-between p-4 border-b border-green-900 last:border-none"
            >
              <span className="text-green-900 font-bold">
                Payment Type: {key}
              </span>
              <span className="text-green-900 mt-2 font-bold">
                Payment Method: {value.type}
              </span>
              {editing && editingCard && editingCard.key === key ? (
                <div className="w-full mt-4">
                  {Object.entries(editingCard.details).map(([field, value]) => {
                    return (
                      <div key={field}>
                        <label className="block text-green-900 font-bold mb-2">
                          {field}
                        </label>
                        <input
                          type={field}
                          name={field}
                          value={value}
                          onChange={handleInputChange}
                          className="border border-green-900 rounded p-2 mb-2 w-full"
                        />
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-end mt-4">
                    <button
                      className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-300 mr-2"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300 ml-2"
                      onClick={handleCancelClick}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="mt-4 bg-green-900 text-yellow-300 py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                  onClick={() => handleEditClick(key, value)}
                >
                  Edit
                </button> 
              )}
            </div>
          ))}
          {Object.entries(userPaymentOptions).length < 2 && (
            <AddPaymentMethod type={userPaymentOptions.Secondary ? 'Main' :  'Secondary'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
