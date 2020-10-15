console.log('Hello Extension 2');

// Inspired by https://github.com/mdn/webextensions-examples/blob/master/emoji-substitution/substitute.js

function no99ReplacePrices (node) {
  // Only substitude on single line text nodes.
  if (node.nodeType === Node.TEXT_NODE) {
    // This node only contains text.

    // Skip textarea nodes due to the potential for accidental submission
    // of substituted emoji where none was intended.
    if (node.parentNode &&
        node.parentNode.nodeName === 'TEXTAREA') {
      return;
    }

    // Copy of the text node for manipulation
    let content = node.textContent;
    

    // TODO ----------------------------------------------

    // Currency symbols = '$£€￥₠₡₢₣₤₥₦₧₨₩₪₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺';
    // Replace text: node.textContent = content;
    node.textContent = 'Yo';
  } else {
    // This node contains more than just text, so
    // call replace function on children.
    for (let i = 0; i < node.childNodes.length; i++) {
      no99ReplacePrices(node.childNodes[i]);
    }
  }
};


no99ReplacePrices(document.body);

// Monitor the DOM for additions and check for substitutions
const no99Observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // Run substitution on each newly added dom node
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        no99ReplacePrices(newNode);
      }
    }
  });
});
no99Observer.observe(document.body, {
  childList: true,
  subtree: true
});

