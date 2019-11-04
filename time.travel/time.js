/*
 *  ## time.js ##
 * counts how long the page has been open for and writes it to a clock
 * to use: create an element with the id "clock" and run this script.
 */
(function () {
    //-- config section --//

    // element id to look for
    var elemId = 'clock';
    // milliseconds between updates
    var update = 10;
    // show milliseconds field on the clock?
    var milliseconds = true;

    //-- config section --//
    
    var elem;
    function findClock() { elem = document.getElementById(elemId); }
    findClock();
    window.findClock = findClock;

    var start = Date.now();
    function since() { return Date.now() - start; }

    function addSeconds(seconds) { start -= seconds * 1000; }
    window.addSeconds = addSeconds;

    var units = {
        year:   31557600000
    ,   month:  2629800000
    ,   week:   604800000
    ,   day:    86400000
    ,   hour:   3600000
    ,   minute: 60000
    ,   second: 1000
    };
    if (milliseconds) units['millisecond'] = 1;
    var unitNames = Object.keys(units);
    function pronounce(unit, value) {
        if (value === 1) return value + ' ' + unit;
        else return value + ' ' + unit + 's';
    }

    function format(time) {
        var str = '';
        var remaining = time;
        
        for (var i = 0; i < unitNames.length; i++) {
            var name = unitNames[i];
            var value = units[name];

            var divided = remaining / value;
            var floored = Math.floor(divided);
            if (divided < 1) continue;

            remaining -= value * floored;
            str += pronounce(name, floored) + ', ';
        }

        str = str.replace(/,\s$/, '');

        return str;
    }

    function doUpdate() {
        elem.innerText = format(since());
    }
    setInterval(doUpdate, update);
    doUpdate();
})();