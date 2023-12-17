import MainPanel from './components/MainPanel';
import SidePanel from './components/SidePanel';

const MainPage = () => {
  return (
    <>
      <div className="block p-4 md:p-0 md:hidden">hello</div>
      <div className="hidden md:block">
        <div className="flex h-screen">
          {/* <div>sidepanel</div> */}
          {/* <SidePanel /> */}
          <MainPanel />
        </div>
      </div>
    </>
  );
};

export default MainPage;
