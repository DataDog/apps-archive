import { init } from '@datadog/ui-extensions-sdk'

export default function setup() {
    const client = init()

    const root = document.getElementById('root')

    if (!root) return

    root.innerHTML = `
        <div>
            <h1>Hello, world</h1>
        </div>
    `
}

