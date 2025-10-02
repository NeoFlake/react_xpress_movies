import "./Navbar.css";

export default function Navbar() {

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand"><img src="../../img/logo-site.png" alt="XpressMovies" width="100"
                        height="70" /></a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {"<% if(navbar.isAdmin) { %> <%= (navbar.currentRoute === '/administration') ? 'disabled' : '' %>"}
                                <a className="nav-link active " aria-current="page">Administration</a>
                                {"<% } else if(navbar.favoris> 0) { %> <%= (navbar.currentRoute === '/favoris') ? 'disabled' : '' %>"}
                                <a className="nav-link active position-relative "
                                    aria-current="page" href="/favoris">Mes favoris<span
                                        className="position-absolute top-30 start-90 translate-middle badge rounded-pill bg-info"
                                        >
                                        {"<%= navbar.favoris %>"}
                                        <span className="visually-hidden">nombres de mes favoris</span>
                                    </span></a>
                                {"<% } %> <%= (navbar.currentRoute === '/profile') ? 'disabled' : '' %>"}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active "
                                    href="/profile">Mon profil</a>
                            </li>
                        </ul>
                        <div className="me-3">
                          {/*  {"<%= `${navbar.lastname} ${navbar.firstname}` %>" `onclick="window.location.href='/logout'"`} */}
                        </div>
                        <button className="btn btn-outline-info" type="submit" >Se déconnecter</button>
                    </div>
                </div>
            </nav>
            <div className="top-page">
            </div>
        </>
    );

}