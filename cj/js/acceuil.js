

document.addEventListener('DOMContentLoaded', function() {
    // Charger les commentaires existants
    fetch('/api/comments')
        .then(response => response.json())
        .then(commentaires => {
            const divCommentaires = document.getElementById('commentaires');
            divCommentaires.innerHTML = ''; // Vider le contenu existant
            commentaires.forEach(commentaire => {
                const p = document.createElement('p');
                p.textContent = commentaire;
                divCommentaires.appendChild(p);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des commentaires:', error));

    // Gérer la soumission du formulaire de commentaires
    document.getElementById('commentForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        const commentaire = document.querySelector('textarea[name="comment"]').value.trim();
        if (commentaire !== '') {
            fetch('/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment: commentaire })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout du commentaire');
                }
                return response.text();
            })
            .then(data => {
                const p = document.createElement('p');
                p.textContent = commentaire; // Afficher le commentaire ajouté
                document.getElementById('commentaires').appendChild(p);
                document.querySelector('textarea[name="comment"]').value = ''; // Vider le formulaire
            })
            .catch(error => console.error('Erreur :', error));
        }
    });
});
