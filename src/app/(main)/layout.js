import SidePanel from './components/SidePanel';

export default function MainLayout({ children }) {
  return (
    <>
      <div className="block p-4 md:p-0 md:hidden">hello</div>
      <div className="hidden md:block">
        <div className="flex h-screen">
          <SidePanel />
          {children}
        </div>
      </div>
    </>
  );
}
