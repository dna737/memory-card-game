/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import _ from "lodash";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useImmer } from "use-immer";

function App() {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useImmer([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const resetButton = useRef(null);

    if (highScore === 10) {
        restartGame();
        setTimeout(() => {
            location.reload();
        }, 3000);
    }

    function restartGame() {
        resetButton.current.click();
    }

    function randomizeAndSetImages(jsonData) {
        let randomizedImages = _.shuffle(jsonData);
        setImages(randomizedImages);
    }

    //this method takes care of setting the states for: order of the images, current Score (and highest score, if possible).
    function handleClick(image) {
        randomizeAndSetImages(images);
        validateSelection(image.id);
    }

    function validateSelection(imageId) {
        if (selectedImages.includes(imageId)) {
            setScore(0);
            setSelectedImages([]);
        } else {
            setScore(score + 1);
            setHighScore(Math.max(score + 1, highScore));
            setSelectedImages((images) => {
                images.push(imageId);
            });
        }
    }

    function containsBlockableContent(jsonData) {
        jsonData.forEach((image) => {
            if (image && image.id.substring(0, 2) === "ad") {
                return true;
            }
        });
        return false;
    }

    useEffect(() => {
        let ignore = false;

        async function fetchImages() {
            if (!ignore) {
                console.log("rendering:");
                try {
                    const json = await fetch(
                        "https://api.thecatapi.com/v1/images/search/?limit=10",
                        { mode: "cors" }
                    );

                    const jsonData = await json.json();
                    console.log("jsonData", jsonData);
                    if (containsBlockableContent(jsonData)) {
                        console.error("recalling...");
                        return fetchImages();
                    }

                    randomizeAndSetImages(jsonData);
                } catch (error) {
                    console.log("error:", error);
                }
            }
        }

        fetchImages();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            <button
                className="hidden btn"
                onClick={() => window.hidden_restart_button.showModal()}
                ref={resetButton}
            ></button>
            <dialog id="hidden_restart_button" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations!</h3>
                    <p className="py-4">
                        You beat the game! Buckle up, we&apos;re restarting the
                        game for you...
                    </p>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <div className="stats shadow overflow-hidden">
                <div className="stat place-items-center">
                    <div className="underline text-lg">Current Score</div>
                    <div className="text-secondary stat-value">{score}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat place-items-center">
                        <div className="underline text-lg">Highscore</div>
                        <div className="text-secondary stat-value">
                            {highScore}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5 grid-rows-2 gap-3">
                {console.log("images", images)}
                {images.map((image) => (
                    <img
                        src={image.url}
                        key={image.id}
                        className=" w-[225px] h-[225px]"
                        onClick={() => handleClick(image)}
                    ></img>
                ))}
            </div>

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
                            Select all images to win! Reclick an image and you
                            lose!
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
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

export default App;
