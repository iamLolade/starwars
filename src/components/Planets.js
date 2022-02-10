import React, { useState } from "react";
import Planet from "./card/Planet";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

const fetchPlanets = async () => {
    const result = await fetch('https://swapi.dev/api/planets')
    return result.json()
}

const Planets = () => {
    const { data, status } = useQuery('planets', fetchPlanets)
    //console.log("data", data, "status", status)
    return (
        <div>
            <h2>Planets</h2>
            {status === "loading" && (
                <div>Loading data...</div>
            )}

            {status === "error" && (
                <div>Error fetching data</div>
            )}

            {status === "success" && (
                <div>
                    { data.results.map(planet => <Planet key={planet.name} planet={planet}/>)}
                </div>
            )}
        </div>
    );
}

//export default Planets
export default function Wraped() {
    return (<QueryClientProvider client={queryClient}>
        <Planets />
    </QueryClientProvider>
    );
}