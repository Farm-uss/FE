import { Outlet, useLocation, useMatch } from 'react-router-dom';

const RootLayout = () => {
  const { pathname } = useLocation();
  const isSplash = useMatch('/');
  const isLogin = pathname.startsWith('/login');

  // 스플래시나 로그인일 때는 유틸리티 없이 본문만!
  if (isSplash || isLogin) {
    return <Outlet />;
  }

  return (
    <div className="pageContainer">
      {/* 형이 만든 .scrollArea .scroll 클래스가 스크롤을 담당함.
        여기에 h-full을 줘서 부모인 pageContainer의 높이를 꽉 채우게 해줘.
      */}
      <div className="scrollArea scroll h-full flex flex-col">
        <div className="screenSection relative flex-1 flex flex-col">
          <main className="mainSection flex-1 flex flex-col">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
