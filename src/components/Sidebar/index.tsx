'use client'

import { GrHomeRounded } from "react-icons/gr";
import NavLink from "./components/NavLink"
import Menu from "./components/Menu"
import Folder from "./components/Folder"
import { BsInbox } from "react-icons/bs";
import { GiNetworkBars } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";


export default function SideBar(){
    return(
        <div className="bg-slate-400 w-[20%] h-screen space-y-4 border border-black/40">
            <div className="flex items-center bg-slate-400 border border-black/40 gap-3 p-3">
                <img 
                    src="./logo.png" 
                    alt="Logo da Empresa" 
                    className="w-10"
                />
                <h1 className="text-xl font-medium">RolembergEmprise</h1>
                <Menu/>
            </div>
            <div >
                <nav className="space-y-2">
                    <NavLink href="/home" name="Home" icon={<GrHomeRounded/>}/>
                    <NavLink href="/inbox" name="Inbox" icon={<BsInbox />}/>
                    <NavLink href="/dashboards" name="dashboards" icon={<GiNetworkBars />}/>
                    <NavLink href="/reports" name="Reports" icon={<TbReportSearch />}/>
                    
                </nav>
            </div>
            <hr className="border-black/40"/>
            <div>
                <h1 className="text-center text-xl font-semibold">Pastas</h1>
                <div>
                    <Folder/>
                </div>
            </div>
        </div>
    );
}