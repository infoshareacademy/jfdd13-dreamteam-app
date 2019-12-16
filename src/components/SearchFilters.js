import React from 'react'

export const Continents = [
    { key: 'afr', value: 1, text: "Afryka" },
    { key: 'apd', value: 2, text: "Ameryka Południowa" },
    { key: 'apn', value: 3, text: "Ameryka Północna" },
    { key: 'aus', value: 4, text: "Australia i Oceania" },
    { key: 'azj', value: 5, text: "Azja" },
    { key: 'eur', value: 6, text: "Europa" }
];

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
