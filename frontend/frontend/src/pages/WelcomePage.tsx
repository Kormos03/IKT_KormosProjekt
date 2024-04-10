import { useEffect } from "react"
import { NavigationBar } from "../Components/NavigationBar"


export function WelcomePage() {
    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user){
        console.log(localStorage.getItem('User: '+'user'));
    }
    }, [])
    return  <>
    
       <NavigationBar />


    <div className="container">
    <div className="container">
    <div className="jumbotron mt-5">
        <h1 className="display-4">Üdvözöljük a körmösszalon oldalán!</h1>
        <p className="lead">Széleskörű szolgáltatásainkkal várjuk kedves vendégeinket.</p>
        <hr className="my-4" />
        <p>Amennyiben szeretne időpontot foglalni, kérjük regisztráljon!</p>
        <p className="lead">
            <a className="btn btn-primary btn-lg" href="/register" role="button">Regisztráció</a>
        </p>
        <p>Amennyiben már regisztrált, kérjük jelentkezzen be!</p>
        <p className="lead">
            <a className="btn btn-secondary btn-lg" href="/login" role="button">Bejelentkezés</a>
        </p>
    </div>
</div>
    </div >
    </>
}