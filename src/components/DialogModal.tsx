import { MouseEvent, useEffect, useRef } from "react";

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
    const r = element.getBoundingClientRect();

    return (
        e.clientX > r.left &&
        e.clientX < r.right &&
        e.clientY > r.top &&
        e.clientY < r.bottom
    );
}

type DialogModalProps = {
    title: string;
    isOpened: boolean;
    onProceed: () => void;
    onClose: () => void;
    children: React.ReactNode;
}

const DialogModal = ({title, isOpened, onProceed, onClose, children} : DialogModalProps) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        console.log(isOpened)
        if (isOpened) {
            ref.current?.show();
            document.body.classList.add("modal-open");
        }
        else {
            ref.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpened]);

    const proceedAndClose = () => {
        onProceed();
        onClose();
    }

    return (
        <dialog className="w-96 rounded z-10 bg-gray-500 text-white border-2 border-slate-50 border-solid" ref={ref} onCancel={onClose} onClick={(e) => ref.current && !isClickInsideRectangle(e, ref.current) && onClose()}>
            <h3>{title}</h3>

            {children}

            <div className="flex gap-5">
                <button onClick={proceedAndClose}>Proceed</button>
                <button onClick={onClose}>Close</button>
            </div>
        </dialog>
    )
}

export default DialogModal;