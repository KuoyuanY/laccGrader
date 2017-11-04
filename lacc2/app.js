var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require('lodash');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var request = require('request');
var session= require('express-session');
var MongoStore = require('connect-mongo')(session);

var AcademicRubric = require('./models/AcademicRubric');
var ArtsRubric = require('./models/ArtsRubric');
var AthleticRubric = require('./models/AthleticRubric');
var ServiceRubric = require('./models/ServiceRubric');
var StemRubric = require('./models/StemRubric');
var User = require('./models/user.js');
var AcademicNomination = require('./models/AcademicNomination');
var ArtsNomination = require('./models/ArtsNomination');
var AthleticNomination = require('./models/AthleticNomination');
var ServiceNomination = require('./models/ServiceNomination');
var StemNomination = require('./models/StemNomination');
var app = express();
var count = 0;

dotenv.load();

// Connect to MongoDB
console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB);
var db = mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

/* Api Endpoints:
• /api/nominator/submitted - get
• /api/nominator/incomplete - get
• /api/nominator/submitform - post (https://stackoverflow.com/questions/10827108/mongoose-check-if-object-is-mongoose-object)

don't need partials since links will be hardcoded
*/


// API endpoints begin here


app.get('/api/nominator/submitted', function(req,res){
    var nominatorName = req.session.username;
    console.log(nominatorName);
    
	AcademicNomination.find({'Nominator': name, 'completed': submit}, function(err, doc){
        if (err) throw err; 

        if (!doc && submit) {
            res.json({"Cannot find application": name});
        } else {
            res.json(doc);//array
        }
    });
});

app.get('/api/nominator/incomplete', function(req,res){
	var nominator = req.session.username;
    console.log(nominatorName);
    
	AcademicNomination.find({'NominatorName': name, 'completed': submit}, function(err, doc){
        if (err) throw err; 

        if (!doc && !submit) {
            res.json({"Cannot find application": name});
        } else {
            res.json(doc);
        }
    });
});

app.get('/login', function(req,res){
	res.render('login');
});


app.post('/login', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }
    
    if (
        req.body.username &&
            req.body.password &&
            req.body.firstName &&
            req.body.lastName &&
            req.body.passwordConf) {
        var userData = {
            type: 0,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            passwordConf: req.body.passwordConf,
        }
        
        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                console.log(user);
                req.session.username = user.username;
                return res.redirect('/nominator');
            }
        });
        
    } else if (req.body.logusername && req.body.logpassword) {
        User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong username or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.username = user.username;
                
                return res.redirect('/graders');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})

app.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    });
  }
});

