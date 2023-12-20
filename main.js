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

// Function to update the DOM elements
function updateDOM(element, value) {
    element.textContent = `${value}€`
}

// Selecting DOM elements
let moneyBox = document.querySelector(".money");
let panoBox = document.querySelector(".pano");

// Setting initial values
let totalMoney = 50;
updateDOM(moneyBox, totalMoney);
let pano = 0;
updateDOM(panoBox, pano);

// Handeling Euros buttons
document.getElementById("oneEuro").addEventListener("click", () => {
    pano = 1;
    if (pano <= totalMoney) {
        updateDOM(panoBox, pano);
    } else alert("You don't have enough money");
    return;
})

document.getElementById("twoEuro").addEventListener("click", () => {
    pano = 2;
    if (pano <= totalMoney) {
        updateDOM(panoBox, pano);
    } else alert("You don't have enough money");
    return;
})

document.getElementById("threeEuro").addEventListener("click", () => {
    pano = 3;
    if (pano <= totalMoney) {
        updateDOM(panoBox, pano);
    } else alert("You don't have enough money");
    return;
})

// Setting the initial value for locks
const lockedSlots = [false, false, false, false];

// Flag to check if played before
let firstSpin = false;
let canBeLocked = false;

// Select all slot images
const slotImages = document.querySelectorAll('.slots > .slot-item > .slot-image > img');

// Add click eventListener to PELAA button
document.querySelector('.btnPelaa').addEventListener('click', () => {
    spin(() => {

        const newSlotImages = document.querySelectorAll('.slots > .slot-item > .slot-image > img');
        // console.log(Array.from(newSlotImages).map(img => img.src));
        // extract item names
        const slotItems = Array.from(newSlotImages).map(img => extractItemName(img.src));
        console.log(slotItems);
        console.log(countOccurences(slotItems));
        console.log(`can be locked: ${canBeLocked}`);
        console.log(`first spin: ${firstSpin}`);
    });
});

// Spin function with callback
function spin(callback) {
    if (pano > 0) {
        firstSpin = true;
        // updating the totalMoney in the DOM
        totalMoney -= pano;
        updateDOM(moneyBox, totalMoney);

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
            callback(); // call the callback function after the spinning is done
        }, 4000);
    } else alert("Voit valita panos!!");
}


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

// Function that returns the chosen elements/images
// function getChosenImgEl() {
//     return Array.from(slotImages).map(img => img.src);
// }


// Function to handle lock button clicks
const handleLock = (slotIndex) => {
    // Check if played before
    if (!firstSpin || !canBeLocked) {
        console.log(`first spin: ${firstSpin} can be locked: ${canBeLocked}`);
        alert("Voit lokitse jot pelit");
        return;
        // Check if max 2 lock are selected
    } else if (lockedSlots.filter(lock => lock).length >= 2) {
        alert("Voit vain likitse 2");
        return;
    } else {
        // Toggle the lock status for the corresponding slot
        lockedSlots[slotIndex] = !lockedSlots[slotIndex];
        // Get lock button element
        const lockBtn = document.getElementById(`lockSlot-${slotIndex + 1}`);
        // Change the lock button image
        lockBtn.querySelector('img').src = lockedSlots[slotIndex] ? "./images/locked-wepik-export-20231205081314klvF.png" : "./images/unlocked-wepik-export-20231205082313d89Q.png"
        // Change the border color based on the lock status
        lockBtn.style.borderBlockColor = lockedSlots[slotIndex] ? "gold" : "initial";
    }
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
    canBeLocked = !canBeLocked;

};

// Function to extract the name of the item from the img src
const extractItemName = (imgSrc) => {
    const parts = imgSrc.split("/");
    const fileName = parts[parts.length - 1];
    const itemName = fileName.replace(".png", "");
    return itemName;
};

// Function to check occurences
function countOccurences(arr) {
    const occurences = {};
    // iterate through array
    arr.forEach(element => {
        // If element is not in occurences object initialize
        if (!occurences[element]) {
            occurences[element] = 1;
        } else {
            // if element is aöready in occurences object increment the count
            occurences[element]++;
        }
    });
    return occurences;
};

/*function winAnimation(duration) {
    document.body.classList.add("win");
    setTimeout(() => {
        document.body.classList.remove("win");
    }, duration);
}

winAnimation(2000);*/