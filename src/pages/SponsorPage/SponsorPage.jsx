import DashboardOverview from "../../components/DashboardOverview/DashboardOverview";
import SponsorRequests from "../../components/SponsorList/SponsorRequests";
import { overviewData, sponsorsRequests } from "../../constants";

const SponsorPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DashboardOverview overviewData={overviewData} />
      <SponsorRequests data={sponsorsRequests} />
    </div>
  );
};

export default SponsorPage;
