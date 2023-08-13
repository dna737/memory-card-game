/* eslint-disable react/prop-types */
export function DisplayImages({ images, handleClick }) {
    return (
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
    );
}
