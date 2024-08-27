const getHospitals = async () => {
    try {
        const res = await axios.get("https://api.mockaroo.com/api/generate.json?key=26f36e60&schema=hospital_data_schema");
        return res.data;
    } catch (e) {
        console.error("ERROR", e);
        return [];
    }
}

const getRandomHospital = (hospitals) => {
    if (hospitals.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * hospitals.length);
    const selectedHospital = hospitals[randomIndex];
    return {
        name: selectedHospital.hospital_name,
        email: selectedHospital.hospital_email,
        type: selectedHospital.hospital_type,
        insurance: selectedHospital.insurance
    };
}

const addHospital = async () => {
    const hospitals = await getHospitals();
    return getRandomHospital(hospitals);
}
const updateMessageBody = async () => {
    try {
        const hospitalData = await addHospital();
        if (hospitalData) {
            const msgBody = document.querySelector('.message-body');
            msgBody.innerHTML = `<strong>Hospital:</strong> ${hospitalData.name}<br>
                                    <strong>Email:</strong> ${hospitalData.email}<br>
                                    <strong>Type:</strong> ${hospitalData.type}<br>
                                    <strong>Insurance:</strong> ${hospitalData.insurance}`;
        } else {
            console.error("No hospital data available");
        }
    } catch (e) {
        console.error("Error processing hospital data", e);
    }
}
const finalFetch = async () => {
    return new Promise((resolve, reject) => {
        const jusRand = Math.random();
        if (jusRand > 0.01) {
            resolve(updateMessageBody());
        } else {
            reject(new Error("No Hospitals currently available broo"))
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const msgCard = document.querySelector('#myArticle');
    const regForm = document.querySelector('#registrationForm');

    msgCard.classList.add('disappearingCard');
    regForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const name = regForm.elements.userName.value;
        const heading = document.querySelector('.message-ki-heading');
        heading.innerText = `${name} Report`;

        try {
            await finalFetch();
        } catch (e) {
            console.error("Fail:", e.message)
            const msgBody = document.querySelector('.message-body');
            msgBody.innerText = `Error: ${e.message}`;
        }
        msgCard.classList.remove('disappearingCard');
        regForm.reset();
    });
});
