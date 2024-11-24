import {useState} from "react";

function CarouselComponent({images}) {
    if (!images || images.length === 0) {
        return null;
    }

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
                <img
                    src={images}
                    className="object-cover object-center"
                    alt={`Product Image ${currentIndex + 1}`}
                />
                {images.length > 1 && (
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                    >
                        &lt;
                    </button>
                )}
                {images.length > 1 && (
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                        &gt;
                    </button>
                )}
        </div>
    );
}

export default CarouselComponent;