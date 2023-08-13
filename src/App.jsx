/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [url, setUrl] = useState("");

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
                    setUrl(jsonData[1].url);
                    console.log("jsonData:", jsonData);
                } catch (error) {
                    console.log("error:", error);
                }
            }
        }

        something();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            {console.log("url:", url)}
            <img src={url}></img>
        </>
    );
}

export default App;
