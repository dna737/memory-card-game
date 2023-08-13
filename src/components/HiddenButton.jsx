import { forwardRef, useRef, useImperativeHandle } from "react";

const HiddenButton = forwardRef(function HiddenButton(props, ref) {
    const buttonRef = useRef(null);

    useImperativeHandle(
        ref,
        () => {
            return {
                click() {
                    console.log("hi there from xyz");
                    console.log("buttonRef:", buttonRef.current);
                    buttonRef.current.click();
                },
            };
        },
        []
    );

    return (
        <div className="w-0 h-0 pointer-events-none opacity-0">
            <button
                className="btn "
                ref={buttonRef}
                onClick={() => {
                    window.hidden_restart_button.showModal();
                }}
            >
                open modal
            </button>
            <dialog id="hidden_restart_button" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations!</h3>
                    <p className="py-4">
                        You beat the game! Buckle up, we&apos;re restarting the
                        game for you...
                    </p>

                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn hidden">Close</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
});

export { HiddenButton };
