import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/userSlice";
import { redirect, useSubmit } from "react-router-dom";
const UserSettings = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const {   email, phone, password, _id } = user;
  const submit = useSubmit();
  const [userDetails, setUserDetail] = useState({
     password,
     email,
     phone,
   });

  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEditClick = (field) => {
    setEditingField(field);
    setFieldValue(userDetails[field]);
  };

  const handleSaveClick = async () => {
    console.log(fieldValue)
    let reqBody = {};
    reqBody.id = _id;
    reqBody.fieldname = editingField;
    reqBody.fieldvalue = fieldValue;
    reqBody.confirmPassword = confirmPassword;
    let bodyContent = JSON.stringify(reqBody);
    const sendUpdateRequest = await fetch(
      "http://localhost:3000/api/users/updatesecurity",
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
    if(sendUpdateRequest.status === 200 && editingField === 'email'){
      setEditingField(null);
      submit(null,{ method: "POST", encType: "application/json", action:`/home` })
      //console.log(sendUpdateRequest.status)

    }
    if(sendUpdateRequest.status === 200 && editingField !== 'email'){
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
    setFieldValue('');
    setConfirmPassword('');

  };

  return (
    <div className="container w-12/12 mx-auto p-8">
      <h1 className="text-3xl text-green-900 font-bold mb-8">Security Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {Object.entries(userDetails).map(([field, value]) => (
          <div
            key={field}
            className="flex items-center justify-between p-4 border border-green-900 rounded-lg"
          >
            <span className="text-green-900 font-bold capitalize mr-5">
              {field}:
            </span>
            {editingField === field ? (
              <div className="flex flex-col items-start">
                <label className="mb-2 font-bold text-green-900">
                  {field === 'password' ? 'New Password' : 'Value'}
                </label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  className="border border-green-900 rounded p-2 mb-2"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                />
                {field === 'password' && (
                  <>
                    <label className="mb-2 font-bold text-green-900">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="border border-green-900 rounded p-2 mb-2"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </>
                )}
                <div className="flex items-center">
                  <button
                    className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-300 mr-2"
                    onClick={() => handleSaveClick(field)}
                    style={{background:(field === 'password' && confirmPassword != fieldValue ) || (field === 'email' && !fieldValue.includes('@')) || fieldValue === ''  ? 'grey'  : 'green'}}
                    disabled={(field === 'password' && confirmPassword != fieldValue) || (field === 'email' && !fieldValue.includes('@')) || (fieldValue === '') ? true : false}
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
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-yellow-900">{value}</span>
                <button
                  className="ml-4 hover:underline bg-green-900 pl-3 pr-3 text-yellow-300"
                  onClick={() => handleEditClick(field)}
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

export default UserSettings;
