import React, { Fragment, useState } from 'react'

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    /* estados compuestos */
    const [state, setState] = useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    });
    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        });
        
    }
    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        })

    }
    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue
        });
    }
    const onCheck = () => {
        setState({
            ...state,
            loading: true,
            
        })
    }
    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        });
    }
    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ''
        })
    }
    console.log(state);
    React.useEffect(() => {
        console.log('Empezando efecto');

        if (!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validacion');

                if (state.value === SECURITY_CODE) {
                    onConfirm();//funcion de confirmacion para actualizacion del estado... codigo confirmado

                } else {
                    onError();//funcion de aviso Error... Estado no actualizado por codigo erroneo
                }

                console.log('Terminando la validacion')
            }, 3000);

        }

        console.log('Terminando efecto');

    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name} </h2>
                <p>Porfavor, escribe el codigo de seguridad</p>
                {
                    (state.error && !state.loading) && (
                        <p>Error: el codigo es incorrecto</p>
                    )

                }
                {
                    state.loading && (
                        <p>Cargando...</p>
                    )
                }
                <input
                    placeholder='Codigo de seguridad'
                    value={state.value}
                    onChange={(event) =>
                        onWrite(event.target.value)
                        /* setLoading(true); */
                    }
                />
                <button
                    /* onClick={() => setError(!error)} */
                    onClick={() => {
                        onCheck();
                    }}
                >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <Fragment>
                <p>Pedimos confirmacion. ¿Estas seguro?</p>
                <button
                    onClick={() => {
                        onDelete();//funcion que actualiza el estado para eliminar el estado existente
                    }}
                >
                    Si, Eliminar</button>
                <button
                    onClick={() => {
                        onReset();//funcion que no actualiza el estado, declinando la posible eliminacion del estado
                    }
                    }
                >No, Eliminar</button>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <p>Eliminado con exito</p>

                <button
                    onClick={() => {
                        onReset();
                    }}
                >
                    Resetear, volver atras
                </button>
            </Fragment>
        )
    }
}

export { UseState };