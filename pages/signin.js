import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from 'antd';
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {

      const user = JSON.parse(sessionStorage.getItem('user')) ?? '';
  
       if(user){
       router.push('/dashboard');
      }
  },[])

      useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setMessage('Please verify your email before signing in.');
        return;
      }

      const idToken = await user.getIdToken();

      // Save session
      sessionStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: idToken,
      }));

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  }

  

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

      const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
      };

  return (
    <div>
      <h1>Sign In</h1>
      <Button type='primary' onClick={() => handleSignUp()}>SignUp</Button>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button type="submit">Sign In</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'orange' }}>{message}</p>}
      </form>
            <Button type='primary' onClick={handleLogin}>Sign in with Google</Button>
    </div>
  );
}
