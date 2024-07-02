document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du message');
            }
            return response.text();
        })
        .then(data => {
            alert('Message envoyé avec succès !');
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            console.error('Erreur :', error);
            alert('Une erreur est survenue lors de l\'envoi du message.');
        });
    });
});
