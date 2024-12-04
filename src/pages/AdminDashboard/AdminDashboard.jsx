import AdminTable from "../../admin/adminTable";
import DashboardOverview from "../../components/DashboardOverview/DashboardOverview";
import { adminCloumns, overviewData } from "../../constants";

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DashboardOverview overviewData={overviewData} />

      <AdminTable data={adminCloumns} />
    </div>
  );
};

export default AdminDashboard;
