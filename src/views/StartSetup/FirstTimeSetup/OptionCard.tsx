import React from 'react';
import { motion } from 'framer-motion';

type OptionCardProps = {
    text: string,
    image: string,
    onClick: () => void;
}

const OptionCard = ({text, image, onClick} : OptionCardProps) => {
    
    return (
        <motion.div className="w-full max-w-xs rounded-lg shadow bg-slate-600 border-gray-700 hover:bg-slate-500 lg:max-w-sm" whileHover={{scale: 1.05}} onClick={onClick}>
            <div className="flex flex-col items-center py-10">
                <img className="w-24 h-24 mb-3" src={image} alt={text}/>
                <h5 className="mb-1 text-xl font-bold text-white">{text}</h5>
            </div>
        </motion.div>
    )
}

export default OptionCard;