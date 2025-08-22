import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile,sendEmailVerification } from 'firebase/auth';
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { getPasswordStrength } from '@/utils/passwordStrength';
import { GoogleOutlined  } from '@ant-design/icons';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordHide,setPasswordHide] = useState(true);
  const [error, setError] = useState({
    name:false,
    email:false,
    password:false
  });
  const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [strength, setStrength] = useState({ label: '', color: '' });
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
                
                <form class="auth-form" id="signupForm" onSubmit={handleSignUp}>
                    <div class="form-group">
                        <label class="form-label" for="fullName">Full Name</label>
                         <input
          type="text"
          placeholder="Full Name"
          required
          name='name'
           className='form-input'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => handleBlur(e)}
        />
        {error.name &&(
                        <div class="form-error" id="nameError">Please enter your full name</div>)}
                    </div>
                    
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
                        <div class="password-strength" id="passwordStrength">
                            <span>Password strength: {strength.label} </span>
                            
                            
                        </div>
                    {error.password &&(<>
                        <div class="form-error" id="passwordError">Password must be at least 8 characters long</div></>)}
                    </div>
                    
                    <button type="submit" class="btn-primary">Sign Up & Start Reading! 🚀</button>
                </form>
                
                <button class="google-btn" onClick={handleLogin}><GoogleOutlined style={{ fontSize: '26px', color: '#08c' }}/> Sign Up with Google</button>
                
                <div class="auth-links">
                    <p>Already have an account? <span onClick={() => handleSignIn()} class="auth-link" >Log In</span></p>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}
