import { init } from '@datadog/ui-extensions-sdk'
import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const client = init()

const API = 'http://localhost:5000'

const Widget = () => {
    const onOpenModal = () => {
        client.modal.open({
            key: 'search-key-modal',
            source: 'search-key',
            size: 'md'
        })
    }

    return (
        <div>
            <button onClick={onOpenModal}>Search a key</button>
        </div>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Widget />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

