import React from 'react';
import PieChart from "./PieChart";
import {Grid, Image} from "semantic-ui-react";
import DataBarChart from "./DataChart";

function Dashboard() {
    return (
        <div className="Dashboard">
            <Grid padded={true}>
                <Grid.Row>
                    <Grid.Column>
                        <h2>Ptaki latają kluczem</h2>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered={true}>
                    <Grid.Column width={8}>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                        <PieChart/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                        <DataBarChart/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered={true}>
                    <Grid.Column width={8}>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}


export default Dashboard