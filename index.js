function _close() {
	window.close();
}




var object_width = {} 

function process() {
	document.getElementById("btnProcess").disabled = true;

	let valor = document.getElementById('floatingTextarea').value;

 
	var lines = valor.split(/\n/).length;
	document.getElementById('pRows').innerText = (lines -1) + ' fila(s)' ;

	// valor = valor.replace(/(\t)/gi, '^|^'); 

	// const temp = valor.split( '^|^' ).length   
	// console.log("VALUES:\n",  temp);
	let ouput = '';
	let arr = [];
	let acum = "";
	const arrLines = valor.split(/\n/)  
	for (let i = 0; i < arrLines.length; i++) {
			const row = arrLines[i];
			const arrColumns = row.split(/\t/)  
			for (let i = 0; i < arrColumns.length; i++) {
				const element = arrColumns[i];
				width_save(i, element, object_width )
			}
	}
	console.log("anchjos:", object_width  );
	
	let filas = 0;
	for (let i = 0; i < arrLines.length; i++) {
		const row = arrLines[i];
		const arrColumns = row.split(/\t/)  
		
		
		let columns = '';
		for (let i = 0; i < arrColumns.length; i++) {
			let element = arrColumns[i].trim() ;

			// convert 00,00 to 00.00 
			element = comaXpunto_reemplazar(element)
		// 	comaXpunto_reemplazar(element)

			let gutterSpace = 3;
			if( (arrColumns.length - 1 ) === i ) {
				gutterSpace = 0 
			}

			columns += element.padEnd( object_width['c'+ i] + gutterSpace ); 
		}
		
		if ( filas < arrLines.length - 1 ) {
			ouput += columns.trim() +'\n';
		} else {
			ouput += columns.trim();
		}

		filas += 1;
	}
	document.getElementById('floatingTextarea').value = ouput;
}

 
const isDigit = (character) => {
	const DIGIT_EXPRESSION = /^\d$/;
    return character && DIGIT_EXPRESSION.test(character);
};


function comaXpunto_reemplazar (value) {

	let pos = value.indexOf(',');
	if( pos > -1 ) {
		const izq = value.charAt(pos-1);
		const der = value.charAt(pos+1);

		// console.log( 'CAMPO:', value, isDigit(izq), isDigit(der)  );

		if( isDigit(izq) && isDigit(der) ){
			//console.log( 'CAMPO:', value, pos  );  
			value = value.replace(",", ".");
		}
	}
	return value;
}



function width_save(cn, value, object_width ) {
	value = value.trim() ;
	if( object_width['c'+ cn] === undefined ){
		object_width['c'+ cn] =  value.length ;
	}
	if(  value.length > object_width['c'+ cn] ) {
		object_width['c'+ cn] = value.length 
	}
} 





function openFunctionFile() {
	document.getElementById("btnProcess").disabled = false;
	document.getElementById('pRows').innerText = 0 + ' fila(s) por procesar ' ;
	document.getElementById('file').click();
}

