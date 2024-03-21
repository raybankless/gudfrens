import { NextPage } from 'next';
import { useDisconnect, ConnectWallet} from '@thirdweb-dev/react';
import styles from '../styles/Dashboard.module.css'; // Ensure you have this CSS file in your styles directory
import { useRouter } from 'next/router';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const {email, address } = router.query; // Retrieve email and address from the query
  const disconnect = useDisconnect();

  // Navigate to the Events page
  const navigateToEvents = () => {
    router.push('/events');
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to GudFrens</h1>
        <ConnectWallet />
        <nav className={styles.navigation}>
          <button className={styles.navButton} onClick={navigateToEvents}>Events</button>
          <button className={styles.navButton}>Task Boards</button>
          <button className={styles.navButton}>Communities</button>
        </nav>
      </header>
      
        

      <section className={styles.collection}>
        <h2 className={styles.collectionTitle}>My Collection</h2>
        {/* Collection items will be mapped here */}
      </section>
    </div>
  );
};

export default Dashboard;
