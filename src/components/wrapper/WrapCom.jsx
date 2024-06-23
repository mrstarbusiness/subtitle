"use client";
import { ThemeProvider } from "@material-tailwind/react";

const WrapCom = ({ children}) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

export default WrapCom;