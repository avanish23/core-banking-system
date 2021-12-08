import React from "react";
import {
  BrowserRouter as Router,
  Route
  
} from "react-router-dom";
import Transaction from "./components/transactionComponent";
import Balance from "./components/balanceComponent";
import Register from './components/registerComponent';
import Login from './components/loginComponent';
import Dashboard from "./components/dashboardComponent";
import Account from "./components/createAccountComponent";
import './App.css';
import SeeTransaction from "./components/seeTransactionComponent";
import Loan from "./components/loanComponent";
import ApproveLoan from "./components/approveLoanComponent";
import EmployeeDashboard from "./components/empDashboardComponent";
import EmployeeLogin from "./components/empLoginComponent";


function App() {
  return (
    
      <Router>
        
          
          
            <Route exact path ="/login" component={Login} />
            <Route exact path = "/register" component={Register}/>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/account" component={Account}/>
            <Route exact path="/balance" component={Balance}/>
            <Route exact path="/transaction" component={Transaction}/>
            <Route exact path="/seeTransaction" component={SeeTransaction}/>
            <Route exact path="/loans" component={Loan}/>
            <Route exact path="/approve" component={ApproveLoan}/>
            <Route exact path="/empdashboard" component={EmployeeDashboard}/>
            <Route exact path="/emplogin" component={EmployeeLogin}/>

        
      </Router>
   
  );
}

export default App;
