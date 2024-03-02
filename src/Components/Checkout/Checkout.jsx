import { useForm } from "react-hook-form"
import "./Checkout.css"

const Checkout = () => {

    const { register, formState: {errors}, handleSubmit, watch } = useForm()
    const watchedName = watch('name');
    const watchedMail = watch('mail');
    const watchedPhone = watch('phone');

    const submit = (data) => {
        console.log(data);
    }

    return (
        <div className="checkout">
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
        </div>
    )
}

export default Checkout
