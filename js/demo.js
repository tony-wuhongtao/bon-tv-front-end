$(window).bind('load', demoinit);
function demoinit(){
	if(isCanvasSupported()){
		$('#body-wrapper').after('<div id="palette"> \
	<div id="paletteHeader"> \
		<div id="colorResult">#0199FE</div> \
		<a href="javascript:void(0);" class="closeButton"></a> \
		<a href="javascript:void(0);" class="openButton"></a> \
	</div> \
	<div id="paletteBody"> \
		<div id="colorPicker"></div> \
		<canvas id="colorPalette" width="150" height="150"></canvas> \
	</div> \
	<div id="ThemeSwitch"> \
		<a class="themeBtn light " href="javascript:void(0)" onclick="changeTheme(\'light\')">LIGHT</a> \
		<a class="themeBtn dark selected" href="javascript:void(0)" onclick="changeTheme(\'dark\')">DARK</a> \
	</div> \
</div>');
		DrawPicker('colorPalette', 'colorResult');
	}
	
	if(!mobileDevice){
		$('#palette').show();
	}
}

// DEMO FUNCTIONS
var activeTheme = '/dark';
var themeVars = 	{'@ColorFirst':'#e1523d',
				'@ColorSecond':'#FFFFFF',
				'@BackgroundColor':'#000000',
				'@ThemePrefix': "'"+activeTheme+"'",
				'@ImagesDir': '',
				'@LineColor':'#333333',
				'@OutLine':'#000000',
				'@TextColor':'#cccccc',
				'@PasifButtonBg': '#232323'}
function changeTheme(tn){
	 $('#ThemeSwitch a').removeClass('selected');
	 $('#ThemeSwitch .'+tn).addClass('selected');
	 activeTheme = tn;
	 if(tn=='dark'){
		themeVars['@ColorSecond'] = 	'#FFFFFF';
		themeVars['@BackgroundColor'] =	'#000000';
		themeVars['@ThemePrefix'] = 	"'"+activeTheme+"'";
		themeVars['@ImagesDir'] = 		"'"+'/images/'+"'";
		themeVars['@LineColor'] = 		'#333333';
		themeVars['@OutLine'] = 		'#000000';
		themeVars['@TextColor'] = 		'#cccccc';
		themeVars['@PasifButtonBg'] = 	'#232323';
		less.modifyVars(themeVars);
	}else{
		themeVars['@ColorSecond'] = 	'#000000';
		themeVars['@BackgroundColor'] =	'#ffffff';
		themeVars['@ThemePrefix'] = 	"'"+activeTheme+"'";
		themeVars['@ImagesDir'] = 		"'"+'/images/'+"'";
		themeVars['@LineColor'] = 		'#999999';
		themeVars['@OutLine'] = 		'#000000';
		themeVars['@TextColor'] = 		'#333333';
		themeVars['@PasifButtonBg'] = 	'#555555';
		less.modifyVars(themeVars);
	}
}
  
function DrawPicker(pickerID){
    var ctx = document.getElementById(pickerID).getContext('2d');
    var img = new Image();
    img.src = 'images/280.png';
    img.onload = function(){
		ctx.drawImage(img,0,0,150,150);
	}
	
	$('#paletteHeader .closeButton').click(function(){
		$('#paletteHeader .openButton').show();
		$('#paletteHeader .closeButton').hide();
		$('#paletteBody, #ThemeSwitch, #colorResult').hide();
	});
	$('#paletteHeader .openButton').click(function(){
		$('#paletteHeader .openButton').hide();
		$('#paletteHeader .closeButton').show();
		$('#paletteBody, #ThemeSwitch, #colorResult').show();
	});
	  
	$('#'+pickerID+', #colorPicker').bind('selectstart dragstart', rFalse);
	$('#'+pickerID+', #colorPicker').bind('mousedown', function(){
		$('#'+pickerID).bind('mousemove', {pickerID:pickerID},GetColor);
	 });
	 
	 $('#'+pickerID+', #colorPicker').bind('mouseup', function(){
		$('#'+pickerID).unbind('mousemove', GetColor);
		themeVars['@ColorFirst'] =  $('#colorResult').html();
		themeVars['@ThemePrefix'] =  "'"+activeTheme+"'";
		themeVars['@ImagesDir'] = 	"'"+'/images/'+"'";
		less.modifyVars(themeVars);
	  });
}
function GetColor(event){
        var x = event.pageX - $(event.currentTarget).parent().offset().left;
        var y = event.pageY - $(event.currentTarget).parent().offset().top;
        var ctx = document.getElementById(event.data.pickerID).getContext('2d');
        var imgd = ctx.getImageData(x, y, 1, 1);
        var data = imgd.data;
		$('#colorPicker').css({left:(x-5)+'px', top:(y-5)+'px'});
        var hexString = RGBtoHex(data[0],data[1],data[2]);
        $('#colorResult').html("#" + hexString);
        $('#colorResult').css('background-color', "#" + hexString);
}
function RGBtoHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(N) {
      if (N==null) return "00";
      N=parseInt(N); if (N==0 || isNaN(N)) return "00";
      N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
      return "0123456789ABCDEF".charAt((N-N%16)/16)
           + "0123456789ABCDEF".charAt(N%16);
}