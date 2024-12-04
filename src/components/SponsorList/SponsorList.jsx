import SponsorTable from "./SponsorTable";
import styles from "./SponsorList.module.css";

const SponsorList = ({ sponsors, pagination }) => {
  return (
    <div className={styles.sponsorListContainer}>
      <h2 className={styles.title}>Sponsor Lists:</h2>
      <SponsorTable sponsors={sponsors} pagination={pagination} />
    </div>
  );
};

export default SponsorList;
