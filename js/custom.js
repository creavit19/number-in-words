function numberInWords(a, genus, scale){
	/*
	Функция возвращает строку - число прописью из аргумента a.
	По умолчанию возвращается строка, обозначающая,
	количество единиц мужского рода.
	genus - необязательный аргумент, если указать false,
	то строка будет обозначать количество единиц женского рода.
	scale - необязательный аргумент, по умолчанию false,
	обозначает выбор шкалы для больших чисел, по умолчанию короткая шкала:
	https://ru.wikipedia.org/wiki/Системы_наименования_чисел	
	*/
	if(a == 0) return 'ноль';
	var arr = [];
	if(genus === undefined) genus = true;
	if(a <= 2){
		if(genus){arr = ['один', 'два']}else{arr = ['одна', 'две']}
			return arr[a - 1];
	}
	if(a <= 19){
		arr = ['три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять','одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
		return arr[a - 3];
	}
	var highOrder = 0;
	var lowOrder = 0;
	function ifZero(a, genus, scale){
		return (a == 0 ? '' : ' ' + numberInWords(a, genus, scale));
	}
	if(a <= 99){
		arr = ['двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
		lowOrder = a % 10;
		highOrder = (a - lowOrder)/10;
		return arr[highOrder - 2] + ifZero(lowOrder, genus, scale);
	}
	if(a <= 999){
		arr = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
		lowOrder = a % 100;
		highOrder = (a - lowOrder)/100;
		return arr[highOrder - 1] + ifZero(lowOrder, genus, scale);
	}
	if(scale === undefined) scale = false;
	var overflow = false;
	if(!scale){
		if(a <= 10 ** 63){
			arr = ['тысяч', 'миллион', 'миллиард', 'биллион', 'биллиард', 'триллион', 'триллиард', 'квадриллион', 'квадриллиард', 'квинтиллион', 'квинтиллиард', 'секстиллион', 'секстиллиард', 'септиллион', 'септиллиард', 'октиллион', 'октиллиард', 'нониллион', 'нониллиард', 'дециллион', 'дециллиард'];
		}else{overflow = true;}
	}else{
		if(a <= 10 ** 123){
			arr = ['тысяч', 'миллион', 'биллион', 'триллион', 'квадриллион', 'квинтиллион', 'секстиллион', 'септиллион', 'октиллион', 'нониллион', 'дециллион', 'ундециллион', 'дуодециллион', 'тредециллион', 'кваттуордециллион', 'квиндециллион', 'сексдециллион', 'септендециллион', 'октодециллион', 'новемдециллион', 'вигинтиллион', 'унвигинтиллион', 'дуовигинтиллион', 'тревигинтиллион', 'кваттуорвигинтиллион', 'квинвигинтиллион', 'сексвигинтиллион', 'септенвигинтиллион', 'октовигинтиллион', 'новемвигинтиллион', 'тригинтиллион', 'унтригинтиллион', 'дуотригинтиллион', 'третригинтиллион', 'кваттуортригинтиллион', 'квинтригинтиллион', 'секстригинтиллион', 'септентригинтиллион', 'октотригинтиллион', 'новемтригинтиллион', 'квадрагинтиллион'];
		}else{overflow = true;}
	}
	if(overflow) return 'Overflow';
	function ending(a, n){
		var lowOrderDigit = a % 100;
		if(lowOrderDigit > 19) lowOrderDigit %= 10;
		if(n > 0){
			if(lowOrderDigit == 1){
				return '';
			}else if(lowOrderDigit >= 2 && lowOrderDigit <= 4){
				return 'а';
			}else{
				return 'ов';
			}
		}else{
			if(lowOrderDigit == 1){
				return 'а';
			}else if(lowOrderDigit >= 2 && lowOrderDigit <= 4){
				return 'и';
			}else{
				return '';
			}
		}
	}
	var n = 0;
	while(a > ((10 ** (3 * (n + 2))) - 1)) n++;
	var degree = (n + 1) * 3;
	lowOrder = a % (10 ** degree);
	highOrder = (a - lowOrder)/(10 ** degree);
	return numberInWords(highOrder, (n > 0 ? true : false)) + ' ' + arr[n] + ending(highOrder, n) + ifZero(lowOrder, genus, scale);
}
//-- end of function numberInWords ----------------------------

function toUpFirst(str){
	/* Возвращает строку с большой буквы */
	return str[0].toUpperCase() + str.slice(1);
}
//-- end of function toUpFirst ---------------------------------

var out = document.getElementById('out');
var btn = document.getElementById('btn');
var wasError = false;
btn.onclick=function(){
	var ante = parseInt(document.getElementById('ante').value);
	if(isNaN(ante)){
		out.innerText = 'Вы ввели не верное значение!';
		out.style.color = 'red';
		wasError = true;
		return;
	}
	if(wasError){
		out.style.color = 'black';
		wasError = false;
	}
	var minus = '';
	if(ante < 0){
			minus = 'минус ';
			ante *= -1;
	}
	out.innerText = toUpFirst(minus + numberInWords(ante)) + '.';
}
