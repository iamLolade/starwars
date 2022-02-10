import React, { useState } from "react";
import Planet from "./card/Planet";
import { QueryClient, QueryClientProvider, usePaginatedQuery } from 'react-query';

//const queryClient = new QueryClient();

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
            <h2>Planets</h2>
            {status === "loading" && (
                <div>Loading data...</div>
            )}

            {status === "error" && (
                <div>Error fetching data</div>
            )}

            {status === "success" && (
                <>
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >Previous</button>
                    <span>{ page }</span>
                    <button
                        onClick={() => setPage(prev => (!latestData || !latestData.next ? prev : prev + 1))}
                        disabled={!latestData || !latestData.next}
                    >Next</button>
                    <div>
                        { resolvedData.results.map(planet => <Planet key={planet.name} planet={planet}/>)}
                    </div>
                </>
            )}
        </div>
    );
}

export default Planets
// export default function Wraped() {
//     return (<QueryClientProvider client={queryClient}>
//         <Planets />
//     </QueryClientProvider>
//     );
// }