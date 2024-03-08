import { NavigationBar } from "../Components/NavigationBar"

export function PriceListPage() {
    return <>
    <NavigationBar />
    <div className="container">

        <table>
            <thead>        <h1>Árlista</h1></thead>
            <tr>
                <th>Termék</th>
                <th>Ár</th>
            </tr>
            <tr>
                <td>Géllakk</td>
                <td>9000</td>
            </tr>
            <tr>
                <td>Porcelán</td>
                <td>8000</td>
            </tr>
            <tr>
                <td>Manikűr</td>
                <td>5000</td>
            </tr>
            <tr>
                <td>Akril</td>
                <td>6000</td>
            </tr>
        </table>
    </div >
    </>
}