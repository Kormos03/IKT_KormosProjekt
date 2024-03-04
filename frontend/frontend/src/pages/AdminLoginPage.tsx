export function AdminLoginPage(){
    return <div className="container">
        <h3>Admin Bejelentkezés</h3>
        <form>
            <label htmlFor="username">Felhasználónév</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Jelszó</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Bejelentkezés</button>
        </form>
    </div >
}