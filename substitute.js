const names = ['Bolovo', 'Bololo', 'Salnorabo', 'Bonobo', 'Bolar', 'Boniro', 'Bonaldo', 'Bolero', 'Bonaro', 'Bonoro'];

function replaceText (node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode &&
        node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }

    let content = node.textContent;
    content = content.replace(/bolsonaro/gi, names[Math.floor(Math.random()*names.length)]);
    node.textContent = content;
  }
  else {
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
