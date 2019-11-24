import React, {useState} from 'react'
import {Grid, Image} from "semantic-ui-react";

const Posts = ({allTrips}) => {
    const [open, setOpen] = useState(false);
    const show = () => setOpen(true);
    return (
        allTrips.map(trip => (
            <Grid.Column key={trip.city}>
                <Image
                    className="TripImage"
                    onClick={show} src={trip.img}
                    label={{
                        ribbon: true,
                        color: 'blue',
                        content: `${trip.city}`
                    }}
                    centered={true}
                />
                <p>{trip.title}</p>
            </Grid.Column>
        ))
    )
};
export default Posts