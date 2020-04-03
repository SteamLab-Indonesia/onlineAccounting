import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardSummary from '../components/CardSummary';
import {getTransaction, getIncomeCategory, getExpenseCategory} from  '../libs/database';

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
  }
};

class Dashboard extends Component { //function has no state, class extends from component, ada state and render
    
    state = {
      income: [],
      expense: [],
      transaction:[],
      incomeAmount:0,
      expenseAmount:0,
      balanceAmount:0
    }

    componentDidMount = () => {
      //firebase - get income data
      getIncomeCategory().then((data) => {
        this.setState({income:data.map((item)=>item.id)})
      })
      //firebase - get expense data
      getExpenseCategory().then((data) => {
        this.setState({expense:data.map((item)=>item.id)})
      })
      //firebase-get transaction
      getTransaction().then((data) => {
        this.setState({transaction:data})
      })
    }

    render(){
        let income = this.state.income;
        let transaction = this.state.transaction
        let incomeAmount=0;
        let expenseAmount=0;
        let balanceAmount=0;

        for (let i=0; i< transaction.length; i++){
          if(income.includes(transaction[i].category)){
            incomeAmount = incomeAmount + Number(transaction[i].amount);
          }
          else{
            expenseAmount = expenseAmount + Number(transaction[i].amount);
          }
        }
        balanceAmount = incomeAmount - expenseAmount;

        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
          
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
        );
    }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard); //withStyles itu dari classes. makanya ambilnya dari classes yang dari this.props