function _save() {
	const link = document.createElement("a");
	let content = document.getElementById('floatingTextarea').value;

	content = content.replace(/(\r\n|\r|\n)/g, String.fromCharCode(13) + String.fromCharCode(10));

	const file = new Blob([content], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = document.getElementById('pFileName').innerText;
	link.click();
	URL.revokeObjectURL(link.href);
}

document.getElementById('btnClose').addEventListener('click', _close);
document.getElementById('btnProcess').addEventListener('click', process);
document.getElementById('loadFileXml').addEventListener('click', openFunctionFile);
document.getElementById('btnSave').addEventListener('click', _save);




var myFile = document.getElementById("file");
myFile.addEventListener('change', function () {
	var fileReader = new FileReader();
	fileReader.onload = function () {
		//alert(   fileReader.result  );
		document.getElementById('floatingTextarea').value = fileReader.result;
	}
	fileReader.readAsText(this.files[0]);
	document.getElementById('pFileName').innerText = this.files[0].name;
});


window.onload = function(){
	//document.getElementById('floatingTextarea').value = temporal ;
	document.getElementById('pRows').innerText = 0 + ' fila(s) por procesar ' ;
};


// function process() {
// 	let valor = document.getElementById('floatingTextarea').value;

// 	//starting CR  
// 	valor = valor.replace(/^\s*[\r\n]/gm, ''); 

// 	console.log("D:\n", valor);

// 	//TAB follow SP replace TAB 
// 	//valor = valor.replace(/(\t\s)/gi, '\t');
// 	valor = valor.replace(/(\t\s)/gi, '\t');

// 	var lines = valor.split(/\n/).length;
// 	document.getElementById('pRows').innerText = (lines -1) + ' fila(s)' ;
// 	document.getElementById('floatingTextarea').value = valor;
// }

 
// let temporal = 
// `168N2L000U	CV NO SHOW SOCK- 2 PACK B    	MERMER	6800,00	356,23	168N2L00008900
// 173690053XS	CV "THE PERFECT TEE ""BAT    	MERMER	7300,00	0,00	17369005309100
// 173690053S	CV "THE PERFECT TEE ""BAT    	MERMER	7300,00	0,00	17369005309200
// 173690053M	CV "THE PERFECT TEE ""BAT    	MERMER	7300,00	0,00	17369005309300
// 173690053L	CV "THE PERFECT TEE ""BAT    	MERMER	7300,00	0,00	17369005309400
// 173690201XS	CV "THE PERFECT TEE ""BAT    	MERMER	7300,00	0,00	17369020109100
// 173690201S	CV "THE PERFECT TEE ""BAT    	MERMER	7300,00	0,00	17369020109200
// 173690201M	CV "THE PERFECT TEE ""BAT    	MERMER	7300,00	0,00	17369020109300
// 173690201L	CV "THE PERFECT TEE ""BAT    	MERMER	7300,00	0,00	17369020109400
// 378630845U	0 NO SHOW SOCK- 3 PACK B     	MERMER	8600,00	525,28	37863084508900
// 378630846U	0 NO SHOW SOCK- 3 PACK B     	MERMER	8600,00	525,28	37863084608900
// 378630847U	0 NO SHOW SOCK- 3 PACK B     	MERMER	8600,00	525,28	37863084708900
// 378630848U	0 REGULAR CUT- 3 PACK BA     	MERMER	8600,00	0,00	37863084808900
// 378630849U	0 REGULAR CUT- 3 PACK BA     	MERMER	8600,00	0,00	37863084908900
// 378630850U	0 REGULAR CUT- 3 PACK BA     	MERMER	8600,00	0,00	37863085008900
// 378630976U	0 NO SHOW- 2 PACK POSTER     	MERMER	6800,00	523,39	37863097608900
// 378633401U	0 NO SHOW SOCK- 2 PACK B     	MERMER	6800,00	732,30	37863340108900
// 378633402U	0 NO SHOW SOCK- 2 PACK B     	MERMER	6800,00	732,30	37863340208900
// 378633403U	0 NO SHOW SOCK- 2 PACK B     	MERMER	6800,00	732,30	37863340308900
// 391850006XS	0 THE PERFECT TEE WHITE      	MERMER	8200,00	379,44	39185000609100
// 391850006S	0 THE PERFECT TEE WHITE      	MERMER	8200,00	379,44	39185000609200
// 391850006M	0 THE PERFECT TEE WHITE      	MERMER	8200,00	379,44	39185000609300
// 391850006L	0 THE PERFECT TEE WHITE      	MERMER	8200,00	379,44	39185000609400
// 391850008XS	0 THE PERFECT TEEMINERAL     	MERMER	8200,00	377,84	39185000809100
// 391850008S	0 THE PERFECT TEEMINERAL     	MERMER	8200,00	377,84	39185000809200
// 391850008M	0 THE PERFECT TEEMINERAL     	MERMER	8200,00	377,84	39185000809300
// 391850008L	0 THE PERFECT TEEMINERAL     	MERMER	8200,00	377,84	39185000809400
// 840834008U	 OTIS BEANIE COOL YELLO      	MERMER	9500,00	684,00	84083400808900
// 863123407U	 LOW CUT FOR GIRLS- FLO      	MERMER	8600,00	0,00	86312340708900
// 863123408U	 MID CUT FOR GIRLS- 2 P      	MERMER	6800,00	610,00	86312340808900
// 863123409U	 MID CUT FOR GIRLS- 3 P      	MERMER	8600,00	647,30	86312340908900
// 863123410U	 MID CUT FOR GIRLS- 3 P      	MERMER	8600,00	610,00	86312341008900
// 863123411U	 MID CUT FOR GIRLS- 2 P      	MERMER	6800,00	610,00	86312341108900
// 863133423U	 LOW CUT FOR GIRLS- 2 P      	MERMER	6800,00	557,30	86313342308900
// 863473401U	 REGULAR CUT- 2 PACK Na      	MERMER	6800,00	1063,50	86347340108900
// 863473402U	 REGULAR CUT- 2 PACK Gr      	MERMER	6800,00	1063,50	86347340208900
// 863473403U	 REGULAR CUT- 2 PACK Bl      	MERMER	6800,00	1063,50	86347340308900
// 863473404U	 REGULAR CUT- 2 PACK ST      	MERMER	6800,00	1063,50	86347340408900
// 863473405U	 REGULAR CUT- 2 PACK ST      	MERMER	6800,00	1063,50	86347340508900
// 863473416U	 REGULAR CUT-  2 PACK S      	MERMER	6800,00	757,30	86347341608900
// 863483401U	 LOW CUT- 2 PACK Black       	MERMER	6800,00	747,30	86348340108900
// 863483402U	 LOW CUT- 2 PACK White       	MERMER	6800,00	745,00	86348340208900
// 863483403U	 LOW CUT- 2 PACK Navy        	MERMER	6800,00	747,30	86348340308900
// 863483414U	 LOW CUT- POSTER LOGO-       	MERMER	6800,00	785,00	86348341408900
// 863483415U	 LOW CUT- POSTER LOGO-       	MERMER	6800,00	787,30	86348341508900
// 863483417U	 LOW CUT-  2 PACK POSTE      	MERMER	6800,00	577,30	86348341708900
// 863483418U	 LOW CUT-  2 PACK POSTE      	MERMER	6800,00	787,30	86348341808900
// 863483419U	 LOW CUT-  2 PACK POSTE      	MERMER	6800,00	575,00	86348341908900
// 863493411U	 MID CUT- SPORTS POSTER      	MERMER	6800,00	612,30	86349341108900
// 863493418U	 MID CUT-2 PACK RAINBOW      	MERMER	6800,00	610,00	86349341808900
// 863493419U	 MID CUT-3 PACK LEVI'S       	MERMER	8600,00	610,00	86349341908900
// LB0010208XS	 LB GRAPHIC WHITE            	MERMER	9800,00	0,00	LB001020809100
// LB0010208S	 LB GRAPHIC WHITE            	MERMER	9800,00	0,00	LB001020809200
// LB0010208M	 LB GRAPHIC WHITE            	MERMER	9800,00	0,00	LB001020809300
// LB0010208L	 LB GRAPHIC WHITE            	MERMER	9800,00	0,00	LB001020809400
// LB0010209XS	 LB GRAPHIC WHITE            	MERMER	9800,00	0,00	LB001020909100
// LB0010209S	 LB GRAPHIC WHITE            	MERMER	9800,00	0,00	LB001020909200
// LB0010209M	 LB GRAPHIC WHITE            	MERMER	9800,00	0,00	LB001020909300
// LB0010209L	 LB GRAPHIC WHITE            	MERMER	9800,00	0,00	LB001020909400
// LBF1100183334	 FLIP FLOP PLAIN Red-Bl      	MERMER	8600,00	0,00	LBF11001803334
// LBF1100183536	 FLIP FLOP PLAIN Red-Bl      	MERMER	8600,00	0,00	LBF11001803536
// LBF1100183738	 FLIP FLOP PLAIN Red-Bl      	MERMER	8600,00	0,00	LBF11001803738
// LBF1100183940	 FLIP FLOP PLAIN Red-Bl      	MERMER	8600,00	0,00	LBF11001803940
// LBF1100184142	 FLIP FLOP PLAIN Red-Bl      	MERMER	8600,00	0,00	LBF11001804142
// LBF1100184344	 FLIP FLOP PLAIN Red-Bl      	MERMER	8600,00	0,00	LBF11001804344
// LBF1100233334	 FLIP FLOP CAMO Camo         	MERMER	8600,00	0,00	LBF11002303334
// LBF1100233536	 FLIP FLOP CAMO Camo         	MERMER	8600,00	0,00	LBF11002303536
// LBF1100233738	 FLIP FLOP CAMO Camo         	MERMER	8600,00	0,00	LBF11002303738
// LBF1100233940	 FLIP FLOP CAMO Camo         	MERMER	8600,00	0,00	LBF11002303940
// LBF1100234142	 FLIP FLOP CAMO Camo         	MERMER	8600,00	0,00	LBF11002304142
// LBF1100234344	 FLIP FLOP CAMO Camo         	MERMER	8600,00	0,00	LBF11002304344
// LBF1100303334	 FLIP FLOP BOX TAB Grey      	MERMER	8600,00	0,00	LBF11003003334
// LBF1100303536	 FLIP FLOP BOX TAB Grey      	MERMER	8600,00	0,00	LBF11003003536
// LBF1100303738	 FLIP FLOP BOX TAB Grey      	MERMER	8600,00	0,00	LBF11003003738
// LBF1100303940	 FLIP FLOP BOX TAB Grey      	MERMER	8600,00	0,00	LBF11003003940
// LBF1100304142	 FLIP FLOP BOX TAB Grey      	MERMER	8600,00	0,00	LBF11003004142
// LBF1100304344	 FLIP FLOP BOX TAB Grey      	MERMER	8600,00	0,00	LBF11003004344
// LBF1100313334	 FLIP FLOP BOX TAB Red-      	MERMER	8600,00	0,00	LBF11003103334
// LBF1100313536	 FLIP FLOP BOX TAB Red-      	MERMER	8600,00	0,00	LBF11003103536
// LBF1100313738	 FLIP FLOP BOX TAB Red-      	MERMER	8600,00	0,00	LBF11003103738
// LBF1100313940	 FLIP FLOP BOX TAB Red-      	MERMER	8600,00	0,00	LBF11003103940
// LBF1100314142	 FLIP FLOP BOX TAB Red-      	MERMER	8600,00	0,00	LBF11003104142
// LBF1100314344	 FLIP FLOP BOX TAB Red-      	MERMER	8600,00	0,00	LBF11003104344
// MC0001100U	 MC 1100 0                   	MERMER	6500,00	393,25	MC000110008900
// MC0001600U	 MC 1600 0                   	MERMER	6500,00	572,00	MC000160008900
// MC0002100U	 MC 2100 0                   	MERMER	3700,00	750,75	MC000210008900
// MC0002300U	 MC 2300 0                   	MERMER	3700,00	822,25	MC000230008900
// MC0002500U	 MC 2500 0                   	MERMER	3700,00	893,75	MC000250008900
// RECYCBAG5U	 RECYCLE CARTUCHERA PAT      	MERMER	5300,00	1488,00	RECYCBAG508900
// RECYCBAG6U	 RECYCLEMONEDERO PATCH       	MERMER	3800,00	1033,00	RECYCBAG608900
// RECYCBAG7U	 RECYCLE SOBRE PATCH RE      	MERMER	8200,00	2231,00	RECYCBAG708900
// 314234A374	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,85	314234A3704
// 314234A375	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,85	314234A3705
// 314234A376	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,85	314234A3706
// 314234A376X	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,85	314234A3706X
// 314234A6X4	 SS GRAPHIC TEE BATWING      	MERMER	6600,00	0,00	314234A6X04
// 314234A6X5	 SS GRAPHIC TEE BATWING      	MERMER	6600,00	0,00	314234A6X05
// 314234A6X6	 SS GRAPHIC TEE BATWING      	MERMER	6600,00	0,00	314234A6X06
// 314234A6X6X	 SS GRAPHIC TEE BATWING      	MERMER	6600,00	0,00	314234A6X06X
// 314234P6Q4	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,85	314234P6Q04
// 314234P6Q5	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,85	314234P6Q05
// 314234P6Q6	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,85	314234P6Q06
// 314234P6Q6X	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,85	314234P6Q06X
// 314234W5J4	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,83	314234W5J04
// 314234W5J5	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,83	314234W5J05
// 314234W5J6	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,83	314234W5J06
// 314234W5J6X	 SS GRAPHIC TEE BATWING      	MERMER	8900,00	924,83	314234W5J06X
// 31D484B3I4	 SS HIGH RISE TEE VINTA      	MERMER	9400,00	668,08	31D484B3I04
// 31D484B3I5	 SS HIGH RISE TEE VINTA      	MERMER	9400,00	668,08	31D484B3I05
// 31D484B3I6	 SS HIGH RISE TEE VINTA      	MERMER	9400,00	668,08	31D484B3I06
// 31D484B3I6X	 SS HIGH RISE TEE VINTA      	MERMER	9400,00	668,08	31D484B3I06X
// 31E327R1L4	 SS RIBBED BABY TEE STR      	MERMER	9400,00	944,74	31E327R1L04
// 31E327R1L5	 SS RIBBED BABY TEE STR      	MERMER	9400,00	944,74	31E327R1L05
// 31E327R1L6	 SS RIBBED BABY TEE STR      	MERMER	9400,00	944,74	31E327R1L06
// 31E327R1L6X	 SS RIBBED BABY TEE STR      	MERMER	9400,00	944,74	31E327R1L06X
// 31E383R1L4	 SIDE TIE TEE LEVI'S PO      	MERMER	9400,00	0,00	31E383R1L04
// 31E383R1L5	 SIDE TIE TEE LEVI'S PO      	MERMER	9400,00	0,00	31E383R1L05
// 31E383R1L6	 SIDE TIE TEE LEVI'S PO      	MERMER	9400,00	0,00	31E383R1L06
// 31E383R1L6X	 SIDE TIE TEE LEVI'S PO      	MERMER	9400,00	0,00	31E383R1L06X
// 31E390G2H4	 ROUND HEMM GRAPHIC VIN      	MERMER	8900,00	0,00	31E390G2H04
// 31E390G2H5	 ROUND HEMM GRAPHIC VIN      	MERMER	8900,00	0,00	31E390G2H05
// 31E390G2H6	 ROUND HEMM GRAPHIC VIN      	MERMER	8900,00	0,00	31E390G2H06
// 31E390G2H6X	 ROUND HEMM GRAPHIC VIN      	MERMER	8900,00	0,00	31E390G2H06X
// 31E393R1L4	 MEET & GREET ROLLED CU      	MERMER	6600,00	598,87	31E393R1L04
// 31E393R1L5	 MEET & GREET ROLLED CU      	MERMER	6600,00	598,87	31E393R1L05
// 31E393R1L6	 MEET & GREET ROLLED CU      	MERMER	6600,00	598,87	31E393R1L06
// 31E393R1L6X	 MEET & GREET ROLLED CU      	MERMER	6600,00	598,87	31E393R1L06X
// 31E409B9G4	 SSMODERN GRPAHIC TEE B      	MERMER	6600,00	1013,17	31E409B9G04
// 31E409B9G5	 SSMODERN GRPAHIC TEE B      	MERMER	6600,00	1013,17	31E409B9G05
// 31E409B9G6	 SSMODERN GRPAHIC TEE B      	MERMER	6600,00	1013,17	31E409B9G06
// 31E409B9G6X	 SSMODERN GRPAHIC TEE B      	MERMER	6600,00	1013,17	31E409B9G06X
// 31E418BAS4	 KNIT SKATER DRESS Cool      	MERMER	8600,00	1192,23	31E418BAS04
// 31E418BAS5	 KNIT SKATER DRESS Cool      	MERMER	8600,00	1192,23	31E418BAS05
// 31E418BAS6	 KNIT SKATER DRESS Cool      	MERMER	8600,00	1192,23	31E418BAS06
// 31E418BAS6X	 KNIT SKATER DRESS Cool      	MERMER	8600,00	1192,23	31E418BAS06X
// 31E526G2H4	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	703,29	31E526G2H04
// 31E526G2H5	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	703,29	31E526G2H05
// 31E526G2H6	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	703,29	31E526G2H06
// 31E526G2H6X	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	703,29	31E526G2H06X
// 31E5590014	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	805,99	31E55900104
// 31E5590015	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	805,99	31E55900105
// 31E5590016	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	805,99	31E55900106
// 31E5590016X	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	805,99	31E55900106X
// 31E6090014	 CINCHED SIDE-TIE TEE F      	MERMER	9400,00	0,00	31E60900104
// 31E6090015	 CINCHED SIDE-TIE TEE F      	MERMER	9400,00	0,00	31E60900105
// 31E6090016	 CINCHED SIDE-TIE TEE F      	MERMER	9400,00	0,00	31E60900106
// 31E6090016X	 CINCHED SIDE-TIE TEE F      	MERMER	9400,00	0,00	31E60900106X
// 31E628A6X4	 ELASTIC BUBBLE TEE LEV      	MERMER	8900,00	0,00	31E628A6X04
// 31E628A6X5	 ELASTIC BUBBLE TEE LEV      	MERMER	8900,00	0,00	31E628A6X05
// 31E628A6X6	 ELASTIC BUBBLE TEE LEV      	MERMER	8900,00	0,00	31E628A6X06
// 31E628A6X6X	 ELASTIC BUBBLE TEE LEV      	MERMER	8900,00	0,00	31E628A6X06X
// 414234A6XS	 SS GRAPHIC TEE BATWING      	MERMER	7800,00	0,00	414234A6X09200
// 414234A6XM	 SS GRAPHIC TEE BATWING      	MERMER	7800,00	0,00	414234A6X09300
// 414234A6XL	 SS GRAPHIC TEE BATWING      	MERMER	7800,00	0,00	414234A6X09400
// 41E393R1LS	 MEET & GREET ROLLED CU      	MERMER	7800,00	654,23	41E393R1L09200
// 41E393R1LM	 MEET & GREET ROLLED CU      	MERMER	7800,00	654,23	41E393R1L09300
// 41E393R1LL	 MEET & GREET ROLLED CU      	MERMER	7800,00	654,23	41E393R1L09400
// 41E393R1LXL	 MEET & GREET ROLLED CU      	MERMER	7800,00	654,23	41E393R1L09500
// 41E559C2AS	 SS GRAPHIC TEE LEVI'S       	MERMER	7800,00	0,00	41E559C2A09200
// 41E559C2AM	 SS GRAPHIC TEE LEVI'S       	MERMER	7800,00	0,00	41E559C2A09300
// 41E559C2AL	 SS GRAPHIC TEE LEVI'S       	MERMER	7800,00	0,00	41E559C2A09400
// 8181570014	 SS GRAPHIC  TEE BATWIN      	MERMER	8900,00	614,06	81815700104
// 8181570015	 SS GRAPHIC  TEE BATWIN      	MERMER	8900,00	614,06	81815700105
// 8181570016	 SS GRAPHIC  TEE BATWIN      	MERMER	8900,00	614,06	81815700106
// 8181570017	 SS GRAPHIC  TEE BATWIN      	MERMER	8900,00	614,06	81815700107
// 818157A7O4	 SS GRAPHIC  TEE BATWIN      	MERMER	8900,00	614,09	818157A7O04
// 818157A7O5	 SS GRAPHIC  TEE BATWIN      	MERMER	8900,00	614,09	818157A7O05
// 818157A7O6	 SS GRAPHIC  TEE BATWIN      	MERMER	8900,00	614,09	818157A7O06
// 818157A7O7	 SS GRAPHIC  TEE BATWIN      	MERMER	8900,00	614,09	818157A7O07
// 81E4280014	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	0,00	81E42800104
// 81E4280015	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	0,00	81E42800105
// 81E4280016	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	0,00	81E42800106
// 81E4280017	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	0,00	81E42800107
// 81E505BAN4	 SS STRIPED POCKET Brit      	MERMER	6600,00	0,00	81E505BAN04
// 81E505BAN5	 SS STRIPED POCKET Brit      	MERMER	6600,00	0,00	81E505BAN05
// 81E505BAN6	 SS STRIPED POCKET Brit      	MERMER	6600,00	0,00	81E505BAN06
// 81E505BAN7	 SS STRIPED POCKET Brit      	MERMER	6600,00	0,00	81E505BAN07
// 81E506BAM4	 SS GRAPHICSTRIPED TEE       	MERMER	9400,00	0,00	81E506BAM04
// 81E506BAM5	 SS GRAPHICSTRIPED TEE       	MERMER	9400,00	0,00	81E506BAM05
// 81E506BAM6	 SS GRAPHICSTRIPED TEE       	MERMER	9400,00	0,00	81E506BAM06
// 81E506BAM7	 SS GRAPHICSTRIPED TEE       	MERMER	9400,00	0,00	81E506BAM07
// 81E519BA74	 SS GRAPHIC  TEE BEAR S      	MERMER	8900,00	0,00	81E519BA704
// 81E519BA75	 SS GRAPHIC  TEE BEAR S      	MERMER	8900,00	0,00	81E519BA705
// 81E519BA76	 SS GRAPHIC  TEE BEAR S      	MERMER	8900,00	0,00	81E519BA706
// 81E519BA77	 SS GRAPHIC  TEE BEAR S      	MERMER	8900,00	0,00	81E519BA707
// 81E539F3B4	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	838,35	81E539F3B04
// 81E539F3B5	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	838,35	81E539F3B05
// 81E539F3B6	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	838,35	81E539F3B06
// 81E539F3B7	 SS GRAPHIC TEE LEVI'S       	MERMER	6600,00	838,35	81E539F3B07
// 81E552R0E4	 SS GRAPHIC TEE DAY DRE      	MERMER	6600,00	0,00	81E552R0E04
// 81E552R0E5	 SS GRAPHIC TEE DAY DRE      	MERMER	6600,00	0,00	81E552R0E05
// 81E552R0E6	 SS GRAPHIC TEE DAY DRE      	MERMER	6600,00	0,00	81E552R0E06
// 81E552R0E7	 SS GRAPHIC TEE DAY DRE      	MERMER	6600,00	0,00	81E552R0E07
// 81E558C3B4	 SS GRAPHIC  TEE BATIK       	MERMER	9400,00	995,90	81E558C3B04
// 81E558C3B5	 SS GRAPHIC  TEE BATIK       	MERMER	9400,00	995,90	81E558C3B05
// 81E558C3B6	 SS GRAPHIC  TEE BATIK       	MERMER	9400,00	995,90	81E558C3B06
// 81E558C3B7	 SS GRAPHIC  TEE BATIK       	MERMER	9400,00	995,90	81E558C3B07
// 91A100001S	 BATWING CHEST HIT Whit      	MERMER	8900,00	1406,34	91A10000109200
// 91A100001M	 BATWING CHEST HIT Whit      	MERMER	8900,00	1406,34	91A10000109300
// 91A100001L	 BATWING CHEST HIT Whit      	MERMER	8900,00	1406,34	91A10000109400
// 91A100001XL	 BATWING CHEST HIT Whit      	MERMER	8900,00	1406,34	91A10000109500
// 91A100023S	 BATWING CHEST HIT Blac      	MERMER	8900,00	1406,36	91A10002309200
// 91A100023M	 BATWING CHEST HIT Blac      	MERMER	8900,00	1406,36	91A10002309300
// 91A100023L	 BATWING CHEST HIT Blac      	MERMER	8900,00	1406,36	91A10002309400
// 91A100023XL	 BATWING CHEST HIT Blac      	MERMER	8900,00	1406,36	91A10002309500
// 91A100BA7S	 BATWING CHEST HIT Skyw      	MERMER	8900,00	0,00	91A100BA709200
// 91A100BA7M	 BATWING CHEST HIT Skyw      	MERMER	8900,00	0,00	91A100BA709300
// 91A100BA7L	 BATWING CHEST HIT Skyw      	MERMER	8900,00	0,00	91A100BA709400
// 91C028B4MS	 LS GRAPHIC TEE BATWING      	MERMER	7500,00	0,00	91C028B4M09200
// 91C028B4MM	 LS GRAPHIC TEE BATWING      	MERMER	7500,00	0,00	91C028B4M09300
// 91C028B4ML	 LS GRAPHIC TEE BATWING      	MERMER	7500,00	0,00	91C028B4M09400
// 91E428001S	 SS GRAPHIC TEE LEVI'S       	MERMER	7800,00	0,00	91E42800109200
// 91E428001M	 SS GRAPHIC TEE LEVI'S       	MERMER	7800,00	0,00	91E42800109300
// 91E428001L	 SS GRAPHIC TEE LEVI'S       	MERMER	7800,00	0,00	91E42800109400
// 91E505BANS	 SS STRIPED POCKET Brit      	MERMER	7800,00	0,00	91E505BAN09200
// 91E505BANM	 SS STRIPED POCKET Brit      	MERMER	7800,00	0,00	91E505BAN09300
// 91E505BANL	 SS STRIPED POCKET Brit      	MERMER	7800,00	0,00	91E505BAN09400
// 91E544001S	 SS GRAPHIC TEE LEVI'S       	MERMER	7800,00	0,00	91E54400109200
// 91E544001M	 SS GRAPHIC TEE LEVI'S       	MERMER	7800,00	0,00	91E54400109300
// 91E544001L	 SS GRAPHIC TEE LEVI'S       	MERMER	7800,00	0,00	91E54400109400
// `


