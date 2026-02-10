// src/pages/home/Home.tsx
import { useState } from 'react';

import DashboardMain from './DashboardMain';
import LandingMain from './LandingMain';

const Home = () => {
  const [isLoggedIn] = useState(true);

  return <>{isLoggedIn ? <DashboardMain /> : <LandingMain />}</>;
};

export default Home;
