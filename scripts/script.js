const button = document.body.querySelector('button');
button.addEventListener('click', async (e) => {
    e.preventDefault();
    const x_position = e.clientX - e.target.offsetLeft;
    const y_position = e.clientY - e.target.offsetTop;
    const ripplespan = document.createElement('span');
    ripplespan.style.left = `${x_position}px`;
    ripplespan.style.top = `${y_position}px`;
    button.appendChild(ripplespan);
    setInterval(() => {
        ripplespan.remove();
    }, 500);
    const [browserinfo, browser, version] = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\d+)/i) || [];
    try {
        const checkversion = await fetch('http://localhost:5500/check-browser-version', {
            method: 'POST', headers: {
                'Content-type': 'application/json'
            }, body: JSON.stringify({ browser, version })
        });
        if (checkversion.ok) {
            const checkedversion = await checkversion.json();
            if (checkedversion.islatest) {
                console.log('Your browser is upto date.');
            } else {
                console.log('Your browser is not upto date.');
            }
        } else {
            console.log("Failed to check browser version.");
        }
    } catch (error) { console.error(error); }
});