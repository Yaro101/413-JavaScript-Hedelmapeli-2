// Define items (images) for Hedelmäpeli
const items = [
    'lemon',
    'grapes',
    'cherry',
    'watermelon',
    'magicmushrooms',
    'megajackpot',
    'diamond',
    'goldenbell',
    'luckyseven',
]

const lockedSlots = [false, false, false, false];

// Flag to check if played before
let firstSpin = false;

// Select all slot images
const slotImages = document.querySelectorAll('.slots > .slot-item > .slot-image > img');

// Add click eventListener to PELAA button
document.querySelector('.btnPelaa').addEventListener('click', () => {
    firstSpin = true;

    // document.querySelectorAll('img').forEach((imgEl) => {
    //     const randomItem = Math.floor(Math.random() * items.length)
    //     const selectedItem = items[randomItem];
    //     imgEl.src = `./images/${selectedItem}.png`
    // })

    // Iterate over each slot image
    slotImages.forEach((imgEl, index) => {
        if (!lockedSlots[index]) {
            // Calculate a random time delay for each slot to start spinning
            const randomTime = 1000 + 1000 * index
            // Initiate the spinning animation for each slot
            randomizeImgs(imgEl, randomTime)
        }
        // setTimeout(() => {
        //     chooseRandom(imgEl)
        // }, randomTime);
    });
    // Set a timout for the resetting the locks
    setTimeout(() => {
        resetLockButtons();
    }, 2000);

});

// Function to animate the spinning of slot images
const randomizeImgs = (imgEl, time) => {
    // Set an interval to change slot image at rapid rate
    const timeInterval = setInterval(() => {
        imgEl.classList.remove('animate')
        chooseRandom(imgEl)
    }, 100);
    // Set a timeout to stop the interval after a specific time
    setTimeout(() => {
        imgEl.classList.remove('animate')
        clearInterval(timeInterval);
    }, time);
};

// function to chose a random img item from the array items and apply it as a src
const chooseRandom = (imgEl) => {
    const randomItem = Math.floor(Math.random() * items.length)
    const selectedItem = items[randomItem];
    imgEl.src = `./images/${selectedItem}.png`
    // Add class animate for animation effect
    imgEl.classList.add('animate')
};


// Function to handle lock button clicks
const handleLock = (slotIndex) => {
    // Check if played before
    if (!firstSpin) {
        alert("Voit lokitse jot pelit");
        return;
    }

    // Check if max 2 lock are selected
    if (lockedSlots.filter(lock => lock).length >= 2) {
        alert("Voit vain likitse 2");
        return;
    }
    // Toggle the lock status for the corresponding slot
    lockedSlots[slotIndex] = !lockedSlots[slotIndex];
    // Get lock button element
    const lockBtn = document.getElementById(`lockSlot-${slotIndex + 1}`);
    // Change the lock button image
    lockBtn.querySelector('img').src = lockedSlots[slotIndex] ? "./images/locked-wepik-export-20231205081314klvF.png" : "./images/unlocked-wepik-export-20231205082313d89Q.png"
    // Change the border color based on the lock status
    lockBtn.style.borderBlockColor = lockedSlots[slotIndex] ? "gold" : "initial";
}

// Add event listener to each lock button
document.getElementById("lockSlot-1").addEventListener("click", () => handleLock(0));
document.getElementById("lockSlot-2").addEventListener("click", () => handleLock(1));
document.getElementById("lockSlot-3").addEventListener("click", () => handleLock(2));
document.getElementById("lockSlot-4").addEventListener("click", () => handleLock(3));

const resetLockButtons = () => {
    // Iterate through the lock buttons and set them to initial styles
    lockedSlots.forEach((_, index) => {
        const lockBtn = document.getElementById(`lockSlot-${index + 1}`);
        lockBtn.querySelector("img").src = "./images/unlocked-wepik-export-20231205082313d89Q.png";
        lockBtn.style.borderBlockColor = "initial";
    });
    lockedSlots.fill(false);

};