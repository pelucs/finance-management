import Sidebar from '../components/Sidebar';
import SettingsContent from "../components/Settings/SettingsContent";
import MenuMobile from '../components/MenuMobile';

export default () => {
  return(
    <div className="flex dark-mode transition-colors">
      <Sidebar/>
      <SettingsContent/>
      <MenuMobile/>
    </div>
  );
}