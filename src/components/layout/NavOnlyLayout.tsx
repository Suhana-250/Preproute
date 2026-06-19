import { Outlet, NavLink } from "react-router-dom";
import { getUser } from "../../services/authService";
import Navbar from "./Navbar";
import { NAV_ITEMS } from "./navigationConfig";

/** Layout with ONLY the top navbar — and a THIN left sidebar.
 *  Used for pages that render their own sidebar (AddQuestions, Preview). */
function NavOnlyLayout() {
    const user = getUser();
    const userName = user?.name ?? "User";
    const userRole = user?.role ?? "Admin";
 
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50">
            <Navbar userName={userName} userRole={userRole} />
            <div className="flex flex-1 overflow-hidden">
                {/* Thin Sidebar */}
                <aside className="w-[60px] shrink-0 bg-white flex flex-col items-center py-4 border-r border-gray-200 z-10">
                    <nav className="flex flex-col gap-4 w-full">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                title={item.label}
                                className={({ isActive }) =>
                                    [
                                        "relative flex justify-center items-center w-full py-2 transition-all",
                                        isActive
                                            ? "text-[#384EC7] border-r-2 border-[#384EC7]"
                                            : "text-gray-400 hover:text-gray-600 border-r-2 border-transparent",
                                    ].join(" ")
                                }
                            >
                                {item.icon}
                            </NavLink>
                        ))}
                    </nav>
                </aside>
                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default NavOnlyLayout;
