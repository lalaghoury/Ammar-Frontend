import { Button, Card } from "antd";
import {
  LinkedinOutlined,
  FacebookOutlined,
  TwitterOutlined,
  MailOutlined,
} from "@ant-design/icons";

const StartupProfile = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Startup Profile</h1>
          <p className="text-sm text-gray-500">
            Dashboard &gt; Startup Profile
          </p>
        </div>
        <div className="flex gap-4">
          <Button className="border-gray-400" type="default">
            Decline
          </Button>
          <Button type="primary">Accept</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile Avatar"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">Aisha Doe</h2>
              <p className="text-gray-500">CEO at (Startup name)</p>
            </div>
          </div>

          <h3 className="mt-6 text-lg font-semibold">About</h3>
          <p className="text-gray-600 mt-2 leading-6">
            Velstar is a Shopify Plus agency, and we partner with brands to help
            them grow, we also do the same with our people! Here at Velstar, we
            don't just make websites; we create exceptional digital experiences
            that consumers love. Our team of designers, developers, and
            strategists work together to push brands to the next level.
          </p>
          <p className="text-gray-600 mt-2 leading-6">
            The role will involve translating project specifications into clean,
            test-driven, maintainable code. You will work with the Project and
            Development teams to deliver work that meets functional &
            non-functional requirements. You will have the opportunity to create
            secure and scalable features for our clients.
          </p>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {/* Employees and Location Card */}
          <Card className="shadow-md">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Employees</p>
                <h3 className="text-xl font-semibold text-green-500">
                  120 Employees
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Startup Location</p>
                <h3 className="text-xl font-semibold">Dhaka, Bangladesh</h3>
              </div>
            </div>
          </Card>

          {/* Startup Overview Card */}
          <Card className="shadow-md">
            <h3 className="text-lg font-semibold mb-4">Startup Overview</h3>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Date Joined</p>
                <h4 className="font-semibold">14 Jun, 2021</h4>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  No of Sponsors Connected
                </p>
                <h4 className="font-semibold">12</h4>
              </div>
            </div>
          </Card>

          {/* Share Profile Section */}
          <Card className="shadow-md">
            <h3 className="text-lg font-semibold mb-4">Share this profile:</h3>
            <div className="flex gap-4">
              <Button
                icon={<LinkedinOutlined />}
                type="default"
                shape="circle"
              />
              <Button
                icon={<FacebookOutlined />}
                type="default"
                shape="circle"
              />
              <Button
                icon={<TwitterOutlined />}
                type="default"
                shape="circle"
              />
              <Button icon={<MailOutlined />} type="default" shape="circle" />
            </div>
            <Button className="mt-4" type="primary">
              Copy Links
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StartupProfile;
