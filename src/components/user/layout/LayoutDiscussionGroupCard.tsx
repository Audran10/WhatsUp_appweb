import React from "react";

interface LayoutDiscussionGroupCardProps {
    name: string;
    lastSender: string;
    lastMessage: string;
    date: string
};

const LayoutDiscussionGroupCard: React.FC<LayoutDiscussionGroupCardProps> = ({ name, lastSender, lastMessage, date }) => {
    return (
        <div className="flex w-full h-20 p-4 border-b hover:bg-secondaryWhite hover:cursor-pointer">
            <img className="w-14 h-14 rounded-full object-center object-cover" src="https://img.freepik.com/photos-gratuite/portrait-lion-genere-par-ia_268835-4278.jpg?size=626&ext=jpg&ga=GA1.1.1518270500.1712448000&semt=ais" alt="logo" />
            <div className="flex flex-col w-full h-full p-2">
                <div className="flex h-[50%] w-full justify-between items-center">
                    <h1 className="text-xl font-semibold">{name}</h1>
                    <span className="text-sm text-secondaryGray p-2">{date}</span>
                </div>
                <div className="flex h-[50%] w-full mt-1">
                    <span className="text-sm text-secondaryGray">{lastSender}: {lastMessage}</span>
                </div>
            </div>
        </div>
    );
}

export default LayoutDiscussionGroupCard;