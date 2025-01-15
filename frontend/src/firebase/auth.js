import { auth } from "./firebase";
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    sendEmailVerification,
    sendPasswordResetEmail,
    updatePassword
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw error;
    }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw error;
    }
};

export const doSignInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (!user.uid) {
            throw new Error('Failed to get user UID from Google sign in');
        }
        return {
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            },
            credential: GoogleAuthProvider.credentialFromResult(result)
        };
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        
        throw {
            code: errorCode,
            message: errorMessage,
            email,
            credential
        };
    }
};

export const doSignOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        throw error;
    }
};

export const doPasswordChange = async (password) => {
    try {
        if (!auth.currentUser) {
            throw new Error('No authenticated user found');
        }
        await updatePassword(auth.currentUser, password);
    } catch (error) {
        throw error;
    }
};

export const doSendEmailVerification = async () => {
    try {
        if (!auth.currentUser) {
            throw new Error('No authenticated user found');
        }
        await sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/home`,
        });
    } catch (error) {
        throw error;
    }
};

export const doPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
};