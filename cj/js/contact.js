
document.addEventListener('DOMContentLoaded', function() {
    const dynamicWordElement = document.getElementById('dynamicWord');
    const words = ['Contactez-nous', 'Passer nous voir ...', 'Ecrivez-nous', 'Nous trouver', 'Nos adresses'];
    let index = 0;

    function changeWord() {
        index = (index + 1) % words.length;
        dynamicWordElement.textContent = words[index];
    }

    setInterval(changeWord, 2000);


    document.getElementById('contactForm').addEventListener('submit', function(event) {
        console.log('clicked');
        event.preventDefault(); 

        // const formData = {
        //     'name': document.getElementById('name').value,
        //     'lastname': document.getElementById('lastname').value,
        //     'mail': document.getElementById('mail').value,
        //     'phone': document.getElementById('phone').value,
        //     'comment': document.getElementById('comment').value
        // };
        const formData = new FormData(this);
        console.log(JSON.stringify(formData));

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du message');
            }
            document.getElementById('contactForm').reset() ;
            return response.text();
            // console.log(document.getElementById('name').value),
            // document.getElementById('lastname').value ='';
            // document.getElementById('mail').value ='';
            // document.getElementById('phone').value='';
            // document.getElementById('comment').value='';
        })
        .then(data => {
            alert('Message envoyé avec succès !');
            //document.getElementById('contactForm').reset();

        })
        .catch(error => {
            console.error('Erreur :', error);
            alert('Une erreur est survenue lors de l\'envoi du message.');
        });
    });
});