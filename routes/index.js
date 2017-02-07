var express = require('express');
var router = express.Router();
var pokemons=require('../pokemon.json');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dobrodosli' });
});
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Dobrodosli' });
});


/*router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Pokemoni' });
});*/
router.get('/ok', function(req, res, next) {
    //console.log(res.cookie);
    if ((req.cookies.kuki) && (req.cookies.kuki == "kuki_kuki_PMF"))
        res.render('login');
    else {
        console.log("redirect na errror");
        res.redirect('/error');
    }

});


router.get('/error', function(req, res, next) {
    res.render('greska');


});
router.post('/login', function(req, res, next) {
    console.log(req);
    if(req.body.mail == "Aldy" && req.body.password == "13aA"){
        console.log("set kuki");

        res.cookie('kuki', 'kuki_kuki_PMF');
        res.redirect('/ok');
    }
    else {
        res.redirect("/error");
    }
});

router.get('/koord', function(req, res, next) {
        //res.send({lat:43.8543, lng:18.3946});
        var granice = {
            sjever: 43.859461,
            jug: 43.848948,
            istok: 18.366025,
            zapad: 18.421501
        };


        var lt;
        var lon;
        var poke=Math.round( Math.random() *9);//(Math.random()*9)>>>0;
        /*res.send({
         lt:southW.lat() + latS * Math.random(),
         lon:southW.lng() + lngS * Math.random()
         })*/


        var lngRaspon = granice.zapad - granice.istok;
        var latRaspon = granice.sjever - granice.jug;
        /*res.send({
         pokemon:pokemons[poke],
         lt:LatLng.latitude,
         lon:LatLng.longitude

         })*/

        res.send({
            pokemon:pokemons[poke],
            lt:granice.jug + latRaspon * Math.random(),
            lon:granice.istok + lngRaspon * Math.random()
        })


        /* var KK = {lat: granice.jug + latRaspon * Math.random(),
         lng: granice.istok + lngRaspon * Math.random()};
         console.log(KK);
         res.send(KK);*/

    }
);


router.get('/vrsta', function(req, res, next) {
  //res.send({lat:43.8543, lng:18.3946});
  var poke=(Math.random()*4)>>>0
  res.send({
    //pokemon:pokemons[poke],

  });

});
router.post('/login', function(req, res, next) {
    console.log(req.body);
    res.send({
        status:"ok"
    })
});

router.post('/Sign', function(req, res, next) {
  var poruka;

  if(reg.body.mail=='aldina')
  {
    poruka:"nesto"

  }
  else
  { res.send({
    poruka:"error"
  })}
  res.send(poruka);
});



module.exports = router;
