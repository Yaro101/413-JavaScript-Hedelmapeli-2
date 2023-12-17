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

// Select all slot images
const slotImages = document.querySelectorAll('.slots > .slot-item > .slot-image > img');

// Add click eventListener to PELAA button
document.querySelector('.btnPelaa').addEventListener('click', () => {

    // document.querySelectorAll('img').forEach((imgEl) => {
    //     const randomItem = Math.floor(Math.random() * items.length)
    //     const selectedItem = items[randomItem];
    //     imgEl.src = `./images/${selectedItem}.png`
    // })

    // Iterate over each slot image
    slotImages.forEach((imgEl, index) => {
        // Calculate a random time delay for each slot to start spinning
        const randomTime = 1000 + 1000 * index
        // Initiate the spinning animation for each slot
        randomizeImgs(imgEl, randomTime)
        // setTimeout(() => {
        //     chooseRandom(imgEl)
        // }, randomTime)
    })
})

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