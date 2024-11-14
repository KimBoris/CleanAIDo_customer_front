import { useState } from 'react';
import PropTypes from 'prop-types';

function CartDetailListComponent({ cart }) {
    // 총 합계 계산
    const totalAmount = cart.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    // 선택된 제품 배열 상태
    const [checkedProducts, setCheckedProducts] = useState([]);

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (item) => {
        setCheckedProducts((prevCheckedProducts) => {
            if (prevCheckedProducts.includes(item.product)) {
                // 이미 선택된 경우 배열에서 제거
                return prevCheckedProducts.filter(product => product !== item.product);
            } else {
                // 선택되지 않은 경우 배열에 추가
                return [...prevCheckedProducts, item.product];
            }
        });
    };


    return (
        <div>
            <ul className={"cart-list"}>
                {cart.map((item) => (
                    <li key={item.cdno} className={"cart-item"}>
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(item)}
                            checked={checkedProducts.includes(item.product)}
                        />
                        {/* 첫 번째 이미지 파일 이름만 출력 */}
                        <p>{item.product.imageFiles && item.product.imageFiles.length > 0 ? item.product.imageFiles[0].fileName : "No Image"}</p>
                        <h3>{item.product.pname}</h3>
                        <p>Price: {item.product.price.toLocaleString()} 원</p>
                        <p>{item.quantity}개</p>
                    </li>
                ))}
            </ul>
            <div className="total-amount">
                <h4>총 합계: {totalAmount.toLocaleString()} 원</h4>
            </div>
            <button>구매하기</button>
        </div>
    );
}

// propTypes 추가
CartDetailListComponent.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            cdno: PropTypes.number.isRequired,
            product: PropTypes.shape({
                pname: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                imageFiles: PropTypes.arrayOf(PropTypes.string),  // imageFiles는 문자열 배열
            }).isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default CartDetailListComponent;
