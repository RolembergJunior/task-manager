'use client'

import { ComponentProps } from "react";

interface ButtonIconProps extends ComponentProps<'button'>{
    transparent: boolean
}

export default function ButtonIcon({transparent, ...props}:ButtonIconProps){
    return(
        <button
            {...props}
            className={ `border border-white/10 rounded-md p-1.5
                ${transparent ? "bg-transparent" : "bg-white/10"}
                ${props.disabled ? "opacity-40" : "opacity-none"}`}
        />
    );
}