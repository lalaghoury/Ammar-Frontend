import DashboardOverview from "../../components/DashboardOverview/DashboardOverview";
import SponsorList from "../../components/SponsorList/SponsorList";
import { overviewData, sponsors } from "../../constants";

const StartupPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DashboardOverview overviewData={overviewData} />
      <SponsorList
        sponsors={sponsors}
        pagination={{ pageSize: 5, total: 120 }}
        prefix="startup"
      />
    </div>
  );
};

export default StartupPage;
