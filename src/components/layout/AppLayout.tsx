import { Outlet } from "react-router-dom";
import { getUser } from "../../services/authService";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { NAV_ITEMS } from "./navigationConfig";

function AppLayout() {
    const user = getUser();
    const userName = user?.name ?? "User";
    const userRole = user?.role ?? "Admin";

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50">
            {/* Top Bar — spans the entire width */}
            <Navbar userName={userName} userRole={userRole} />

            {/* Bottom Section — sidebar + scrollable content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Narrow icon sidebar */}
                <Sidebar navItems={NAV_ITEMS} />

                {/* Main page content area — padded page-by-page */}
                <main className="flex-1 overflow-y-auto bg-gray-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
