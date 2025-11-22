document.addEventListener('DOMContentLoaded', function() {
    const sendMailButton = document.getElementById('sendMailButton');
    const modal = document.getElementById('emailModal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelAction');
    const sendActionBtn = document.getElementById('sendEmailAction');
    const recipientEmailInput = document.getElementById('recipientEmail');
    const mailMessage = document.getElementById('mailMessage');
    
    sendMailButton.onclick = function() {
        modal.style.display = 'block';
        mailMessage.textContent = ''; 
        recipientEmailInput.value = ''; 
    }

    
    function closeModal() {
        modal.style.display = 'none';
    }


    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;


    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }


    sendActionBtn.onclick = function() {
        const recipient = recipientEmailInput.value.trim();
        const pageTitle = document.title;
        const pageUrl = window.location.href;

      
        if (!recipient || !recipient.includes('@') || !recipient.includes('.')) {
            mailMessage.textContent = 'Molimo unesite validnu email adresu.';
            mailMessage.style.color = 'red';
            return;
        }


        const subject = encodeURIComponent(`Link na vaš projekat: ${pageTitle}`);
        const body = encodeURIComponent(`Zdravo,\n\nŠaljem ti link na moj rad u Fun Zoni: ${pageTitle}\n\nLink: ${pageUrl}\n\n`);


        const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;


        window.location.href = mailtoLink;

       
        mailMessage.textContent = `Otvaram vaš email klijent... Pošaljite mail na ${recipient}!`;
        mailMessage.style.color = 'green';
        setTimeout(closeModal, 2000); 
    }
});