import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";

type TAuthType = "SetupDefined"

type GuardProps = {
    component: JSX.Element,
    authType: TAuthType
    redirectPath: string,
}

const getAuthValueByType = (authType: TAuthType, state: RootState) => {
    if (authType === "SetupDefined") return state.setup.isSetup;
}

const Guard = ({component, authType, redirectPath}: GuardProps) => {
    const state = useAppSelector((state) => state);
    const authValue = getAuthValueByType(authType, state);

    if (!authValue) return <Navigate to={redirectPath} replace />
    return component;
}

export default Guard;