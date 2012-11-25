function lotfi(){	
	function newset(setobject){			
			this.name=setobject.name;
			this.type=(setobject.type=='continuous'?setobject.type:'discrete');			
			this.number_of_var=setobject.number_of_var;
			for(var i=0;i<this.number_of_var;i++){
				eval('var temp=setobject.var'+i+'.name;');
				eval('this.'+temp+'=setobject.var'+i+';');				
			}
			
			//fuzzy set name validation, cannot be same as lotfi functions.
			if(this.name=='lotfi'||this.name=='newset'){
				logerror({type:1,variable_name:this.name});
				return
			}
			//fuzzy set name validation till here			
			eval('lotfi.'+this.name+'=this;'); //declare the fuzzy variable	
			
			
	}
	function destroyset(setname){
		eval('if(lotfi.'+setname+'==undefined){logerror({type:2,variable_name:\''+setname+'\'});}else{lotfi.'+setname+'=null;}');
	}
	function fuzzify(){}
	function defuzzify(){}
	function end(){}	
	//error handling
	function logerror(error){
		if(error.type){
			switch (error.type) {
				case 1: alert('Please use other name, this word '+(error.variable_name?'\''+error.variable_name+'\'':'')+' is reserved');break			
				case 2: alert('This variable name '+(error.variable_name?'\''+error.variable_name+'\'':'')+' cannot be found');break
				default: alert('error');		
			}
		}
	}
	//error handling till here
	//methods registration
	this.newset=newset;
	this.destroyset=destroyset;
	//methods registration till here
}

//unit tests
var lotfi=new lotfi();
lotfi.newset({name:'temperature',type:'discrete',number_of_var:3,var0:{name:'low'},var1:{name:'medium'},var2:{name:'high'}});
alert(lotfi.temperature.low);
//unit tests till here