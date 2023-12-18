import Searchbar from './panel/main/Searchbar';
import Optionsbar from './panel/main/Optionsbar';
import Bannersbar from './panel/main/Bannersbar';
import JDgrid from './panel/main/JDgrid';

const MainPanel = () => {
  return (
    <div className="h-screen p-4 w-full overflow-x-hidden">
      <div className="md:px-2">
        <div className="flex flex-col">
          <Searchbar />
          <Optionsbar />
          <Bannersbar />
          <JDgrid />
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
