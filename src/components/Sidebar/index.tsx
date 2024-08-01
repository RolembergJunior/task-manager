'use client'

import { useState } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";
import { FaInbox, FaPowerOff, FaRegFolder, FaTrash } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Button } from "../ui/button";
import { useTheme } from 'next-themes';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import NavLink from "./components/NavLink"
import { useAtom } from "jotai";
import { filtersAtom } from "@/app/Atoms";
import { useFetchFolder } from "@/hooks/useFetch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { GoDash } from "react-icons/go";


export default function SideBar(){
    const [ isOpenFolder, setIsOpenFolder ] = useState(false);
    const { data } = useFetchFolder('http://localhost:3000/pastas');
    const [ filters, setFilters ] = useAtom(filtersAtom);
    const { theme, setTheme } = useTheme();

    function onHandleFilterFolder( value:string ){
        if(filters.folder?.toString() === value ){
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
                        <div 
                                style={{
                                    visibility: isOpenFolder ? 'visible' : 'hidden',
                                    overflow: isOpenFolder ? 'visible' : 'hidden',
                                    opacity: isOpenFolder ? '1' : '0',
                                    transition: 'opacity 1s ease-in-out, visibility 1s ease-in-out, max-height 1s ease-in-out',
                                    maxHeight: isOpenFolder ? '1000px' : '0', 
                                    width: '100%'
                                }}
                            >
                            <ul>
                                {data?.map( (folder) => ( 
                                    <div 
                                        className={`relative flex items-center justify-between ml-4 px-4 py-2 hover:cursor-pointer hover:bg-[#F6F6F6] ${filters.folder?.toString() === folder.id ? 'bg-black rounded-lg' : null} hover:dark:bg-black hover:rounded-lg transition-all`}
                                        
                                    >
                                        <div className="px-3 w-full" onClick={() => onHandleFilterFolder(folder.id.toString())}>
                                            {folder.name}
                                        </div> 
                                        <div 
                                            className="absolute bg-transparent hover:bg-red-600 p-1 rounded-full right-3 transition-all z-10"
                                        >
                                            <Dialog>
                                                <DialogTrigger>
                                                    <GoDash className="z-10" size={15}/>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogDescription>
                                                        Tem certeza que deseja excluir essa pasta?
                                                    </DialogDescription>
                                                    <div className="flex items-center justify-end gap-3">
                                                        <Button>Cancelar</Button>
                                                        <Button variant={'destructive'} >Excluir</Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                ))}
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
