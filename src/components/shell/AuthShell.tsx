import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import MobileBottomNav from "../organisms/MobileBottomNav";
import EmergencyButton from "../atoms/EmergencyButton";

type AppShellProps = {
   children: React.ReactNode;
}

const AuthShell = (props: AppShellProps) => {
    const { children } = props;
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow  bg-[url('/assets/img/bg-cardium.jpg')]  bg-no-repeat bg-center bg-cover bg-fixed">
                {children}
            </div>
            <EmergencyButton />
            <Footer />
            <MobileBottomNav />
        </main>
    )
}

export default AuthShell;