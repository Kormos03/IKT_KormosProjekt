import { useEffect } from "react"
import { NavigationBar } from "../Components/NavigationBar"
import useAuth from "../Components/useAuth";
import { WelcomeLoggedIn } from "../Components/WelcomeLoggedIn";
import { WelcomeLogIn } from "../Components/WelcomeLogIn";
import { useDarkMode } from "../Components/HandleDarkMode";
import { Footer } from "../Components/Footer";


export function WelcomePage() {
  //  const { token, user, error, setToken, setUser, setError } = useAuth();
  const [isDarkMode, setIsDarkMode] = useDarkMode();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user){
        console.log(localStorage.getItem('User: '+'user'));
    }
    }, [])
    return  <>
        <div className="d-flex flex-column min-vh-100">
       <NavigationBar />


    <div className="container">
    <div className="container">
    <div className="jumbotron mt-5">
        <h1 className="display-4">Üdvözöljük a körmösszalon oldalán!</h1>
        <p className="lead">Széleskörű szolgáltatásainkkal várjuk kedves vendégeinket.</p>
        <hr className="my-4" />
        {
            localStorage.getItem('token') ? <WelcomeLoggedIn/> : <WelcomeLogIn/>  
        }
      
    </div>

</div>
    </div >
    </div>
    </>
}