import { menuArray } from "/data.js"

const orderContainer = document.getElementById('order-container')
const checkoutModal = document.getElementById('checkout-modal')

// render menu from menuArray data
menuArray.forEach(item => {
    document.getElementById('menu-container').innerHTML += `
        <div class="item-container space-between">
           <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.ingredients}</p>
                <p>\$${item.price}.00</p>
            </div>
            <div class="add-container">
                <button class="add-btn" data-add="${item.id}">+</button>
            </div>              
        </div>
    `
})

// event listeners
document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add) // pass item id to handleAddClick funct
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove) // pass item id to handleRemoveClick funct
    } else if (e.target.id === 'checkout-btn') {
        checkoutModal.style.display = 'block'
    } else if (e.target.id === 'modal-close-btn') {
        checkoutModal.style.display = 'none'
    } else if (e.target.id === 'payment-btn') {
        handleSubmitPayment(e)
    }
})

function handleAddClick(itemId) {
    // increment clicked item's qty
    menuArray[itemId].quantity++
    // render order to reflect change
    renderOrder()
}

function handleRemoveClick(itemId) {
    // decrement clicked item's qty
    menuArray[itemId].quantity--
    // render order to reflect change
    renderOrder()
}

function handleSubmitPayment(e) {
    e.preventDefault()
    // save form data
    const formData = new FormData(document.querySelector('form'))
    // close payment modal
    checkoutModal.style.display = 'none'
    // display thank you message with name from form
    orderContainer.innerHTML = `
        <h2>Thanks, ${formData.get('name')}! Your order is on the way.</h2>
    `
}


// render ordered items
function renderOrder() {
    // reset ordered items
    document.getElementById('order-items').innerHTML = ``
    // initialize + reset total price
    let totalPrice = 0
    menuArray.forEach(item => {
        if (item.quantity > 0) { // if any amount of this item has been added to order
            
            // add item price to total price each iteration
            totalPrice += item.price * item.quantity             
            
            // update rendered html with each item ordered
            document.getElementById('order-items').innerHTML += `
                <div class="space-between order-item">
                    <div>
                        <h3>${item.name}</h3>
                        <p class="item-quantity">Qty: ${item.quantity}</p>
                        <p class="remove-btn" data-remove="${item.id}">Remove</p>
                    </div>
                    <p>\$${item.price * item.quantity}.00</p>
                </div>`
        }
        
        // if no price (aka no items in order) do not display any of order details (checkout btn, ordered items, etc) html
        if (totalPrice === 0) { 
            orderContainer.style.display = 'none'
        } else {
            orderContainer.style.display = 'block'
        }
        
        // update displayed total price
        document.getElementById('total-price').textContent = `\$${totalPrice}.00`
    })
}