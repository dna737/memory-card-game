/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    // const [url, setUrl] = useState("");
    const [order, setOrder] = useState("");
    console.log("order:", order);

    useEffect(() => {
        let ignore = false;

        async function something() {
            if (!ignore) {
                console.log("rendering:");
                try {
                    const json = await fetch(
                        "https://api.thecatapi.com/v1/images/search/?limit=10"
                    );
                    const jsonData = await json.json();
                    console.log("returned value:", jsonData);
                    //TODO: go through the array of objects, set the id (they have an `ID` attribute).
                    //After that,
                    let arr = [];
                    for (const object of jsonData) {
                        arr.push(object.id);
                        console.log("object:", object);
                    }

                    //call the randomize button here.
                    setOrder(randomizeOrder(arr));
                    console.log("jsonData:", jsonData);
                } catch (error) {
                    console.log("error:", error);
                }
            }
        }

        something();

        function randomizeOrder(imageIds) {
            // console.log(
            // "🚀 ~ file: App.jsx:46 ~ randomizeOrder ~ imageIds):",
            // imageIds
            // );
            let order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let newOrder = [];
            while (newOrder.length !== order.length) {
                let num = Math.floor(10 * Math.random());
                if (!newOrder.includes(num)) {
                    newOrder.push(num);
                }
            }

            if (JSON.stringify(newOrder) === JSON.stringify(order)) {
                return randomizeOrder();
            }

            return newOrder.map((x) => {
                console.log("x:", x);
                return imageIds[x];
            });
        }

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            {/* {console.log("url:", url)} */}
            {/* <img src={url}></img> */}
            {/* <button className="button button-primary" onClick={} */}
        </>
    );
}

export default App;
