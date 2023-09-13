import React from "react";
import { Row, Col, FormGroup, Form, Button, Alert  } from 'react-bootstrap';
import { signupData } from './../api/info';

class SignUp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alert:'',
      pass: '',
      email: '',
      name: '',
    }
  }
  
  handleChange(e, input) {
    const value = e.target.value;
    this.setState({
      [input]:value
    })
  }

  componentDidMount(){
    
  }

  async SignUp(name, pass, email){
    let message = ''
    sessionStorage.removeItem('signup')
    if(pass.length >= 8 && pass.length <= 16){
      const res = await signupData({ name: name, email: email, pass: pass });
      console.log(res.data)
      if(res.data.code === 'ER_DUP_ENTRY'){
        message = <Alert key="warning" variant="warning" className="w-75 center text-center"> El correo {email} ya está registrado</Alert>
      }else{
        if(res.data.affectedRows === 1){
          console.log('Usuario registrado')
          function token() {
            return Math.random().toString(36);
          };
          sessionStorage.setItem('token', token())
          window.location.reload()
        }
      }
    }else{
      message = <Alert key="warning" variant="warning" className="w-50 center text-center"> La contraseña debe contener entre 8 y 16 carácteres</Alert>
    }

    this.setState({
      alert: message
    })
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
              <h2 className="mt-5">Registrate</h2>
            </div>
            <Form className="center p-5 pt-3 w-75">
              <FormGroup className=" mt-4 ml-5"> 
                <Form.Label><h5>Nombre:</h5></Form.Label>
                <Form.Control 
                className=" ml-2" 
                placeholder="Nombre Completo"
                name='name'
                value={this.state.name}
                onChange={event => this.handleChange(event, "name")}
                />
              </FormGroup>
              <FormGroup className=" mt-4 ml-5"> 
                <Form.Label><h5>Correo:</h5></Form.Label>
                <Form.Control 
                type="email" 
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
              <FormGroup className="mt-4 text-center">
                <Button 
                className="buttonEntrar pl-5 pr-5"
                onClick={() => this.SignUp(this.state.name,this.state.pass,this.state.email)}
                >Aceptar</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}
  
  export default SignUp;