import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Route, Switch } from "react-router-dom";
import TransactionList from 'screens/TransactionList';
import Dashboard from 'screens/Dashboard';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import LiveHelpRoundedIcon from '@material-ui/icons/LiveHelpRounded';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import { Redirect } from "react-router-dom";
import Link from '@material-ui/core/Link';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class App extends React.Component {
  state = {
    open: false,
    redirectDashboard: false,
    redirectFAQ: false,
    redirectTransaction: false,
    redirectToDashboard: '/Dashboard',
    redirectToTransaction: '/transaction'
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onDashboardPress = () => {
    this.setState({redirectDashboard:true})
  }

  // onFAQPress = () => {
  //   this.setState({redirectDashboard:true})
  // }

  onTransactionPress = () => {
    this.setState({redirectTransaction:true})
  }

  // refreshFunction () {
  //   // Router.dispatch(location.getCurrentPath(), null);
  //   window.location.reload()
  // }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    
    if (this.state.redirectDashboard) {
      return <Redirect to={this.state.redirectToDashboard} />
    }

    if (this.state.redirectTransaction) {
      return <Redirect to={this.state.redirectToTransaction} />
    }

    if (this.state.redirectDashboard || this.state.redirectTransaction){
      return window.location.reload()
    }

    console.log(this.state.redirectDashboard)

    return (
      
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Online Accounting
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Dashboard', 'Transaction'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{ index === 0 ? 
                  <Link onClick={this.onDashboardPress} color="inherit"><DashboardRoundedIcon></DashboardRoundedIcon></Link>
                      /* <Link to="/Dashboard" className="btn btn-primary"><DashboardRoundedIcon></DashboardRoundedIcon></Link> */
                   : <ReceiptRoundedIcon onClick={this.onTransactionPress}/>}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>

              // <Link color="inherit">
              // <ListItem button key={text}>
              //   <ListItemIcon>{ index === 0 ? 
              //     <DashboardRoundedIcon onClick={this.onDashboardPress}></DashboardRoundedIcon>
              //     : <ReceiptRoundedIcon onClick={this.onTransactionPress}/>}</ListItemIcon>
              //   <ListItemText primary={text} />
              // </ListItem>
              // </Link>
            ))}
          </List>
          <Divider />
          <List>
            {['FAQs', 'Chatbot'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <QuestionAnswerRoundedIcon /> : <LiveHelpRoundedIcon/>}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div style={{height:'50px'}}></div>
            <Switch>
              <Route path='/transaction' component = {TransactionList} />
              <Route path='/dashboard' component = {Dashboard} />
            </Switch>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
//cannot auto refresh when link pressed