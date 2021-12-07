'use strict'

const mongoose = require('mongoose')
const { createClient } = require('redis')

const createConnection = async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017', {
            user: 'admin',
            pass: 'toto90',
            dbName: 'project-db'
        })

        console.log('MongoDB: connection successful')

    } catch (error) {
        console.log('An error occurs when connecting to the mongodb', error)
    }
}

function createRedisClient() {
    const client = createClient({
        socket: {
            host: 'redis',
            port: 6379
        }
    })

    client.on(
        'error',
        error => console.log('Redis Client Error:', error)
    )

    return client
}


module.exports = {
    createConnection,
    createRedisClient
}

