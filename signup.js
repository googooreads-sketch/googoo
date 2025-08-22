import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile,sendEmailVerification } from 'firebase/auth';
import { Button } from 'antd';
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
  const router = useRouter();

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {

      const user = JSON.parse(sessionStorage.getItem('user')) ?? '';
  
       if(user){
       router.push('/dashboard');
      }
  },[])

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔄 Update Firebase user profile with name
      await updateProfile(user, {
        displayName: name,
        // Firebase Auth does not directly store phone here; you'd store it elsewhere if needed (e.g., Firestore)
      });
      await sendEmailVerification(user);
      setMessage('Verification email sent! Please check your inbox.');

      // 🔐 Get token
      const idToken = await user.getIdToken();

      // 📥 Store data in sessionStorage
      sessionStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        phone: phone, // storing phone locally
        token: idToken,
      }));

      router.push('/dashboard');
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  const handleSignIn = () => {
    router.push('/signin');
  }

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

    const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
         sessionStorage.setItem('user', JSON.stringify({
        uid: result.uid,
        email: result.email,
        name: result.displayName,
      }));
      router.push('/dashboard')
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };
 
  return (
    <div>
      <h1>Sign Up</h1>
      <Button type='primary' onClick={() => handleSignIn()}>SignIn</Button>
      <form onSubmit={handleSignUp}>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
       <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br />
<label>Email</label>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
<label>Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button type="submit">Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

        <Button type='primary' onClick={handleLogin}>Sign in with Google</Button>
    </div>
  );
}
