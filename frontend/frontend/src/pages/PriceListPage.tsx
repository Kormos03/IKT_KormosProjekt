import { NavigationBar } from "../Components/NavigationBar"
import PriceListComp from "../Components/PriceListComp"

export function PriceListPage() {
    return (
        <>
            <NavigationBar />
            <div className="container main-content">
                <div className="card shadow-lg">
                    <div className="card-header bg-primary text-white">
                        <h2 className="text-center">Árlista</h2>
                    </div>
                    <div className="card-body">
                        <PriceListComp />
                    </div>
                </div>
            </div>
        </>
    );
}