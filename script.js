
// Var to prevent dragging while not entered (not needed but retained on mobile)
let entered = false;

let trackMoved = false;
let startX = 0;

const volumeSlider = document.getElementById('volumeSlider');
const profiles = document.querySelector('item')

function isVolumeControl(e) {
    const volumeControls = document.querySelector('.audio-controls'); // Add this class to your volume controls container
    const rect = volumeControls.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    return x >= rect.left && 
           x <= rect.right && 
           y >= rect.top && 
           y <= rect.bottom;
}



// Profile

// IMAGE TRACK
// Initiate Variables


// Music

let pendingUrl = '';

function confirmNavigation(url) {
    pendingUrl = url;
    const popup = document.getElementById('linkPopup');
    const blurOverlay = document.querySelector('.blur-overlay');
    
    // Show blur overlay and popup
    blurOverlay.style.display = 'block';
    popup.style.display = 'block';
    
    // Trigger animations
    requestAnimationFrame(() => {
        blurOverlay.classList.add('active');
        popup.style.opacity = '1';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('linkPopup');
    const blurOverlay = document.querySelector('.blur-overlay');
    const confirmButton = document.getElementById('confirmLink');
    const cancelButton = document.getElementById('cancelLink');

    if (!popup || !blurOverlay || !confirmButton || !cancelButton) {
        console.error('One or more elements not found');
        return;
    }

    function hidePopup() {
        // Hide both overlay and popup
        blurOverlay.classList.remove('active');
        popup.style.opacity = '0';
        
        setTimeout(() => {
            blurOverlay.style.display = 'none';
            popup.style.display = 'none';
        }, 300);
    }

    // Add click event for confirm button
    confirmButton.addEventListener('click', () => {
        if (pendingUrl) {
            hidePopup();
            setTimeout(() => {
                window.location.href = pendingUrl;
            }, 300);
        }
    });

    // Add click event for cancel button
    cancelButton.addEventListener('click', hidePopup);

    // Close popup when clicking overlay
    blurOverlay.addEventListener('click', hidePopup);

    // Prevent popup from closing when clicking inside it
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});





document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const audioButton = document.querySelector('.audio-toggle');
    
    let isMuted = JSON.parse(localStorage.getItem("isMuted")) ?? false;
    
    audioButton.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            localStorage.setItem("isMuted", String(isMuted));
            preMute = music.volume;
            music.volume = 0;
        } else { 
            localStorage.setItem("isMuted", String(isMuted));
            music.volume = preMute;
        }
        audioButton.setAttribute('data-muted', isMuted);
        audioButton.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
    });
    
});



// Time

document.addEventListener('DOMContentLoaded', function() {
    const timeText = document.querySelector('.time');
    
    function updateTime() {
        /* Create a date object in EST/EDT */
        const options = {
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        };
        
        const estTime = new Date().toLocaleTimeString('en-US', options);
        timeText.textContent = `${estTime} EST`;
    }

    /* Update immediately */
    updateTime();
    
    /* Update every second */
    setInterval(updateTime, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    const infoIcon = document.querySelector('.info-icon');
    const popup = document.getElementById('infoPopup');
    const closeButton = popup.querySelector('.close-button');
    const artistsText = document.querySelector('.artists-button-text');
    const artistsDetails = document.querySelector('.artists-details');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'blur-overlay';
    document.body.appendChild(overlay);

    function showPopup() {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        
        // Trigger animations
        requestAnimationFrame(() => {
            overlay.style.animation = 'overlayFadeIn 0.3s forwards';
            popup.style.animation = 'boxFadeIn 0.3s forwards';
        });
    }

    function hidePopup() {
        overlay.style.animation = 'overlayFadeOut 0.3s forwards';
        popup.style.animation = 'boxFadeOut 0.3s forwards';
        
        // Remove elements after animation
        setTimeout(() => {
            overlay.style.display = 'none';
            popup.style.display = 'none';
        }, 300);
    }

    function toggleArtists() {
        if (artistsDetails.style.display === 'none' || !artistsDetails.style.display) {
            artistsDetails.style.display = 'block';
            artistsDetails.style.animation = 'boxFadeInNT 0.3s forwards';
        } else {
            artistsDetails.style.animation = 'boxFadeOutNT 0.3s forwards';
            setTimeout(() => {
                artistsDetails.style.display = 'none';
            }, 300);
        }
    }

    // Event listeners
    infoIcon.addEventListener('click', showPopup);
    closeButton.addEventListener('click', hidePopup);
    overlay.addEventListener('click', hidePopup);
    artistsText.addEventListener('click', toggleArtists);

    // Prevent popup from closing when clicking inside it
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Fuck mobile users <3 (& enter page is here)
document.addEventListener('DOMContentLoaded', function(){
    const music = document.getElementById('bgMusic');
    const infoIcon = document.querySelector('.info-icon');
    const emailIcon = document.querySelector('.email-icon');
    const enterPage = document.querySelector('.enter-page')

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        console.log("Mobile -- Stay")
        enterPage.addEventListener('click', () => {
            infoIcon.style.display = 'block';
            emailIcon.style.display = 'block';
            enterPage.style.animation = 'boxFadeOutNT 0.6s forwards'
            
            entered=true
            music.play();
            
            setTimeout(() => {
                enterPage.style.display = 'none';
            }, 600);
        });

      } else {
        console.log("Desktop/PC -- Go");
        let devmode=true
        if (devmode) {
            enterPage.addEventListener('click', () => {
            infoIcon.style.display = 'block';
            emailIcon.style.display = 'block';
            enterPage.style.animation = 'boxFadeOutNT 0.6s forwards'
            
            entered = true
            music.play();
            
            setTimeout(() => {
                enterPage.style.display = 'none';
            }, 600);
            });
        }
        return;
    }
}); 

window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.getElementById('progressBar');

    // Set up the back-and-forth animation
    let progress = 0;
    let direction = 1; // 1 for right, -1 for left
    let cycles = 0;
    const maxCycles = 2; // Number of full cycles before completing
    if (!entered){
        const interval = setInterval(function() {
        progress += 5 * direction;
        
        // Change direction when reaching edges
        if (progress >= 100) {
            direction = -1;
            cycles += 0.5; // Count half cycle
        } else if (progress <= 0) {
            direction = 1;
            cycles += 0.5; // Count half cycle
        }
        
        // Update the progress bar width
        progressBar.style.width = progress + '%';
        
        // Once we've completed the desired number of cycles, finish loading
        if (cycles >= maxCycles) {
            clearInterval(interval);
            
            // Final fill to 100%
            progressBar.style.transition = 'width 0.3s ease-in';
            progressBar.style.width = '100%';
            
            // Fade out the loading screen
            setTimeout(() => {
            loadingScreen.style.animation = 'boxFadeOutNT 0.4s forwards';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 450);
            }, 300);
        }
        }, 50);
    }
});