'use client'

import { useAtom } from "jotai";
import { darkModeAtom } from "@/app/Atoms";
import NavLink from "./components/NavLink"
import Folder from "./components/Folder";
import { GiNetworkBars } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { FaInbox, FaPowerOff, FaRegBell, FaRegFolder } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Button } from "../ui/button";
import { useTheme } from 'next-themes';

export default function SideBar(){
    // const [ isDarkMode, setIsDarkMode ] = useAtom( darkModeAtom );
    const { theme, setTheme } = useTheme();

    return(
        <div className="flex flex-col justify-between bg-[#ffff] dark:bg-black/70 w-[15%] h-screen space-y-4 shadow-lg">
            <div>
                <div className=" flex items-center justify-between bg-white dark:bg-black/70 border-b p-5">
                    <div className="flex items-center gap-1">
                        <img 
                            src="/logo.png" 
                            alt="Logo da empresa" 
                            className="mx-auto rounded-full"
                            width={40}
                        />
                        <h1 className="dark:text-white text-lg font-bold text-center">Rolemberg</h1>
                    </div>
                    <FaEllipsisVertical size={18} color="gray"/>
                </div>
                <nav className="border-black/20 space-y-2 p-3">
                        <NavLink href="/" name="Início" icon={<IoMdHome color="gray" />}/>
                        <NavLink href="/Inbox" name="Sobre" icon={<FaInbox color="gray"/>}/>
                        <NavLink href="/dashboards" name="Dashboards" icon={<GiNetworkBars color="gray"/>}/>
                        <NavLink href="/reports" name="Relatórios" icon={<TbReportSearch color="gray"/>}/>
                        <div className="flex items-center gap-3 px-3 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] hover:rounded-lg transition-all">
                            <FaRegFolder color="gray" />
                            <p className="text-[#5C5E64] dark:text-white/80 font-semibold">Pastas</p>
                        </div>
                </nav>
                <hr className="w-[80%] mx-auto mb-2"/>
                    <nav className="space-y-7 p-3">
                        <NavLink href="/Inbox" name="Configurações" icon={<IoSettingsOutline color="gray"/>}/>
                        <Button variant={"destructive"} className="hover:bg-red-800 w-full h-14 transition-all">
                            <div className="flex items-center justify-between gap-5">
                                <span>DESCONECTAR</span>
                                <FaPowerOff />
                            </div>
                        </Button>
                    </nav>
            </div>
            <div className="bg-white dark:bg-black/70 border-t p-3">
                <div className="flex justify-between bg-[#D9D9D9] dark:bg-white/20 w-[85%] h-10 mx-auto gap-1 p-1 rounded-md transition-all" >
                    <div
                        onClick={() => setTheme( theme === 'dark' ? 'light' : 'light' )} 
                        className="bg-white dark:bg-transparent flex items-center gap-2 p-4 rounded-md hover:cursor-pointer"
                    >
                        <LuSun />
                        <p>Claro</p>
                    </div>
                    <div
                        onClick={() => setTheme( theme === 'light' ? 'dark' : 'dark' )} 
                        className="bg-transparent dark:bg-black flex items-center gap-2 p-4 rounded-md hover:cursor-pointer"
                    >
                        <IoMoonOutline />
                    <p className=" dark:text-white" >Escuro</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
