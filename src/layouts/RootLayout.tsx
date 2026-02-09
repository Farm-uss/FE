import { Outlet, useLocation, useMatch } from 'react-router-dom';

const RootLayout = () => {
  const { pathname } = useLocation();

  const isSplash = useMatch('/');
  const isLogin = pathname.startsWith('/login');

  if (isSplash || isLogin) {
    return <Outlet />;
  }

  return (
    <div className="pageContainer">
      <div className="scrollArea scroll">
        <div className="screenSection relative overflow-hidden">
          <main className="mainSection">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
