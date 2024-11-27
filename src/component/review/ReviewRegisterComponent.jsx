import {useLocation} from "react-router-dom";

function ReviewRegisterComponent() {
    const { state } = useLocation();

    const orderNumber = state?.orderNumber;

    console.log(orderNumber);

    return (
        <div>
            <h1></h1>
        </div>
    );
}

export default ReviewRegisterComponent;