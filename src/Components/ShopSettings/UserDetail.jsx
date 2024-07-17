import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/userSlice";
import { redirect, useSubmit } from "react-router-dom";

const UserDetails = ({ shopname, shoplogo, shopid, email, phone, _id }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  //const { username, displayname, age, email, address, phone, _id } = user;
  const submit = useSubmit();
  const [userDetails, setUserDetail] = useState({ shopname, shopid, email, phone , shoplogo });

  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");

  const handleEditClick = (field) => {
    setEditingField(field);
    setFieldValue(userDetails[field]);
  };

  const handleSaveClick = async () => {
    let reqBody = {};
    reqBody.id = _id;
    reqBody.fieldname = editingField;
    reqBody.fieldvalue = fieldValue;
    let bodyContent = JSON.stringify(reqBody);
    const sendUpdateRequest = await fetch(
      "http://localhost:3000/api/shop/updateuser",
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: bodyContent,
      }
    );
    /*if(sendUpdateRequest.status === 200 && editingField === 'email'){
      setEditingField(null);
      submit(null,{ method: "POST", encType: "application/json", action:`/home` })
      setUserDetail({...userDetails, [editingField] : fieldValue});

    }*/
    if(sendUpdateRequest.status === 200 /**&& editingField !== 'email' */){
      setEditingField(null);
      setUserDetail({...userDetails, [editingField] : fieldValue});
     dispatch(userAction.updateUser({key:[editingField],value:fieldValue}))
      window.location.reload()

    }
    const response = await sendUpdateRequest.json();

    console.log(sendUpdateRequest.status,response)
    
  };

  const handleCancelClick = () => {
    setEditingField(null);
  };

  return (
    <div className="container w-12/12 mx-auto p-8">
      <h1 className="text-3xl text-green-900 font-bold mb-8">User Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(userDetails).map(([field, value]) => (
          <div
            key={field}
            className="flex items-center justify-between p-4 border border-green-900 rounded-lg"
          >
            <span className="text-green-900 font-bold capitalize mr-5">
              {field}:
            </span>
            {editingField === field ? (
              <div className="flex items-center">
                <input
                  type="text"
                  className="border border-green-900 rounded p-2 mr-2"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  
                />
                <button
                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-300 mr-2"
                  onClick={() => {
                    handleSaveClick(field);
                  }}
                  style={{background:fieldValue === ''  ? 'grey'  : 'green'}}
                    disabled={  (fieldValue === '') ? true : false}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-yellow-900">{value}</span>
                <button
                  className="ml-4 hover:underline bg-green-900 pl-3 pr-3 text-yellow-300"
                  onClick={() => handleEditClick(field)}
                  disabled={field === 'email' || field === 'phone' && true}
                  style={{background:field === 'email' || field === 'phone'? 'grey':null,color:field === 'email' || field === 'phone'? 'white':null}}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
