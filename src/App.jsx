/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import _ from "lodash";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [images, setImages] = useState([]);

    function randomizeAndSetImages(jsonData) {
        let randomizedImages = _.shuffle(jsonData);
        setImages(randomizedImages);
    }

    function handleClick() {
        randomizeAndSetImages(images);
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
            <div className="grid grid-cols-5 grid-rows-2 gap-3">
                {console.log("images", images)}
                {images.map((image) => (
                    <img
                        src={image.url}
                        key={image.id}
                        className=" w-[225px] h-[225px]"
                        onClick={() => handleClick()}
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
                        <li>
                            If you see less than 10 images, please refresh your
                            browser.
                        </li>
                        <li>
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
