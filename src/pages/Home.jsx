import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    // define variables
    const [pokeList, setPokeList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(0)

    // fetch pokemon data
    useEffect(() => {
        const fetchPokeData = async () => {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50')
            // array of pokemon
            const results = response.data.results
            // get data for each pokemon
            const pokeDataList = await Promise.all(results.map(async (result) => {
                // get data from pokemon url
                const pokeResponse = await axios.get(result.url)
                return pokeResponse.data
            }))
            setPokeList(pokeDataList)
            setMaxPages(Math.ceil(pokeDataList.length / 10))
        }
        fetchPokeData()
    }, [])

    // function to move to next page 
    const handleNext = () => {
        setCurrentPage(currentPage + 1)
    }

    // function to move to previous page
    const handlePrevious = () => {
        setCurrentPage(currentPage - 1)
    }

    // pagination
    const startPoke = (currentPage - 1) * 10;
    const endPoke = (startPoke) + 10
    const showCurrentPokeList = pokeList.slice(startPoke, endPoke)

  return (
    <section id='home'>
        <div className="container">
            <h1 className="home__title">
                Shivom's Pokedex
            </h1>
            <ul className="poke__list">
                {showCurrentPokeList.map((pokemon) => (
                    <li key={pokemon.id} className="poke__list--item">
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <p className='poke__name'>
                            {pokemon.name}
                        </p>
                    </li>
                ))}
            </ul>
            <div className='buttons__block'>
                <button className='pagination__buttons' onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </button>
                <p className='page__number'>{currentPage}</p>
                <button className='pagination__buttons' onClick={handleNext} disabled={currentPage === maxPages}>
                    Next
                </button>
            </div>
        </div>
    </section>
  )
}

export default Home