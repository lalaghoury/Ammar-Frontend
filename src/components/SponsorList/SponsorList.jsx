import SponsorTable from "./SponsorTable";
import styles from "./SponsorList.module.css";

const SponsorList = ({ sponsors, pagination, prefix }) => {
  return (
    <div className={styles.sponsorListContainer}>
      <h2 className={styles.title}>Sponsor Lists:</h2>
      <SponsorTable
        sponsors={sponsors}
        pagination={pagination}
        prefix={prefix}
      />
    </div>
  );
};

export default SponsorList;
