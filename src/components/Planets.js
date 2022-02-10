import React, { useState } from "react";
import Planet from "./card/Planet";
import { usePaginatedQuery } from 'react-query';


const fetchPlanets = async (key, page) => {
    const result = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    return result.json()
}

const Planets = () => {
    const [page, setPage] = useState(1);
    const { 
        resolvedData,
        latestData,
        status 
    } = usePaginatedQuery(['planets', page], fetchPlanets)
    return (
        <div>

            {status === "loading" && (
                <div>Loading data...</div>
            )}

            {status === "error" && (
                <div>Error fetching data</div>
            )}

            {status === "success" && (
                <>
                    <div className="button">
                        <button
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >Previous</button>
                        <button
                            onClick={() => setPage(prev => (!latestData || !latestData.next ? prev : prev + 1))}
                            disabled={!latestData || !latestData.next}
                        >Next</button>
                    </div>
                    
                    <div>
                        { resolvedData.results.map(planet => <Planet key={planet.name} planet={planet}/>)}
                    </div>
                </>
            )}
        </div>
    );
}

export default Planets
