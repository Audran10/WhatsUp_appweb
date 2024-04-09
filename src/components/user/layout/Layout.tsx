import React from "react";
import LayoutTop from "./LayoutTop";
import LayoutSearchBar from "./LayoutSearchBar";
import LayoutDiscussionGroupCard from "./LayoutDiscussionGroupCard";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
        <div className="flex h-full w-full">

            <div className="flex flex-col h-full w-[30%] bg-mainWhite container">
                <LayoutTop />
                <LayoutSearchBar />

                <div className="container overflow-y-auto">
                    <LayoutDiscussionGroupCard name="Groupe 1" lastSender="Thomas" lastMessage="Salut" date="12/12/2021" />
                </div>
            </div>

            <div className="flex flex-col h-full w-[70%] bg-mainBeige container">
                {children}
            </div>
        </div>
        </>
    );
}

export default Layout;