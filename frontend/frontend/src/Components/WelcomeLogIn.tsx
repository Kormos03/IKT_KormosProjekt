export function WelcomeLogIn() {
    return (
        <div>
            <p>Amennyiben szeretne időpontot foglalni, kérjük regisztráljon!</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="/register" role="button">Regisztráció</a>
            </p>
            <p>Amennyiben már regisztrált, kérjük jelentkezzen be!</p>
            <p className="lead">
                <a className="btn btn-secondary btn-lg" href="/login" role="button">Bejelentkezés</a>
            </p>
        </div>
    );
}