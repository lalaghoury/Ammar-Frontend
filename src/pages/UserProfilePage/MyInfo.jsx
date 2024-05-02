import React from "react";
import { Button, Divider, Flex } from "antd";
import { useSelector } from "react-redux";
import Paragraph from "antd/es/typography/Paragraph";
import { useAddressEffect } from "../../redux/slices/addressSlice";
import { useNavigate } from "react-router-dom";

const MyInfo = () => {
  useAddressEffect();
  return (
    <div>
      <h1 className="w-[183px] h-[31px] text-[#3c4242] font-['Core Sans C'] text-[28px] font-semibold leading-[33px] mb-5">
        My Info
      </h1>
      <ContactDetails />
      <AddressDetails />
    </div>
  );
};

const ContactDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (field) => {
    console.log(field);
    switch (field) {
      case "password":
        navigate("/forgot-password");
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <h2 className="mb-[30px] w-[180px] h-[31px] text-[#3c4242] font-['core Sans C'] text-[22px] font-semibold leading-[2.0625rem]">
        Contact Details
      </h2>
      <Divider />
      <Flex vertical>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
            Your Name
          </h3>
          <Flex className="items-center justify-between">
            <Paragraph>{user?.name}</Paragraph>
            <Button type="text" onClick={() => handleChange("name")}>
              Change
            </Button>
          </Flex>
          <Divider className="sm-divider" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
            Email Address
          </h3>
          <Flex className="items-center justify-between">
            <Paragraph>{user?.email}</Paragraph>
            <Button type="text" onClick={() => handleChange("email")}>
              Change
            </Button>
          </Flex>
          <Divider className="sm-divider" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
            Phone Number
          </h3>
          <Flex className="items-center justify-between">
            <Paragraph>{user?.phone}</Paragraph>
            <Button type="text" onClick={() => handleChange("phone")}>
              Change
            </Button>
          </Flex>
          <Divider className="sm-divider" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
            Password
          </h3>
          <Flex className="items-center justify-between">
            <Paragraph>
              <div>
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
              </div>
            </Paragraph>
            <Button type="text" onClick={() => handleChange("password")}>
              Change
            </Button>
          </Flex>
          <Divider className="sm-divider" />
        </div>
      </Flex>
    </div>
  );
};

const AddressDetails = () => {
  const { data: addresses } = useSelector((state) => state.addresses);

  return (
    <div>
      <Flex justify="space-between" align="center">
        <h2 className="w-[99px] h-[31px] text-[#3c4242] font-['core Sans C '] text-[22px] font-semibold leading-[33px]">
          Address
        </h2>
        <Button type="text">Add New</Button>
      </Flex>
      <Flex gap={25} wrap="wrap">
        {addresses?.map((address) => (
          <div
            key={address?._id}
            className="w-[435px] h-[272px] rounded-[12px] bg-[#F6F6F6] py-[25px] px-[43px] flex flex-col text-[#807d7e] gap-y-5 font-['Causten'] font-medium"
          >
            <h4 className="text-[#3c4242] text-xl font-semibold leading-[normal]">
              {address?.first_name + " " + address?.last_name}
            </h4>
            <p className="leading-[normal]">{address?.phone}</p>
            <p>
              {address?.address_line_1 +
                ", " +
                address?.city +
                ", " +
                address?.state}{" "}
            </p>
            <Flex vertical gap={12}>
              <div className="flex gap-x-3">
                <Button className="dis-fcc gap-2.5 py-[7px] px-[19px] rounded-lg border border-[#807d7e] text-[#807d7e] font-medium w-[85px] h-[37px]">
                  Home
                </Button>
                <Button className="dis-fcc gap-2.5 py-[7px] px-[19px] rounded-lg border border-[#807d7e] text-[#807d7e] font-medium w-[200px] h-[37px]">
                  Default billing address
                </Button>
              </div>
              <Flex className="items-center gap-[10px]">
                <div className="text-[#3c4242] font-semibold cursor-pointer">
                  Remove
                </div>
                <div className="text-[#3c4242] font-semibold cursor-pointer">
                  Edit
                </div>
              </Flex>
            </Flex>
          </div>
        ))}
      </Flex>
    </div>
  );
};

export default MyInfo;
