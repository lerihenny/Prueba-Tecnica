import React from "react";
import { Row, Col, FormGroup, Form, Button, Alert  } from 'react-bootstrap';
import { getTipos, getVariedad, registrarVinos } from '../../../api/info';

class Registrar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      alert:'',
      nombre: '',
      tipo: '',
      variedad: '',
      year: '',
      color: '',
      temp: '--',
      graduacion: '--',
      ph: '--',
      observaciones: '--',
      tiposArray: [],
      variedadArray: [],
    }
  }

  componentDidMount(){
    this.tiposList();
    this.variedadList();
  }

  handleChange(e, input) {
    const value = e.target.value;
    this.setState({
      [input]:value
    })
  }

  async tiposList(){
    const res = await getTipos();
    this.setState({
      tiposArray: res
    })
  }

  async variedadList(){
    const res = await getVariedad();
    this.setState({
      variedadArray: res
    })
  }

  async Registrar(nombre, year, tipo, variedad, color, temp, graduacion, ph, observaciones){
    let message = ''
    if(nombre !== '' && year !== '' && tipo !== '' && variedad !== '' && color !== ''){
      if(year.length !== 4){
        message = <Alert key="warning" variant="warning" className="w-75 center text-center">Por favor introduzca un año valido</Alert>
      }else{
        let data = {
          nombre: nombre,
          year: year,
          tipo: tipo,
          variedad: variedad,
          color: color,
          temp: temp,
          graduacion: graduacion,
          ph: ph,
          observaciones: observaciones
        }
        const res = await registrarVinos(data);
        if(res.data.affectedRows === 1){
          message = <Alert key="success" variant="success" className="w-75 center text-center">El registro fue completado con exito.</Alert>
          this.props.reloadComponentB();
        }else{
          message = <Alert key="warning" variant="warning" className="w-75 center text-center">Ya existe un vino de ese año con el mismo nombre registrado </Alert>
        }
      }
    }else{
      message = <Alert key="warning" variant="warning" className="w-75 center text-center">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
    }

    this.setState({
      alert: message,
      nombre: '',
      tipo: '',
      variedad: '',
      year: '',
      color: '',
      temp: '--',
      graduacion: '--',
      ph: '--',
      observaciones: '--',
      tiposArray: [],
      variedadArray: [],
    })

  }


  render(){
    return(
      <>
        <Row className="">
          <Col md={11} xs={10} className="center border form-vinos" style={{marginBottom: '11%'}}>
            <div className="text-center w-100">
              <h3 className="mt-4">Registrar Vino</h3>
            </div>
            <Form className="center p-3">
              <Row>
                <Col md={6}>
                  <FormGroup className=" mt-4 ml-5"> 
                    <Form.Label><h5>Nombre*:</h5></Form.Label>
                    <Form.Control 
                    className=" ml-2" 
                    placeholder="Nombre del vino"
                    name='nombre'
                    value={this.state.nombre}
                    onChange={event => this.handleChange(event, "nombre")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className=" mt-4 ml-5"> 
                    <Form.Label><h5>Año*:</h5></Form.Label>
                    <Form.Control 
                    type="number" 
                    className="ml-2" 
                    placeholder="Año"
                    name='year'
                    value={this.state.year}
                    onChange={event => this.handleChange(event, "year")}
                  />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup className=" mt-4 ml-5"> 
                    <Form.Label><h5>Tipo*:</h5></Form.Label>
                    <Form.Select 
                      aria-label="Seleccionar tipo de vino" 
                      className="ml-2" 
                      name='tipo'
                      value={this.state.tipo}
                      onChange={event => this.handleChange(event, "tipo")}
                      >
                        <option value="opc" >Seleccionar tipo de Vino</option>
                        {
                          this.state.tiposArray.map((tipo, i) => (
                            <option key={i} value={tipo.id}>{tipo.descripcion}</option>
                          ))
                        }
                    </Form.Select>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className=" mt-4 ml-5"> 
                    <Form.Label><h5>Variedad*:</h5></Form.Label>
                    <Form.Select 
                      aria-label="Seleccionar variedad de vino" 
                      className="ml-2" 
                      name='variedad'
                      value={this.state.variedad}
                      onChange={event => this.handleChange(event, "variedad")}
                      >
                        <option value="opc" >Seleccionar tipo de Vino</option>
                        {
                          this.state.variedadArray.map((variedad, i) => (
                            <option key={i} value={variedad.id}>{variedad.descripcion}</option>
                          ))
                        }
                    </Form.Select>
                  </FormGroup>
                </Col>
              </Row>


              <Row>
                <Col md={6}>
                  <FormGroup className=" mt-4 ml-5"> 
                    <Form.Label><h5>Color*:</h5></Form.Label>
                    <Form.Control 
                    className=" ml-2" 
                    placeholder="Color"
                    name='color'
                    value={this.state.color}
                    onChange={event => this.handleChange(event, "color")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className=" mt-4 ml-5"> 
                    <Form.Label><h5>Temperatura (°C):</h5></Form.Label>
                    <Form.Control 
                    className="ml-2" 
                    placeholder="Temperatura"
                    name='temp'
                    value={this.state.temp}
                    onChange={event => this.handleChange(event, "temp")}
                  />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup className=" mt-4 ml-5"> 
                    <Form.Label><h5>Graduación:</h5></Form.Label>
                    <Form.Control 
                    type="number"
                    className=" ml-2" 
                    placeholder="Graduación"
                    name='graduacion'
                    value={this.state.graduacion}
                    onChange={event => this.handleChange(event, "graduacion")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className=" mt-4 ml-5"> 
                    <Form.Label><h5>PH:</h5></Form.Label>
                    <Form.Control 
                    type="number"
                    className="ml-2" 
                    placeholder="PH"
                    name='ph'
                    value={this.state.ph}
                    onChange={event => this.handleChange(event, "ph")}
                  />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup className=" mt-4 ml-5"> 
                    <Form.Label><h5>Observaciones:</h5></Form.Label>
                    <Form.Control 
                    className=" ml-2" 
                    placeholder="Observaciones"
                    as="textarea" rows={2}
                    name='observaciones'
                    value={this.state.observaciones}
                    onChange={event => this.handleChange(event, "observaciones")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup className="mt-5 text-center">
                <Button 
                className="buttonEntrar pl-5 pr-5"
                onClick={() => this.Registrar(this.state.nombre,this.state.year,this.state.tipo,this.state.variedad,this.state.color,this.state.temp,this.state.graduacion,this.state.ph,this.state.observaciones)}
                >Registrar</Button>
              </FormGroup>
            </Form>
            <Row className="mt-2">
              <Col md={12} xs={10} className='center'>
                {this.state.alert}
              </Col>
            </Row>
          </Col>
        </Row>

      </>
    )
  }
}
  
  export default Registrar;