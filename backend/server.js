// tous les modules
import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// utilie pour le hashing du password
const salt = 10;

// initialisation de mon app
const app = express();

// les middlewares
app.use(express.json());
app.use(cors({
    allowedHeaders: "*",
    allowMethods: "*",
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

// connexion à la BD
const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "connect" 
})


// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if(!token) {
//         return res.json({Error: "Vous êtes pas autorisé à accéder à ce contenu"})
//     } else {
//         jwt.verify(token, "jwt-secret-key", (err, decoded)=> {
//             if(err) {
//                 return res.json({Error: "La token n'est pas valide"})
//             } else {
//                 req.name = decoded.name;
//                 next();
//             }
//         })
//     }
// }
// // api qui récupère
// app.get('/', verifyUser, (req,res)=> {
//     return res.json({Status: "Succès!!!", name: req.name});
// })

// api de création de compte
app.post('/register', (req, res)=> {
    const sql = "INSERT INTO users (`nom`, `email`, `password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash)=> {
        if(err) return res.json({Error: "Une erreur c'est produite"});
        const values = [
            req.body.nom,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result)=> {
            if(err) return res.json({Error: "Il y a eu une erreur lors de la création du compte"});
            return res.json({
                Status: 200,
                message: "Votre copte a été créé avec succès"
            });
        })
    })
})

// api de connexion à son compte(il donne accès au panel)
app.post('/login', (req, res)=> {
    const {email, password} = req.body;
     // vérification des champs email et password dans la requête
     if(!email || !password){
        return res.json({Error: "Email et/ou mot de passe manquant(s)"});
    }
    const sql = "SELECT * FROM `users` WHERE `email` = ?";
    db.query(sql, [email], (err, data)=> {
        // en cas d'erreur
        if(err) return res.json({Error: "Erreur de connexion au serveur"});
        // vérification de l'existance de utilisateur dans la BD
        if(data.length > 0){
            bcrypt.compare(password, data[0].password, (err, result)=> {
                if(err) return res.json({Error: "Le mot de passe ne correspond pas"});
                if(result) {
                    // gestion des cookies
                    const name = data[0].nom;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({
                        Status: 200,
                        message: `Bienvenue ${email}`
                    });
                } else {
                    return res.json({Error: "Mot de passe incorrect"});
                } 
            })
        } else {
            return res.json({Error: "Cet email n'existe pas"});
        }
    })
})

// ecoute / ouverture du serveur
app.listen(5000, ()=> {
    console.log("Le serveur a bien démarré...");
})