import React from 'react'

export const FilteredResults = () => {
    const { searchQuery, selectedContinent, rangeValue } = this.state;
    const continent = Continents.find(continent => {
        return continent.value === selectedContinent
    });
    const continentText = continent ? continent.text : '';
    return this.state.results.filter(trip => {
        return (
            (trip.continent.toLowerCase().includes(continentText.toLowerCase()) &&
                trip.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                Number(trip.price) < rangeValue) ||
            (trip.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
                trip.continent.toLowerCase().includes(continentText.toLowerCase()) &&
                Number(trip.price) < rangeValue)
        )
    })
}
