function lotfi(){	
	function newset(setobject){			
			this.name=setobject.name;					
			this.number_of_terms=(setobject.number_of_terms==undefined?0:setobject.number_of_terms);	
			this.range_from=(setobject.range.match(" to ")?(isNaN(parseFloat(setobject.range.split(" to ")[0]))?logerror({type:3,setname:this.name}):parseFloat(setobject.range.split(" to ")[0])):logerror({type:4,setname:this.name}));
			this.range_to=(setobject.range.match(" to ")?(isNaN(parseFloat(setobject.range.split(" to ")[1]))?logerror({type:3,setname:this.name}):parseFloat(setobject.range.split(" to ")[1])):logerror({type:4,setname:this.name}));
			//fuzzy set name validation, cannot be same as lotfi functions.
			if(this.name=='lotfi'||this.name=='newset'){
				logerror({type:1,setname:this.name});
				return
			}			
			//fuzzy variables declaration
			for(var i=0;i<this.number_of_terms;i++){
				eval('var temp=setobject.term'+i+'.name;');
				eval('this.'+temp+'=setobject.term'+i+';');				
			}		
			//fuzzy variables declaration till here
			
			//fuzzy set name validation till here			
			eval('lotfi.'+this.name+'=this;'); //declare the fuzzy variable
	}
	function destroyset(setname){
		eval('if(lotfi.'+setname+'==undefined){logerror({type:2,setname:\''+setname+'\'});}else{lotfi.'+setname+'=null;}');
	}
	function triangle(){}
		//error handling
	function logerror(error){
		if(error.type){
		switch (error.type) {
				case 1: alert('Please use other name, this word '+(error.setname?'\''+error.setname+'\'':'')+' is reserved');break			
				case 2: alert('This variable name '+(error.setname?'\''+error.setname+'\'':'')+' cannot be found');break
				case 3: alert('The range input for this fuzzy set '+(error.setname?'\''+error.setname+'\'':'')+' is incorrect. The correct format is n to m where n and m represents start and stop points of the range respectively.');break
				case 4: alert('The range input for this fuzzy set '+(error.setname?'\''+error.setname+'\'':'')+' is not a number');break;
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
lotfi.newset({
	name:'temperature',	
	number_of_terms:3,
	range:'0 to 100',
	step:1,
	term0:{
		name:'low',
		mf:'0.3/0,0.7/1,1/2,0.7/3,0.3,4',		
		},
	term1:{
		name:'medium',
		mf:'triangle(4,6,8)',
		},
	term2:{
		name:'high',
		mf:'gauss(4,2,3)',
		}
});
alert(lotfi.temperature.range_to);
//unit tests till heres
