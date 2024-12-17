import { createServer } from 'miragejs'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            // this.passthrough(request => {
            //     let isExternal = request.url.startsWith('http')
            //     return isExternal
            // })
            this.passthrough(`${API_BASE_URL}/**`)
        },
    })
}