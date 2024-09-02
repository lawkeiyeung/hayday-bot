const http = require('http')
const fs = require('fs')
const dayjs = require('dayjs')

console.log(`${dayjs().hour()}:${dayjs().minute()}`)

const server = http.createServer((req, res) => {
    console.log("request received")
    /*console.log(req.url, req.method)*/
    res.setHeader('Content-Type', 'text/html')
    let path = './page/'

    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break
        case '/index.html':
            res.setHeader('Location', '/')
            res.statusCode = 301
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        default:
            path += '404.html'
            res.statusCode = 404
            break

    }

    fs.readFile(path, (error, data) => {
        if (error)
            console.log(error)
        else
            res.write(data)

        res.end()
    })

})

server.listen(3000, 'localhost', () => {
    console.log("server listening to port no. 3000")
})