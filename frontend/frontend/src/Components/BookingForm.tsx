import useAuth from "./useAuth";

export function BookingForm(){
    const { token, user,error, setToken, setUser, setError } = useAuth();

    async function getDatesFromBackend(){
        
    }

    return <>
    <form>
        <label htmlFor="date">Dátum</label><br />
        <input type="date" id="date" name="date" onClick={} /><br />
        <label htmlFor="time">Időpont</label><br />
        <input type="time" id="time" name="time" /><br />
        <label htmlFor="number">Férőhelyek száma</label><br />
        <input type="number" id="number" name="number" /><br />
        <button type="submit">Foglalás</button><br />
    </form>
    </>
}