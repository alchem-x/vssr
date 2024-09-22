import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import express from 'express'
import { renderToString } from 'vue/server-renderer'
import clientApp from '../dist/app.js'

const template = await readFile(resolve(import.meta.dirname, '../dist/index.html'), 'utf-8')

const { createApp } = clientApp

async function onSSR(req, res) {
    const __INIT_DATA__ = { requestPath: req.path }
    const html = await renderToString(createApp(), __INIT_DATA__)
    const script = `const __INIT_DATA__ = ${JSON.stringify(__INIT_DATA__)}`
    res.send(template.replace('/* SCRIPT */', script).replace('<!-- HTML -->', html))
}

const app = express()
app.get('/', onSSR)
app.use(express.static('dist'))
app.get('/*', onSSR)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
    console.log(`Serving: http://localhost:${PORT}`)
})
