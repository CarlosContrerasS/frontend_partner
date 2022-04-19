const express = require('express');

const cors = require('cors');
const axios = require('axios');


const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.options('*', cors());


const port = 8085;

app.get('/', obtenerToken, (req, res) => {
  // Proceso de generacion de token
  let token = req.token;
  res.send(`
  <h1>Hola soy la pagina del partner !!!!</h1> 
  <h2>y mi token dinámico es:</h2> 
  <p>${token}</p>

  <forum-traful
    partnerid="SHOWCASE"
    parentsession="1PP1SYLNPKJRA0"
    branchname="DEVELOPERS SANTIAGO"
    variabledata="1M8GDM9A_KP042788"
    brand="FORUM MOTORS"
    model="TRUCK"
    version="LITE"
    state="NUEVO"
    loantypeci="true"
    loantypecc="true"
    goodvalue="15000000"
    goodvalueci="1000000"
    goodvaluecc="0"
    downprice="6980000"
    eafamount="0"
    term="12"
    position="right"
    floating="true"
    open="false"
    token="${token}"
  >
  </forum-traful>
  <script src="http://devwebcomponent.forum.cl/labs-developers-component-cpw-ang-poc/v1/component-es2015.js"></script>
  `);
});

function obtenerToken (req, res, next){
  var config = {
      method: 'get',
      url: 'http://40.83.184.169:8282/token/autorizacion',
    };
    
    axios(config)
    .then(response => {
      console.log('Conexión exitosa, Valor enviado');
        req.token = response.data.token;
        next();
    })
    .catch(error => {
      console.log('Hubo un ' + error);
      res.sendStatus(403);
    }
  );

}

app.get('/token/renueva', obtenerToken, (_req, res) => {
    var config = {
        method: 'get',
        url: 'http://40.83.184.169:8282/token/renueva'
      };
      
      axios(config)
      .then(response => {
          console.log('Conexión exitosa, Valor enviado');
          res.send({"token" : response.data.token});
      })
      .catch((error) => {
        console.log('Hubo un ' + error);
        res.sendStatus(403);
      });

});


app.listen(port, () => {
  console.log(`:: Hola server del partner corriendo`);
});