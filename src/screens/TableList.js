import React, {Component} from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {getTransaction} from  '../libs/firebase';
import {getIncomeCategory} from  '../libs/firebase';
import {getExpenseCategory} from  '../libs/firebase';
import { render } from "react-dom";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default class TableList extends Component {
  
  state = {
    collate: [],
    income: [],
    expense: []
  }

  componentDidMount = () =>{
    getTransaction().then((data) => {
        this.setState({collate:data})
    })
    getIncomeCategory().then((data) => {
        this.setState({income:data})
    })
    getExpenseCategory().then((data) => {
        this.setState({expense:data})
    })
  }
  // pressAdd = (index) =>{
  //   let {date, category, description, amount, collate} = 
  //       this.state;

  //   // New Data
  //   // let new_data = {
  //   //     date,
  //   //     category,
  //   //     description,
  //   //     amount
  //   // }
  //   // collate.push({new_data});

  //   let new_empty_line = {
  //       date: new Date().getFullYear() + '-' + ('00' + (new Date().getMonth()+1)).slice(-2) + '-' + new Date().getDate(),
  //       category: '',
  //       description: '',
  //       amount: ''
  //   };
  //   collate.push(new_empty_line);

  //   this.setState({
  //       collate
  //   });

  // }

  // pressDelete = (index) =>{
  //   console.log('delete' +index)
  //   let collate = this.state.collate;
  //   collate.splice(index,1);
  //   this.setState({collate:collate})
  // }

  // changeDate = (event,index) =>{
  //   let collate = this.state.collate;
  //   collate[index].date = event.target.value;
  //   this.setState({collate:collate});
  //   console.log(this.state.collate)
  // }

  // changeDescription = (event,index) => {
  //   let collate = this.state.collate;
  //   collate[index].description = event.target.value;
  //   this.setState({collate:collate});
  // }

  // changeCategory = (event,index) =>{
  //   let collate = this.state.collate;
  //   collate[index].category = event.target.value;
  //   this.setState({collate:collate});
  // }

  // changeAmount = (event,index) => {
  //   let collate = this.state.collate;
  //   collate[index].amount = event.target.value;
  //   this.setState({collate:collate});
  // }

  render() {
    const classes = styles;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Journal Transaction</h4>
              <p className={classes.cardCategoryWhite}>
                Plese view your transaction
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Date", "Category", "Description", "Amount", 'Action']}
                tableData={this.state.collate}
                income={this.state.income}
                expense={this.state.expense}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
