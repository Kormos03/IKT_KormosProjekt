import { NavigationBar } from "../Components/NavigationBar"

export function WelcomePage() {
    return  <>
    <NavigationBar />
    <div className="container">
        <table>
            <tr>
                <h1>Üdvözöljük a körmösszalon oldalán!</h1>
            </tr>
            <tr>
                <p>Amennyiben szeretne időpontot foglalni, kérjük regisztráljon!</p>
            </tr>
            <tr>
                <p>Amennyiben már regisztrált, kérjük jelentkezzen be!</p>

            </tr>
        </table>
    </div >
    </>
}