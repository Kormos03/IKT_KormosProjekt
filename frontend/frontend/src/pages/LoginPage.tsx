import { LoginForm } from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";

export function LoginPage() {
  const navigate = useNavigate();
  
  function login(token: string) {
    localStorage.setItem('token', token);
    navigate('/');
  }

    return <>
         <NavigationBar />
         <div className="main-content">
      <LoginForm onSuccessfulLogin={login} />
      </div>
    </>
}