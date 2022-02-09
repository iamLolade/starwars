import React from "react"
import { useQuery } from "react-query";

const fetchPlanets = async () => {
    const result = await fetch("http://swapi.dev/api/planets");
    return result.json();
}

const Planets = () => {
    const { data, status } = useQuery("planets", fetchPlanets)
    console.log(data);

    return ( 
        <div>
            <h2>Planets</h2>
            <p>{ status }</p>
        </div>
     );
}
 
export default Planets;