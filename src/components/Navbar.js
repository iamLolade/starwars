const Navbar = ({ setPage }) => {
    return ( 
        <nav>
            <button onClick={() => setPage("people")}>People</button>
            <button onClick={() => setPage("planets")}>Planets</button>
        </nav>
     );
}
 
export default Navbar;