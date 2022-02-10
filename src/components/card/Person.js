const Person = ({ person }) => {
    return ( 
        <div className="card">
            <h3>{ person.name }</h3>
            <p>Population - {person.gender}</p>
            <p>Terrain - {person.height}</p>
        </div>
     );
}
 
export default Person;