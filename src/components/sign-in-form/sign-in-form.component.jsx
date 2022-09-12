import { useState } from 'react';

import { signInWithGooglePopup,
        createUserDocumentFromAuth,
        signInAuthUserWithEmailAndPassword
        } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';


const defaultFromFields = {
    email:'',
    password:'',
};

const SignInFrom = () => {
    const [fromFields,setFormFields] = useState(defaultFromFields);
    const {email,password} = fromFields;

    const resetFormFields = () =>{
        setFormFields(defaultFromFields);
    };

    const signinwithGoogle = async () => {
        await signInWithGooglePopup();
      };
 
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with thik email');
                    break;
                default:
                    console.log(error);

            }
            // if(error.code === 'auth/wrong-password'){
            //     alert('incorrect password for email')
            // }
        }
    };

    // console.log(fromFields);

    const handleChange = (event) => {
        const {name,value} = event.target;

        setFormFields({...fromFields,[name]:value});
    };

    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                <Button  buttonType='google' onClick={signInWithGooglePopup} type="button">Google sign in</Button>
                </div>
            </form>
        </div>  
    )
}

export default SignInFrom; 