import { NavLink } from "react-router-dom";

export interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
}

interface SidebarProps {
    navItems: NavItem[];
}

function Sidebar({ navItems }: SidebarProps) {
    return (
        <aside className="w-52 shrink-0 bg-white flex flex-col border-r border-gray-100 z-10">

            {/* Nav items */}
            <nav className="flex flex-col gap-1 w-full px-3 py-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        title={item.label}
                        className={({ isActive }) =>
                            [
                                "relative flex items-center h-[46px] gap-[9px] px-[20px] text-[16px] font-medium transition-all rounded-[8px]",
                                isActive
                                    ? "text-[#384EC7] bg-[#F8FAFF] border-l-[5px] border-[#384EC7]"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-l-[5px] border-transparent",
                            ].join(" ")
                        }
                    >
                        <span className="shrink-0">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
