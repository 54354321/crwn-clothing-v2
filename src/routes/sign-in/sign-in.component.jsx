import { 
        signInWithGooglePopup,
        createUserDocumentFromAuth,
        } from '../../utils/firebase/firebase.utils';

import SignUpFrom from '../../components/sign-up-from/sign-up-from.component';

const SignIn = () => {
 const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

    return(
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpFrom />
        </div>
    );
};

export default SignIn;