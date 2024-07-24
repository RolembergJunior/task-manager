'use client'

import { useState } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { FaInbox, FaPowerOff, FaRegFolder } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Button } from "../ui/button";
import { useTheme } from 'next-themes';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import NavLink from "./components/NavLink"
import { useAtom } from "jotai";
import { filtersAtom } from "@/app/Atoms";


export default function SideBar(){
    const [ isOpenFolder, setIsOpenFolder ] = useState(false);
    const [ filters, setFilters ] = useAtom(filtersAtom)
    const { theme, setTheme } = useTheme();

    function onHandleFilterFolder( value:string ){
        if(filters.folder === value ){
            setFilters({...filters, folder: null});
        } else {
            setFilters({...filters, folder: value });
        }
    }
    
    return(
        <div className="flex flex-col justify-between bg-[#ffff] dark:bg-[#1e293b] w-[15%] h-screen space-y-4 shadow-lg transition-all">
            <div>
                <div className=" flex items-center justify-between bg-white dark:bg-[#1e293b] dark:border-white/20 border-b p-5">
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
                <nav className="border-black/10 space-y-2 p-3">
                        <NavLink href="/" name="Início" icon={<IoMdHome color="gray" />}/>
                        <NavLink href="/Inbox" name="Sobre" icon={<FaInbox color="gray"/>}/>
                        <NavLink href="/dashboard" name="Dashboard" icon={<GiNetworkBars color="gray"/>}/>
                        <NavLink href="/reports" name="Relatórios" icon={<TbReportSearch color="gray"/>}/>
                        <div 
                            className="flex items-center justify-between px-3 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] hover:dark:bg-black hover:rounded-lg transition-all"
                            onClick={() => setIsOpenFolder(!isOpenFolder)}
                        >
                            <div className="flex items-center gap-3 hover:cursor-pointer hover:bg-[#F6F6F6] hover:dark:bg-black hover:rounded-lg transition-all">
                                <FaRegFolder color="gray" />
                                <p className="text-[#5C5E64] dark:text-white/80 font-semibold">Pastas</p>
                            </div>
                            { isOpenFolder ? <MdOutlineKeyboardArrowDown/> : <MdOutlineKeyboardArrowRight/>}
                        </div>
                        <div className={`${isOpenFolder ? 'flex' : 'hidden'} w-full`}>
                            <ul>
                                <p 
                                    onClick={() => onHandleFilterFolder('1')}
                                    className={`px-10 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] ${filters.folder === '1' ? 'bg-black rounded-lg' : null} hover:dark:bg-black hover:rounded-lg transition-all`}>Trabalho</p>
                                <p 
                                    onClick={() => onHandleFilterFolder('2')}
                                    className={`px-10 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] ${filters.folder === '2' ? 'bg-black rounded-lg' : null} hover:dark:bg-black hover:rounded-lg transition-all`}>Tasks para mês que vem</p>
                                <p 
                                    onClick={() => onHandleFilterFolder('3')}
                                    className={`px-10 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] ${filters.folder === '3' ? 'bg-black rounded-lg' : null} hover:dark:bg-black hover:rounded-lg transition-all`}> Testes</p>
                            </ul>
                        </div>
                </nav>
                <hr className="w-[80%] mx-auto mb-2 dark:border-white/20"/>
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
            <div className="bg-white dark:bg-[#1e293b] border-t dark:border-t-white/20 p-3">
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
