import React, {useState} from 'react'
import {Grid, Image} from "semantic-ui-react";

const Posts = ({allTrips}) => {
    const [open, setOpen] = useState(false);
    const show = () => setOpen(true);
    console.log(allTrips);
    return (
        allTrips.map( trip=> (
            <Grid.Column key={trip.city}>
                <Image className="TripImage" onClick={show} src={trip.img}
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
// const Posts = ({posts, loading}) => {
//     if (loading) {
//         return <h2>Loading...</h2>
//     }
//     return (
//         <div>
//             <ul>
//                 {posts.map(post => (
//
//                     <li
//                         key={post.id}
//                         className="list-item"
//                     >
//
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// };
export default Posts

// const  psots = () => {
//     return (
//         <Grid.Column key={post.city}>
//             <Image className="TripImage" onClick={show} src={post.img}
//                    label={{
//                        ribbon: true,
//                        color: 'blue',
//                        content: `${post.city}`
//                    }}
//                    centered={true}
//             />
//             <p>{post.title}</p>
//
//         </Grid.Column>
//     )
// }