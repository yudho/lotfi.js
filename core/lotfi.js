    /*This program is called lotfi.js which is a javascript tool for fuzzy logic
    Copyright (C) 2012  Yudho Ahmad Diponegoro

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	Please contact me at yudh0002@e.ntu.edu.sg or +65 8309 4398 for any question
	*/
function lotfi(){	
	function newset(setobject){	
		var set=new Object();
		set.name=setobject.name;					
		set.number_of_terms=(setobject.terms.members==undefined?0:setobject.terms.members.split(',').length);	
		set.range_from=(setobject.range.match(" to ")?(isNaN(parseFloat(setobject.range.split(" to ")[0]))?logerror({type:3,setname:set.name}):parseFloat(setobject.range.split(" to ")[0])):logerror({type:4,setname:set.name}));
		set.range_to=(setobject.range.match(" to ")?(isNaN(parseFloat(setobject.range.split(" to ")[1]))?logerror({type:3,setname:set.name}):parseFloat(setobject.range.split(" to ")[1])):logerror({type:4,setname:set.name}));
		set.step=(setobject.step==undefined?10:setobject.step);	
		set.terms_array=new Array();
		//fuzzy set name validation, cannot be same as lotfi functions.
		switch (set.name){
			case 'lotfi':;
			case 'newset':;
			case 'destroyset':logerror({type:1,setname:set.name});break;
			default:break;
		}		
		//fuzzy set name validation till here	
		//fuzzy terms declaration			
		for(var i=0;i<set.number_of_terms;i++){
			var termname=setobject.terms.members.split(',')[i];
			eval('set.'+termname+'=setobject.'+termname+';');
			eval('if(set.'+termname+'==null)logerror({type:5,termname:\''+termname+'\'});');
			eval('set.terms_array['+i+']=set.'+termname+';');//changing one will change both				
			if(set.terms_array[i].mf==null)logerror({type:6,termname:termname}); //if mf is not found
			set.terms_array[i].mf_calculation=new Array();
			for(var o=0;o<=Math.floor((Math.abs(set.range_to-set.range_from))/set.step);o++){ //initialize the values with 0
				set.terms_array[i].mf_calculation[o]=new Object();
				set.terms_array[i].mf_calculation[o].x=set.range_from+set.step*o;
				set.terms_array[i].mf_calculation[o].y=0;
			}
			//need modif
			for(o=0;o<=number_of_defined_points;o++){
				if((x>=set.range_from)&&(x<=set.range_to)){
					set.terms_array[i].mf_calculation[Math.round((x-set.range_from)/set.step)].y=(!isNaN(parseFloat(set.terms_array[i].temporary[j].split('/')[0]))?set.terms_array[i].temporary[j].split('/')[0]:logerror({type:6,termname:termname}));
					if(set.terms_array[i].mf_calculation[Math.round((x-set.range_from)/set.step)].y>1)set.terms_array[i].mf_calculation[Math.ceil((Math.ceil(x)-set.range_from)*set.step)].y=1; //probability is greater than 1? assign 1
					set.terms_array[i].mf_calculation[Math.round((x-set.range_from)/set.step)].x=x;						
				}else{logerror({type:8,termname:termname});}
			}
		}		
			//fuzzy terms declaration till here					
			eval('lotfi.'+set.name+'=set;'); //declare the fuzzy variable			
	}
	function destroyset(setname){
		eval('if(lotfi.'+setname+'==undefined){logerror({type:2,setname:\''+setname+'\'});}else{lotfi.'+setname+'=null;}');
	}
	//not function
	function not(fuzzyterm){
		var newterm=new Object();
		newterm.mf_calculation=new Array();		
		for(var i=0;i<fuzzyterm.mf_calculation.length;i++){
			newterm.mf_calculation[i]=new Object();
			newterm.mf_calculation[i].y=1-fuzzyterm.mf_calculation[i].y;
			newterm.mf_calculation[i].x=fuzzyterm.mf_calculation[i].x;
		}		
		return newterm;		
	}	
	//not function tillhere
	//min function
	function min(fuzzyterm1,fuzzyterm2){
		var newterm=new Object();
		newterm.mf_calculation=new Array();				
		if(fuzzyterm1.mf_calculation.length!=fuzzyterm2.mf_calculation.length){logerror({type:9});}
		for(var i=0;i<(fuzzyterm1.mf_calculation.length>fuzzyterm2.mf_calculation.length?fuzzyterm1.mf_calculation.length:fuzzyterm2.mf_calculation.length);i++){
			newterm.mf_calculation[i]=new Object();
			if(fuzzyterm1.mf_calculation[i]==undefined||fuzzyterm1.mf_calculation[i]==null){
				newterm.mf_calculation[i].y=0;
				newterm.mf_calculation[i].x=fuzzyterm2.mf_calculation[i].x;
			}else{
				if(fuzzyterm2.mf_calculation[i]==undefined||fuzzyterm2.mf_calculation[i]==null){
					newterm.mf_calculation[i].y=0;
					newterm.mf_calculation[i].x=fuzzyterm1.mf_calculation[i].x;
				}else{
				newterm.mf_calculation[i].y=Math.min(fuzzyterm1.mf_calculation[i].y,fuzzyterm2.mf_calculation[i].y);
				newterm.mf_calculation[i].x=fuzzyterm1.mf_calculation[i].x;
				}
			}			
		}		
		return newterm;	
	}
	//min function till here
	//max function
	function max(fuzzyterm1,fuzzyterm2){
		var newterm=new Object();
		newterm.mf_calculation=new Array();		
		if(fuzzyterm1.mf_calculation.length!=fuzzyterm2.mf_calculation.length){logerror({type:9});}
		for(var i=0;i<(fuzzyterm1.mf_calculation.length>fuzzyterm2.mf_calculation.length?fuzzyterm1.mf_calculation.length:fuzzyterm2.mf_calculation.length);i++){
			newterm.mf_calculation[i]=new Object();
			if(fuzzyterm1.mf_calculation[i]==undefined||fuzzyterm1.mf_calculation[i]==null){
				newterm.mf_calculation[i].y=fuzzyterm2.mf_calculation[i].y;
				newterm.mf_calculation[i].x=fuzzyterm2.mf_calculation[i].x;
			}else{
				if(fuzzyterm2.mf_calculation[i]==undefined||fuzzyterm2.mf_calculation[i]==null){
					newterm.mf_calculation[i].y=fuzzyterm1.mf_calculation[i].y;
					newterm.mf_calculation[i].x=fuzzyterm1.mf_calculation[i].x;
				}else{
				newterm.mf_calculation[i].y=Math.max(fuzzyterm1.mf_calculation[i].y,fuzzyterm2.mf_calculation[i].y);
				newterm.mf_calculation[i].x=fuzzyterm1.mf_calculation[i].x;
				}
			}			
		}		
		return newterm;		
	}
	//max function till here
	//constructors
	function mf_constructors(){
		function plain(mf_string){			 //mf definition using point specification	
			var mf_object=new Object();
			mf_object.temporary=mf_string.split(',');
			if(mf_object.temporary.length<2)logerror({type:6,termname:termname});					
			var number_of_defined_points=set.mf_string.split(',').length;						
			for(var j=0;j<number_of_defined_points;j++){						
				if(mf_object.temporary[j].split('/').length>2)logerror({type:6,termname:termname});
					var x;
					if(!isNaN(parseFloat(mf_object.temporary[j].split('/')[1]))){
						x=mf_object.temporary[j].split('/')[1];
					}else{
						x=logerror({type:6,termname:termname});
					}	
				}					
			}
			mf_object.temporary=null; //garbage clearance			
		}
		this.plain=plain;
	}
	function triangle(){}
	//constructors till here
	//error handling	
	function logerror(error){
		if(error.type){
		var errorstring='';
		switch (error.type) {
				case 1: errorstring='Please use other name, this word '+(error.setname?'\''+error.setname+'\'':'')+' is reserved';break;			
				case 2: errorstring='This variable name '+(error.setname?'\''+error.setname+'\'':'')+' cannot be found';break;
				case 3: errorstring='The range input for this fuzzy set '+(error.setname?'\''+error.setname+'\'':'')+' is incorrect. The correct format is n to m where n and m represents start and stop points of the range respectively.';break;
				case 4: errorstring='The range input for this fuzzy set '+(error.setname?'\''+error.setname+'\'':'')+' is not a number';break;				
				case 5: errorstring='The definition for fuzzy term '+(error.termname?'\''+error.termname+'\'':'')+' is not found';break;
				case 6: errorstring='The membership function for this fuzzy term '+(error.termname?'\''+error.termname+'\'':'')+' is invalid';break;
				case 7: errorstring='The step size for fuzzy set '+(error.setname?'\''+error.setname+'\'':'')+' is not found or invalid';break;
				case 8: errorstring='The point/s defined for '+(error.termname?'\''+error.termname+'\'':'')+' term are beyond the fuzzy set range';break;
				case 9: errorstring='There is dimension mismatch in the min operation between 2 fuzzy terms';break;
				default: errorstring='error';					
			}			
			alert(errorstring); //temporary. It should not be alerting, instead just keep the error log for debugging purpose
		}
	}
	//error handling till here
	//methods registration
	this.newset=newset;
	this.destroyset=destroyset;
	this.not=not;
	this.min=min;
	this.max=max;
	this.mfconstructor=mfconstructor;
	//methods registration till here
}
//unit test
var lotfi=new lotfi();
lotfi.newset({
	name:'temperature',		
	range:'0 to 10',
	step:1,
	terms:{
		members:'cold,warm',
		},
	cold:{		
		mf:lotfi.mf_constructor.plain('0.4/1,0.7/2,1/3,0.7/4,0.4/5'),		
		},
	warm:{
		mf:lotfi.mf_constructor.plain('0.3/1,0.2/2,0.1/3,0.9/4,0.8/5'),	
		},
});
lotfi.newset({
	name:'speed',		
	range:'0 to 10',
	step:1,
	terms:{
		members:'slow,medium',
		},
	slow:{		
		mf:lotfi.mf_constructor.plain('0.4/1,0.7/2,1/3,0.7/4,0.4/5'),		
		},
	medium:{
		mf:lotfi.mf_constructor.plain('0.3/1,0/2,0.1/3,0.9/4,0.8/10'),	
		},
});

for(var p=0;p<lotfi.speed.medium.mf_calculation.length;p++){
	alert(lotfi.max(lotfi.not(lotfi.temperature.cold),lotfi.speed.medium).mf_calculation[p].x+'||'+lotfi.max(lotfi.not(lotfi.temperature.cold),lotfi.speed.medium).mf_calculation[p].y);
}
//unit test till here :)
