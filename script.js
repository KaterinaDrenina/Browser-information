document.addEventListener('DOMContentLoaded', function() {
    const browserInfo = document.getElementById('browserInfo');
    const userAgent = navigator.userAgent;
    let browserName = 'unknown browser';

    if (userAgent.includes("Edg")) {
        browserName = "Edge";
    } else if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
        browserName = "Opera";
    } else if (userAgent.includes("Chrome") && !userAgent.includes("Chromium")) {
        browserName = "Chrome";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome") && !userAgent.includes("Chromium")) {
        browserName = "Safari";
    } else if (userAgent.includes("Firefox")) {
        browserName = "Firefox";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        browserName = "Internet Explorer";
    }

    const message = `You are in ${browserName} browser now.`;

    const info = {

        'User-Agent Header': navigator.userAgent,
        'Language': navigator.language,
        'Cookies Enabled': navigator.cookieEnabled ? 'Yes' : 'No'
    }

    let infoHtml = `<h1>${message}</h1><ul>`;
    for (const [key, value] of Object.entries(info)) {
        infoHtml += `<li><strong>${key}:</strong> ${value}</li>`
    }
    infoHtml += '</ul>';

    browserInfo.innerHTML = infoHtml;

    
});

function getQueryParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const devices = urlParams.get('devices') ? urlParams.get('devices').split(',') : [];
    return devices;
}

function updateCheckboxesFromURL(devices) {
    document.querySelectorAll('ul li input[type="checkbox"]').forEach(checkbox => {
        const device = checkbox.parentNode.textContent.trim().toLowerCase();
        checkbox.checked = devices.includes(device);
    });

}

function updateURLFromCheckboxes() {
    const selectedDevices = Array.from(document.querySelectorAll('ul li input[type="checkbox"]:checked'))
                                .map(checkbox => checkbox.parentNode.textContent.trim().toLowerCase());

    const newQueryString = selectedDevices.length > 0 ? `?devices=${selectedDevices.join(',')}` : '';
    window.history.replaceState(null, '', window.location.pathname + newQueryString);
}


document.querySelectorAll('ul li input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
    updateURLFromCheckboxes();
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const devices = getQueryParams();
    updateCheckboxesFromURL(devices);
});