import React, {Component} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ListSubheader } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {insertCategory} from '../../libs/database'; //naik 2x dari TransactionTable to component to source then bru bisa ke libs
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

//save 
const useStyles = makeStyles(styles);

export default class TransactionTable extends Component{
	state = {
		open: false,
		section: '',
		category: ''
	}
	
	onAddPress = (index) => {
		if (this.props.onAdd)
			this.props.onAdd(index);
	}

	onDeletePress = (index) => {
		if (this.props.onDelete)
			this.props.onDelete(index);
	}

	onChangePress = (event,key,name) => {
		if(this.props.onChange)
			this.props.onChange(event,key,name);
	}

	onBlur = (key) => {
		if (this.props.onBlur)
			this.props.onBlur(key);
	}

	onChangeSection =(event) => {
		this.setState({section: event.target.value});
	}

	onChangeCategory = (event) => {
		this.setState({category:event.target.value});
	}

	handleSave = () => {
		this.setState({open:false})
		insertCategory({
			name: this.state.category,
			section: this.state.section
		}).then(() => {
			if(this.props.updateCategory) //kl updateCategory di TransactionList deleted, gbs jln
				this.props.updateCategory()
		})
	}

	handleClose = () => {
		this.setState({open:false})
	}

	render() {
		const { tableHead, tableData, tableHeaderColor, income, expense } = this.props;
		const classes = styles;

		return (
			<div className={classes.tableResponsive}>
				<Table className={classes.table}>
				{tableHead !== undefined ? (
					<TableHead className={classes[tableHeaderColor + "TableHeader"]}>
					<TableRow className={classes.tableHeadRow}>
						{tableHead.map((prop, key) => {
						return (
							<TableCell
							className={classes.tableCell + " " + classes.tableHeadCell}
							key={key}
							>
							{prop}
							</TableCell>
						);
						})}
					</TableRow>
					</TableHead>
				) : null}
				<TableBody>
					{tableData.map((item, key) => {
					return (
						<TableRow key={key} className={classes.tableBodyRow}>
						{/* {prop.map((prop, key) => {
							return (
							<TableCell className={classes.tableCell} key={key}>
								{prop}
							</TableCell>
							);
						})} */}
						<TableCell>
							<TextField onChange = {(event) => this.onChangePress(event,key,'date')}
								id="date"
								// label="Birthday"
								type="date"
								value = {item.date ? item.date : this.state.date}
								InputLabelProps={{
								shrink: true,
								}}
							/>
						</TableCell>
						<TableCell>
							<Select onChange = {(event) => this.onChangePress(event,key,'category')}
							required
							value={item.category != ''? item.category : 'none'}
							name="category" id="category"
							placeholder = 'Category'>
							<MenuItem value="none" disabled>Please Choose ..</MenuItem>
							<ListSubheader>--- Income ---</ListSubheader>  
							{
								income.map((incomeItem) => {
									return (
										<MenuItem value={incomeItem.id}>{incomeItem.name}</MenuItem>
									)
								})
							}
							<ListSubheader>--- Expense ---</ListSubheader>
							{
								expense.map((expenseItem) => {
									return (
										<MenuItem value={expenseItem.id}>{expenseItem.name}</MenuItem>
									)
								})
							}
							</Select>
							<IconButton aria-label="Add" onClick = {()=>this.setState({open:true})}>
							<AddIcon/>
							</IconButton>
						</TableCell>
						<TableCell>
							<input type= 'text' value={item.description} placeholder = 'Description' onBlur={(event) => this.onBlur(key)} onChange = {(event) => this.onChangePress(event,key,'description')}/>
						</TableCell>
						<TableCell>
							<input type= 'text' value={item.amount} placeholder = '0' onBlur={(event) => this.onBlur(key)} onChange = {(event) => this.onChangePress(event,key,'amount')}/>
						</TableCell>
						<TableCell>
							<input type= 'button' value = '+' onClick={()=>this.onAddPress(key)}></input>
							<input type= 'button' value = '-'onClick={()=>this.onDeletePress(key)}></input>
						</TableCell>
						</TableRow>
					);
					})}
				</TableBody>
				</Table>
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Category</DialogTitle>
					<DialogContent>
					<DialogContentText>
						Add New Category
					</DialogContentText>
					<Select
						onChange = {(event) => this.onChangeSection(event)}
						required
						value={this.state.section}
						name="category" id="category"
						placeholder = 'Category'>
						<MenuItem value={'Income'}>Income</MenuItem>
						<MenuItem value={'Expense'}>Expense</MenuItem>
					</Select>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Category"
						onChange = {(event) => this.onChangeCategory(event)}
						type="text"
						fullWidth
					/>
					</DialogContent>
					<DialogActions>
					<Button onClick={this.handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={this.handleSave} color="primary">
						Save
					</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

TransactionTable.defaultProps = {
  tableHeaderColor: "gray"
};

TransactionTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
