//import React from 'react';
//import { Link, withRouter} from 'react-router-dom';
//import {connect} from 'react-redux';


//class Header extends React.Component {
  //  constructor () {
    //    super ();
      //  this.handleLogout = this.handleLogout.bind(this);
    //}
    //handleLogout(){
      //  this.props.logout();
        //this.props.history.push('/feedback');
    //}
    //renderAuthButton(isAuth) {
        
      //  if(isAuth){
        //    return <a href className = "nav-item nav-link clickable" onClick = {this.handleLogout}>Logout</a>
        //}
        //return (
          //  <React.Fragment>
            //    <Link className = 'nav-item nav-link'to = '/login'>Guest Login< span className = 'sr-only'></span></Link>
               // <Link className = 'nav-item nav-link' to ='/register'> Register as Guest</Link>
            //</React.Fragment>
        //)
    //}
    //renderFeedbackSection(isAuth){
      //  if(isAuth){
        //    return (
          //      <div className = 'nav-item dropdown'>
            //    <a href className = 'nav-link nav-item dropdown-toggle clickable'  id = "navbarDropdownMenuLink" data-toggle = "dropdown"
              //  aria-expanded = "false">
                //Select Accommodation
                //</a>
                //<div className = "dropdown-menu"
                //aria-labelledby = "navbarDropdownMenuLink">
                 //   <Link className = "dropdown-item" to = "/feedback/room">View Rooms </Link>
                   // <Link className = "dropdown-item" to = "/feedback/activities">View Activities</Link>
                   // <Link className = "dropdown-item" to = "/feedback/eating">View Eating</Link>

                //</div>
                //</div>
            //)
        //}
   // }
    //render() {
      //  const {booking_id, isAuth} = this.props.auth;
        //return(
          //  <nav className = 'navbar navbar-dark navbar-expand-lg'>
            //    <div className = 'container'>
              //      <Link className = 'navbar-brand' to = '/'> Rate My Stay Feedback App
                //    </Link>
                    
                  //  <Link className = 'navbar-brand' to = '/feedback'>Give Feedback
                   // </Link>
                   // <Link className = 'navbar-brand' to = '/login'>Guest Login
                   // </Link>
                   // <Link className = 'navbar-brand' to = '/accommodation'>Register
                   // </Link>
                   // <div className = 'navbar-  nav ml-auto'>
                    //    {isAuth && <a href  className = 'nav-item nav-link'>{booking_id}</a>
                      //  }
                       // {this.renderFeedbackSection(isAuth)}
                       // {this.renderAuthButton(isAuth)}
                    //</div>
                //</div>
            //</nav>
        //);
   // }
//}

//function maptoStateToProps(state){
  //  return {
    //    auth: state.auth
   // }
//}
//export default withRouter(connect(maptoStateToProps)(Header));