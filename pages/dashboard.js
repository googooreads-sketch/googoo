import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAuth } from 'firebase/auth';



export default function Dashboard(){

    const auth = getAuth();
const user = auth.currentUser;

if (user) {
  console.log('UID:', user.uid);
  console.log('Email:', user.email);
  console.log('Display Name:', user.displayName);
  console.log('Photo URL:', user.photoURL);
}

    const router = useRouter();

useEffect(() => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user){
     router.push('/');
    }
},[])

const handleClick = () => {
    sessionStorage.removeItem('user');
    router.push('/')
}
    return (
        <>
        <h1>Welcome Home</h1>
        <Button type="primary" danger onClick={() => handleClick()}>Log Out</Button>
        </>
    )
}