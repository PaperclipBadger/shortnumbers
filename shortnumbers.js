/* ============================================================================
 * config.js
 * ----------------------------------------------------------------------------
 * 
 * List of formatters and options for drop down.
 */

numberFormatters = 
    [ formatEveryThirdPower( /* Orteil */
        [ ''
        , ' million'
        , ' billion'
	, ' trillion'
        , ' quadrillion'
        , ' quintillion'
        , ' sextillion'
        , ' septillion'
        , ' octillion'
        , ' nonillion'
        , ' decillion'
        , ' undecillion'
        , ' duodecillion'
        , ' tredecillion'
        , ' quattuordecillion'
        , ' quindecillion'
	]
      )
    , rawFormatter           /* None */
    , formatEveryThirdPower( /* English */
        [ ''
        , ' million'
        , ' thousand million'
        , ' billion'
        , ' thousand billion'
        , ' million billion'
        , ' thousand million billion'
        , ' trillion'
        , ' thousand trillion'
        , ' million trillion'
        , ' thousand million trillion'
        , ' billion trillion'
        , ' thousand billion trillion'
        , ' million billion trillion'
        , ' thousand million billion trillion'
        , ' quadrillion'
	]
      )
    , formatEveryThirdPower( /* S.I. Prefixes */
        [ ''
        , ' mega'
        , ' giga'
        , ' tera'
        , ' peta'
        , ' exa'
        , ' zetta'
        , ' yotta'
        , 'e27'
        , 'e30'
        , 'e33'
        , 'e36'
        , 'e39'
        , 'e42'
        , 'e43'
        , 'e46'
	]
      )
    , formatEveryThirdPower( /* Programmer */
        [ 'e03'
        , 'e06'
        , 'e09'
        , 'e12'
        , 'e15'
        , 'e18'
        , 'e21'
        , 'e24'
        , 'e27'
        , 'e30'
        , 'e33'
        , 'e36'
        , 'e39'
        , 'e42'
        , 'e43'
        , 'e46'
	]
      )
    ];

/* Map from menu names to indeces of numberFormatters 
 * The ordering is squiffy to be Game.prefs['format'] compatible.
 */
numberSelectorDict = 
    { 'None': 1
    , 'Orteil': 0
    , 'English': 2
    , 'S.I.': 3
    , 'Programmer': 4 
    };

/* ===========================================================================
 * replace.js
 * ---------------------------------------------------------------------------
 *
 * Replaces the short number button with a drop down selector.
 * Also changes the Beautify code to accept more formatters.
 */

Game.WriteSelect = function(prefname, options, callback) {
  if (!callback) callback = '';
  callback = '(function(){'
           +   'var thing=l(\'' + prefname + 'Select\');'
           +   'Game.prefs[\'' + prefname + '\']='
           +       'thing.options[thing.selectedIndex].value;'
           + '})();'
           + callback;
  callback += 'PlaySound(\'snd/tick.mp3\');';
  optionsHTML = '';
  for (key in options) {
    optionsHTML += '<option value="' + options[key] + '"'
                 + (Game.prefs[prefname]==options[key]
                    ? 'selected="selected"'
                    : '')
                 + '>' + key + '</options>';
  };
  return '<select id="' + prefname + 'Select"'
       + 'oninput="' + callback + '">' + optionsHTML + '</select>';
};

function replaceFormatButtonWithDropdown() {
  if (Game.onMenu == 'prefs') {
    /* replace button with dropdown */
    var callback = 'BeautifyAll();'
                 + 'Game.RefreshStore();'
                 + 'Game.upgradesToRebuild=1;';
    var str = Game.WriteSelect('format', numberSelectorDict, callback);
    var div = document.createElement('div');
    div.innerHTML = str;
    var oldbutton = l('formatButton');
    oldbutton.parentElement.replaceChild(div.firstChild, oldbutton);
  };
};


/* Add a snippet to the end of Game.UpdateMenu */
Game.UpdateMenu = (function() {
  /* Only shadow Game.UpdateMenu once if we reload the mod. */
  var cached = Game.UpdateMenu.cachedFunc
               ? Game.UpdateMenu.cachedFunc
               : Game.UpdateMenu;
  var usurper = function() {
    cached.apply(this, arguments);
    replaceFormatButtonWithDropdown();
  };
  usurper.cachedFunc = cached;
  return usurper;
})();

Beautify = function(value,floats)
{
  var negative = (value < 0);
  var decimal = '';
  if ( value < 1000000 
    && floats > 0 
    && Math.floor(value.toFixed(floats)) != value.toFixed(floats)
     ) decimal = '.' + (value.toFixed(floats).toString()).split('.')[1];
  value = Math.floor(Math.abs(value));
  var formatter = numberFormatters[Game.prefs.format];
  var output = formatter(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
  return negative ? '-' + output : output + decimal;
};

