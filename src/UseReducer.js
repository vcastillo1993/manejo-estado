import React, { Fragment, useReducer, useState } from 'react'

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {

    const initialState = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    React.useEffect(() => {
        console.log('Empezando efecto');

        if (!!state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validacion')

                if (state.value === SECURITY_CODE) {
                    dispatch({ type: actionTypes.confirm })
                } else {
                    dispatch({ type: actionTypes.error })
                }

                console.log('Terminando la validacion')
            }, 3000);

        }

        console.log('Terminando efecto');

    }, [state.loading])

    if (!state.deleted  && !state.confirmed) {
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
                    onChange={(event) => {
                        dispatch({type:actionTypes.write, payload: event.target.value });
                        /* onWrite(event.target.value); */
                    }}
                />
                <button
                    /* onClick={() => setError(!error)} */
                    onClick={() => {
                           dispatch({ type: actionTypes.check});
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
                        dispatch({type: actionTypes.deleted})
                        /* onDelete(); */
                    }}
                >
                    Si, Eliminar</button>
                <button
                    onClick={() => {
                        dispatch({ type: actionTypes.reset})
                        /* onReset(); *///funcion que no actualiza el estado, declinando la posible eliminacion del estado
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
                        dispatch({ type: actionTypes.reset })
                        /* onReset(); */
                    }}
                >
                    Resetear, volver atras
                </button>
            </Fragment>
        )
    }
}

const actionTypes = {
    confirm: 'CONFIRM', 
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    reset: 'RESET',
    deleted: 'DELETED'   
}

/* Cuarta forma */
const reducerObject = (state, payload) => ({

    [actionTypes.confirm]:{
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.write]:{
        ...state,
        value: payload
    },
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    },
    [actionTypes.deleted]:{
        ...state,
        deleted: true,
    }
});
/* reducer que hace la validacion del reducerObject */
const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {//si el action.type, existe en el reducerObjet
        return reducerObject(state, action.payload)[action.type];//entonces retorneme el action.type solicitado
    } else {
        return state;//si no, retorneme el estado inicial 
    }
}

export { UseReducer };