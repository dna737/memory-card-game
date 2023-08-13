export function AboutGame() {
    return (
        <>
            <button
                className="btn bottom-0"
                onClick={() => window.my_modal_2.showModal()}
            >
                ABOUT GAME
            </button>
            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">
                        Welcome to the Memory Card game!
                    </h3>
                    <ul>
                        <li key="1">
                            Select all 10 images to win! Reclick an image and
                            you lose!
                        </li>
                        <li key="2">
                            If you see less than 10 images, please refresh your
                            browser.
                        </li>
                        <li key="3">
                            Additionally, turn off your AdBlocker for a smoother
                            experience!
                        </li>
                    </ul>
                    <div className="modal-action">
                        <button className="btn btn-primary">close</button>
                    </div>
                </form>
            </dialog>
        </>
    );
}
