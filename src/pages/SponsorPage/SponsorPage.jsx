import DashboardOverview from '../../components/DashboardOverview/DashboardOverview';
import MyRequests from '../../components/SponsorList/MyRequests';
import { overviewData } from '../../constants';

const SponsorPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DashboardOverview overviewData={overviewData} />

      <MyRequests />
    </div>
  );
};

export default SponsorPage;
