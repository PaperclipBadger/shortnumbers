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

