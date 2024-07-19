import { NavigationBar } from "../Components/NavigationBar";
import { RegistComponent } from "../Components/RegistComponent";

export function RegisterPage() {
    return <>
    <NavigationBar />
    <div className="main-content">
     <RegistComponent />
     </div>
    </>
}