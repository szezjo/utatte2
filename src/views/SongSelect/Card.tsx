import React from "react";

type CardProps = {
    cover: string,
    name: string,
    artist: string,
    additionalInfo?: string,
}

const Card = ({cover, name, artist, additionalInfo} : CardProps) => {
    return (
        <div className="flex space-x-1 max-w-screen w-full min-h-24 p-2 rounded-lg hover:bg-gray-700 items-center">
            <img src={cover} className="m-2 rounded w-16 h-16" />
            <div className="flex flex-col mb-[4px]">
                <p className="text-md text-blue-100 font-bold">{name}</p> 
                <p className="text-sm text-white">{artist}</p>  
                {additionalInfo && <p className="text-sm text-gray-400">{additionalInfo}</p>}
            </div>    
        </div>
    )
}

export default Card;