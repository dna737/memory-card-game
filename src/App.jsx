/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import _ from "lodash";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useImmer } from "use-immer";
import { AboutGame } from "./components/AboutGame";
import { HiddenButton } from "./components/HiddenButton";
import { DisplayScores } from "./components/DisplayScores";
import { DisplayImages } from "./components/DisplayImages";

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
        console.error("called");
        console.log("resetButton:", resetButton);
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
            <HiddenButton ref={resetButton} />
            <DisplayScores score={score} highScore={highScore} />
            <DisplayImages images={images} handleClick={handleClick} />
            <AboutGame />
        </>
    );
}

export default App;
