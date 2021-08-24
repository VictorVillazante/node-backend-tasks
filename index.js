//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    console.log("Agregar tarea------------------------")
    req.body.id = tasks.length + 1;
    tasks.push(req.body);
    res.send("OK");
});

app.get("/tasks", (req, res, next) => {
    //console.log(tasks);
    console.log("Listar tareas-----------------------")
    res.json(tasks);
});

app.get("/tasks/:id", (req, res, next) => {
    console.log("SOLICITAR TAREA------------------------")
    let id=req.params.id;
    
    for(let i=0;i<tasks.length;i++){
        if(id==tasks[i].id){
            res.json(tasks[id-1]);
        }
    }
    //console.log(tasks[n-1]);
    //res.json(tasks);
});
//El jsonParser debe ser colocado como parametro para ver
//el requiere.
app.put("/tasks/:id",jsonParser,(req,res)=>{
    console.log("EDITAR TAREA------------------------")
    let state=req.query.state;
    let id=req.params.id;
    //console.log(req.params);
    //console.log(req.body);
    //console.log(req.query);
    //console.log(state);
    //console.log(req.body)
    //console.log(id)
    for(let i=0;i<tasks.length;i++){
        //console.log(tasks[i]);
        if(id==tasks[i].id && state===undefined){
            //console.log("Require")
            tasks[i].title=req.body.title;
            tasks[i].detail=req.body.detail;
            res.json("TAREA MODIFICADA");

        }else{
            if(id==tasks[i].id){
                //console.log("Cambia estado")
                tasks[i].state=state;
                res.json("ESTADO CAMBIADO");

            }

           
        }
    }
});



app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});

app.delete("/tasks/:id", (req, res, next) => {
    console.log("ELIMINAR TAREA------------------------")

    let id=req.params.id;
    
    for(let i=0;i<tasks.length;i++){
        if(id==tasks[i].id){
            tasks.splice(i,1)
        }
    }
    //console.log(tasks[n-1]);
    res.json("TAREA ELIMINADA");
});
