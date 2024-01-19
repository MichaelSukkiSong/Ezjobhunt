import SidePanel from "./components/SidePanel";

export default function MainLayout({ children }) {
  return (
    <>
      {/* mobile */}
      <div className="block md:p-0 md:hidden min-h-screen">hello</div>
      {/* pc */}
      <div className="hidden md:block">
        <div className="md:flex">
          <SidePanel />
          {children}
        </div>
      </div>
    </>
  );
}
