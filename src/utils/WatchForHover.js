const CLASSNAME = 'has-hover';
let container;
let hasHoverClass = false;
let lastTouchTime = 0;
function enableHover() {
    // filter emulated events coming from touch events
    if (new Date() - lastTouchTime < 500) return;
    if (hasHoverClass) return;
    container.classList.add(CLASSNAME);
    hasHoverClass = true;
}
function disableHover() {
    if (!hasHoverClass) return;
    container.classList.remove(CLASSNAME);
    hasHoverClass = false;
}
function updateLastTouchTime() {
    lastTouchTime = new Date();
}
function handleTouchStart() {
    updateLastTouchTime();
    disableHover();
}
function handleMouseMove() {
    enableHover();
}
function setupEventListeners() {
    document.addEventListener('touchstart', handleTouchStart, true);
    document.addEventListener('mousemove', handleMouseMove, true);
}
export default class WatchForHover {
    constructor() {
        container = document.body;
        setupEventListeners();
    }
}
