import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const PlatformLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default PlatformLayout;