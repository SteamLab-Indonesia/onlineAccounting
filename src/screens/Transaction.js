import React, {Component} from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {getTransaction} from  '../libs/firebase'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { ListSubheader } from '@material-ui/core';

class onlineAccounting extends Component{
    constructor(){
        super();
        this.state = {
            'date': new Date().getFullYear() + '-' + ('00' + (new Date().getMonth()+1)).slice(-2) + '-' + new Date().getDate(),
            'category':'',
            'description':'',
            'amount':'',
            'collate': [{
                date: new Date().getFullYear() + '-' + ('00' + (new Date().getMonth()+1)).slice(-2) + '-' + new Date().getDate(),
                category: '',
                description: '',
                amount: ''
            }],
            'income':[],
            'expense':[]
        }
    }

    pressAdd = (index) =>{
        let {date, category, description, amount, collate} = 
            this.state;

        // New Data
        // let new_data = {
        //     date,
        //     category,
        //     description,
        //     amount
        // }
        // collate.push({new_data});

        let new_empty_line = {
            date: new Date().getFullYear() + '-' + ('00' + (new Date().getMonth()+1)).slice(-2) + '-' + new Date().getDate(),
            category: '',
            description: '',
            amount: ''
        };
        collate.push(new_empty_line);

        this.setState({
            collate
        });

    }

    pressDelete = (index) =>{
        console.log('delete' +index)
        let collate = this.state.collate;
        collate.splice(index,1);
        this.setState({collate:collate})
    }

    changeDate = (event,index) =>{
        let collate = this.state.collate;
        collate[index].date = event.target.value;
        this.setState({collate:collate});
        console.log(this.state.collate)
    }

    changeDescription = (event,index) => {
        let collate = this.state.collate;
        collate[index].description = event.target.value;
        this.setState({collate:collate});
    }

    changeCategory = (event,index) =>{
        let collate = this.state.collate;
        collate[index].category = event.target.value;
        this.setState({collate:collate});
    }

    changeAmount = (event,index) => {
        let collate = this.state.collate;
        collate[index].amount = event.target.value;
        this.setState({collate:collate});
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

    render(){
        console.log(this.state.collate);
        console.log(this.state.date);
        return(
            <div style = {styles.mainContainer}>
                <div style = {styles.columnContainer}>
                    <div style = {styles.rowContainer}>Date</div>
                    <div style = {styles.rowContainer}>Category</div>
                    <div style = {styles.rowContainer}>Description</div>
                    <div style = {styles.rowContainer}>Amount</div>
                    <div style = {styles.rowContainer}>Action</div>
                </div>
                    {
                        this.state.collate.map((item,index) => {
                            return(
                                <div style = {styles.columnContainer} key = {index}>
                                    <div style = {styles.rowContainer}>
                                        {/* <MuiPickersUtilsProvider>
                                            <Grid container justify="space-around">
                                                <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Date picker inline"
                                                value={new Date('2014-08-18T21:11:54')}
                                                // onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider> */}
                                        <TextField
                                            id="date"
                                            // label="Birthday"
                                            type="date"
                                            value = {item.date ? item.date : this.state.date}
                                            onChange={(event) => this.changeDate(event,index)}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div style = {styles.rowContainer}>
                                            <Select
                                                    value={item.category}
                                                    onChange={(event) =>this.changeCategory(event,index)}
                                                    name="category" id="category"
                                                    placeholder = 'Category'>
                                                    <ListSubheader>Income</ListSubheader>  
                                                    {
                                                        this.state.income.map((incomeItem) => {
                                                            return (
                                                                <MenuItem value={incomeItem.id}>{incomeItem.name}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                    <ListSubheader>Expense</ListSubheader>
                                                    {
                                                        this.state.expense.map((expenseItem) => {
                                                            return (
                                                                <MenuItem value={expenseItem.id}>{expenseItem.name}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                    <MenuItem value={item.id}>Rent</MenuItem>
                                            </Select>
                                    </div>
                                    <div style = {styles.rowContainer}>
                                        <input type= 'text' value={item.description} placeholder = 'Description' onChange = {(event) => this.changeDescription(event,index)} />
                                    </div>
                                    <div style = {styles.rowContainer}>
                                        <input type= 'text' value={item.amount} placeholder = '0' onChange = {(event) => this.changeAmount(event,index)} />
                                    </div>
                                    <div style = {styles.rowContainer}>
                                        <input type= 'button' onClick = {this.pressAdd} value = '+'></input>
                                        <input type= 'button' onClick = {()=>this.pressDelete(index)} value = '-'></input>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        )
    }

}

const styles = {
    mainContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90vw',
        height: '90vh',
        marginTop: 10,
        marginLeft: 80
    },
    columnContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '8%',
        border:'solid',
        borderWidth: '1px',
        backgroundColor: 'pink'
    },
    rowContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        height: '100%',
        border:'solid',
        borderWidth: 1
    }
}

export default onlineAccounting;