import React from "react";
import { Button, Divider, Flex, Input, Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Paragraph from "antd/es/typography/Paragraph";
import { userThunks } from "../../redux/slices/userSlice";

const MyInfo = () => {
  return (
    <div>
      <h1 className="w-[183px] h-[31px] text-[#3c4242] font-['Core Sans C'] text-[28px] font-semibold leading-[33px] mb-5">
        My Info
      </h1>
      <ContactDetails />
    </div>
  );
};

const ContactDetails = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [editable, setEditable] = React.useState(null);
  const [text, setText] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");

  const handleEdit = (field) => {
    if (text === user[field]) {
      setEditable(null);
      setText("");
      return;
    }

    Modal.confirm({
      title: `Are you sure you want to update your ${field}?`,
      content: "Once updated, the action cannot be undone.",
      onOk: () => {
        dispatch(
          userThunks.updateUser({
            url: `/users/single/update/${user?._id}`,
            values: { [field]: text },
          })
        );
      },
    });

    setEditable(null);
    setText("");
  };

  const handlePasswordChange = () => {
    if (!oldPassword || !text || oldPassword === text) {
      setEditable(null);
      setOldPassword("");
      setText("");
      return;
    }

    dispatch(
      userThunks.updateUser({
        url: `/users/single/update/password/${user?._id}`,
        values: { oldPassword, newPassword: text },
      })
    );

    setEditable(null);
    setOldPassword("");
    setText("");
  };

  const constants = ["Name", "Email Address", "Phone Number"];

  return (
    <Spin size="large" spinning={loading} tip="Loading...">
      <h2 className="mb-[30px] w-[180px] h-[31px] text-[#3c4242] font-['core Sans C'] text-[22px] font-semibold leading-[2.0625rem]">
        Contact Details
      </h2>
      <Divider />
      <Flex vertical>
        {constants.map((constant) => {
          const field = constant.split(" ")[0]?.toLowerCase();
          const isEditable = editable === field;
          const userField = user[field];

          return (
            <div key={field} className="flex flex-col gap-y-2">
              <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
                {constant}
              </h3>
              <Flex className="items-center justify-between">
                {isEditable ? (
                  <div>
                    <p>
                      Your current {constant} is: <strong>{userField}</strong>
                    </p>
                    <p>Please Enter Your New {constant} Below:</p>
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="text"
                        value={text}
                        size="small"
                        onChange={(e) => setText(e.target.value)}
                      />
                      <Button onClick={() => handleEdit(field)}>Change</Button>
                    </div>
                  </div>
                ) : (
                  <Paragraph>{userField}</Paragraph>
                )}

                <Button
                  type="text"
                  onClick={() => {
                    if (isEditable) {
                      setEditable(null);
                      setText("");
                    } else {
                      setEditable(field);
                      setText(userField);
                    }
                  }}
                >
                  {isEditable ? "Cancel" : "Change"}
                </Button>
              </Flex>
              <Divider className="sm-divider" />
            </div>
          );
        })}

        {user?.provider === "local" && (
          <div className="flex flex-col gap-y-2">
            <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
              Password
            </h3>
            <Flex className="items-center justify-between">
              {editable === "password" ? (
                <div>
                  <p>Please Enter Your Current And New Password Below: </p>
                  <div className="flex gap-2 mt-2">
                    <div className="flex flex-col gap-2">
                      <Input
                        type="password"
                        value={oldPassword}
                        size="small"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <Input
                        type="password"
                        value={text}
                        size="small"
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>
                    <Button onClick={handlePasswordChange}>Change</Button>
                  </div>
                </div>
              ) : (
                <Paragraph>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="72"
                    height="5"
                    viewBox="0 0 72 5"
                    fill="none"
                  >
                    <circle cx="2.4" cy="2.40024" r="2.4" fill="#333333" />
                    <circle cx="12.0001" cy="2.40024" r="2.4" fill="#333333" />
                    <circle cx="21.6002" cy="2.40024" r="2.4" fill="#333333" />
                    <circle cx="31.1998" cy="2.40024" r="2.4" fill="#333333" />
                    <circle cx="40.7999" cy="2.40024" r="2.4" fill="#333333" />
                    <circle cx="50.4" cy="2.40024" r="2.4" fill="#333333" />
                    <circle cx="60.0001" cy="2.40024" r="2.4" fill="#333333" />
                    <circle cx="69.6002" cy="2.40024" r="2.4" fill="#333333" />
                  </svg>
                </Paragraph>
              )}
              <Button
                type="text"
                onClick={() => {
                  if (editable === "password") {
                    setEditable(null);
                    setText("");
                  } else {
                    setEditable("password");
                  }
                }}
              >
                {editable === "password" ? "Cancel" : "Change"}
              </Button>
            </Flex>
            <Divider className="sm-divider" />
          </div>
        )}
      </Flex>
    </Spin>
  );
};

export default MyInfo;
