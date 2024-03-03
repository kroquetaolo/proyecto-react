import { useForm } from "react-hook-form"
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { addDoc, collection, doc, getFirestore, writeBatch } from "firebase/firestore";
import { Link } from "react-router-dom";
import cartEmpty from "../../assets/cart-empty.jpeg"
import delivery from "../../assets/delivery.jpeg"
import "./Checkout.css"

const Checkout = () => {

    const {cartItems, getQuantity, clear} = useContext(CartContext);
    const [orderSent, setOrderSent] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [loading, setLoading] = useState(false);

    const { register, formState: {errors}, handleSubmit, watch } = useForm();
    const watchedName = watch('name');
    const watchedMail = watch('mail');
    const watchedPhone = watch('phone');

    const submit = (data) => {
        console.log(data);
        const db = getFirestore();
        const batch = writeBatch(db);
        const ordersCollection = collection(db, "orders")

        const userInfo = {
            name: data.name,
            mail: data.mail,
            phone: data.phone,
            items: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                quantity: getQuantity(item),
                price: item.price
            }))
            
        }
        setOrderSent(true);
        setLoading(true);

        
        cartItems.map((item) => {
            const itemDoc = doc(db, "products", ""+item.id);
            const newStock = item.stock - getQuantity(item);
            batch.update(itemDoc, { stock: newStock})
        });

        addDoc(ordersCollection, userInfo).then(function(docRef) {
            setOrderId(docRef.id);
            clear();
            setLoading(false)
            batch.commit()
        });

    }

    return (
        <div className="checkout">
            {cartItems.length == 0 && !orderSent ? 
            <div className='cart-empty'>
                <img src={cartEmpty} alt="your cart is empty" />
                <h1>Time to start shopping!</h1>
                <p>Fill it up with these incredible products.</p>
                <Link to='/'>HOME PAGE</Link>
            </div> 
            : 
            orderSent ? 
                
            loading ? <div className='loader-container'><span className="loader"></span></div>: 
            <div className="checkout-order">
                <h1>Successful purchase!</h1>
                <img src={delivery} alt="" />
                <p>The ID of your order is: {orderId}</p>
                <Link to='/'>HOME PAGE</Link>
            </div>
            :
            <form className="checkout-container" onSubmit={handleSubmit(submit)}>
                <div className="checkout-wrapper">
                    <input className={`checkout-input ${watchedName ? 'input-filled' : ''} ${errors.name ? 'input-error' : ''}`} type="text" {...register('name', {
                        required: true,
                        minLength: 3
                    })} />
                    <label className="checkout-label">Enter your name</label>
                    {errors.name?.type === 'required' && <p className="checkout-error">Please enter a name, 3 characters minimum</p>}
                    {errors.name?.type === 'minLength' && <p className="checkout-error">minimo de 3 letras</p>}
                </div>
                <div className="checkout-wrapper">
                    <input className={`checkout-input ${watchedMail ? 'input-filled' : ''} ${errors.mail ? "input-error" : ""}`} type="text" {...register('mail', {
                        required: true,
                        pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                    })} />
                    <label className="checkout-label">Enter your email</label>
                    {errors.mail?.type === 'required' && <p className="checkout-error">Please enter an e-mail, e.g: unique@nock.com</p>}
                    {errors.mail?.type === 'pattern' && <p className="checkout-error">E-Mail format is not correct, e.g: unique@nock.com</p>}
                </div>
                <div className="checkout-wrapper">
                    <input className={`checkout-input ${watchedPhone ? 'input-filled' : ''} ${errors.phone ? 'input-error' : ''}`} type="text" {...register('phone', {
                        required: true,
                        minLength: 7,
                        maxLength: 16,
                        pattern: /^\d+$/
                    })} />
                    <label className="checkout-label">Enter a phone number</label>
                    {errors.phone?.type === 'required' && <p className="checkout-error">Please enter a phone number</p>}
                    {errors.phone?.type === 'pattern' && <p className="checkout-error">Only numbers are allowed</p>}
                    {errors.phone?.type === 'minLength' && <p className="checkout-error">Enter a minimum of 7 numbers for the phone number</p>}
                    {errors.phone?.type === 'maxLength' && <p className="checkout-error">Enter a maximum  of 16 numbers for the phone number</p>}
                </div>
                <input className="checkout-submit" type="submit" value="Send" />
            </form>
        }
        </div>
    )
}

export default Checkout
