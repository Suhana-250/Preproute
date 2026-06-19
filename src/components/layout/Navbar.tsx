import preproute from "../../assets/preproute.svg";

interface NavbarProps {
    userName: string;
    userRole: string;
}

function Navbar({ userName, userRole }: NavbarProps) {
    // Generate initials avatar based on user name
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}&fontSize=45&backgroundType=gradientLinear`;

    return (
        <header className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
            {/* Logo on the left */}
            <div className="flex items-center">
                <img src={preproute} width={110} height={28} alt="PrepRoute" />
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-4">
                {/* Bell */}
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors border border-gray-200/50">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                {/* User avatar + name */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <img src={avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full border border-gray-200" />
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-900">{userName}</span>
                        <span className="text-[11px] text-gray-400 font-medium capitalize">{userRole}</span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
