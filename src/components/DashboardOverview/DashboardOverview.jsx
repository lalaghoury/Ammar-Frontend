import OverviewCard from "./OverviewCard";
import styles from "./DashboardOverview.module.css";

const DashboardOverview = ({ overviewData }) => {
  return (
    <div className={styles.overviewContainer}>
      {overviewData.map((data) => (
        <OverviewCard key={data.title} data={data} />
      ))}
    </div>
  );
};

export default DashboardOverview;
