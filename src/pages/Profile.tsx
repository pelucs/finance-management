import MenuMobile from "../components/MenuMobile";
import ProfileContent from "../components/Profile/ProfileContent";
import Sidebar from "../components/Sidebar";

export default () => {
  return(
    <div className="flex dark-mode transition-colors">
      <Sidebar/>
      <ProfileContent/>
      <MenuMobile/>
    </div>
  );
}