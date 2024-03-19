import './Header.modules.css';

function Header() {
    return (
        <header className="header">
            <h3 className="header_title">Deployer</h3>
            <ul className="navbar__list">
                <li className='navbar__item'>Home</li>
                <li className='navbar__item'>Dashboard</li>
                <li className='navbar__item'>About</li>
                <li className='navbar__item'>Contact</li>
                <li className='login-button'>Login</li>
            </ul>

        </header>
    );
}

export default Header;