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