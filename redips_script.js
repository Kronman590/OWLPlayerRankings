/* eslint-env browser */
/* eslint
   semi: ["error", "always"],
   indent: [2, "tab"],
   no-tabs: 0,
   no-multiple-empty-lines: ["error", {"max": 2, "maxEOF": 1}],
   one-var: ["error", "always"] */
/* global REDIPS */

/* enable strict mode */
'use strict';

let redips = {},		// redips container
	pos = {},			// initial positions of DIV elements
	rd = REDIPS.drag;	// reference to the REDIPS.drag lib


// redips initialization
redips.init = function () {
	// initialization
	rd.init('dragOMT');
	rd.init('dragOOT');
    rd.init('dragRn');
    rd.init('dragWn');
    rd.init('dragDv');
    rd.init('dragOr');
    rd.init('dragZr');
    rd.init('dragWB');
    rd.init('dragRh');
    rd.init('dragSg');
    rd.init('dragOD');
    rd.init('dragOP');
    rd.init('dragAs');
    rd.init('dragWd');
    rd.init('dragTc');
    rd.init('dragSb');
    rd.init('dragMc');
    rd.init('dragRp');
    rd.init('dragGj');
    rd.init('dragPh');
    rd.init('dragHz');
    rd.init('dragMi');
    rd.init('dragDm');
    rd.init('dragEc');
    rd.init('dragSl');
    rd.init('dragSm');
    rd.init('dragJk');
    rd.init('dragTb');
    rd.init('dragBs');
    rd.init('dragOMS');
    rd.init('dragOFS');
    rd.init('dragLc');
    rd.init('dragMy');
    rd.init('dragMr');
    rd.init('dragBp');
    rd.init('dragAn');
    rd.init('dragZn');
    rd.init('dragBg');
	// enable shift animation
	rd.shift.animation = true;
	// in a moment when DIV element is moved, set drop_option property 
	rd.event.moved = function () {
		rd.dropMode = 'shift';
	};
};


// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redips.init, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redips.init);
}
