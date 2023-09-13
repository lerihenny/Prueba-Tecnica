import React from "react";
import { Table, Form } from 'react-bootstrap';
import { getVinos, eliminarVino } from '../../../api/info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'


class Registros extends React.Component{

  state = {
    vinos: [],
    nombre: ''
  }

  handleChange(e, input) {
    const value = e.target.value;
    this.setState({
      [input]:value
    })
  }

  async componentDidMount(){
    this.vinosList()
  }

  async vinosList(){
    let d = ''
    const res = await getVinos();
    if(res[0] === null){
      d = ['empty']
    }else{
      d = res
    }

    this.setState({
      vinos: d
    })
  }

  async eliminar(id){
    Swal.fire({
      title: '¿Realmente quieres eliminar esta fila?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await eliminarVino({id: id});
        if(res.data.affectedRows === 1){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha eliminado',
            showConfirmButton: false,
            timer: 1500
          }).then((res) => {
            window.location.reload()
          })
        }
      }
    })


  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldReload !== prevProps.shouldReload && this.props.shouldReload) {
      this.vinosList()
    }
  }

  search(){
    if(this.state.nombre !== ''){
      return this.state.vinos.filter(v => v.nombre.toLowerCase().includes((this.state.nombre).toLowerCase()));
    }else{
      return this.state.vinos
    }
  }
  
  render(){
    let vinos = this.search();
    return(
      <>
        <h3 className="text-center mb-5">Registro de Vinos</h3>
        <Form.Control 
          type="text" 
          className="m-2 w-50" 
          placeholder="Buscar vino por nombre"
          name='nombre'
          value={this.state.nombre}
          onChange={event => this.handleChange(event, "nombre")}
        />
        <Table hover className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Año</th>
              <th>Tipo</th>
              <th>Variedad</th>
              <th>Color</th>
              <th>Temperatura(°C)</th>
              <th>Gradaución(%)</th>
              <th>PH</th>
              <th>Observación</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              vinos.map((vinos, i) => {
                if(vinos !== null && vinos !== 'empty'){
                  return(<tr key={i}>
                    <td>{i+1}</td>
                    <td>{vinos.nombre}</td>
                    <td>{vinos.year}</td>
                    <td>{vinos.tipoDes}</td>
                    <td>{vinos.variedadDes}</td>
                    <td>{vinos.color}</td>
                    <td>{vinos.temperatura}</td>
                    <td>{vinos.graduacion}</td>
                    <td>{vinos.ph}</td>
                    <td>{vinos.observaciones}</td>
                    <td>
                      <span className="pointer" title="Eliminar" onClick={() => this.eliminar(vinos.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </td>
                  </tr>)
                }
                if(vinos === 'empty'){
                  return(
                    <tr key='80'>
                      <td colSpan={10}>No hay vinos registrados</td>
                    </tr>
                  )
                }
                return true;
              }) 
            }
          </tbody>
        </Table>
      </>
    )
  }
}
  
  export default Registros;