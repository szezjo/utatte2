import React from "react";

type ButtonProps = {
    children: React.ReactNode,
    onClick?: () => void,
    icon?: JSX.Element,
    additionalClass?: string,
}

const Button = ({additionalClass, onClick, icon, children} : ButtonProps) => (
    <button
    type="button"
    className={`focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 border ${additionalClass || "border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"}`}
    onClick={onClick}
  >
    {icon && <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 mr-2 -ml-1"
    >
      {icon}
    </svg>}
    {children}
  </button>
)

export default Button;