const getHospitals = async () => {
    try {
        const res = await axios.get("https://api.mockaroo.com/api/generate.json?key=26f36e60&schema=hospital_data_schema");
        return res.data; // Logs a random hospital
    } catch (e) {
        console.log("ERROR", e);
    }
}

const getRandomHospital = (hospitals) => {
    const randomIndex = Math.floor(Math.random() * hospitals.length);
    return hospitals[randomIndex].hospital_name;
}

const addHospital = async () => {
    const hospitals = await getHospitals();
    const randHospitalName = getRandomHospital(hospitals);
}
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});