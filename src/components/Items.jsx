/* eslint-disable react/prop-types */

export default function Test(props) {
    const itemElements = props.items.map((item, index) => (
        <div key={index}>
            <div className="item-card" id={item.id}>
                <div className="img-btn-wrap">
                    <div className="item-img">
                        <img id={item.quantity > 0 ? "item-img" : "none"} src={props.matchedUrl[index]}/>
                    </div>
                    <span>
                        {item.quantity > 0 && <button className="qty-btn" id={item.id}><i className="fa-solid fa-circle-plus" onClick={(event) => props.increment(event, item.id)} id="plus-btn"></i><span className="counter" id={`counter-${item.id}`}>{item.quantity}</span><i className="fa-solid fa-circle-minus" onClick={(event) => props.decrement(event, item.id)} id="minus-btn"></i></button>}
                        {item.quantity == 0 && <button className="add-to-cart" onClick={(event) => props.increment(event, item.id)} id={item.id}><i className="fa fa-cart-plus" aria-hidden="true"></i> Add to Cart</button>}
                    </span>
                </div>
                <p className="item-short">{item.category}</p>
                <p className="item-long">{item.name}</p>
                <p className="item-price">${item.price.toFixed(2)}</p>
            </div>
        </div>
    ))

    return (

        <div className="items">
            {itemElements}
        </div>

    )
}