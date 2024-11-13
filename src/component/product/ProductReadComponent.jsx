import { useState } from 'react';

function ProductReadComponent({ products }) {
    return (
        <div>
            {products.map((product) => (
                <div key={product.pno} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Carousel images={product.filename || ['../../../public/images/star_1.svg']} />
                    </div>

                    <div className="flex justify-between m-0">
                        <h2 className="text-xl break-words">{product.pname} </h2>
                        <img src='../../../public/images/star_5.svg' className='ml-2 object-contain h-full' />
                    </div>

                    <p className="text-2xl font-semibold">{product.price} 원</p>

                    <hr />
                    <div>
                        <h2 className="text-3xl font-medium p-2">상세 이미지</h2>
                        <img src={product.detailImage || "../../../public/images/M1.png"} className="w-full h-auto"  />
                        <img src={product.detailImage || "../../../public/images/M1.png"} className="w-full h-auto"  />
                        <img src={product.detailImage || "../../../public/images/M1.png"} className="w-full h-auto"  />
                    </div>
                </div>
            ))}
        </div>
    );
}

function Carousel({ images }) {
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
            <div className="relative">
                <img
                    src={images[currentIndex]}
                    className="w-full h-64"
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
        </div>
    );
}

export default ProductReadComponent;
