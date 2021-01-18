const express = require("express");
const admin = require("firebase-admin");
const port = process.env.PORT || 3000;
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(port, () => console.log("Server escuchando en el puerto 3000"));
//app.use(express.static("public"));


let serviceAccount = require("./private/ikaro-2887d-fcfa79d5ef7d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();


const cajaP =['<div style="flex-grow: 0.25; float: left; padding: 0 8px;"><img src="https://64.media.tumblr.com/' , '" alt="','" style=" border-radius: 10px;width:100%;"><h3>','</h3><p>','</p><p>$','.000</p></div>' ];





app.get("/", async (req, res) => {
    var productos=[];
    var bisuteria = await db
      .collection("PRODUCTOS")
      .where("P", "==", "B")
      .get();
    //console.log(producto.data());
    for(const doc of bisuteria.docs){
      var llave = doc.id;
      var datos = doc.data();
      var tipo = (datos.T=='J')? "Juego": (datos.T=='C') ? "Collar": (datos.T=='AR') ? "Aretas" : (datos.T=='CA') ? "Candongas": (datos.T=='A')? "Aretes" : "No reconocido";
      var material = (datos.M=='A')? "acero": (datos.M=='O')? "oro golfee": "no reconocido";
      var j ={
        F: datos.F,
        I: llave,
        T: tipo,
        M: material,
        N: datos.N,
        V: datos.V
      }
      productos.push(j);
    }

    var perfurmes=[];
    var perfurme = await db
      .collection("PRODUCTOS")
      .where("P", "==", "P")
      .get();

    for(const doc of perfurme.docs){
      var llave = doc.id;
      var datos = doc.data();
      var tipo = (datos.T=='M')? "masculina": (datos.T=='F') ? "femenina": "no reconocido";
      var material = (datos.M=='D')? "dulce": (datos.M=='L')? "ligero": "no reconocido";
      var nombre = (datos.N=="E") ? "ocaciones especiales" : "uso cotidiano";
      var j ={
        F: datos.F,
        I: llave,
        T: tipo,
        M: material,
        N: nombre,
        V: datos.V
      }
      perfurmes.push(j);
    }

    res.render("index.ejs", {data: {productos: productos, perfumes:perfurmes}});
});


app.get("/ADMIN", async (req, res) => {
  res.render("admin.ejs");
});