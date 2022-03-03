import {Link} from  'react-router-dom';

export function NavBar() {
    return (
        <nav>
  <Link to="/">Home</Link>
  <Link to="/sell">Sell</Link>
  <Link to="/user">User</Link>
</nav>
    )
}