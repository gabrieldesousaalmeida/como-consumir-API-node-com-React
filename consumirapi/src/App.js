import React, {Component} from 'react';
import api from './api';

class App extends Component{

  state = {
    artigo: [],
  }

  async componentDidMount(){
    const response = await api.get('/')
    .catch((error)=> {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    })

    this.setState({artigo: response.data})

    //console.log(response.data)

  }
  render(){
    const {artigo} = this.state
    console.log({artigo})
    return(
      <div>
        <h1>Lista Registros</h1>
        <ul>
          {artigo.map(data =>(
            <li key={data._id}>
              <h2>{data.titulo}</h2>
              <h2>{data.conteudo}</h2>
            </li>
          ))}
          
        </ul>
      </div>
    )
  }
}

export default App;
