import { useEffect } from "react"
import { NavigationBar } from "../Components/NavigationBar"
import { WelcomeLoggedIn } from "../Components/WelcomeLoggedIn";
import { WelcomeLogIn } from "../Components/WelcomeLogIn";
import { useDarkMode } from "../Components/HandleDarkMode";


export function WelcomePage() {
  const [isDarkMode] = useDarkMode();
    useEffect(() => {
        const user = localStorage.getItem('user')   ;
        if(user){
        console.log(localStorage.getItem('User: '+'user'));
    }
    isDarkMode;
    }, [])
    return  <>
       <NavigationBar />
    <div className="container  main-content">
    <div className="jumbotron mt-5">
        <h1 className="display-4">Üdvözöljük a körmösszalon oldalán!</h1>
        <p className="lead">Széleskörű szolgáltatásainkkal várjuk kedves vendégeinket.</p>
        <hr className="my-4" />
        {
            localStorage.getItem('token') ? <WelcomeLoggedIn/> : <WelcomeLogIn/>  
        }
      
    </div>

</div>
    </>
}