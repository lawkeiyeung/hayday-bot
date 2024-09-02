const express = require('express')
const dayjs = require('dayjs')
const { finished } = require('stream')

const app = express()

app.set('view engine','ejs')
app.set('views','page')

app.use((req,res,next)=>{
    console.log(`from ${req.hostname} | requested: ${req.url}`)
    next()
})

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.post('/',(req,res)=>{
    console.log(req.body)
    res.redirect('/');
})

app.get('/',(req,res)=>{
    //res.send('<h1>Home</h1>')
    //res.sendFile('./page/index.html',{root:__dirname})
    let now = `Time: ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`

    let todo= [
        {title:"throw rubbish",finished:true},
        {title:"learning",finished:true},
        {title:"gym",finished:false}
    ]

    res.render('index',{
        appName:"lesson 1",
        time:now,
        todolist:todo
    })
})


app.get('/about',(req,res)=>{
    //res.send('<h1>Home</h1>')
    res.render('about')
})

app.use((req,res)=>{
    //res.send('<h1>Home</h1>')
    res.status(404).render('404')
})


app.listen(3000)