import {
  FileOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const overviewData = [
  {
    icon: <UserOutlined />,
    title: "Total Revenue",
    value: "$50000",
    change: "10% vs last month",
  },
  {
    icon: <UserOutlined />,
    title: "Connected Sponsors",
    value: "5",
    change: "10% vs last month",
  },
  {
    icon: <UserOutlined />,
    title: "Total Employees",
    value: "16",
    change: "10% vs last month",
  },
];

export const sponsors = Array.from({ length: 6 }).map((_, index) => ({
  id: `0${index + 1}`,
  name: "Tech World",
  avatar: "https://via.placeholder.com/32",
  investment: "15 Startups",
  email: "email@example.com",
  contact: "+123 456 789",
}));

export const sponsorsRequests = [
  {
    id: "01",
    userName: "Aisha Doe",
    avatar: "https://via.placeholder.com/32",
    companyName: "Tech Startup",
    role: "High Level Employee",
    email: "email@example.com",
    contact: "+123 456 789",
    registrationDate: "20/4/24",
  },
  {
    id: "02",
    userName: "Chukwuma",
    avatar: "https://via.placeholder.com/32",
    companyName: "Tech Startup",
    role: "CEO",
    email: "email@example.com",
    contact: "+123 456 789",
    registrationDate: "20/4/24",
  },
  {
    id: "03",
    userName: "Suleiman",
    avatar: "https://via.placeholder.com/32",
    companyName: "Tech Startup",
    role: "High Level Employee",
    email: "email@example.com",
    contact: "+123 456 789",
    registrationDate: "20/4/24",
  },
  {
    id: "04",
    userName: "Olamide",
    avatar: "https://via.placeholder.com/32",
    companyName: "Tech Startup",
    role: "CEO",
    email: "email@example.com",
    contact: "+123 456 789",
    registrationDate: "20/4/24",
  },
  {
    id: "05",
    userName: "Jide",
    avatar: "https://via.placeholder.com/32",
    companyName: "Tech Startup",
    role: "High Level Employee",
    email: "email@example.com",
    contact: "+123 456 789",
    registrationDate: "20/4/24",
  },
];

export const adminCloumns = [
  {
    id: "01",
    userName: "Aisha Doe",
    avatar: "https://via.placeholder.com/32",
    type: "Startup",
    email: "aisha@example.com",
    contact: "+123 456 789",
    registrationDate: "2024-04-20",
  },
  {
    id: "02",
    userName: "John Smith",
    avatar: "https://via.placeholder.com/32",
    type: "Sponsor",
    email: "john@example.com",
    contact: "+987 654 321",
    registrationDate: "2024-03-15",
  },
  {
    id: "03",
    userName: "Suleiman",
    avatar: "https://via.placeholder.com/32",
    type: "Startup",
    email: "suleiman@example.com",
    contact: "+123 789 456",
    registrationDate: "2024-02-10",
  },
  {
    id: "04",
    userName: "Olamide",
    avatar: "https://via.placeholder.com/32",
    type: "Sponsor",
    email: "olamide@example.com",
    contact: "+321 654 987",
    registrationDate: "2024-01-25",
  },
  {
    id: "05",
    userName: "Jide",
    avatar: "https://via.placeholder.com/32",
    type: "Startup",
    email: "jide@example.com",
    contact: "+456 789 123",
    registrationDate: "2024-04-12",
  },
];

export const startupMenuItems = [
  { key: "/startup", label: "Dashboard", icon: <HomeOutlined /> },
  { key: "/startup/requests", label: "My Requests", icon: <FileOutlined /> },
  { key: "/startup/messages", label: "Message", icon: <MessageOutlined /> },
  // { key: "/help", label: "Help", icon: <InfoCircleOutlined /> },
  { key: "", label: "Logout", icon: <LogoutOutlined /> },
];

export const sponsorMenuItems = [
  { key: "/sponsor", label: "Dashboard", icon: <HomeOutlined /> },
  // {
  //   key: "/startups-list",
  //   label: "StartUp Lists",
  //   icon: <UsergroupAddOutlined />,
  // },
  // { key: "/requests", label: "Requests", icon: <FileOutlined /> },
  { key: "/sponsor/messages", label: "Message", icon: <MessageOutlined /> },
  // { key: "/help", label: "Help", icon: <InfoCircleOutlined /> },
  { key: "", label: "Logout", icon: <LogoutOutlined /> },
];

export const adminMenuItems = [
  { key: "/admin", label: "Dashboard", icon: <HomeOutlined /> },
  {
    key: "/admin/users",
    label: "User list",
    icon: <UsergroupAddOutlined />,
  },
  { key: "", label: "Logout", icon: <LogoutOutlined /> },
];
