import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons"
import { faLeaf } from "@fortawesome/free-solid-svg-icons"

export default function Cart(props) {
    const cartItems = []
    var totalQuantity = 0
    
    for (let i=0; i<props.items.length; i++) {
        if (props.items[i].quantity > 0) {
            cartItems.push(props.items[i])
            totalQuantity += (props.items[i].quantity)
        }
    }

    console.log("cart items: ", cartItems)

    const menuItemElements = cartItems.map((item, index) => {

        return (<div key={index} className="cart-item">
            <div className="cart-item-details">
                <p className="cart-item-name">{ item.name }</p>
                <p className="cart-item-price"><span id="cart-item-qty">{item.quantity}x</span> <span id="unit-price">@ ${ item.price.toFixed(2) }</span> <span id="total-price">${ (item.price * item.quantity).toFixed(2) }</span></p>
            </div>
            <div>
            <FontAwesomeIcon icon={faTimesCircle} className="cart-item-delete" onClick={(event) => props.removeItem(event, item.id)}/>
            </div>
        </div>
        )

    })

    return (
        <>
            <div className="cart">
                <h4>Your Cart {cartItems.length > 0 ? `(${totalQuantity})` : "Is Empty"}</h4>
                {(cartItems.length > 0) ? menuItemElements : <img src="/public/assets/images/illustration-empty-cart.svg" />}
                {(cartItems.length > 0) && <><div className="cart-total">
                    Order Total 
                    <h1 className="order-total">${props.orderTotal.toFixed(2)}</h1>
                </div>
                <div className="enviro-friendly">
                    <FontAwesomeIcon icon={faLeaf} className="leaf"/>
                    This is a <strong>&nbsp;carbon-neutral&nbsp;</strong> delivery.
                </div>
                <button className="confirm-order" onClick={props.toggleConfirm}>Confirm Order</button></>}
            </div>
        </>
    )

}

