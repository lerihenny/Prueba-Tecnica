import React from "react";
import { Row, Col, FormGroup, Form, Button, Alert  } from 'react-bootstrap';
import {loginData} from './../api/info';


class LogIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alert:'',
      email:'', 
      pass: '',
    }
  }

  handleChange(e, input) {
    const value = e.target.value;
    this.setState({
      [input]:value
    })
  }

  async LogIn(email, pass){
    let message = ''
    if(email !== '' && pass !== ''){
      const res = await loginData({email: email, pass: pass,});
      console.log(res)
      if(res.data !== false){
        if(res.data.length === 1){
          function token() {
            return Math.random().toString(36);
          };
          sessionStorage.setItem('token', token())
          window.location.reload()
        }else{
          message = <Alert key="warning" variant="warning">
            No se puede iniciar sesión, compruebe los datos. Sino tiene una cuenta puede 
             <Alert.Link onClick={() => this.signup()}> registrarse </Alert.Link> 
             haciendo click aquí
          </Alert>
        }
      }else{
        message = <Alert key="warning" variant="warning" className="w-50 center text-center"> La contraseña no coincide</Alert>
      }
    }else{
      message = <Alert key="warning" variant="warning" className="w-50 center text-center"> Debe llenar todos los campos</Alert>
    }
    this.setState({
      alert: message
    })
  }
  
  signup(){
    sessionStorage.setItem('signup', true)
    window.location.reload()
  }

  render(){
    return(
      <>
        <Row className="mt-5">
          <Col md={7} xs={10} className='center'>
            {this.state.alert}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6} xs={10} className="center border mt-3 form" style={{marginBottom: '11%'}}>
            <div className="text-center w-100">
              <h2 className="mt-5">Iniciar Sesión</h2>
            </div>
            <Form className="center p-5 pt-3 w-75">
              <FormGroup className=" mt-4 ml-5"> 
                <Form.Label><h5>Correo:</h5></Form.Label>
                <Form.Control 
                className="ml-2" 
                placeholder="Correo"
                name='email'
                value={this.state.email}
                onChange={event => this.handleChange(event, "email")}
                />
              </FormGroup>
              <FormGroup className=" mt-4 ml-5"> 
                <Form.Label><h5>Contraseña:</h5></Form.Label>
                <Form.Control 
                type="password" 
                className="ml-2" 
                placeholder="Contraseña"
                name='pass'
                value={this.state.pass}
                onChange={event => this.handleChange(event, "pass")}
              />
              </FormGroup>

              <FormGroup className="mt-5 text-center">
                <Button 
                className="buttonEntrar pl-5 pr-5"
                onClick={() => this.LogIn(this.state.email,this.state.pass)}
                >Entrar</Button>
              </FormGroup>
            </Form>

          </Col>
        </Row>
      </>
    )
  }
}
  
  export default LogIn;