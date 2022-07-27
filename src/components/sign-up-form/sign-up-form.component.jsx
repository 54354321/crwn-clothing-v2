import { useState } from 'react';

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth ,
    }from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up.styles.scss';


const defaultFromFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpFrom = () => {
    const [fromFields,setFormFields] = useState(defaultFromFields);
    const {displayName,email,password,confirmPassword} = fromFields;

    const resetFormFields = () =>{
        setFormFields(defaultFromFields);
    }
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert("password do not match")
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
                );
            console.log(user);

            await createUserDocumentFromAuth(user,{ displayName });
            resetFormFields();

        }catch(error){
            if(error.code == 'auth/email-already-in-use'){
                alert('Cannot use user,email already in use');
            }else{
                console.log('user creation encountered an error',error);
            }
        }
    };
    console.log(fromFields);

    const handleChange = (event) => {
        const {name,value} = event.target;

        setFormFields({...fromFields,[name]:value});
    };

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName}
                />

                <FormInput 
                label="email" 
                type='email' 
                required 
                onChange={handleChange} 
                name='email' 
                value={email}
                />

                
                <FormInput 
                label="Password"
                type='password'
                required 
                onChange={handleChange} 
                name='password' 
                value={password}
                />

                <FormInput 
                label="confirm Password"
                type='password'
                required 
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword} 
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>  
    )
}

export default SignUpFrom; 