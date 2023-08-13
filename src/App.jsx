/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [images, setImages] = useState([]);

    function changeOrder(jsonData) {
        let randomlyArrangedJsonData = jsonData.sort(() => Math.random() - 0.5);
        return randomlyArrangedJsonData;
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

                    //NOTE: set the images after randomizing the order.
                    let newlyArrangedData = changeOrder(jsonData);
                    setImages(newlyArrangedData);
                    console.log("jsonData:", jsonData);
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
        <div>
            {images &&
                images.map((image) => (
                    <img src={image.url} key={image.id}></img>
                ))}
        </div>
    );
    //     <>
    //         {console.log("images:", images)}
    //         {orderOfIds &&
    //             orderOfIds.forEach((order) => {
    //                 let imageObject = images.filter(
    //                     (image) => image.id === orderOfIds
    //                 );
    //                 console.log("imageObject:", imageObject[0].url);
    //                 return <div>{imageObject[0].url}</div>;
    //             })}

    //         <div>
    //             {orderOfIds &&
    //                 orderOfIds.forEach((order) => {
    //                     let url = images.find(
    //                         (image) => image.id === orderOfIds
    //                     ).url;
    //                     return url && <img src={url}></img>;
    //                 })}
    //         </div>
    //     </>
    // );
}

export default App;
