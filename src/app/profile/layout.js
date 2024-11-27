import Sidebar from "@/Components/sidebar";
import "@/styles/ProfileMenus.css";

export default function ProfileLayout({ children }) {
  return (
    <div className="container menu-content">
      <div className="app_wbgeubeqb">
        <Sidebar /> 
        <div className="content">{children}</div> 
      </div>
    </div>
  );
}
