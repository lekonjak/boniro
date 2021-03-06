const nomes = names;

function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
            return;
        }

        let content = node.textContent;
        content = content.replace(/Bolsonaro/g, nomes[Math.floor(Math.random() * names.length)]);
        content = content.replace(/BOLSONARO/g, nomes[Math.floor(Math.random() * names.length)].toUpperCase());
        content = content.replace(/bolsonaro/g, nomes[Math.floor(Math.random() * names.length)].toLowerCase());
        node.textContent = content;
    } else {
        for (let i = 0; i < node.childNodes.length; i++) {
            replaceText(node.childNodes[i]);
        }
    }
}

replaceText(document.body);

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            for (let i = 0; i < mutation.addedNodes.length; i++) {
                const newNode = mutation.addedNodes[i];
                replaceText(newNode);
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
