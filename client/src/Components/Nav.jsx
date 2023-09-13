import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './Components.css';
import logo from './../assets/lm.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'


class Nav extends React.Component{

  action(act){
    switch (act) {
      case 'Salir':
        sessionStorage.clear();
        window.location.reload();
        break;

      case 'SignUp':
        sessionStorage.setItem('signup', true)
        window.location.reload()
        break;

      case 'LogIn':
        sessionStorage.clear();
        window.location.reload();
        break;
    
      default:
        sessionStorage.clear();
        window.location.reload();
        break;
    }
  }
  
  render(){
    return(
      <>
        <Container fluid id="nav" className="pt-2 p-4 pb-2 mb-5">
          <Row>
            <Col xs={8}>
              <img src={logo} alt="LM" className="logo"/>
            </Col>
            <Col>
                <h5 className="right pointer" onClick={() => this.action(this.props.navAction)}>
                  {this.props.navAction} {this.props.navAction === 'Salir' ? <FontAwesomeIcon icon={faRightFromBracket} /> : <FontAwesomeIcon icon={faUser} />}
                </h5>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Nav;