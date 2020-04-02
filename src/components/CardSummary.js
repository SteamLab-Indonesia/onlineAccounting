import React, {Component} from 'react';
import Danger from "./Typography/Danger.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardIcon from "./Card/CardIcon.js";
import CardBody from "./Card/CardBody.js";
import CardFooter from "./Card/CardFooter.js";
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";


import styles from '../assets/jss/material-dashboard-react/views/dashboardStyle'

const useStyles = makeStyles(styles);

export default function CardSummary(props){

    const classes = useStyles();
    return(
        <Card>
        <CardHeader color="success" stats icon>
            <CardIcon color="success">
                <Icon>
                    content_copy
                </Icon>
            </CardIcon>
            <p className={classes.cardCategory}>{props.title}</p>
            <h3 className={classes.cardTitle}>{props.content}</h3>
        </CardHeader>
        <CardFooter stats>
            <div className={classes.stats}>
            Last 24 Hours
            </div>
        </CardFooter>
        </Card>
    )
}