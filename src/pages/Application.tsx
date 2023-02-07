import MenuMobile from "../components/MenuMobile";
import OverviewContent from "../components/Overview/OverviewContent";
import Sidebar from "../components/Sidebar";

export default () => {
  return(
    <div className="pb-14 md:pb-0 flex dark-mode transition-colors">
      <Sidebar/>
      <OverviewContent/>
      
      <div className="block sm:hidden">
        <MenuMobile/>
      </div>
    </div>
  );
}