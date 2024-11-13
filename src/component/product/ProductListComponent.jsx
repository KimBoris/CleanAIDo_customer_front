import PropTypes from 'prop-types';
import './ProductListComponent.css';
import { Link } from "react-router-dom";

const ProductListComponent = ({ products }) => {
    return (
        <div>
            <ul className="product-list">
                {products.map((product, index) => (
                    <Link to={`/product/read/${product.pno}`} key={`${product.pno}-${index}`} className='product-link'>
                        <li className="product-item">
                            <img src={product.filename || '../../../public/images/star_1.svg'} className="product-thumbnail" alt={product.pname} />
                            <div className="product-info">
                                <h2 className="product-name">{product.pname}</h2>
                                <p className="product-price">{product.price}원</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

ProductListComponent.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            pno: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            pname: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            filename: PropTypes.string,
        })
    ).isRequired,
};

export default ProductListComponent;
