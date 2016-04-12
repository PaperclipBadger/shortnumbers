numberFormatters =
[
	formatEveryThirdPower([
		'',
		' million',
		' billion',
		' trillion',
		' quadrillion',
		' quintillion',
		' sextillion',
		' septillion',
		' octillion',
		' nonillion',
		' decillion',
		' undecillion',
		' duodecillion',
		' tredecillion',
		' quattuordecillion',
		' quindecillion'
	]),
        rawFormatter,
	formatEveryThirdPower([
		'',
		' million',
		' thousand million',
		' billion',
		' thousand billion',
		' million billion',
		' thousand million billion',
		' trillion',
		' thousand trillion',
		' million trillion',
		' thousand million trillion',
		' billion trillion',
		' thousand billion trillion',
		' million billion trillion',
		' thousand million billion trillion',
		' quadrillion'
	]),
	formatEveryThirdPower([
		'',
		' mega',
		' giga',
                ' tera',
		' peta',
		' exa',
		' zetta',
		' yotta',
		'e27',
		'e30',
		'e33',
		'e36',
		'e39',
		'e42',
		'e43',
		'e46'
	]),
	formatEveryThirdPower([
		'e03',
		'e06',
		'e09',
		'e12',
		'e15',
		'e18',
		'e21',
		'e24',
		'e27',
		'e30',
		'e33',
		'e36',
		'e39',
		'e42',
		'e43',
		'e46'
	])
];

numberSelectorDict = {
  'None': 1,
  'Orteil': 0,
  'English': 2,
  'S.I.': 3,
  'Programmer': 4
};

Game.WriteSelect=function(prefname,options,callback)
{
  if (!callback) callback='';
  callback='Game.prefs[\''+prefname+'\']=l(\''+prefname+'Select\').options[l(\''+prefname+'Select\').selectedIndex].value;'+callback;
  callback+='PlaySound(\'snd/tick.mp3\');';
  optionsHTML='';
  for (key in options) {
    optionsHTML+='<option value="'+options[key]+'"'+(Game.prefs[prefname]==options[key]?'selected="selected"':'')+'>'+key+'</options>';
  };
  return '<select id="'+prefname+'Select" oninput="'+callback+'">'+optionsHTML+'</select>';
};

replaceFormatButtonWithDropdown=function() {
  if (Game.onMenu=='prefs') {
    /* replace button with dropdown */
    var callback='BeautifyAll();Game.RefreshStore();Game.upgradesToRebuild=1;';
    var str=Game.WriteSelect('format', numberSelectorDict, callback);
    var div = document.createElement('div');
    div.innerHTML = str;
    var oldbutton=l('formatButton');
    oldbutton.parentElement.replaceChild(div.firstChild, oldbutton);
  };
};


if (Game.UpdateMenu.cachedFunc) {
  var cached=Game.UpdateMenu.cachedFunc;
  Game.UpdateMenu=function() {
    cached.apply(this, arguments);
    replaceFormatButtonWithDropdown();
    };
  Game.UpdateMenu.cachedFunc=cached;
  delete cached;
} else {
  Game.UpdateMenu=(function()
    {
      var cached=Game.UpdateMenu;
      var usurper=function() {
        cached.apply(this, arguments);
        replaceFormatButtonWithDropdown();
      };
      usurper.cachedFunc=cached;
      return usurper;
    })();
};

Beautify = function(value,floats)
{
  var negative=(value<0);
  var decimal='';
  if (value<1000000 && floats>0 && Math.floor(value.toFixed(floats))!=value.toFixed(floats)) decimal='.'+(value.toFixed(floats).toString()).split('.')[1];
  value=Math.floor(Math.abs(value));
  var formatter=numberFormatters[Game.prefs.format];
  var output=formatter(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
  return negative?'-'+output:output+decimal;
};
