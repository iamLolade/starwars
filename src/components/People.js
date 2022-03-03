import React, { useState } from "react";
import Person from "./card/Person";
import { usePaginatedQuery } from 'react-query';


const fetchPeople = async (key, page) => {
    const result = await fetch(`https://swapi.dev/api/people/?page=${page}`)
    return result.json()
}

const People = () => {
    const [page, setPage] = useState(1)
    const { 
        resolvedData, 
        latestData, 
        status 
    } = usePaginatedQuery(['people', page], fetchPeople)
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
                    <div>
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
                            { resolvedData.results.map(person => <Person key={person.name} person={person}/>)}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default People
