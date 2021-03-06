let prev;
let next;

window.onload = async () => {
    window.onkeydown = e => {
        if (e.code == 'ArrowLeft' && prev != null) prev.click();
        if (e.code == 'ArrowRight' && prev != null) next.click();
    }

    let url = 'README.md';
    if (window.location.search.includes('?url=')) url = window.location.search.replace('?url=', '');
    else history.pushState(null, null, '?url=/kotlin-bukkit-plugin-tutorial/README.md');

    const result = await fetch(url);
    const text = await result.text();
    document.getElementById('main').innerHTML = marked(text);

    setup();
}

function setup() {
    prev = null;
    next = null;

    document.querySelectorAll('a').forEach(el => {
        el.onclick = async e => {
            if(el.hidden) return;
            el.hidden = true;
            if (!el.getAttribute('href').startsWith('#')) e.preventDefault();
            else return;
            console.log(el.getAttribute('href'));
            history.pushState(null, null, `?url=${new URL(el.getAttribute('href'), decodeURIComponent(`${location.protocol}//${location.hostname}${location.search.replace('?url=', '')}`)).pathname}`);
            const result = await fetch(decodeURIComponent(location.search.replace('?url=', '')));
            const text = await result.text();
            document.getElementById('main').innerHTML = marked(text);
            setup();
        }

        if (el.innerText.includes('<--')) prev = el;
        if (el.innerText.includes('-->')) next = el;
    });
}