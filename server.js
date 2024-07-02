
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, 'cj')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/css', express.static(path.join(__dirname, 'cj/css')));
app.use('/js', express.static(path.join(__dirname, 'cj/js')));
app.use('/photo', express.static(path.join(__dirname, 'cj/Photo')));

// Routes pour servir les fichiers HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'cj', 'index.html'));
});

app.get('/equipe', (req, res) => {
    res.sendFile(path.join(__dirname, 'cj', 'equipe.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'cj', 'contact.html'));
});

app.get('/offre', (req, res) => {
    res.sendFile(path.join(__dirname, 'cj', 'offre.html'));
});

// Route pour récupérer les 10 derniers commentaires
app.get('/add-comment', (req, res) => {
    fs.readFile(path.join(__dirname, 'blog', 'comments.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
            return;
        }
        const commentaires = data.trim().split('\n').slice(-10);
        res.json(commentaires);
    });
});

// Route pour ajouter un commentaire
app.post('/add-comment', (req, res) => {
    const { comment } = req.body;
    if (!comment || comment.trim() === '') {
        res.status(400).send('Le commentaire ne peut pas être vide.');
        return;
    }
    fs.appendFile(path.join(__dirname, 'blog', 'comments.txt'), comment.trim() + '\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.send('Commentaire ajouté avec succès !');
    });
});








// Gestion du formulaire de contact
app.post('/api/contact', (req, res) => {
    const { name, mail, comment } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'onesoloday26@gmail.com',
            pass: 'dyag jdkm ersp evrk'
        }
    });

    const mailOptions = {
        from: 'solemcherelus26@gmail.com',
        to: 'solemcherelus26@gmail.com',
        subject: 'Nouveau message de contact',
        text: `Nom: ${name}\nEmail: ${mail}\nMessage: ${comment}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            res.status(500).send('Erreur serveur lors de l\'envoi de l\'email');
        } else {
            console.log('Email envoyé:', info.response);
            res.send('Message envoyé avec succès !');
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
