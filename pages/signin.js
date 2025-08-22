import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { getPasswordStrength } from '@/utils/passwordStrength';
import { GoogleOutlined  } from '@ant-design/icons';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email:'',
    password:''
  });
  const [message, setMessage] = useState();
    const [user, setUser] = useState(null);
  const router = useRouter();

   const [passwordHide,setPasswordHide] = useState(true);
 
    const [strength, setStrength] = useState({ label: '', color: '' });
  

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

     const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setStrength(getPasswordStrength(newPassword));
      };

      

     const handleBlur = (e) => {
   const { name,value} = e.target;
   console.log(name,value)
   if(!value){
    setError({...error,[name]:true})
   } else if(name=== 'password' && value.length>=8){
     setError({...error,[name]:true})
   } else{
     setError({...error,[name]:false})
   }
  }

      const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
      };

  return (
        <div>

       
    <header class="header">
        <nav class="nav-container">
            <a href="#" class="logo" onclick="showPage('signup')">GooGooReads</a>
            <button class="logout-btn" id="logoutBtn" onclick="logout()">Logout 👋</button>
        </nav>
    </header>


    
    <div class="page active" id="signupPage">
        <div class="page-container">
            <div class="auth-container">
                <div class="auth-mascot">🐻📚</div>
                <h1 class="auth-title">Join the Adventure!</h1>
                <p class="auth-subtitle">Create your account and start exploring magical stories, fun games, and amazing badges!</p>
                
                <form class="auth-form" id="signupForm" onSubmit={handleSignIn}>
                  
                    
                    <div class="form-group">
                        <label class="form-label" for="signupEmail">Email Address</label>
                   <input
          type="email"
          placeholder="Email"
          required
          className='form-input'
          value={email}
          name='email'
          onChange={(e) => setEmail(e.target.value)}
             onBlur={(e) => handleBlur(e)}
        />
                    {
                        error.email &&
                        (<div class="form-error" id="emailError">Please enter a valid email address</div>)}
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="signupPassword">Create Password</label>
                        <div class="password-container">
                      <input
          type={passwordHide ? "password": "text"}
          placeholder="Password"
          required
          name='password'
          className='form-input'
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          onBlur={(e) => handleBlur(e)}
        />
                            <button type="button" class="password-toggle" onClick={() => setPasswordHide(preState => !preState)}>👁️</button>
                        </div>
                
                    {error.password &&(<>
                        <div class="form-error" id="passwordError">Password must be at least 8 characters long</div></>)}
                    </div>
                    
                    <button type="submit" class="btn-primary">Sign In & Start Reading! 🚀</button>
                </form>
                
                <button class="google-btn" onClick={handleLogin}><GoogleOutlined style={{ fontSize: '26px', color: '#08c' }}/> Sign In with Google</button>
                
                <div class="auth-links">
                    <p>Create an account? <span onClick={() => handleSignUp()} class="auth-link" >Sign Up</span></p>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}
