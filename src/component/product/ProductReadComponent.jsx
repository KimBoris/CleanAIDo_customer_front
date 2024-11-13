import { useState } from 'react';

function ProductReadComponent({ products }) {
    return (
        <div>
            {products.map((product) => (
                <div key={product.pno} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 이미지 캐러셀 */}
                    <div className="p-4 border rounded shadow">
                        <Carousel images={product.filename} />
                    </div>

                    <div className="flex justify-between m-0">
                        <h2 className="text-xl break-words">{product.pname} </h2>
                        <img src='../../../public/images/star_5.svg' className=' ml-2 object-contain h-full'/>
                    </div>

                    <p className="text-2xl font-semibold"> {product.price} 원</p>

                    <hr />
                    <div>
                        <h2 className="text-3xl font-medium">상세 이미지</h2>
                        <img src="../../../public/images/M1.png" className="w-full h-auto" alt="Product Detail" />
                        <img src="../../../public/images/M1.png" className="w-full h-auto" alt="Product Detail" />
                        <img src="../../../public/images/M1.png" className="w-full h-auto" alt="Product Detail" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function Carousel({ images }) {
    if (!images || images.length === 0) {
        return null; // 이미지가 없을 경우 캐러셀을 표시하지 않음
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
                {/* 현재 이미지 표시 */}
                <img
                    src={images[currentIndex]}
                    className="w-full h-64"
                    alt={`Product Image ${currentIndex + 1}`}
                />
                {/* 이전 버튼 (이미지가 1개 이상일 경우만 표시) */}
                {images.length > 1 && (
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                    >
                        &lt;
                    </button>
                )}
                {/* 다음 버튼 (이미지가 1개 이상일 경우만 표시) */}
                {images.length > 1 && (
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                    >
                        &gt;
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductReadComponent;
