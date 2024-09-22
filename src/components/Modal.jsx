export default function Modal(props) {
    
    const modalElements = props.items.map((item, index) => {
        if (item.quantity > 0) {
            return (
            <div key={index} className="modal-item">                             
                <div className="modal-item-details">
                    <img className="thumbnail" src={props.thumbnails[index]}/>
                    <div className="cart-item-details">
                        <p className="cart-item-name">{ item.name }</p>
                        <p className="cart-item-price"><span id="cart-item-qty">{item.quantity}x</span> <span id="unit-price">@ ${ item.price.toFixed(2) }</span> <span id="total-price">${ (item.price * item.quantity).toFixed(2) }</span></p>
                    </div>
                </div>
            </div>
            
        )}
    })

    return (
        <div className="modal">
            {modalElements}
            <div className="cart-total">
                Order Total 
                <h1 className="order-total">${props.orderTotal.toFixed(2)}</h1>
            </div>
        </div>
    )
}