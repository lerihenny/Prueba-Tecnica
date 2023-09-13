import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

class Footer extends React.Component{
  
  render(){
    return(
      <>
      <Container>
        <Row>
          <Col md="12" className="text-center">
            <span>Lerihenny Miranda | 2023</span>
          </Col>
        </Row>
      </Container>
      </>
    )
  }
}
  
  export default Footer;