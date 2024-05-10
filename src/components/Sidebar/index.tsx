'use client'

import NavLink from "./components/NavLink"
import Folder from "./components/Folder";
import { GiNetworkBars } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { FaInbox, FaRegFolder } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";


export default function SideBar(){
    return(
        <div className="bg-[#ffff] w-80 h-screen space-y-4 border border-black/40 rounded-xl">
            <div className=" flex items-center justify-between bg-[#FAFAFA] border-b border-black/20 p-3 rounded-xl">
                <div className="flex items-center gap-1">
                    <img 
                        src="/logo.png" 
                        alt="Logo da empresa" 
                        className="mx-auto rounded-full"
                        width={40}
                    />
                    <h1 className="text-lg font-bold text-center">Rolemberg</h1>
                </div>
                <FaEllipsisVertical size={18} color="gray"/>
            </div>
            <nav className="border-black/20 space-y-2 p-3">
                    <NavLink href="/" name="Home" icon={<IoMdHome color="gray" />}/>
                    <NavLink href="/Inbox" name="Inbox" icon={<FaInbox color="gray"/>}/>
                    <NavLink href="/dashboards" name="Dashboards" icon={<GiNetworkBars color="gray"/>}/>
                    <NavLink href="/reports" name="Reports" icon={<TbReportSearch color="gray"/>}/>
                    <div className="flex items-center gap-3 px-3 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] hover:rounded-lg transition-all">
                        <FaRegFolder color="gray" />
                        <p className="text-[#5C5E64] font-semibold">Pastas</p>
                    </div>
            </nav>
        </div>
    );
}
