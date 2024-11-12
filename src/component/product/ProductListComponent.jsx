import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './ProductListComponent.css';

const ProductListComponent = ({ products }) => {
    const navigate = useNavigate();

    const handleProductClick = (product) => {
        navigate('/order/create', { state: { product } });
    };

    return (
        <ul className="product-list">
            {products.map(product => (
                <li
                    key={product.pno}
                    className="product-item"
                    onClick={() => handleProductClick(product)}
                    style={{ cursor: 'pointer' }}
                >
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
            thumbnail: PropTypes.string,
        })
    ).isRequired,
};

export default ProductListComponent;
