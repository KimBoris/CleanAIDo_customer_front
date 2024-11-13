import PropTypes from 'prop-types';
import './OrderListComponent.css';

const OrderListComponent = ({ orders, onStatusChange }) => {
    return (
        <ul className="order-list">
            {orders.map(order => (
                <li key={order.orderNumber} className="order-item">
                    <div className="order-info">
                        {order.orderDetails && order.orderDetails.length > 0 && (
                            <h2 className="order-product-name">
                                상품명: {order.orderDetails.map(detail => detail.productName).join(', ')}
                            </h2>
                        )}
                        {order.orderDetails && order.orderDetails.length > 0 ? (
                            <p className="order-product-number">
                                상품 번호: {order.orderDetails.map(detail => detail.productId).join(', ')}
                            </p>
                        ) : (
                            <p className="order-product-number">상품 번호: 없음</p>
                        )}
                        <p className="order-customer-id">고객 ID: {order.customerId}</p>
                        <p className="order-phone">전화번호: {order.phoneNumber}</p>
                        <p className="order-address">주소: {order.deliveryAddress}</p>
                        <p className="order-message">배송 메시지: {order.deliveryMessage}</p>
                        <p className="order-price">총 가격: {order.totalPrice}원</p>
                        <p className="order-date">주문 시간: {new Date(order.orderDate).toLocaleString()}</p>
                        <p className="order-status">상태: {order.orderStatus}</p>

                        {/* 상태 변경 버튼 */}
                        <button className="button cancel" onClick={() => onStatusChange(order.orderNumber, '취소')}>
                            취소
                        </button>
                        <button className="button exchange" onClick={() => onStatusChange(order.orderNumber, '교환')}>
                            교환
                        </button>
                        <button className="button refund" onClick={() => onStatusChange(order.orderNumber, '환불')}>
                            환불
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

OrderListComponent.propTypes = {
    orders: PropTypes.arrayOf(
        PropTypes.shape({
            orderNumber: PropTypes.number.isRequired,
            customerId: PropTypes.string.isRequired,
            phoneNumber: PropTypes.string,
            deliveryAddress: PropTypes.string.isRequired,
            deliveryMessage: PropTypes.string,
            totalPrice: PropTypes.number.isRequired,
            orderDate: PropTypes.string.isRequired,
            orderStatus: PropTypes.string.isRequired,
            orderDetails: PropTypes.arrayOf(
                PropTypes.shape({
                    productId: PropTypes.number.isRequired,
                    productName: PropTypes.string.isRequired
                })
            ).isRequired
        })
    ).isRequired,
    onStatusChange: PropTypes.func.isRequired
};

export default OrderListComponent;
