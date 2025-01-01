import DashboardOverview from '../../components/DashboardOverview/DashboardOverview';
import SponsorList from '../../components/SponsorList/SponsorList';
import { overviewData } from '../../constants';

const StartupPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DashboardOverview overviewData={overviewData} />

      <SponsorList prefix="startup" />
    </div>
  );
};

export default StartupPage;
