

// document.addEventListener('DOMContentLoaded', function() {
//     // Fonction pour charger les commentaires
//     function loadComments() {
//         fetch('/api/comments')
//             .then(response => response.json())
//             .then(commentaires => {
//                 const divCommentaires = document.getElementById('commentaires');
//                 divCommentaires.innerHTML = ''; // Vider le contenu existant

//                 // Prendre les 10 derniers commentaires
//                 const derniersCommentaires = commentaires.slice(-10);

//                 derniersCommentaires.forEach(commentaire => {
//                     const p = document.createElement('p');
//                     p.textContent = commentaire;
//                     divCommentaires.appendChild(p);
//                 });
//             })
//             .catch(error => console.error('Erreur lors de la récupération des commentaires:', error));
//     }

//     // Charger les commentaires existants au chargement de la page
//     loadComments();

//     // Gérer la soumission du formulaire de commentaires
//     document.getElementById('commentForm').addEventListener('submit', function(event) {
//         event.preventDefault(); // Empêcher le rechargement de la page
//         const commentaire = document.querySelector('textarea[name="comment"]').value.trim();
//         if (commentaire !== '') {
//             fetch('/api/comment', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ comment: commentaire })
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Erreur lors de l\'ajout du commentaire');
//                 }
//                 return response.text();
//             })
//             .then(data => {
//                 // Recharger les commentaires après l'ajout du nouveau commentaire
//                 loadComments();
//                 document.querySelector('textarea[name="comment"]').value = ''; // Vider le formulaire
//             })
//             .catch(error => console.error('Erreur :', error));
//         }
//     });
// });








document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour charger les commentaires
    function loadComments() {
        fetch('/add-comment')
            .then(response => response.json())
            .then(commentaires => {
                const divCommentaires = document.getElementById('commentaires');
                divCommentaires.innerHTML = ''; // Vider le contenu existant

                // Prendre les 10 derniers commentaires
                const derniersCommentaires = commentaires.slice(-10);

                derniersCommentaires.forEach(commentaire => {
                    const p = document.createElement('p');
                    p.textContent = commentaire;
                    divCommentaires.appendChild(p);
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des commentaires:', error));
    }

    // Charger les commentaires existants au chargement de la page
    loadComments();

    // Gérer la soumission du formulaire de commentaires
    document.getElementById('commentForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        const nom = document.getElementById('nomInput').value.trim();
        const commentaire = document.getElementById('commentaireInput').value.trim();
        if (commentaire !== '') {
            fetch('/add-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment: `${nom}: ${commentaire}` })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout du commentaire');
                }
                return response.text();
            })
            .then(data => {
                // Recharger la page après l'ajout du commentaire
                window.location.reload();
            })
            .catch(error => console.error('Erreur :', error));
        }
    });
});