app.post('/api/nominator/submitform', function(req,res){
	var type = req.body.type;
  var nominator = req.body.nominator;
  var fname = req.body.first_name;
  var lname = req.body.last_name;
  var email = req.body.email;
  var school = req.body.school;
  var phone = req.body.phone;
  var hispanic = req.body.hispanic;
  var whywhynot = req.body.whywhynot;
  var numteams = req.body.numteams;

  console.log("type: " + type);
	if (type == 1){
	    AcademicNomination.find({username: req.session.username},function(err,academicform){
	        if(err) throw err;
	        if(academicform.nominator == null ||
	           academicform.nomineefname == null ||
	           academicform.nomineelname == null ||
	           academicform.school == null ||
	           academicform.email == null ||
	           academicform.phonenum == null ||
	           academicform.hispanic == null ||
	           academicform.hispanicwhy == null ||
	           academicform.gpa == null ||
	           academicform.isweighted == null ||
	           academicform.SAT == null ||
	           academicform.pstatement == null ||
	           academicform.resume == null ||
	           academicform.transcript == null){
	            return res.json("Make sure all forms are filled out");
	        } else {
                var newOne = new AthleticNomination({
                    username:username,
                    nominator:nominator,
                    nomineefname:nomineefname,
                    nomineelname:nomineelname,
                    school:school,
                    email:email,
                    phonenum:phonenum,
                    hispanic:hispanic,
                    hispanicwhy:hispanicwhy,
                    numteams:numteams,
                    pstatement:pstatement,
                    resume:resume,
                    transcript:transcript,
                    score:score,
                    id : count + 1,
                    completed:true,
                });
                newOne.save(function(err){
                    if (err) throw err;
                });
	           // academicform.completed.push(true);
	            res.redirect("/nominator");
	        }
	    });
	}
    if (type == 2){
	    StemNomination.find({username: req.session.username},function(err,stemform){
	        if(err) throw err;
	        if(stemform.nominator == null ||
	           stemform.nomineefname == null ||
	           stemform.nomineelname == null ||
	           stemform.school == null ||
	           stemform.email == null ||
	           stemform.phonenum == null ||
	           stemform.hispanic == null ||
	           stemform.hispanicwhy == null ||
	           stemform.apclasses == null ||
	           stemform.honorsclasses == null ||
	           stemform.pstatement == null ||
	           stemform.resume == null ||
	           stemform.transcript == null){
	            return res.json("Make sure all forms are filled out");
	        } else {
                var newOne = new AthleticNomination({
                    username:username,
                    nominator:nominator,
                    nomineefname:nomineefname,
                    nomineelname:nomineelname,
                    school:school,
                    email:email,
                    phonenum:phonenum,
                    hispanic:hispanic,
                    hispanicwhy:hispanicwhy,
                    numteams:numteams,
                    pstatement:pstatement,
                    resume:resume,
                    transcript:transcript,
                    score:score,
                    id : count+1,
                    completed:true,
                });
                newOne.save(function(err){
                    if (err) throw err;
                });
	          //  stemform.completed.push(true);
	            res.redirect("/nominator");
	        }
	    });
	}
    if (type == 3){
	    ArtsNomination.find({username: req.session.username},function(err,artsform){
	        if(err) throw err;
	        if(artsform.nominator == null ||
	           artsform.nomineefname == null ||
	           artsform.nomineelname == null ||
	           artsform.school == null ||
	           artsform.email == null ||
	           artsform.phonenum == null ||
	           artsform.hispanic == null ||
	           artsform.hispanicwhy == null ||
	           artsform.portfolio == null ||
	           artsform.pstatement == null ||
	           artsform.resume == null ||
	           artsform.transcript == null){
	            return res.json("Make sure all forms are filled out");
	        } else {
                var newOne = new AthleticNomination({
                    username:username,
                    nominator:nominator,
                    nomineefname:nomineefname,
                    nomineelname:nomineelname,
                    school:school,
                    email:email,
                    phonenum:phonenum,
                    hispanic:hispanic,
                    hispanicwhy:hispanicwhy,
                    numteams:numteams,
                    pstatement:pstatement,
                    resume:resume,
                    transcript:transcript,
                    score:score,
                    id : count+1,
                    completed:true,
                });
                newOne.save(function(err){
                    if (err) throw err;
                });
	          //  artsform.completed.push(true);
	            res.redirect("/nominator");
	        }
	    });
	}
    if (type == 4){
        AthleticNomination.find({username: req.session.username},function(err,athleticform){
            if(err) throw err;
            if(nominator == null ||
               fname == null ||
               lname == null ||
               school == null ||
               email == null ||
               phone == null ||
               hispanic == null ||
               whywhynot == null ||
               numteams == null){
                return res.json("Make sure all forms are filled out");
            } else {
              console.log("user name: "+req.session.username);
                var newOne = new AthleticNomination({
                    username:req.session.username,
                    nominator:nominator,
                    nomineefname:fname,
                    nomineelname:lname,
                    school:school,
                    email:email,
                    phonenum:phone,
                    hispanic:hispanic,
                    hispanicwhy:whywhynot,
                    numteams:numteams,
                    //pstatement:pstatement,
                    //resume:resume,
                    //transcript:transcript,
                    score: -1,
                    id : count+1,
                    completed:true,
                });
                newOne.save(function(err){
                    if (err) throw err;
                });
               // athleticform.completed.push(true);
                res.redirect("/nominator");
            }
        });
    }
    
    if (type == 5){
        ServiceNomination.find({username: req.session.username},function(err,serviceform){
            if(err) throw err;
            if(serviceform.nominator == null ||
               serviceform.nomineefname == null ||
               serviceform.nomineelname == null ||
               serviceform.school == null ||
               serviceform.email == null ||
               serviceform.phonenum == null ||
               serviceform.hispanic == null ||
               serviceform.hispanicwhy == null ||
               serviceform.servicehours == null ||
               serviceform.servicedocumentation == null ||
               serviceform.pstatement == null ||
               serviceform.resume == null ||
               serviceform.transcript == null){
                return res.json("Make sure all forms are filled out");
            } else {
                var newOne = new ServiceNomination({
                    username:username,
                    nominator:nominator,
                    nomineefname:nomineefname,
                    nomineelname:nomineelname,
                    school:school,
                    email:email,
                    phonenum:phonenum,
                    hispanic:hispanic,
                    hispanicwhy:hispanicwhy,
                    numteams:numteams,
                    pstatement:pstatement,
                    resume:resume,
                    transcript:transcript,
                    score:score,
                    id : count+1,
                    completed:true,
                });
                newOne.save(function(err){
                    if (err) throw err;
                });
              //  serviceform.completed.push(true);
                res.redirect("/nominator");
            }
        });
    }
});


