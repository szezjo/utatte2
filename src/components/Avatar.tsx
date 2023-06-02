import React from "react";

type AvatarProps = {
    className?: string,
    ref?: React.MutableRefObject<HTMLImageElement| null>,
    onClick?: () => void,
    imageSrc?: string,
    icon?: JSX.Element,
}

const Avatar = ({className, ref, onClick, imageSrc, icon} : AvatarProps) => {
    if (imageSrc) return (
        <img
            ref={ref}
            className={className}
            src={imageSrc}
            onClick={onClick}
            />
    );

    else if (icon) return (
    <div
        className={`flex justify-center items-center bg-green-600 text-white ${className}`}
        ref={ref}
        onClick={onClick}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      {icon}
    </svg></div>
    );

    else return <></>;
};

export default Avatar;