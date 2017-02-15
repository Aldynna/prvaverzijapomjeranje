var express = require('express');
var router = express.Router();
var pokemons=require('../pokemon.json');
//var veza=require('baza.js');

var Pool = require('pg').Pool;



// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
    user: 'postgres', //env var: PGUSER
    database: 'postgres', //env var: PGDATABASE
    password: 'aldina03', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new Pool(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
pool.connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('SELECT $1::int AS number', ['1'], function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
        //output: 1
    });
});

pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pokemon GO!' });
});

router.get('/veza', function(req, res, next) {
    res.render('veza', { title: 'Pokemon GO!' });
});

router.get('/dodajpokemona', function(req, res, next) {
    res.render('dodajpokemona', { title: 'Dodavanje novog pokemona!' });
});

router.get('/dodajigraca', function(req, res, next) {
    res.render('dodajigraca', { title: 'Dodavanje novog igraca!' });
});
router.get('/izlistaj', function(req, res, next) {
    res.render('izlistaj', { title: 'Pretrazivanje' });
});
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'REGISTRACIJA!' });
});








router.get('/igraci', function(req, res, next) {
    var niz = [];
    pool.query('Select * from players', function(err, result) {
        for (var i = 0; i < result.rows.length; i++) {
            niz[i] = result.rows[i];
        }
        if(err) {
            return console.error('error running query', err);
        }
        res.render('players', {niz: niz, title: 'Igraci' });
    });
});

router.get('/pokemoni', function(req, res, next) {
    var niz = [];
    pool.query('Select * from pokemontypes', function(err, result) {
        for (var i = 0; i < result.rows.length; i++) {
            niz[i] = result.rows[i];
        }
        if(err) {
            return console.error('error running query', err);
        }
        res.render('pokemons', {niz: niz, title: 'Pokemoni' });
    });
});


router.get('/ooo', function(req, res, next) {
    var niz = [];
    pool.query('Select * from playerpokemon', function(err, result) {
        for (var i = 0; i < result.rows.length; i++) {
            niz[i] = result.rows[i];
        }
        if(err) {
            return console.error('error running query', err);
        }
        res.render('veza', {niz: niz, title: 'Pokemoni' });
    });
});

router.post('/ovdje', function(req, res,next) {
    var niz = [];
    //var iii = req.body.unme;
    //console.log(iii);
    pool.query('Select * from playerpokemon where uname=($1)',[req.body.unme], function(err, result) {

        for (var i = 0; i < result.rows.length; i++) {

            niz[i] = result.rows[i];

        }

        if(err) {
            return console.error('error running query', err);
        }
       //res.render('veza', {niz: niz, title: 'Spisak'});
        //res.send(niz);
        res.redirect('veza', {niz: niz, title: 'Pokemoni' });
    });
});

router.post('/dodajpl', function(req, res, next) {
    //res.send(reg.body);
    pool.query('Insert into players (uname,firstname,lastname) values ($1,$2,$3)',[req.body.unm, req.body.fname,req.body.lname],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/igraci');
    });
});



router.post('/brisipl', function(req, res, next) {
    //res.send(reg.body);
    pool.query('Delete from players where uname=($1)',[req.body.unme],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/igraci');
    });
});
router.post('/brisipok', function(req, res, next) {
    //res.send(reg.body);
    pool.query('Delete from pokemontypes where pokemonid=($1)',[req.body.br],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/pokemoni');
    });
});

router.post('/updatepl', function(req, res, next) {
    //res.send(reg.body);
    pool.query('UPDATE players set lastname=($1), firstname=($2) where uname=($3)',[req.body.lname,req.body.fname,req.body.unm],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/igraci');
    });
});

router.post('/updatepok', function(req, res, next) {
    //res.send(reg.body);
    pool.query('UPDATE pokemontypes set name=($1) where pokemonid=($2)',[req.body.newname,req.body.br],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/pokemoni');
    });
});



router.post('/addpok', function(req, res, next) {
    //res.send(reg.body);
    pool.query('Insert into pokemontypes (name) values ($1)',[req.body.pokime],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/pokemoni');
    });
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
