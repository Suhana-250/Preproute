import {
    IconTrendingUp,
    IconEdit,
    IconClipboardCheck
} from '@tabler/icons-react';
import type { NavItem } from "./Sidebar";

export const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard",     path: "/dashboard",      icon: <IconTrendingUp size={20} stroke={1.75} /> },
    { label: "Test Creation", path: "/tests",           icon: <IconEdit size={20} stroke={1.75} /> },
    { label: "Test Tracking", path: "/tests/tracking", icon: <IconClipboardCheck size={20} stroke={1.75} /> },
];
