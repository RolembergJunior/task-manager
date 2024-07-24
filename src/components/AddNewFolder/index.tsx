'use client'

import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

export default function AddNewFolder(){
    return(
        <Dialog>
            <DialogTrigger>
                Adicione Pasta
            </DialogTrigger>
        </Dialog>
    );
}