import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";



export default function Dashboard(){

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