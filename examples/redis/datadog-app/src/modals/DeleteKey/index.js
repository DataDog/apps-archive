import { init } from '@datadog/ui-extensions-sdk'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const client = init()

const API = 'http://localhost:5000'

const Modal = () => {
    const [ redisMetric, setRedisMetric ] = useState(null)

    useEffect(() => {
        client
            .getContext()
            .then(({ args: { redisData } }) => setRedisMetric(redisData))
            .catch(err => console.log('Oh no'))
    }, [])

    const deleteRedisKey = async redisKey => fetch(`${API}/keys/${redisMetric.key}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log('oh no', err))

    const onClickDeleteButton = async () => {
        console.log("detele")
        console.log(redisMetric)

        await deleteRedisKey(redisMetric.key)

        client.modal.close('confirmation-modal')
    }

    if (!redisMetric) return <div>Loading...</div>

    return (
        <div>
            <p>Do you want to delete the key {redisMetric.key}</p>
            <button onClick={onClickDeleteButton}>Delete</button>
        </div>
    )
} 

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Modal />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

