import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardSummary from '../components/CardSummary';
import DoughnutSummary from '../components/DoughtnutSummary';
import {getTransaction, getIncomeCategory, getExpenseCategory} from  '../libs/database';
import ChatBox from 'screens/ChatBox';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flexstart'
  },
  bigContainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flexstart'
  }
};

class Dashboard extends Component { //function has no state, class extends from component, ada state and render
    
    state = {
      income: [],
      expense: [],
      transaction:[],
      incomeAmount:0,
      expenseAmount:0,
      balanceAmount:0,
      incomeSection: [],
      expenseSection: []
    }

    componentDidMount = () => {
      //firebase - get income data
      getIncomeCategory().then((data) => {
        if (data)
        {
          this.setState({
            income:data.map((item)=>item.id),
            incomeSection:data
          })
        }
      })
      //firebase - get expense data
      getExpenseCategory().then((data) => {
        if (data)
        {
          this.setState({
            expense:data.map((item)=>item.id),
            expenseSection:data
          })
        }
      })
      //firebase-get transaction
      getTransaction().then((data) => {
        if (data)
        {
          this.setState({transaction:data})
        }        
      })
    }
    generateColor = () => {
      return '#' +  Math.random().toString(16).substr(-6);
    }

    render(){
        let income = this.state.income;
        let transaction = this.state.transaction
        let incomeAmount=0;
        let expenseAmount=0;
        let balanceAmount=0;
        let incomeSection= this.state.incomeSection;
        let expenseSection= this.state.expenseSection;
        incomeSection = incomeSection.map((item) =>{
          return {
            id:item.id,
            name:item.name,
            amount: 0,
            color: this.generateColor()
          }
        })
        expenseSection = expenseSection.map((item) =>{
          return {
            id:item.id,
            name:item.name,
            amount: 0,
            color: this.generateColor()
          }
        })

        for (let i=0; i< transaction.length; i++){
          if(income.includes(transaction[i].category)){
            incomeAmount = incomeAmount + Number(transaction[i].amount);
            let sectionAmount = incomeSection.filter((item)=>{
              return item.id == transaction[i].category
            })
            console.log(sectionAmount); //salah satu dari income section, income section ad 4 array
            if(sectionAmount.length>0){
              sectionAmount[0].amount += transaction[i].amount
            }
          }
          else{
            expenseAmount = expenseAmount + Number(transaction[i].amount);
            let sectionAmount = expenseSection.filter((item)=>{
              return item.id == transaction[i].category
            })
            console.log(sectionAmount);
            if(sectionAmount.length>0){
              sectionAmount[0].amount += transaction[i].amount
            }
          }
        }
        balanceAmount = incomeAmount - expenseAmount;

        const { classes } = this.props;
        return (
          <div className = {classes.bigContainer}>
            <div className = {classes.container}>
            <CardSummary
              title='Income'
              content= {'Amount: '+ incomeAmount}
            />
            <CardSummary
              title='Expense'
              content= {'Amount: '+ expenseAmount}
            />
            <CardSummary
              title='Balance'
              content= {'Amount: '+ balanceAmount}
            />
          </div>
            <div className = {classes.container}>
              <DoughnutSummary
              title='Income'
              data={{
                labels:incomeSection.map((item)=>item.name),
                datasets:[{
                  data: incomeSection.map((item)=>item.amount),
                  backgroundColor: incomeSection.map((item)=>item.color)}]
              }}
            />
            <DoughnutSummary
              title='Expense'
              data={{
                labels:expenseSection.map((item)=>item.name),
                datasets:[{
                  data: expenseSection.map((item)=>item.amount),
                  backgroundColor: expenseSection.map((item)=>item.color)}]
              }}
            />
            </div>
            <ChatBox />
          </div>
        );
    }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard); //withStyles itu dari classes. makanya ambilnya dari classes yang dari this.props