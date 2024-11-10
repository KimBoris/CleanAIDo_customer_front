import PropTypes from 'prop-types';
import './ProductListComponent.css'; // 스타일링을 위한 CSS 파일

const ProductListComponent = ({ products }) => {
    return (
        <ul className="product-list">
            {products.map(product => (
                <li key={product.pno} className="product-item">
                    <img src={product.filename} alt={product.pname} className="product-thumbnail" />
                    <div className="product-info">
                        <h2 className="product-name">{product.pname}</h2>
                        <p className="product-price">{product.price}원</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

ProductListComponent.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            pno: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            pname: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            thumbnail: PropTypes.string, // 선택적으로 설정
        })
    ).isRequired,
};


export default ProductListComponent;
