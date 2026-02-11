import { useState } from 'react';

import DashboardMain from './DashboardMain';
import LandingMain from './LandingMain';

const Home = () => {
  const [isLoggedIn] = useState(false);

  return <>{isLoggedIn ? <DashboardMain /> : <LandingMain />}</>;
};

export default Home;
