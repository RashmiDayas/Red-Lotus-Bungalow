document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const phoneInput = document.getElementById('phone');
    
    // Format Phone Number (Add spaces for readability)
    phoneInput.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, "").match(/.{1,3}/g);
        if (x && x[0] && x[0].length > 3) {
            e.target.value = x[0].match(/.{1,3}/g).join(' ') + ' ' + x.slice(3).join(' ');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Get Values
        const formData = new FormData(form);
        const name = formData.get('name') || 'Guest';
        const email = formData.get('email') || 'guest@email.com';
        const phone = formData.get('phone') || '0000000000';
        const roomType = formData.get('room_type') || 'Garden Suite';
        const guests = formData.get('guests') || '2';
        const checkIn = formData.get('check_in') || 'YYYY-MM-DD';
        const checkOut = formData.get('check_out') || 'YYYY-MM-DD';
        const message = formData.get('message') || 'None';

        // 2. Button Animation (Loading State)
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="animate-spin h-5 w-5" data-lucide="loader-2"></i> Processing...`;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

        // 3. Construct WhatsApp Message
        const waNumber = "94786105117";
        const text = `Hi Red Lotus, I want to book ${roomType}.Details:Name: ${name}Email: ${email}Phone: ${phone}Guests: ${guests}Check-in: ${checkIn}Check-out: ${checkOut}Requests: ${message}`;

        // 4. Delay to simulate processing (Good UX)
        setTimeout(() => {
            // Open WhatsApp
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
            
            // 5. Save to Backend (Optional, if you have the Python API)
            fetch('/book', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // 6. Success State
                submitBtn.innerHTML = `<i data-lucide="check" class="w-5 h-5"></i> Booking Sent!`;
                submitBtn.classList.remove('bg-gradient-to-r', 'from-lotusRed', 'to-lotusDark', 'hover:shadow-gold-glow');
                submitBtn.classList.add('bg-whatsapp', 'hover:bg-green-500'); // Change to green
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerHTML = "Error. Try Again";
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75');
            });
        }, 1000); // 1 second delay
    });
});