import React from 'react'
import { Loading } from './loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false
        };
    }

    /*  UNSAFE_componentWillMount(){
         console.log('componentWillMount')
     }
  */
    /* 
        componentDidMount(){
            console.log('componentDidMount') 
        } 
    */

    componentDidUpdate() {
        console.log('actualizacion');
        if (!!this.state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validacion')
                
                if(SECURITY_CODE === this.state.value){
                    this.setState({loading:false});
                }else {
                    this.setState({error: true, loading:false});
                }

                console.log('Terminando la validacion')
            }, 3000);

        }
    }

    render() {
        const { value, error, loading } = this.state;
        return (
            <div>
                <h2>Eliminar {this.props.name} </h2>
                <p>Porfavor, escribe el codigo de seguridad</p>
                {
                    (error && !loading) && (
                        <p>Error: el codigo es incorrecto</p>
                    )
                }
                {
                    loading && (
                        <Loading />
                    )
                }
                <input
                    placeholder='Codigo de seguridad'
                    value={this.state.value}
                    onChange={(event) =>{
                        this.setState({value: event.target.value});
                    }}
                />
                <button
                    onClick={() =>
                        /* this.setState(prevState => ({ error: !prevState.error })) */
                        this.setState({ loading: true })
                    }
                >Comprobar</button>
            </div>
        )
    }
}

export { ClassState };
