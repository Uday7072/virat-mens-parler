// =========================================
// VIRAT MENS PARLER - JAVASCRIPT
// =========================================

// Welcome Screen - Sirf ek baar dikhega
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if welcome screen already shown in this session
    if (sessionStorage.getItem('welcomeShown')) {
        // Already shown, hide immediately
        var ws = document.getElementById('welcome-screen');
        if (ws) {
            ws.style.display = 'none';
        }
    } else {
        // First time, show welcome screen
        var ws = document.getElementById('welcome-screen');
        if (ws) {
            setTimeout(function() {
                ws.style.display = 'none';
                sessionStorage.setItem('welcomeShown', 'true');
            }, 2500);
        }
    }
});

// Booking Form Submit
function submitBooking(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var service = document.getElementById('service').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var counter = document.getElementById('counter').value;

    if (!name || !phone || !service || !date || !time || !counter) {
        alert('Please fill all fields!');
        return false;
    }

    var submitBtn = document.getElementById('submitBtn');
    submitBtn.innerHTML = 'Processing...';
    submitBtn.disabled = true;

    setTimeout(function() {
        document.getElementById('bookingForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        var details = '<p><strong>Name:</strong> ' + name + '</p>' +
            '<p><strong>Service:</strong> ' + service + '</p>' +
            '<p><strong>Date:</strong> ' + date + '</p>' +
            '<p><strong>Time:</strong> ' + time + '</p>' +
            '<p><strong>Counter:</strong> ' + counter + '</p>';
        
        document.getElementById('bookingDetails').innerHTML = details;

        var message = 'Hello Virat Parler, I want to book appointment:\n\nName: ' + name + '\nPhone: ' + phone + '\nService: ' + service + '\nDate: ' + date + '\nTime: ' + time + '\nCounter: ' + counter;
        document.getElementById('whatsappLink').href = 'https://wa.me/70806 51774?text=' + encodeURIComponent(message);

    }, 2000);

    return false;
}

// Set minimum date
var dateInput = document.getElementById('date');
if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
}

// Counter Animation
var counters = document.querySelectorAll('.stat-number');
if (counters.length > 0) {
    function startCounting() {
        counters.forEach(function(counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            var increment = target / 50;
            var count = 0;
            
            function updateCount() {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + '+';
                }
            }
            updateCount();
        });
    }

    var statsSection = document.querySelector('.stats');
    if (statsSection) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    startCounting();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// Gallery Lightbox
var galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(function(item) {
    item.addEventListener('click', function() {
        var imgSrc = item.querySelector('img').src;
        
        var lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;justify-content:center;align-items:center;z-index:10000;cursor:pointer;';
        
        var img = document.createElement('img');
        img.src = imgSrc;
        img.style.cssText = 'max-width:90%;max-height:90%;border:3px solid #d4af37;border-radius:10px;';
        
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', function() {
            lightbox.remove();
        });
    });
});