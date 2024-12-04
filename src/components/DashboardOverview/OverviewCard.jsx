import styles from "./DashboardOverview.module.css";

const OverviewCard = ({ data }) => {
  const { icon, title, value, change } = data;

  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardValue}>{value}</div>
        <div className={styles.cardChange}>{change}</div>
      </div>
    </div>
  );
};

export default OverviewCard;
