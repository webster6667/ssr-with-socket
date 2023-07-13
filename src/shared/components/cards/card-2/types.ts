import {HTMLAttributes} from "react";

export interface Card2I extends HTMLAttributes<HTMLDivElement> {
    username: string,
    message?: string,
    hidden?: boolean,
    className?: string
}
