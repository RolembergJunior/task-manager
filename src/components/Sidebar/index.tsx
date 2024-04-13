'use client'

import NavLink from "./components/NavLink"
import Folder from "./components/Folder"
import { GiNetworkBars } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { FaInbox } from "react-icons/fa";


export default function SideBar(){
    return(
        <div className="bg-[#2e4053] w-56 h-screen space-y-4 border border-black/40 p-3">
            <div className=" flex-col items-center w-full border-b border-black/20 gap-3 py-2">
                <img 
                    src="./logo.png" 
                    alt="Logo da empresa" 
                    className="mx-auto rounded-full"
                    width={60}
                />
                <h1 className="text-lg font-semibold text-center">Rolemberg</h1>
            </div>
            <nav className="border-b border-black/20 space-y-2 py-2">
                    <NavLink href="/home" name="Home" icon={<IoMdHome />}/>
                    <NavLink href="/inbox" name="Inbox" icon={<FaInbox />}/>
                    <NavLink href="/dashboards" name="Dashboards" icon={<GiNetworkBars />}/>
                    <NavLink href="/reports" name="Reports" icon={<TbReportSearch />}/>
            </nav>
            <div className="space-y-2">
                <h1 className="text-xl font-bold text-center" >Pastas</h1>
                <div className="flex flex-col justify-between">
                    <Folder/>
                </div>
            </div>
        </div>
    );
}
