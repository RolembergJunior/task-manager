import { ComponentProps, ReactElement } from "react";
import { GrHomeRounded } from "react-icons/gr";


interface NavLinkProps{
    icon: ReactElement,
    name: string,
    href: string
}

export default function NavLink({ icon, name, href }:NavLinkProps){
    return(
       <div className="flex items-center gap-3 px-3 py-2 hover: cursor-pointer hover:bg-[#1b2631] hover:rounded-lg transition-all">
            {icon}
            <a href={href} className="font-bold">{name}</a>
       </div>
    );
}