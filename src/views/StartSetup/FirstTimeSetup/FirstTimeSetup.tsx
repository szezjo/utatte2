import React, {useState, useEffect, useRef} from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { markFirstTimeSetupAsDone, setPlayerMode, setLanguage } from "../../../features/setup";
import { useNavigate } from "react-router-dom";
import DeviceTypeSelect from "./DeviceTypeSelect";
import i18n from "../../../i18n";
import LanguageSelect from "./LanguageSelect";
import autoAnimate from '@formkit/auto-animate';

const FirstTimeSetup = () => {
    const [screen, setScreen] = useState(0);
    const isSetup = useAppSelector((state) => state.setup.isSetup);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const parent = useRef(null);

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    useEffect(() => {
        if(isSetup) {
            return navigate("rooms/");
        }
        setTimeout(() => {
            setScreen(1);
        }, 1500);
    }, [])

    const setLanguageOnHover = (language: string) => {
        i18n.changeLanguage(language);
    }

    const applyLanguage = (language: string) => {
        i18n.changeLanguage(language);
        dispatch(setLanguage(language));
        setScreen(2);
    }

    const setDeviceType = (playerMode: boolean) => {
        dispatch(setPlayerMode(playerMode));
        dispatch(markFirstTimeSetupAsDone());
        return navigate("rooms/");
    }

    return (
        !!screen ? <div className="min-w-full flex flex-col justify-center items-center space-y-6" ref={parent}>
            {screen===1 && <LanguageSelect setLanguage={setLanguageOnHover} applyLanguage={applyLanguage}/>}
            {screen===2 && <DeviceTypeSelect setDeviceType={setDeviceType}/>}
        </div> : <></>
    )
}

export default FirstTimeSetup;