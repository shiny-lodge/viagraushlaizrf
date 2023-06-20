const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    //settings (optional). see API
});

function getText1(val) {
    if (val === 1) {
        return "Почти никогда или никогда"
    } else if (val === 2) {
        return "Редко (реже чем в половине случаев)"
    } else if (val === 3) {
        return "Иногда (примерно в половине случаев)"
    } else if (val === 4) {
        return "Часто (более чем в половине случаев)"
    } else if (val === 5) {
        return "Почти всегда или всегда"
    } else {
        return ""
    }
}

function getText2(val) {
    if (val === 1) {
        return "Чрезвычайно трудно"
    } else if (val === 2) {
        return "Очень трудно"
    } else if (val === 3) {
        return "Трудно"
    } else if (val === 4) {
        return "Не очень трудно"
    } else if (val === 5) {
        return "Не трудно"
    } else {
        return ""
    }
}

document.querySelectorAll("input[type='radio']").forEach(el => el.addEventListener("change", event => {
    if (event.target.name !== "q-5") {
        document.getElementById(event.target.name).innerText = getText1(parseInt(event.target.value));

    } else {
        document.getElementById(event.target.name).innerText = getText2(parseInt(event.target.value));

    }
}))

document.addEventListener('alpine:init', () => {
    Alpine.store("test", {
        val1: 0,
        val2: 0,
        val3: 0,
        val4: 0,
        val5: 0,
        close() {
            myModal.close();
        }
    });

    Alpine.store("res", {
        show: false,
        text: "",
        calc() {
            this.show = true;
            const st = Alpine.store("test");

            const val1 = parseInt(st.val1);
            const val2 = parseInt(st.val2);
            const val3 = parseInt(st.val3);
            const val4 = parseInt(st.val4);
            const val5 = parseInt(st.val5);

            const res = val1 + val2 + val3 + val4 + val5;

            if (res <= 10) {
                this.text = "выраженная эректильная дисфункция"
            } else if (res <= 15) {
                this.text = "эректильная дисфункция умеренной степени"
            } else if (res <= 20) {
                this.text = "эректильная дисфункция легкой степени"
            } else if (res <= 25) {
                this.text = "эректильная дисфункция отсутствует"
            }
        },
        getRes() {
            this.show = true;
            const st = Alpine.store("test");

            const val1 = parseInt(st.val1);
            const val2 = parseInt(st.val2);
            const val3 = parseInt(st.val3);
            const val4 = parseInt(st.val4);
            const val5 = parseInt(st.val5);

            const res = val1 + val2 + val3 + val4 + val5;

            return res;
        }
    })
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("grade-anim")
        } else {
            entry.target.classList.remove("grade-anim")
        }
    })
});

observer.observe(document.querySelector(".grade"));

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelector(".graph").classList.add("graph-anim")
        } else {
            document.querySelector(".graph").classList.remove("graph-anim")
        }
    })
});

observer2.observe(document.querySelector(".graph"));

const submitEmailButton = document.querySelector('#submit-email-button')
const emailInput = document.querySelector('#email-input')

function isEmailValid(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !!email.match(validRegex);
}

function showEmailSuccessToast() {
    Toastify({
        text: "Email отправлен",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { }
    }).showToast();
}

function showEmailErrorToast() {
    Toastify({
        text: "Неправильно введен email",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, rgba(165,36,102,1) 0%, rgba(237,28,36,1) 100%)",
        },
        onClick: function () { }
    }).showToast();
}

function sendEmailData() {
    const data = {
        data: {
            email: emailInput.value
        }
    }
    fetch('https://strapi.devsidesapi.ru/api/jent-emails', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(showEmailSuccessToast)
        .catch(showEmailErrorToast)
        .finally(() => {
            submitEmailButton.disabled = false
            emailInput.disabled = false
            emailInput.value = ''
        })
}

function submitEmail() {
    submitEmailButton.disabled = true;
    emailInput.disabled = true;
    sendEmailData()
}

function handleSubmitClick() {
    if (isEmailValid(emailInput.value)) {
        sendMetrikaData(93741697, 'reachGoal', 'email')
        submitEmail()
    } else {
        showEmailErrorToast()
    }
}

const consentCheckbox = document.querySelector("#consent")
submitEmailButton.disabled = !consentCheckbox.checked
consentCheckbox.addEventListener('click', handleConsentChange)
function handleConsentChange() {
    submitEmailButton.disabled = !consentCheckbox.checked
}

const specialistsButton = document.querySelectorAll('.js-spec-watcher')

specialistsButton.forEach((button) => {
    button.addEventListener('click', (event) => {
        sendMetrikaData(93741697, 'reachGoal', 'goal')
    })
    button.addEventListener('auxclick', (event) => {
        sendMetrikaData(93741697, 'reachGoal', 'goal')
    })
})

const metricIntervals = [30, 60, 90]
metricIntervals.forEach((interval) => {
    setTimeout(() => {
        sendMetrikaData(93741697, 'reachGoal', `${interval}sec`)
    }, interval * 1000)
})

function sendMetrikaData(id, goal, payload) {
    if (ym) {
        ym(id, goal, payload)
    } else {
        setTimeout(() => {
            sendMetrikaData(id, goal, payload)
        },
            500)
    }
}

submitEmailButton && submitEmailButton.addEventListener('click', handleSubmitClick)