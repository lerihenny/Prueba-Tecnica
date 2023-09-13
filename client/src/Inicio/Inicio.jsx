import React from "react";
import { Container, Row, Col,  } from 'react-bootstrap';
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import LogIn from '../Components/LogIn'
import SignUp from '../Components/SignUp'
import Home from '../Components/Home/Home'

import './Inicio.css';


class Inicio extends React.Component{

  state = {
    navAction: '',
    inComponent: "",
  };

  async componentDidMount(){
    let component = '', action = ''

    if(sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== undefined){
      component = <Home />
      action = 'Salir'
    }else if (sessionStorage.getItem('signup') === 'true'){
      component = <SignUp />
      action = 'LogIn'
    }else{
      component = <LogIn />
      action = 'SignUp'
    }

    this.setState({
      inComponent: component,
      navAction: action,
    })
  }

  render(){
    return(
      <>
      <Nav navAction={this.state.navAction}/>
        <Container>
          <Row>
            <Col className="text-center">
              <h2> ¡Bienvenido al sistema de registro de propiedades de vino! </h2>
              <h5>Este sistema le permitirá mantener un registro completo de sus vinos.</h5>
            </Col>
          </Row>
        </Container>

        {this.state.inComponent}

        <Footer />
      </>
    )
  }
}

export default Inicio;