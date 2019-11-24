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
                        <h3>Z WAY.TO skorzystało już 1529 osób, z czego:</h3>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <ul className={'pieUl'}>
                                <li className={'pieLi pieLi__asia'}>423 osoby były w Azji</li>
                                <li className={'pieLi pieLi__europe'}>313 poleciało do Europy</li>
                                <li className={'pieLi pieLi__northamerica'}>241 poznało Północną Amerykę</li>
                                <li className={'pieLi pieLi__africa'}>87 wybrało Afrykę</li>
                            </ul>
                            <ul className={'pieUl'}>
                                <li className={'pieLi pieLi__southamerica'}>328 zwiedziło Amerykę Południową</li>
                                <li className={'pieLi pieLi__antarctica'}>56 wróciło z Antarktydy</li>
                                <li className={'pieLi pieLi__australia'}>81 zostało w  Antarktydy</li>
                            </ul>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={8} verticalAlign={'middle'} style={{height: '100%'}}>
                        <h3>Podróż na każdą kieszeń, zawsze.</h3>
                        <div>
                            <ul style={{listStyle: 'none'}}>
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