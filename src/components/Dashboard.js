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
                <Grid.Row >
                    <Grid.Column width={8}>
                        <h2>fajny ten donat</h2>
                        <PieChart/>
                    </Grid.Column>
                    <Grid.Column width={8} verticalAlign={'middle'}>
                    <h2>a słupki śmiesznie skaczą</h2>
                        <DataBarChart/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered={true}>
                    <Grid.Column width={8} verticalAlign={'middle'}>
                        <h3>więcej lorem ipsum</h3>
                        <p>chcemy więcej </p>
                        <p>więcej lorem ipsum</p>
                    </Grid.Column>
                    <Grid.Column width={8} verticalAlign={'middle'}>
                        <h3>co mówią nam te słupeczki?</h3>
                        <p>...a jak pozbędziemy się tych obrazków imitujących paragrafy </p>
                        <p>i w to miejsce damy prawdziwe paragrafy, takie z krwi i kości?</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}


export default Dashboard