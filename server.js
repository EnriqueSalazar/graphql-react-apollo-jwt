/**
 * Copyright 2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware')
const config = require('./config.js').config // eslint-disable-line node/no-unpublished-require

const app = express()

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const PROXYTARGET = config.get('PROXYTARGET')

app.use((req, res, next) => {
  console.error('req.path :', req.path) // eslint-disable-line no-console
  next()
})

const proxyOptions = {
  target: PROXYTARGET,
  changeOrigin: true,               // needed for virtual hosted sites
  logLevel: 'debug'
}
const proxyContext = [
  '/graphql',
  '/graphiql',
  '/auth/login',
  '/auth/logout',
  '/auth/google/callback'
]
app.use(proxy(proxyContext, proxyOptions))
app.use(express.static(path.resolve(path.join(__dirname, '/dist'))))
app.get('/', (req, res) => {
  console.dir(req)
  res.render('index')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
