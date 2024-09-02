const fs = require('fs')

/*fs.writeFile('./demo.txt',"filesystem hii",()=>{
    console.log("finished")
})

fs.readFile('./demo.txt',(error,data)=>{
    if(error)console.log(error)
    else console.log(data.toString())
})

fs.mkdir('./image',(error)=>{
    if(error)
        console.log(error)
    else
        console.log("folder!")
})*/

if(fs.existsSync('./demo.txt')){
    fs.unlink('./demo.txt',(error)=>{
        if(error)
            console.log(error)
        else
            console.log("deleted!")
    })
}