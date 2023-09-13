import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Registros from './Components/Registros'
import Registrar from './Components/Registrar'


class Home extends React.Component{
  constructor() {
    super();
    this.state = {
      shouldReloadComponentB: false,
    };
  }

  // Función para recargar Registros
  reloadRegistros = () => {
    this.setState({ shouldReloadRegistros: true });
  };

  render(){
    return(
      <>
        <Container fluid >
          <Row className="mt-5 pt-5">
            <Col md="8" className="p-4 pt-0" id="tabla-registros">
              <Registros shouldReload={this.state.shouldReloadRegistros}/>
            </Col>

            <Col md="4" id="formulario-registro">
              <Registrar reloadComponentB={this.reloadRegistros}/>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
  
export default Home;