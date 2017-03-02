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


// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool


/* GET home page. */
router.get('/', function(req, res, next) {


//can also call 'update(message)' and then 'finalize()'

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

router.get('/dodajvezu', function(req, res, next) {
    res.render('dodajvezu', { title: 'REGISTRACIJA!' });
});







router.get('/igraci', function(req, res, next) {
    var niz = [];
    var pool = new Pool(config);
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
    var pool = new Pool(config);
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

router.get('/ooop', function(req, res, next) {
    var nizz = [];
    var pool = new Pool(config);
    console.log(req.body.unamee);
    pool.query('Select * from playerpokemon where uname=($1)',[req.body.unamee], function(err, result) {
        for (var i = 0; i < result.rows.length; i++) {
            nizz[i] = result.rows[i];
        }
        if(err) {
            return console.error('error running query', err);
        }
        res.render('veza', {niz: nizz, title: 'Pokemoni od igraca' });
       /* res.send({
            niz:nizz
        })*/

    });
});


router.get('/mojipok', function(req, res,next) {
    var niz = [];
    console.log("Cookies new:  ", req.cookies);
    var pool = new Pool(config);
    console.log(req.cookies.username);

    pool.query('Select * from playerpokemon where uname=($1)',[req.cookies.username], function(err, result) {

        for (var i = 0; i < result.rows.length; i++) {

            niz[i] = result.rows[i];

        }

        if(err) {
            return console.error('error running query', err);
        }
        //res.render('veza', {niz: niz, title: 'Spisak'});
        //res.send(niz);
        res.render('veza', {niz: niz, title: 'Pokemoni' });
    });
});




router.post('/ovdje', function(req, res,next) {
    var niz = [];
    var pool = new Pool(config);

    pool.query('Select * from playerpokemon where uname=($1)',[req.body.user], function(err, result) {

        for (var i = 0; i < result.rows.length; i++) {

            niz[i] = result.rows[i];

        }

        if(err) {
            return console.error('error running query', err);
        }
       //res.render('veza', {niz: niz, title: 'Spisak'});
        //res.send(niz);
        res.render('veza', {niz: niz, title: 'Pokemoni' });
    });
});

router.post('/dodajpl', function(req, res, next) {
    //res.send(reg.body);
    var pool = new Pool(config);
    var sha512 = require('sha512');
    var ps=req.body.pas;

    var nn=sha512(ps).toString('hex');
    console.log(nn);
    pool.query('Insert into players (uname,firstname,lastname,password) values ($1,$2,$3,$4)',[req.body.unm, req.body.fname,req.body.lname,nn],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/igraci');
    });
});

router.post('/dodajvezu', function(req, res, next) {
    //res.send(reg.body);
    var pool = new Pool(config);
    pool.query('Insert into playerpokemon (uname,pokemonid) values ($1,$2)',[req.body.uname, req.body.pokid],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/igraci');
    });
});




router.post('/brisipl', function(req, res, next) {
    //res.send(reg.body);
    var pool = new Pool(config);
    pool.query('Delete from players where uname=($1)',[req.body.unme],function(err, result) {

        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/igraci');
    });
});
router.post('/brisipok', function(req, res, next) {
    //res.send(reg.body);
    var pool = new Pool(config);
    pool.query('Delete from pokemontypes where pokemonid=($1)',[req.body.br],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/pokemoni');
    });
});
router.post('/brisivezu', function(req, res, next) {
    //res.send(reg.body);
    var pool = new Pool(config);
    pool.query('Delete from playerpokemon where uname=($1) and pokemonid=($2)',[req.body.nick,req.body.pokid],function(err, result) {

        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/igraci');
    });
});


router.post('/updatepl', function(req, res, next) {
    //res.send(reg.body);
    var pool = new Pool(config);
    var sha512 = require('sha512');
    var ps=req.body.pas;

    var nn=sha512(ps).toString('hex');
    console.log(nn);
    pool.query('UPDATE players set lastname=($1), firstname=($2), password=($3), mail=($4) where uname=($5)',[req.body.lname,req.body.fname,nn,req.body.mail,req.body.unm],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/igraci');
    });
});

router.post('/updatevezu', function(req, res, next) {
    //res.send(reg.body);
    var pool = new Pool(config);
    pool.query('UPDATE playerpokemon set customname=($1) where uname=($3) and pokemonid=($2)',[req.body.customnm,req.body.pokid,nn,req.body.nick],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/igraci');
    });
});




router.post('/updatepok', function(req, res, next) {
    //res.send(reg.body);
    var pool = new Pool(config);
    pool.query('UPDATE pokemontypes set name=($1) where pokemonid=($2)',[req.body.newname,req.body.br],function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.redirect('/pokemoni');
    });
});



router.post('/addpok', function(req, res, next) {
    //res.send(reg.body);
    var pool = new Pool(config);
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
    //console.log(req.cookies.username);
    console.log("Cookies :  ", req.cookies);
       if ((req.cookies.kuki) && (req.cookies.kuki == "kuki_kuki_PMF"))
        res.render('login',{title:req.body.mail,username:req.cookies.username});
    else {
        console.log("redirect na errror");
        res.redirect('/error');
    }

});


router.get('/error', function(req, res, next) {
    res.render('greska');


});
router.post('/loginstari', function(req, res, next) {
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

router.post('/login', function(req, res, next) {
   // console.log(req);
    var niz = [];
    var pool = new Pool(config);

    pool.query('Select password from players where uname=($1)',[req.body.mail], function(err, result) {

        for (var i = 0; i < result.rows.length; i++) {

            niz[i] = result.rows[i];

        }

        if(err) {
            return console.error('error running query', err);
        }
        var sha512 = require('sha512');
        var ps=req.body.password;


        var nn=sha512(ps).toString('hex');


        console.log("nn ");
        console.log(nn);
       // console.log("od ");
       // console.log(niz[0].password);
        if(result.rows.length==0)  res.redirect("/error");
 else   if(nn==niz[0].password){
            const crypto = require('crypto');
            var privateKey = '37LvDSm4XvjYOh9Y';
            const cipher = crypto.createCipher('aes192', privateKey);
            var crypted = cipher.update(ps, 'utf8', 'hex');
            crypted += cipher.final('hex');
            console.log("cry ");
            console.log(cipher);
            console.log(crypted);
            //res.json({ message: 'Welcome to the coolest API on earth!' });


        console.log("set kuki");
        res.cookie('username', req.body.mail,{expire : new Date() + 9999});
        res.cookie('token', crypted);
        res.cookie('kuki', 'kuki_kuki_PMF');
        res.redirect('/ok');
    }
    else {
        res.redirect("/error");
    }
    });


});




router.get('/hash',function (req,res,next) {
    var sha512 = require('sha512');
    var ps=req.body.pas;
    var nn=sha512(ps).toString('hex');
    console.log(nn);
    res.send(nn);

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
router.post('/logout', function(req, res, next) {
    var un=req.cookies.username;
    clearCookie('username');
    alert("Vidimo se opet "+un);
    res.render('index', {title: 'Pokemon GO' });
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
