import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import express from 'express'
import { renderToString } from 'vue/server-renderer'
import clientApp from '../dist/app.js'

const template = await readFile(resolve(import.meta.dirname, '../dist/index.html'), 'utf-8')

const { createApp } = clientApp

async function onSSR(req, res) {
    const __INIT_DATA__ = {}
    const html = await renderToString(createApp(), __INIT_DATA__)
    const script = `const __INIT_DATA__ = ${JSON.stringify(__INIT_DATA__)}`
    res.send(template.replace('/* SCRIPT */', script).replace('<!-- HTML -->', html))
}

const app = express()
app.get('/', onSSR)
app.use(express.static('dist'))
app.listen(3000, () => {
    console.log('listen 3000')
})
