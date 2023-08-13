/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import _ from "lodash";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [images, setImages] = useState([]);

    function changeOrder(jsonData) {
        let randomizedImages = _.shuffle(jsonData);
        setImages(randomizedImages);
    }

    function handleClick() {
        changeOrder(images);
    }

    useEffect(() => {
        let ignore = false;

        async function fetchImages() {
            if (!ignore) {
                console.log("rendering:");
                try {
                    const json = await fetch(
                        "https://api.thecatapi.com/v1/images/search/?limit=10"
                    );
                    const jsonData = await json.json();
                    console.log("jsonData", jsonData);
                    //NOTE: set the images after randomizing the order.
                    changeOrder(jsonData);
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
        <div className="grid grid-cols-5 grid-rows-2 gap-3">
            {images.map((image) => (
                <img
                    src={image.url}
                    key={image.id}
                    className=" w-[225px] h-[225px]"
                    onClick={() => handleClick()}
                ></img>
            ))}
        </div>
    );
}

export default App;
