import React from "react";

const LoadingText = ({children} : {children : React.ReactNode}) => (
    <h1 className="text-3xl font-bold text-blue-100">{children}</h1>
)

export default LoadingText;