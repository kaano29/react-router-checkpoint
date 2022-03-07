import React from 'react'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../actions/auth.actions'
import { bindActionCreators } from 'redux'

class TopNav extends React.Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onHandleLogOut = () => {
    this.props.userLogout()
  }

  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">ProfileHub</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!this.props.loggedIn ?
                <NavItem><Link className='nav-link' to="/login">Login</Link></NavItem>
                : <NavItem><a style={{cursor: 'pointer'}} className='nav-link' onClick={this.onHandleLogOut}>Log out</a></NavItem>}
              {!this.props.loggedIn && <NavItem><Link className='nav-link' to="/signup">Signup</Link></NavItem>}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: Object.keys(state.auth.user).length !== 0
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  userLogout
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TopNav)