// Other endpoints begin here
/*
Other Endpoints:
• / (login.handlebars) (login page)
• /nominator (nominator dashboard - shows incompleted applications)
• /nominator/completed (completed nominator applications)
• /nominator/academicform
• /nominator/artsform
• /nominator/stemform
• /nominator/communityserviceform
• /nominator/athleticform
• /graders (graders dashboard - shows ungraded applications)

least priority
• /graders/gradedapps
• /admin/allapps (if needed)
*/
app.get('/graders/4/:id', function(req, res){
  var id = req.params.id;
  res.render('athletic-rubric',
    {id:id});
});

app.get('/', function(req,res){
	res.send("index at /");
});

app.get('/nominator', function(req,res){
	res.render('nominator-dashboard');
});

app.get('/nominator/completed', function(req,res){
	res.render('reportnum');
});

app.get('/nominator/academicform', function(req,res){
    res.render('academic');
});

app.get('/nominator/artsform', function(req,res){
	res.render('arts');
});

app.get('/nominator/stemform', function(req,res){
    res.render('stem');
});

app.get('/nominator/communityserviceform', function(req,res){
	res.render('comm');
});

app.get('/nominator/athleticform', function(req,res){
	res.render('athletic-nom-app');
});

app.get('/graders', function(req,res){
    var id = req.session.username;
    User.find({username: id}, function(err, user){
        if(user.type == 4){//grader is 1
            AthleticNomination.find({score: -1}, function(err, forms){
                res.render("grader-dashboard",
                           {ungradedapps:forms});
            });
        }
    })
});

app.post('/graders/finishedAthletic', function(req, res){
    var numTeam = req.body.numTeam;
    var grades = req.body.grades;
    var awards = req.body.awards;
    var discretionary = req.body.discretionary;
    var appid = req.body.appid
    AthleticNomination.find({id: appid},function(err,athleticform){
	    athleticform.score = numTeam + grades + awards + discretionary;	    
        res.redirect("/graders");
    });
  });



app.post('/graders/finishedAcademic', function(req, res){
    var gpa = req.body.gpa;
    var rank = req.body.rank;
    var numAP = req.body.numAP;
    var numHon = req.body.numHon;
    var gradeAP = req.body.gradeAP;
    var discretionary = req.body.discretionary;
    AcademicNomination.find({username: req.session.username},function(err,academicform){
	    academicform.score = gpa + rank + numAP + numHon + gradeAP + discretionary;	    
        res.redirect("/graders/ungradedapps");
    });
  });

app.post('/graders/finishedComm', function(req, res){
    var numHon = req.body.numHon;
    var APgrades = req.body.APgrades;
    var discretionary = req.body.discretionary;
    ServicesNomination.find({username: req.session.username},function(err, servicesform){
	    servicesform.score = numHon+ APgrades + discretionary;	    
        res.redirect("/graders/ungradedapps");
    });
  });

app.post('/graders/finishedStem', function(req, res){
    var numAP = req.body.numAP;
    var numHon = req.body.numHon;
    var gradeAP = req.body.APgrades;
    var discretionary = req.body.discretionary;
    StemNomination.find({username: req.session.username},function(err,stemform){
	    stemform.score = numAP + numHon + gradeAP + discretionary;	    
        res.redirect("/graders/ungradedapps");
    });
  });
    
app.post('/graders/finishedArts', function(req, res){
    var creativity = req.body.creativity;
    var craft = req.body.craftsmanship;
    var impression = req.body.impression;
    var composition = req.body.composition;
    var grades = req.body.grades;
    var discretionary = req.body.discretionary;
    ArtsNomination.find({username: req.session.username},function(err,artsform){
	    artsform.score = creativity + craft + impression + composition + grades + discretionary;	    
        res.redirect("/graders/ungradedapps");
    });
  });

    
app.listen(3000, function() {
    console.log('LACC listening on port 3000!');
});
