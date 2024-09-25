import { useState, useEffect, useRef } from 'react'
import Data from './data.json'
import Items from './components/Items'
import Cart from './components/Cart'
import Modal from './components/Modal'
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Alert from '@mui/material/Alert';
import { Delete, TaskAlt } from '@mui/icons-material'


export default function App() {
  // initialize state using the data containing all menu items
  const [items, setItems] = useState(Data)

  // initialize screen type state to determine type of image to display
  const [screenType, setScreenType] = useState(() => {
    if (window.innerWidth < 600) {
      return "mobile"
    } else if (window.innerWidth >= 1024) {
        return "desktop"
    } else {
        return "tablet"
    } 
  })

  const [matchedUrl, setMatchedUrl] = useState([])

  const [thumbnails, setThumbnails] = useState([])

  const [cartQuantity, setCartQuantity] = useState(0)

  const [orderTotal, setOrderTotal] = useState(0)

  const [showConfirm, setShowConfirm] = useState(false)

  const [showAlertAdd, setShowAlertAdd] = useState(false)

  const [showAlertRemove, setShowAlertRemove] = useState(false)

  const cartSection = useRef(null)



  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
     });
    };

  useEffect(() => {
    if (localStorage.getItem("items")) {
      console.log("ok1")
      setItems(JSON.parse(localStorage.getItem("items")))
      setItems(prevSetItems => prevSetItems.map((prevSetItem, index) => {
        if (prevSetItem.quantity) {
          return prevSetItem 
        } else {
          return {
            ...prevSetItem,
            id: index,
            quantity: 0
          }
        } 
    }))
    } else {
      console.log("ok")
      setItems(prevSetItems => prevSetItems.map((prevSetItem, index) => {
        return {
          ...prevSetItem,
          id: index,
          quantity: 0
        } 
    }))}
  }, [])

  // update state to reflect the type of screen based on window width
  var matchedUrlArray = []
  var thumbnailsArray = []
  useEffect(() => {
    matchedUrlArray = []
    thumbnailsArray = []
    for (let i=0; i<items.length; i++) {
      for (const key in items[i].image) {
        if (key === screenType) {
          matchedUrlArray.push(items[i].image[key])
          thumbnailsArray.push(items[i].image.thumbnail)
        }
      }
    }
    setMatchedUrl(matchedUrlArray)
    setThumbnails(thumbnailsArray)
  }, [screenType])
  console.log("thumbnails array:", thumbnails)
  useEffect(() => {
    window.addEventListener('resize', function() {
      if (window.innerWidth < 600) {
        setScreenType("mobile");
    } else if (window.innerWidth >= 1024) {
        setScreenType("desktop")
    } else {
        setScreenType("tablet")
    }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  var totalQuantity = 0
  var totalCost = 0

  useEffect(() => {
    for (let i=0; i<items.length; i++) {
      if (items[i].quantity > 0) {
          totalQuantity += (items[i].quantity)
          totalCost += (items[i].quantity) * (items[i].price)
      }
    } 
    setCartQuantity(totalQuantity)
    setOrderTotal(totalCost)
  }, [items])

  console.log(cartQuantity)
  console.log(orderTotal)


  function increment(event, itemId) {
    event.stopPropagation()
    let itemArray = []
    for (let i=0; i<items.length; i++) {
      if (items[i].id === itemId) {
        itemArray.push({
          ...items[i],
          quantity: items[i].quantity + 1
        })
      } else {
        itemArray.push(items[i])
      }
    }

    setItems(itemArray)
    setShowAlertAdd(true)
  }

  function decrement(event, itemId) {
    event.stopPropagation()
    let itemArray = []
    for (let i=0; i<items.length; i++) {
      if (items[i].id === itemId) {
        itemArray.push({
          ...items[i],
          quantity: items[i].quantity - 1
        })
      } else {
        itemArray.push(items[i])
      }
    }

    setItems(itemArray)
    setShowAlertRemove(true)
  }

  function removeItem(event, itemId) {
    event.stopPropagation()
    setItems(prevSetItems => prevSetItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: 0
        }} 
        return item
    }))

    setShowAlertRemove(true)
  }

  function toggleConfirm() {
    setShowConfirm(prevShowConfirm => !prevShowConfirm)
    window.addEventListener("beforeunload", function(e){
      resetItems()
    })
  }

  function resetItems() {
    localStorage.clear()
    setShowConfirm(prevShowConfirm => !prevShowConfirm)
    setItems(prevSetItems => prevSetItems.map(item => {
      return {
        ...item,
        quantity: 0
      }
    }))
  }

  useEffect(() => {
    setTimeout(() => {
      setShowAlertAdd(false);
      }, 4000)
    }, [showAlertAdd])

  useEffect(() => {
    setTimeout(() => {
      setShowAlertRemove(false);
      }, 4000)
    }, [showAlertRemove])

  return (
    <div className="container">
      <div className="menu items">
        <div className="menu-items-header">
          <h1>Desserts</h1>
          <button onClick={() => scrollToSection(cartSection)} className="view-cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>{cartQuantity > 0 && <span className="cart-total-badge">{cartQuantity}</span>}</button>
        </div>
        <Items 
          increment={increment} 
          decrement={decrement} 
          screenType={screenType}
          items={items}
          setItems={setItems}
          matchedUrl={matchedUrl}
        />
      </div>
      <div ref={cartSection}>
      <Cart 
          items={items}
          setItems={setItems}
          removeItem={removeItem}
          cartQuantity={cartQuantity}
          setCartQuantity={setCartQuantity}
          toggleConfirm={toggleConfirm}
          orderTotal={orderTotal}
          showAlertRemove={showAlertRemove}
          setShowAlertRemove={setShowAlertRemove}
        />
      </div>
      {showConfirm && <div className="confirm-order-blur" onClick={resetItems}></div>}
      {showConfirm && <div className="confirm-order-modal"><FontAwesomeIcon icon={faCheckCircle} className="modal-check" /><h4>Order Confirmed</h4><span>We hope you enjoy your food!</span><Modal items={items} orderTotal={orderTotal} thumbnails={thumbnails}/><button className="confirm-order" onClick={resetItems}>Start New Order</button></div>}
      <div className="alert-success">
        {showAlertAdd && <Alert icon={<TaskAlt fontSize="inherit" />} variant="filled" severity="success">
          Item added to Cart!
        </Alert>}
        {showAlertRemove && <Alert icon={<Delete fontSize="inherit" />} variant="filled" severity="error">
          Item removed from Cart.
        </Alert>}
      </div>
    </div>
  )
}
