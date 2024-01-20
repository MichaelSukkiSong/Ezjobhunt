import SidePanel from "./components/SidePanel";

export default function MainLayout({ children }) {
  return (
    <>
      {/* mobile */}
      <div className="block md:p-0 md:hidden min-h-screen">
        <div className="p-4">{children}</div>
      </div>
      {/* pc */}
      <div className="hidden md:block">
        <div className="md:flex">
          <SidePanel />
          <div
            className="md:h-screen overflow-x-hidden w-full"
            id="infiniteJobsScrollDiv"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
