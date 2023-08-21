var headerCollapsed = false;
var header;
var footer;
var manufacturing;
var hardware;
var software;
var data;
var howTo;
var contact;
var menuToggle;
var navToggle;

window.addEventListener('load', function (event) {
    header = document.getElementsByTagName('header')[0];
    footer = document.getElementsByTagName('footer')[0];
    manufacturing = document.getElementById('manufacturing');
    hardware = document.getElementById('hardware');
    software = document.getElementById('software');
    data = document.getElementById('data-platform');
    howTo = document.getElementById('how-to-test');
    contact = document.getElementById('contact');

    menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('click', function () {
        toggleMenu();
    });

    navToggle = document.getElementById('nav-toggle');
    navToggle.addEventListener('click', function () {
        toggleMenu();
    });

    window.addEventListener('scroll', function () {
        renderHeader();
    });
    renderHeader();
});

function toggleMenu() {
    const marker = 'nav-open';
    if (document.body.classList.contains(marker)) {
        document.body.classList.remove(marker);
    } else {
        document.body.classList.add(marker);
    }
}

function renderHeader() {
    if (window.scrollY > 100) {
        if (!headerCollapsed) {
            document.body.classList.add('collapsed');
            headerCollapsed = true;
        }
    }
    else {
        if (headerCollapsed) {
            document.body.classList.remove('collapsed');
            headerCollapsed = false;
        }
    }
}
function scrollToElement(elem) {
    if (elem != null) {
        let domRect = elem.getBoundingClientRect();
        let distance = (domRect.top + window.scrollY) - 60;
        window.scrollTo(0, distance);
    }
}
async function sendMessage() {
    let name = getInputValue('user-name');
    if (name.length < 1) {
        alert('Please provide your name');
        return;
    }
    let email = getInputValue('email-address');
    if (email.length < 1) {
        alert('Please provide your email');
        return;
    }
    let message = getInputValue('message');
    if (message.length < 1) {
        alert('Please provide the message');
        return;
    }
    let phoneNumber = getPhoneNumber();
    if (phoneNumber == 0) {
        alert('Please provide a valid phone number');
        return;
    }
    const request = {
        email: email,
        message: getInputValue('message'),
        name: name,
        phoneNumber: {
            countryCode: 44,
            number: phoneNumber
        }
    };
    try {
        let response = await fetch('https://uas1.shout.services/api/1/registrations/contact-us', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (response.ok) {
            alert('Thank you for your enquiry. We will get in touch shortly.');
            return;
        }
    }
    catch (e) {
        console.log(e);
    }
    alert('Something went wrong and the message hasn’t been sent. Please email us at info@shoutplatform.com');
}
function getInputValue(elementName) {
    let elem = document.getElementById(elementName);
    if (elem != null && (elem instanceof (HTMLInputElement) || elem instanceof (HTMLTextAreaElement))) {
        return elem.value;
    }
    return '';
}
function getPhoneNumber() {
    let inputString = getInputValue('phone-number');
    let numStr = '';
    if (inputString.length > 0) {
        for (let i = 0; i < inputString.length; i++) {
            if (inputString.charCodeAt(i) >= 48 && inputString.charCodeAt(i) <= 57) {
                numStr += inputString.charAt(i);
            }
        }
        let num = parseInt(numStr);
        return isNaN(num) ? 0 : num;
    }
    return 0;
}
//# sourceMappingURL=main.js.map