import React from 'react';
import PieChartComponent from "./PieChart";
import {Grid, Image} from "semantic-ui-react";
import DataBarChart from "./DataChart";

function Dashboard() {
    return (
        <div className="Dashboard">
            <Grid padded={true}>
                <Grid.Row>
                    <Grid.Column>
                        <h2>Planowanie podróży nigdy nie było tak proste i przyjemne</h2>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <PieChartComponent/>
                    </Grid.Column>
                    <Grid.Column width={8} verticalAlign={'middle'}>
                        <DataBarChart/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered={true}>
                    <Grid.Column width={8} verticalAlign={'middle'}>
                        <h3>Ustaw swój cel</h3>
                        <div>
                            <ul>
                                <li>Wybierz interesujący Cię kontynent</li>
                                <li>Oszacuj swój budżet</li>
                                <li>Przeżyj przygodę swojego życia</li>
                            </ul>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={8} verticalAlign={'middle'}>
                        <h3>Podróż na każdą kieszeń, zawsze.</h3>
                        <div>
                            <ul>
                                <li>Wyjdź z domu i poczuj się turystą we własnym mieście</li>
                                <li>Skorzystaj z formularza i dodaj swoją wycieczkę</li>
                                <li>Wracaj do swoich najlepszych lokalizacji z pomocą ulubionych</li>
                            </ul>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}


export default Dashboard