import { useState } from "react";

import DialogModal from "../components/DialogModal";

const DialogModalTester = () => {
    const [isOpened, setIsOpened] = useState(false);

    const onProceed = () => {
        console.log("proceed clicked");
    }

    return (
        <div>
            <button onClick={() => setIsOpened(true)}>Open dialog modal</button>

            <DialogModal title="Dialog modal example" isOpened={isOpened} onProceed={onProceed} onClose={() => setIsOpened(false)}><p>To close: click Close or click outside... test Escape too xD</p></DialogModal>
        </div>
    )
}

export default DialogModalTester;