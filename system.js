
/////////////////////////////Begin system class///////////////////////////////////////////////////////////////////////////////////////////////////////////////
class System{
	constructor(index, name, x, y){
		this.index = index; //integer identifying system 
		this.name = name; //name of system for display
		this.planets = []; //list of planets (to be generated)
		this.ships = []; //list of ships (to be generated)
		this.npc = []; //More ship umos, but not enemy ais.  Not yet used.
		this.botbombs = []; //list of bombs used in system
		this.outposts = []; //list of outposts in system.  1st (index 0) item is empty, correlates with dockstate == 0 which is undocked
		this.shops = []; //list of shops in the system.  1st (index 0) item is empty, correlates with dockstate == 0 which is undocked
		this.turrets = []; //list of bare turrets in the system.
		this.explosions = [];
		this.players = [];//list of ship type umos
		this.bling = [];
		this.difficulty = 1; //Scales ship generation attributes
		this.x = x;
		this.y = y;
	}
	draw(viewx,viewy){ //no filter draws everything, sort of obselete
		var i= this.ships.length;
		while  (i>0){
			i=i-1;
			this.ships[i].drawship(viewx,viewy);
			}
		var i= this.planets.length;
		while  (i>0){
			i=i-1;
			this.planets[i].drawplanet(viewx,viewy);
			}
		var i= this.botbombs.length;
		while  (i>0){
			i=i-1;
			this.botbombs[i].drawbomb(viewx,viewy);
			}
		var i= this.players.length;
		while  (i>0){
			i=i-1;
			this.players[i].drawship(viewx,viewy);
			}
		}
	draw2(viewx,viewy){ //linear filtered instead of by distance, maybe computationally cheaper?
		var i=0;
		while  (i<this.ships.length){
			var xtol = canvas.width/2+this.ships[i].s;
			var xdif = this.ships[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.ships[i].s;
				var ydif = this.ships[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.ships[i].drawship(viewx,viewy);	
					}		
				}		
			i++;
			}
		var i=0;
		while  (i<this.players.length){
			var xtol = canvas.width/2+this.players[i].ship.s;
			var xdif = this.players[i].ship.x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.players[i].ship.s;
				var ydif = this.players[i].ship.y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.players[i].ship.drawship(viewx,viewy);	
					}		
				}		
			this.players[i].drawbombs(viewx,viewy)
			i++;
			}
		var i=0;
		while  (i<this.turrets.length){
			var xtol = canvas.width/2+this.turrets[i].pivot.s*4+2000;//*4 is arbitrary safety factor, the pivot is normally smaller than the total turret size including base.  If it's slightly too far it won't render anyways, just waste a tiny bit of calculations.
			var xdif = this.turrets[i].pivot.x-viewx; //+2000 is fudge factor because this affects drawing of the bomb as well.
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.turrets[i].pivot.s*4+2000; //same arbitrary *4 reasoning.
				var ydif = this.turrets[i].pivot.y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.turrets[i].draw(viewx,viewy);	
					}		
				}		
			var xtol2 = canvas.width/2+this.turrets[i].bombs[0].s;//this whole section is unused because the turret draw function also handles the bombs.
			var xdif2 = this.turrets[i].bombs[0].x-viewx;
			if ((xdif2 < xtol2)&&(xdif2 > -1*xtol2)){
				var ytol2 = canvas.height/2+this.turrets[i].bombs[0].s*4; //same arbitrary *4 reasoning.
				var ydif2 = this.turrets[i].bombs[0].y-viewy;
				if ((ydif2 < ytol2)&&(ydif2>-1*ytol2)){
					//this.turrets[i].bombs[0].drawbomb(viewx,viewy);	
					}		
				}	
			i++;
			}	
		var i=0;
		while  (i<this.planets.length){
			var xtol = canvas.width/2+this.planets[i].s;
			var xdif = this.planets[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.planets[i].s;
				var ydif = this.planets[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.planets[i].drawplanet(viewx,viewy);	
					}		
				}		
			i++;
			}	
		var i= 0;
		while  (i<this.botbombs.length){
			var xtol = canvas.width/2+this.botbombs[i].s;
			var xdif = this.botbombs[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.botbombs[i].s;
				var ydif = this.botbombs[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.botbombs[i].drawbomb(viewx,viewy);	
					}		
				}		
			i++;
			}
		var i=0;
		while  (i<this.outposts.length){
			var xtol = canvas.width/2+this.outposts[i].s;
			var xdif = this.outposts[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.outposts[i].s;
				var ydif = this.outposts[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.outposts[i].drawstation(viewx,viewy);	
					}		
				}		
			i++;
			}
		var i=0;
		while  (i<this.explosions.length){
			this.explosions[i].draw(viewx,viewy);//FIlter on explosions wasnt working, turned off for now
			//var xtol = canvas.width;
			//var xdif = this.explosions[i].x-viewx;
			//if ((xdif < xtol)&&(xdif > -1*xtol)){
			//	var ytol = canvas.height;
			//	var ydif = this.explosions[i].y-viewy;
			//	if ((ydif < ytol)&&(ydif>-1*ytol)){
			//		//this.explosions[i].draw(viewx,viewy);
			//		}		
			//	}		
			i++;
			}
		var i=0;
		while  (i<this.bling.length){
			var xtol = canvas.width/2+this.bling[i].s;
			var xdif = this.bling[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.bling[i].s;
				var ydif = this.bling[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.bling[i].draw(viewx,viewy);
					}		
				}		
			i++;
			}
		}
	drawplanetfinder(playerindex,radius){
		var viewx = this.players[playerindex].ship.x;
		var viewy = this.players[playerindex].ship.y;
		context.font = '20px Ariel';
		context.fillStyle = "yellow";
		context.fillText("Navigation Compass Active", canvas.width/2-80, 24);
		var cx = canvas.width/2;
		var cy = canvas.height/2;
		var i=0;
		while(i<this.planets.length){
			var inddir = this.players[playerindex].ship.directionof(this.planets[i]);//indicated direction
			var indc = this.planets[i].c;
			var inddist = this.players[playerindex].ship.distance(this.planets[i]);
			var indsize = (this.planets[i].s/inddist)*radius;//maybe a cpu saving hack vs trig?
			var indx = cx + radius*Math.cos(inddir);
			var indy = cy + radius*Math.sin(inddir);
			var pointerx = cx + (radius+indsize*2)*Math.cos(inddir); 
			var pointery = cy + (radius+indsize*2)*Math.sin(inddir);
			var arcstartx = cx + radius*Math.cos(inddir-indsize/radius);
			var arcstarty = cy + radius*Math.sin(inddir-indsize/radius);
			var arcendx = cx + radius*Math.cos(inddir+indsize/radius);
			var arcendy = cy + radius*Math.sin(inddir+indsize/radius);
			context.beginPath(); 
			context.lineWidth = 2; 
			if (this.players[playerindex].navtarget == i){context.lineWidth = 5; }
			context.strokeStyle = indc;
			context.moveTo(arcendx,arcendy);
			context.lineTo(pointerx,pointery);
			context.lineTo(arcstartx,arcstarty);
			context.arc(cx, cy, radius, inddir-indsize/radius,inddir+indsize/radius, false);
			context.stroke();	
			//context.beginPath();
			//context.arc(cx, cy, radius, inddir-indsize/radius,inddir+indsize/radius, false);
			//context.stroke();
			i++;
			}
		var i=0;
		while(i<this.outposts.length){
			var inddir = this.players[playerindex].ship.directionof(this.outposts[i]);//indicated direction
			var indc = this.outposts[i].c;
			var indc2 = this.outposts[i].c2;
			var inddist = this.players[playerindex].ship.distance(this.outposts[i]);
			var indsize = 5;//maybe a cpu saving hack vs trig?
			var indx = cx + (radius-10)*Math.cos(inddir);
			var indy = cy + (radius-10)*Math.sin(inddir); 
			if ((this.players[playerindex].navtarget == i)&&(this.players[playerindex].navactive == 2)){indsize = 12; }
			context.fillStyle = indc;
			context.fillRect(indx-indsize,indy-indsize,indsize*2,indsize*2);
			context.fillStyle = indc2;
			context.fillRect(indx-indsize+2,indy-indsize+2,indsize*2-4,indsize*2-4);
			i++;
			}
		}
	drawshipfinder(playerindex,radius){
		//var viewx = this.players[playerindex].ship.x;
		//var viewy = this.players[playerindex].ship.y;
		context.font = '20px Ariel';
		context.fillStyle = "red";
		context.fillText("Targeting Compass Active", canvas.width/2-80, 48);
		var cx = canvas.width/2;//center
		var cy = canvas.height/2;
		var i=0;
		while(i<this.ships.length){
			var inddist = this.players[playerindex].ship.distance(this.ships[i]);
			if (inddist<this.players[playerindex].radarrange){
				var inddir = this.players[playerindex].ship.directionof(this.ships[i]);//indicated direction
				var indc = "white";
				if (this.ships[i].ai == "enemy"){indc = "red";}
				else if (this.ships[i].ai == "trader") {indc = "blue";}
				//var inddist = this.players[playerindex].ship.distance(this.ships[i]);
				var indsize = (this.ships[i].s/inddist)*radius;//maybe a cpu saving hack vs trig?
				var indx = cx + radius*Math.cos(inddir);
				var indy = cy + radius*Math.sin(inddir);
				var pointerx = cx + (radius+indsize*2)*Math.cos(inddir); 
				var pointery = cy + (radius+indsize*2)*Math.sin(inddir);
				var arcstartx = cx + radius*Math.cos(inddir-indsize/radius);
				var arcstarty = cy + radius*Math.sin(inddir-indsize/radius);
				var arcendx = cx + radius*Math.cos(inddir+indsize/radius);
				var arcendy = cy + radius*Math.sin(inddir+indsize/radius);
				context.beginPath(); 
				context.lineWidth = 2; 
				if (this.players[playerindex].shiptarget == i){context.lineWidth = 5; }
				context.strokeStyle = indc;
				context.moveTo(arcendx,arcendy);
				context.lineTo(pointerx,pointery);
				context.lineTo(arcstartx,arcstarty);
				context.arc(cx, cy, radius, inddir-indsize/radius,inddir+indsize/radius, false);
				context.stroke();	
				//context.beginPath();
				//context.arc(cx, cy, radius, inddir-indsize/radius,inddir+indsize/radius, false);
				//context.stroke();
				}
			i++;
			}
		var i=0;
		while(i<this.players.length){
			var inddist = this.players[playerindex].ship.distance(this.players[i].ship);
			if ((inddist<this.players[playerindex].radarrange)&&(i!=playerindex)){
				var inddir = this.players[playerindex].ship.directionof(this.ships[i]);//indicated direction
				var indc = this.players[playerindex].ship.c;
				var indc2 = this.players[playerindex].ship.c;
				//var inddist = this.players[playerindex].ship.distance(this.ships[i]);
				var indsize = (this.ships[i].s/inddist)*radius;//maybe a cpu saving hack vs trig?
				var indx = cx + (radius-8)*Math.cos(inddir);
				var indy = cy + (radius-8)*Math.sin(inddir);
				var pointerx = cx + (radius+indsize*2)*Math.cos(inddir); 
				var pointery = cy + (radius+indsize*2)*Math.sin(inddir);
				context.beginPath(); 
				context.lineWidth = 4; 
				context.strokeStyle = indc;
				context.moveTo(indx,indy);
				context.lineTo(pointerx,pointery);
				context.stroke();	
				context.beginPath();
				context.lineWidth = 2; 
				context.strokeStyle = indc2;
				context.moveTo(indx,indy);
				context.lineTo(pointerx,pointery);
				context.stroke();
				}
			i++;
			}
		}
	updateall(){
		var i = 0; //update section////////////////////////////////////////////////////////////
		while (i<this.ships.length){ //update ships
			this.ships[i].updateship(this.planets); //basic ship updates
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////AI section/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
			if (this.ships[i].ai == "enemy"){
				if ( (  this.ships[i].distance(this.planets[this.ships[i].parentid]) > 2000  )&&(this.ships[i].hp>0) ){//If this bot got lost....
					var savedhp = this.ships[i].hp; //remember it's hitpoints... 
					this.ships[i].respawn(this.planets[this.ships[i].parentid]); //Respawn...
					this.ships[i].hp = savedhp; //re-apply hitpoints so it doesn't get a free heal out of it.
					}
				var closestindex = -1;
				var closestdistance = 9999;
				var j=0;
				while(j<this.ships.length){
					var thetargetdistance = this.ships[j].distance(this.ships[i]);	
					if ((thetargetdistance < 600)&&(this.ships[i].c!=this.ships[j].c)){ //Don't do anything if player is far	
						if (thetargetdistance<closestdistance){
							closestindex = j;
							closestdistance=thetargetdistance
							}
						}
					j++;
					}
				if (closestindex>=0){
					this.ships[i].fasttrack(this.ships[closestindex]);
					var theparentdistance = this.ships[i].distance(this.planets[this.ships[i].parentid]);
					if ((Math.random()>0.95) && (this.botbombs[i].timer < 1)){  //Bots fire occasionally, if bomb isn't out
						if ((!this.ships[i].ispointingat(this.planets[this.ships[i].parentid]))||(closestdistance<theparentdistance)){  //Don't shoot if your parent planet is between bot and player (the target)
							this.ships[i].launchbomb(this.botbombs[i], 12, 40); 
							}
						}
					}	
				//if (thetargetdistance < 5000){ //Don't do anything if player is far
				//	var theparentdistance = this.ships[i].distance(this.planets[this.ships[i].parentid]);
				//	this.ships[i].fasttrack(this.players[0].ship); //Bots point towards player
				//	if ((Math.random()>0.95) && (this.botbombs[i].timer < 1)){  //Bots fire occasionally, if bomb isn't out
				//	if ((!this.ships[i].ispointingat(this.planets[this.ships[i].parentid]))||(thetargetdistance<theparentdistance)){  //Don't shoot if your parent planet is between bot and player (the target)
				//			this.ships[i].launchbomb(this.botbombs[i], 12, 80); 
				//			}
				//		}
				//	}
				}
			if (this.ships[i].ai == "trader"){
				var targetplanet = this.ships[i].aitargets[this.ships[i].aistate];
				this.ships[i].seek3(this.planets[targetplanet],20,30,time,1000);
				//money = money + 1;//test
				if (this.ships[i].distance(this.planets[targetplanet])<1500){ 
					this.ships[i].aistate = this.ships[i].aistate+1;
					if (this.ships[i].aistate>this.ships[i].aitargets.length-1){ this.ships[i].aistate = 0;}
					}
				}
			i++;
			}
		var i=this.turrets.length;
		while(i>0){
			i=i-1;
			if (this.turrets[i].pivot.ai == "enemy"){
				var j=0;
				var closestdistance=9999;
				var closestindex = 0;
				while(j<this.players.length){
					var pdist = this.players[j].ship.distance(this.turrets[i].pivot);
					if (pdist<closestdistance){
						closestindex = j;
						closestdistance = pdist;
					}
					j++;
				}
				this.turrets[i].ai3(this.players[closestindex].ship,[]);
				}
			}
		var i=this.turrets.length;
		while(i>0){
			i=i-1;
			if (this.turrets[i].pivot.ai == "friendly"){
				var j=this.ships.length;
				var closest = j;
				var closestdistance = 1000000;
				while(j>0){
					j--;
					if (this.ships[j].ai == "enemy"){
						var tempdistance = this.ships[j].distance(this.turrets[i].pivot);
						if (tempdistance < closestdistance){
							closest=j;
							closestdistance = tempdistance;
						}
					}	
					if (closestdistance < 3000){ //Don't do anything if closest enemy is far
					this.turrets[i].ai3(this.ships[closest],this.players); //friendly turrets point towards closest enemy, shoot if clear	
						}
					}
				}
			}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
/////////////////////end AI section ///////////////////////////////////////////////////////////////////////////////////////
		var i = this.planets.length; //update planets
		while (i>0){
			i=i-1;
			this.planets[i].update1();
			}
		var i = this.botbombs.length; //update bot bombs
		while (i>0){
			i=i-1;
			this.botbombs[i].update1();
			this.botbombs[i].updatebomb();
			}
		var i = this.outposts.length; 
		while (i>0){
			i=i-1;
			this.outposts[i].update1();
			this.outposts[i].d = this.outposts[i].directionof(planets[0]);
			}
		var i = this.turrets.length; 
		while (i>0){
			i=i-1;
			this.turrets[i].update1();
			}		
		var i = this.players.length; 
		while (i>0){
			i=i-1;
			this.players[i].update1(this.planets);
			}					
///update explosions///////////////////////////////////////////////////
		var i=0;
		while(i<this.explosions.length){
			this.explosions[i].update1();
			if (this.explosions[i].timer<=0){
				this.explosions.splice(i,1)
			}
			i++;
		}

		//also check for expired explosions and remove them from this.explosions
		var index = -1;
		var i=0;
		while (i<this.explosions.length){
			if (this.explosions.timer<=0){
				this.explosions.splice(i, 1);
				i=this.explosions.length;
				}
			i++;
			}
////////Bling update///////
		var i=0;
		while (i<this.bling.length){
			this.bling[i].update1();
			if (this.bling[i].t>20000){
				this.bling[i].t=Math.floor(Math.random()*200);//Maybe redundant noise
				this.bling[i].reset(this.planets);  //Maybe I should just remove the bling and let it get randomly repopulated by existing mechanism
				//this.bling[i].setorbit(this.planets[this.bling[i].parentid],) //setorbit(parentplanet, distance, direction, cw){ //cw = -1 or 1
			}
			i++;
		}
	}//end updateall()////////////////////////////////////////////////////////////////////////
	gravitateall(){
		var i = this.planets.length;
		while (i>0){ //Planet on ships and bombs
			i=i-1;
			var j = this.ships.length;
			while (j>0){ //gravitate on each ship
				j=j-1;
				this.planets[i].gravitate(this.ships[j]);
				}
			j = this.botbombs.length;
			while (j>0){ //gravitate on each bot bomb
				j=j-1;
				this.planets[i].gravitate(this.botbombs[j]);
				}				
			j = this.bling.length;
			while (j>0){ //gravitate on each bling
				j=j-1;
				this.planets[i].gravitate(this.bling[j]);
				}
			j = this.players.length;
			while (j>0){ //gravitate on each player
				j=j-1;
				this.planets[i].gravitate(this.players[j].ship);
				var k = this.players[j].blasters.length;
				while (k>0){ //For all blasters to each planet
					k=k-1;
					this.players[j].blasters[k].fall(systems[ps].planets[i]);
					}
				}		
			}
		var i = this.outposts.length;
		while (i>0){
			i=i-1;
			this.planets[0].gravitate(this.outposts[i]);	
			}
		var i = this.planets.length;
		while (i>1){//Planet on planet gravity
			i=i-1;
			this.planets[0].gravitate(this.planets[i]);//sun gravitates all
			if (this.planets[i].parentid>0){ this.planets[this.planets[i].parentid].gravitate(this.planets[i]); } //others only affected by parent
			}
		}
	gravitateothers(umolist){//For gravitating Umos external to the system (playerbombs at the start) not used afaik
		var i = this.planets.length;
		while (i>0){
			i=i-1;
			var j = umolist.length;
			while (j>0){
				j=j-1;
				this.planets[i].gravitate(umolist[j]);
				}
			}	
		}
	dockcheck(dockstate){ 
		var i=0;
		while (i<outposts.length){
			if (ships[0].distance(outposts[i])<160){
				outposts[i].dock(ships[0]);
				dockstate = i;//Maybe add this to system update function, but that implicitly passes dockstate which might not work in other languages.
				}		
			i=i+1;
			}
		}
	collideself(){ //Internal system collisions, ships to planets, ships to bot bombs, planets to bot bombs, turret bombs to ships and planets....
		var i = this.planets.length;
		while (i>0){
			//For all planets+other collisions/////////////////////////////////
			i=i-1;
			var j = this.ships.length;
			while (j>0){ //For all ships to each planet
				j=j-1;
				this.planets[i].circlecollide(this.ships[j]);
				
				}
			var j = this.botbombs.length;
			while (j>0){ //For all bombs to each planet
				j=j-1; 
				this.planets[i].circlecollide(this.botbombs[j]);
				}
			var j = this.turrets.length;
			while(j>0){
				j = j-1;
				var k=0;
				while(k<this.turrets[j].bombs.length){
					this.planets[i].circlecollide(this.turrets[j].bombs[k]); //Only checks 1 bomb, currently they only have 1 bomb.
					k++;
					}
				}
				
			var j = this.bling.length;
			while (j>0){
				j=j-1;
				this.planets[i].circlecollidesafe(this.bling[j]);
			}
			var j = this.players.length;
			while(j>0){
				j=j-1;
				//console.log("itried3");
				this.planets[i].circlecollide(this.players[j].ship);
				var k=this.players[j].blasters.length;
				while(k>0){
					k=k-1;
					//console.log("itried2");
					var h = this.players[j].blasters[k].bombs.length;//usually h=1
					while(h>0){
						h=h-1;
						//console.log("itried1");
						this.planets[i].circlecollide(this.players[j].blasters[k].bombs[h]);
					}
				}
			}
		}
		//Intership collisions///////////////////////////////////////
		var i = 0;//For each ship,
		var j = 0; //to each other ship
		while (i<this.ships.length-1){
			j = i+1; //avoids duplicate executions 
			while (j<this.ships.length){
				this.ships[i].circlecollide2(this.ships[j]);
				j++;
				}
			var j=0;
			while(j<this.players.length){
				this.players[j].ship.circlecollide2(this.ships[i])
				j++;
				}
			i++;
			}
//////////////////turret bombs hitting ships and players///////////////////////////////////////////////
		var i=0;
		while (i<this.turrets.length){
			var j=0;
			while(j<this.ships.length){
				var k=0;
				while(k<this.turrets[i].bombs.length){
					this.turrets[i].bombs[k].bombcollide(this.ships[j])
					k++;
				}
				j++;
				}
				var j=0;
				while(j<this.players.length){
					var k=0;
					while(k<this.turrets[i].bombs.length){
						this.turrets[i].bombs[k].bombcollide(this.players[j].ship);
						k++;
					}
					j++;
					}



			i=i+1; 
			}
		var i=0;
		while (i<this.ships.length){
			if (this.ships[i].hp>0){ //don't check dead ships
				var j=0;
				while (j<this.botbombs.length){  //Bots can kill each other again
					this.botbombs[j].bombcollide(this.ships[i]);
					j++;
					}
				if (this.ships[i].hp<=0){
					this.explosions.push(new Bubblesplosion(this.ships[i].level,0.125,"red",this.ships[i]));
					//this.bling.push(new Bling(this.ships[i].x,this.ships[i].y,this.ships[i].vx,this.ships[i].vy,this.ships[i].level*5));
					console.log(this.explosions.length);
					}
				}
			i++;
			}
		var i=0;
		while(i<this.players.length){
			var j=0;
			while(j<this.botbombs.length){
				this.botbombs[j].bombcollide(this.players[i].ship);
				j++;
			}

			var j = 0;
			while (j<this.players[i].blasters.length){ //global scope, shame.  All this is about the allblasters bombs.
				var k = 0;
				while (k<this.players[i].blasters[j].bombs.length){ //Global scope all over here.
					var m = 0;
					while (m<this.ships.length){
						if (this.ships[m].hp>0){
							this.players[i].blasters[j].bombs[k].bombcollide(this.ships[m]);
							if (this.ships[m].hp<0){ //This is getting repeated allblasters.length times, not sure how best to fix
								if (this.ships[m].ai=="enemy"){
									var getcash = Math.floor(Math.random()*21+10)*this.ships[m].level;
									this.players[i].money = this.players[i].money + getcash;
									this.players[i].gotmoney = [30,getcash];
	//////////////////////////////////explosion stuff///////////////
									var boomstages = Math.floor(4+this.ships[m].level/2);
									this.explosions.push(new Bubblesplosion(boomstages,0.375,"red",this.ships[m]));
									this.bling.push(new Bling(this.ships[m].x,this.ships[m].y,this.ships[m].vx,this.ships[m].vy,this.ships[m].level*5));
									cashsound1.play();
								}else if (this.ships[m].ai=="trader"){
									this.explosions.push(new Bubblesplosion(4,0.375,"red",this.ships[m]));
									this.players[i].money = this.players[i].money - 1000;
									this.players[i].gotmoney = [30, -1000];
									//somebadsound.play();
									}
								}
							}
						m++;
						}	
					k++;
					}
				j++;
				}
			i++;
			}

		var i=0;
		while (i<this.bling.length){
			if (this.players[0].ship.collide(this.bling[i])){
				this.players[0].money = this.players[0].money + this.bling[i].value;
				this.players[0].gotmoney = [30,this.bling[i].value];
				this.bling.splice(i, 1);
				cashsound1.play();
				//i=this.bling.length;
			}
			i++;
		}


	}	
	collideothers(externalplanets, externalships, externalbombs){//input are umo arrays
		var  i = externalplanets.length;//unfinished, unused, but a good idea. 		
	}
	playermice(){
		var qq = 0;
		while (qq<this.players.length){
			var aplayer = this.players[qq];
			if (aplayer.mousestate==1){ //if it's the left button
				//console.log("itried4");
				if (aplayer.wep < 10){
					//console.log("itried3");
					//console.log(myplayer.energy+"  "+myplayer.blasters[1].ecost);//myplayer.blasters[myplayer.wep].ecost);
					if (aplayer.energy>aplayer.blasters[aplayer.wep].ecost){
						//console.log("itried2");
						if (aplayer.blasters[aplayer.wep].type!=="beam"){
							aplayer.blasters[aplayer.wep].fire(aplayer.ship,time);
							aplayer.energy = aplayer.energy - aplayer.blasters[aplayer.wep].ecost;
							//console.log("itried1");
							if (aplayer.wep == 1){blastersound1.play();}
							else if (aplayer.wep == 2){blastersound2.play();}
							else if (aplayer.wep == 3){blastersound3.play();}
							else if (aplayer.wep == 4){blastersound4.play();}
							else if (aplayer.wep == 5){blastersound5.play();}
							else if (aplayer.wep == 6){blastersound6.play();}
							else if (aplayer.wep == 7){blastersound7.play();}
							else if (aplayer.wep == 8){blastersound8.play();}
							else if (aplayer.wep == 9){blastersound9.play();}
							else if (aplayer.wep == 0){blastersound0.play();}
							}
						}
					}
				}	
			else if (aplayer.mousestate==2){//if its the right button
				if (aplayer.dockstate>=0){
					systems[ps].outposts[aplayer.dockstate].undock(aplayer.ship);//undock function sets relative position and velocity.  Maybe other stuff.
					aplayer.dockstate = -1;
					}
				if (aplayer.thruster>0){
					aplayer.ship.thrust = 2*aplayer.thrustmultiplier;
					//myplayer.thruster = myplayer.thruster - 24;
					var td = 48;
					var tr = 24;
					var x = Math.cos(aplayer.ship.d+Math.PI)*td + canvas.width/2;
					var y = Math.sin(aplayer.ship.d+Math.PI)*td + canvas.height/2;
					context.beginPath();
					context.strokeStyle = "orange";
					context.arc(x, y, tr, 0, 2 * Math.PI, false);
					context.fillStyle = "orange";
					context.fill();
					context.lineWidth = 2;
					context.stroke();	
					enginesound1.play();
					}
				} 
			qq++;
			}
		}
	playerkeys(){
		var qq = 0;
		while (qq<this.players.length){
			aplayer = this.players[qq];
			
			switch (aplayer.input) {  //events for all the keyboard keys
				case "q":
					//unused for now
				//if (cheatmode == 1){ qblaster.fire(systems[ps].ships[0],time); }
				  break;   
				 case "Delete":
				 if (cheatmode == 0){cheatmode = 1;}
				  break;    
				case " ":
				  playerradio.msgtime = 1;
				  break;     
				case "b": //Booster selection
					if (aplayer.boosters[0]==aplayer.boosters.length-1){
						aplayer.boosters[0]=0;
					}else{
						aplayer.boosters[0]=aplayer.boosters[0]+1;
					}
				  break;	
				case "c": //supercompass toggle
					supercompass++;
					if (supercompass>3){supercompass = 0;}
				  break;
				case "g": //Booster activation
					if (aplayer.boosters[aplayer.boosters[0]]>0){//if selected booster is in stock
						aplayer.boosters[aplayer.boosters[0]]=aplayer.boosters[aplayer.boosters[0]]-1; //remove 1 from stock of selected booster
						aplayer.ship.thrust = 32*2^(aplayer.boosters[0]); //boost hard
						boost1.play();
						}
				  break;	  	  
				case "1":    //This is how weapon switching is handled.
					if (aplayer.blasters[1].phas){ aplayer.wep = 1; } //If weapon is present, switch to it.		
					break; //Nothing happens on keypress otherwise.
				case "2": 
					if (aplayer.blasters[2].phas){ aplayer.wep = 2; }
				  break;
				case "3": 
					if (aplayer.blasters[3].phas){ aplayer.wep = 3; }
					  break;
				case "4": 
					if (aplayer.blasters[4].phas){ aplayer.wep = 4; }
					break;
				case "5": 
					if (aplayer.blasters[5].phas){ aplayer.wep = 5; }
				  break;
				case "6": 
					if (aplayer.blasters[6].phas){ aplayer.wep = 6; }
					  break;
				case "7": 
					if (aplayer.blasters[7].phas){ aplayer.wep = 7; }
				  break;
				case "8": 
					if (aplayer.blasters[8].phas){ aplayer.wep = 8; }
					  break;
				case "9": 
					if (aplayer.blasters[9].phas){ aplayer.wep = 9; }
				  break;
				case "0": 
					if (aplayer.blasters[0].phas){ aplayer.wep = 0; }
					  break;
				case "n": 
					if (aplayer.navactive == 0){
						aplayer.navactive = 1;
						if (aplayer.navtarget>systems[ps].planets.length-2){aplayer.navtarget=0;}
					} else if (aplayer.navactive == 1) {
						aplayer.navactive = 2;
						if (aplayer.navtarget > systems[ps].outposts.length-2){aplayer.navtarget=0;}
					} else if (aplayer.navactive == 2){aplayer.navactive = 0;}
					  break;
				case "m": 
					if (aplayer.mapactive == 0){aplayer.mapactive = 2;} else {aplayer.mapactive--;}
					  break;
				case "j": 
					if (aplayer.journalactive<2){aplayer.journalactive++;}else{aplayer.journalactive = 0;}
					  break;
				case "+": 
					aplayer.mapscale = aplayer.mapscale * 0.9;
					if (aplayer.mapscale>64){aplayer.mapscale = Math.floor(aplayer.mapscale);}
					  break;		  
				case "-": 
					aplayer.mapscale = aplayer.mapscale * 1.1;
					if (aplayer.mapscale>64){aplayer.mapscale = Math.floor(aplayer.mapscale);}
					  break;	  
				case ".": 
						if (aplayer.navactive == 1){
							aplayer.navtarget++;
							if (aplayer.navtarget > systems[ps].planets.length-2){ aplayer.navtarget = 0; }//Waldo is now excluded
						}else if (aplayer.navactive == 2){
							aplayer.navtarget++;
							if (aplayer.navtarget > systems[ps].outposts.length-1){aplayer.navtarget = 0; }
							}
					  break;
				case ",": 
					if (aplayer.navactive == 1){
						aplayer.navtarget--;
						if (aplayer.navtarget == -1){ aplayer.navtarget = systems[ps].planets.length-2; }
					}else if (aplayer.navactive == 2){
						aplayer.navtarget--;
						if (aplayer.navtarget == -1){ aplayer.navtarget = systems[ps].outposts.length-1; }
						}
					break;		  
				case "w": 
				if (cheatmode ==1){	aplayer.ship.respawn(systems[ps].planets[aplayer.navtarget]); }
					  break;
				case "]": 
					if (aplayer.shiptarget == aplayer.shipsinrange.length-1){ aplayer.shiptarget = 0; }
					else {aplayer.shiptarget++;}	                                          
				  break;
				case "[": 
					if (aplayer.shiptarget == 0){ aplayer.shiptarget = aplayer.shipsinrange.length-1; }
					else {aplayer.shiptarget--;}	                                          
				  break;
				case "t": 
					//aplayer.shiptarget = closestindex;                                         
				  break;
				case "ArrowUp":
					if (aplayer.dockstate>=0){
						menuclick1.play();
						aplayer.shopitem = aplayer.shopitem - 1;
						if ((aplayer.shopitem<0)&&(aplayer.shopmode == 0))
							{aplayer.shopitem = systems[ps].shops[aplayer.dockstate].inv.length-1;}
						if ((aplayer.shopitem<0)&&(aplayer.shopmode == 1))
							{aplayer.shopitem = allcargos.length-2;}//-2 instead of -1 because the last item is mission cargo, which shouldn't be bought or sold.
						if ((aplayer.shopitem<0)&&(aplayer.shopmode == 2))
							{aplayer.shopitem = systems[ps].shops[aplayer.dockstate].missions.length-1;}
						}
					else if (aplayer.journalactive==1){
						aplayer.journalitem--;
						if (aplayer.journalitem<0){aplayer.journalitem = playerradio.log.length-1;}
						}
				  break;
				case "ArrowDown":
					if (aplayer.dockstate>=0){
						menuclick1.play();
						aplayer.shopitem++;
						if ((aplayer.shopitem>systems[ps].shops[aplayer.dockstate].inv.length-1)&&(aplayer.shopmode == 0))
							{aplayer.shopitem = 0;}
						if ((aplayer.shopitem>allcargos.length-2)&&(aplayer.shopmode == 1))
							{aplayer.shopitem = 0;}//-2 instead of -1 because the last item is mission cargo, which shouldn't be bought or sold.
						if ((aplayer.shopitem>systems[ps].shops[aplayer.dockstate].missions.length-1)&&(aplayer.shopmode == 2))
							{aplayer.shopitem = 0;}
						}
					if (aplayer.journalactive==1){
						aplayer.journalitem++;
						if (aplayer.journalitem>playerradio.log.length-1){aplayer.journalitem = 0;}
						}
				  break;   
				case "End":
					if (cheatmode == 1){aplayer.money = aplayer.money +10000;}
				  break;  
				case "Insert":
					if (cheatmode == 1){
						var i=0;
						while (i<aplayer.blasters.length){
							aplayer.blasters[i].phas = true;
							i++;
							}
						}
				  break;  
				case "x":
					//if (cheatmode == 1){
					//	var clustercolor = "red";
					//	testcluster = new Clusterbomb(time,ships[0].x+mdx,ships[0].y+mdy,ships[0].vx,ships[0].vy,12,6,32,0.9,clustercolor,233,0.3);
					//	}
				  break;   //handled in detail elsewhere
				case "z":
					if (diagnostic == 3){diagnostic=0;}else {diagnostic=diagnostic+1;}
			
				  break;
				 case "v":
				 if (cheatmode == 1){
					if (ps <15){ps++;}
					else  {ps = 1;}
					aplayer.navtarget = 0;
					pz = 0;
					var randdir = Math.random()*2*Math.PI;
					xxxx.setorbit(systems[ps].planets[0], 320000, randdir+Math.PI, -1);
					waldo.setorbit(systems[ps].planets[0], 320000, randdir, -1);
					aplayer.ship.vx = 0; //Otherwise players inherit the momentum acquired in descent.
					aplayer.ship.vy = 0;
					}
				  break;
				  case "s":
				  if (starmode == 0){starmode = 1;}else{starmode = 0;}
				  break;
				 case "Enter": //The enter key purchases the currently selected shop item
				 if ((aplayer.dockstate >= 0)&&(aplayer.dockstate<systems[ps].shops.length)){//check if docked and shop exists
					if (aplayer.shopmode == 0){
						 if (aplayer.shopitem < systems[ps].shops[aplayer.dockstate].inv.length){//check for shopitem exists
							if (systems[ps].shops[aplayer.dockstate].inv[aplayer.shopitem].itemprice(aplayer) <= aplayer.money){ //check if player has enough money
								if (systems[ps].shops[aplayer.dockstate].inv[aplayer.shopitem].available(aplayer)){ //check if player has prerequisites / doesn't already own item
									if (aplayer.money > systems[ps].shops[aplayer.dockstate].inv[aplayer.shopitem].itemprice(aplayer)){
										aplayer.money = aplayer.money - systems[ps].shops[aplayer.dockstate].inv[aplayer.shopitem].itemprice(aplayer);
										menubuy1.play();
										systems[ps].shops[aplayer.dockstate].inv[aplayer.shopitem].buy(aplayer);//the buy function is supposed to handle the money transaction as well, but i dont think it can by itself.
									}
								} 
							}
						}		 
					}else if (aplayer.shopmode == 1){
						//if (playerinventory.cargo.length <= shopitem){shopitem = 0;}
						if (aplayer.inventory.cargo[aplayer.shopitem]>0){
							aplayer.inventory.cargo[aplayer.shopitem]=aplayer.inventory.cargo[aplayer.shopitem]-1;
							aplayer.money = aplayer.money + Math.floor(allcargos[aplayer.shopitem].baseprice*systems[ps].shops[aplayer.dockstate].cargoprices[aplayer.shopitem]);
							menubuy1.play();
						}
					}else if (aplayer.shopmode == 2){
						//if (systems[ps].shops[dockstate].missions[shopitem].taken == false){//I shouldn't have to comment this if condition.  Side effect is that players can re-take a mission in progress, respawning the bot if it's a destroy mission.  Maybe useful if a bot gets lost just inside the return radius.
							systems[ps].shops[aplayer.dockstate].missions[aplayer.shopitem].take(systems[ps].ships,systems[ps].planets,aplayer);
							aplayer.job = systems[ps].shops[aplayer.dockstate].missions[aplayer.shopitem].message;
							menuclick3.play();
							//}
						}
					}
				  break;
				 case "Backspace": //The enter key purchases the currently selected shop item
					if (aplayer.dockstate>=0){
						menuclick2.play();
						aplayer.shopmode++;
						if (aplayer.shopmode > 2) { aplayer.shopmode = 0; }
						aplayer.shopitem = 0;
						}
				  break;
				 case "p": 
					 aplayer.probemode = aplayer.probemode + 1;
					if (aplayer.probemode > 2) { aplayer.probemode = 0;}
				  break;
				   case "a": 
				   aplayer.autopilot++;
					if (aplayer.autopilot > 1) { aplayer.autopilot = 0;}//disables experimental modes for playability
					//if (autopilot > 4) { autopilot = 0;}
				  break;
				  
				   case "k": 
				   //save game
					//console.log(aplayer.savecharacter());
					//console.log(aplayer.saveblasters());
			
				 function download(filename, text) {
					var element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
					element.setAttribute('download', filename);
				
					element.style.display = 'none';
					document.body.appendChild(element);
				
					element.click();
				
					document.body.removeChild(element);
				}
				
				// Start file download.
				document.getElementById("dwn-btn").addEventListener("click", function(){
					// Generate download of hello.txt file with some content
					var upgradestring = "";
					var i=0;
					while(i<allupgrades.length){
						upgradestring=upgradestring+allupgrades[i].tier+" ";
						i++;
						}
					var savetext = aplayer.saveupgrades()+"|"+aplayer.saveblasters()+"|"+aplayer.savecharacter()+"test junk data yo"; //document.getElementById("text-val").value;
					var filename = "blinghustlesave.txt";
					
					download(filename, savetext);
				}, false);
				  break;	
			
				   case "l": 
					var i=0;
					var stopindexes = [];
					while(i<loadgamestring.length){
						if (loadgamestring[i]=="|"){
							stopindexes.push(i);
							}
						i++;
						}
					if(stopindexes.length!=2){console.log("bad save file");}
					else{
						var savedupgrades = loadgamestring.slice(0,stopindexes[0]);
						var savedblasters = loadgamestring.slice(stopindexes[0]+1,stopindexes[1]);
						console.log(savedblasters);
						var savedcharacter = loadgamestring.slice(stopindexes[1]+1,loadgamestring.length);
						aplayer.loadblastertiers(savedblasters);
						aplayer.loadcharacter(savedcharacter);
						aplayer.loadupgrades(savedupgrades);
						}
			
				  break;	  	  
			
				default:
				  return; // Quit when this doesn't handle the key event.
			  } //end event key handling switch



			
			
			qq++;
			}
		}
	randomplanets(){
		var numplanets = Math.floor(Math.random()*6+6);//random number of planets, 5-11
		var orbitradius = 0; //randomized in the loop
		var planetsize = 0; //randomized in the loop
		this.planets.push( new Umo(this.x,this.y,Math.floor(Math.random()*3000+1000), "orange") ); //make the sun 
		this.planets[0].name = this.name; // Star name is same as system name
		var i=0;
		while (i<numplanets-1){
			i=i+1; //planets[0] is already the sun, so we can skip index 0;
			orbitradius = Math.floor( (Math.random()*Math.random()*250000) + 4*this.planets[0].s); //Minimum orbit radius 4x sun radius, 1/r density factor
			planetsize = Math.floor( Math.random()*Math.random()*800 + Math.random()*100+100 ); //Minimum size 100,
			var i = 1;
			while (i<this.planets.length){
				var otherdist = this.planets[0].distance(this.planets[i]);
				var proximity = Math.abs(orbitradius - otherdist);
				if (proximity < 6*(this.planets[i].s+planetsize)){
					orbitradius = Math.floor( (Math.random()*Math.random()*250000) + 4*this.planets[0].s);//rerandomizes orbit
					var i=0; //re-checks new orbitradius....
					}
				i=i+1;
				}
			this.planets.push( new Umo(0,0,planetsize, randcolor() ) );//this is where the planet gets added to the array
			this.planets[i].c2 = randcolor();
			this.planets[i].name = randname(4);//random 4 character name
			this.planets[i].setorbit(this.planets[0], orbitradius, Math.random()*6.28, 1);
			this.planets[i].parentid = 0; //establishes star (planet[0] as parent planet
			}
		var i=1;
		var numplanets = this.planets.length;
		while (i<numplanets-1){
			this.randommoons(i); 
			i=i+1;
			}
		var extradots = Math.floor(Math.random()*3);
		while(extradots>0){
			this.planets[i].polyradius.push(0);
			this.planets[i].polytheta.push(0);
			extradots = extradots - 1;
			}
		var i = 0;
		while (i<this.planets.length){
			var j=0;
			while (j<this.planets[i].polytheta.length){
				this.planets[i].polyradius[j] = Math.random()+0.125;
				this.planets[i].polytheta[j] = Math.random()*2*Math.PI;
				j=j+1;
				}
			i=i+1;
			}	
		this.randomoutposts(3); 
		var traderstops = Math.floor(Math.random()*3)+2;
		var destinations = [];
		var i=0;
		while (i<traderstops){
			var thisstop = Math.floor(Math.random()*(this.planets.length-1))+1;
			destinations.push(thisstop);
			i=i+1;
			}
		this.addrandomtraders(destinations, 4, 15); 
		var traderstops = Math.floor(Math.random()*3)+2;
		var destinations = [];
		var i=0;
		while (i<traderstops){
			var thisstop = Math.floor(Math.random()*(this.planets.length-1))+1;
			destinations.push(thisstop);
			i=i+1;
			}
		this.addrandomtraders(destinations, 4, 15)//Duplicate for two groups.
		}
	randommoons(index){//index is of planet
		var nummoons = Math.floor(Math.random()*this.planets[index].s/100 )//Planets < 120 in size have 0 chance of a moon, planet 240 in size has 50% chance of 1 moon, etc.
		var moonsize = 0; //randomized in loop
		var moonorbitr = 0;//randomized in loop
		var moonindex = 0; //set in loop
		var i = nummoons;
		while (i>0){
			i=i-1;
			moonsize = Math.floor(Math.random()*this.planets[index].s/3+10);//radius is 10 plus up to 1/3 of parent planet
			moonorbitr = Math.floor(this.planets[index].s*(Math.random()*3.5+1.5)+80); //orbit radius is 1.5x parent planet radius + up to 3.5x parent planet radius... plus 80.
			moonindex = this.planets.length;//no -1 because push comes on next line
			this.planets.push( new Umo(0,0,moonsize, randcolor()) );
			this.planets[moonindex].c2 = randcolor();
			this.planets[moonindex].name = randname(4);
			this.planets[moonindex].parentid = index;
			this.planets[moonindex].setorbit(this.planets[index],moonorbitr,Math.random()*6.28, 1);//orbit direction is 1, not random
			}
		}
	randomoutposts(num){//num is number of outposts
		var alreadypickedplanets = [];
		var i=0;
		while (i<num){//
			this.outposts.push( new Umo(0,0,128, randcolor()));
			var lastindex = this.outposts.length-1;
			this.outposts[lastindex].c2 = randcolor();
			this.outposts[lastindex].parentid = 0;
			this.outposts[lastindex].name = randname(8)+"'s "+randname(7)+" "+randname(5);
			var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
			var toradii = [1,1,1,1]; //rectangle
			this.outposts[lastindex].polytheta = totheta;
			this.outposts[lastindex].polyradius = toradii;
			var pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//station will be in a solar following orbit to the chosen planet
			while ((this.planets[pickedplanet].parentid !== 0)&&(alreadypickedplanets.includes(pickedplanet))){//No outpost generated if planet is actually a moon or already picked
				pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//tries again to find a not-moon
				}
			var orbitdistance = this.planets[0].distance(this.planets[pickedplanet]);
			var orbitposition = this.planets[0].directionof(this.planets[pickedplanet]);
			this.outposts[lastindex].setorbit(this.planets[0], orbitdistance, orbitposition+0.2+Math.random()*0.3, 1);//This properly sets orbital distance, maybe properly sets orbit position.
			
			var numberofsides = Math.floor(Math.random()*6+7)*2;
			this.outposts[i].makeemblem(numberofsides,0.1); //randomly generates a shop logo
			
			
			//Now add the shop...  Tons of global scope used here.
			var randshopitems3 = [];  
			randshopitems3.push(repairshopitem);//First 2 items are always the same, repair item and booster item.
			randshopitems3.push(booster1);
			var j=2;
			while(j<4){ //Next 2 items will be random blasters for sale
				var buyableblaster = Math.floor(Math.random()*blasterbuyitems.length);
				randshopitems3.push(blasterbuyitems[buyableblaster]);
				j=j+1;
				}
			while (j<7){ //Next 3 items will be random blaster upgrades
				var theitem = Math.floor(Math.random()*blasterupgradeitems.length);
				randshopitems3.push(blasterupgradeitems[theitem]);
				j=j+1;
			}
			while (j<9){ //Next 2 items will be random ship upgrades.
				var randupgrade = Math.floor(Math.random()*upgradeshopitems.length);
				randshopitems3.push(upgradeshopitems[randupgrade]);
				j=j+1;
				}
			while (j<12){ //And 3 cargo items
				var randcargo = Math.floor(Math.random()*allcargos.length);
				randshopitems3.push(new Shopitem("cargo",randcargo,"buy",1));
				j=j+1;
				}
			this.shops.push(new Shop("XXXXXXXXXX",i, "whaaaaaaaaaaaaaat", randshopitems3)); //should fix this to reflect outpost name/description
			var k = 0;
			while (k<4){ //This adds 4 cargo missions to the shop.  
				this.shops[i].addcargomission(this.ships,this.planets,this.outposts);
				k=k+1;
				}// Destroy missions can't be added here (they are added in enemypopulate function), because normally the enemy ships haven't been added to the system yet when randomoutposts() (this function) is run.
			i=i+1;
			}
		}
	levelup(botindex,levels){//adds "levels" to make bots tougher
		var i = levels;
		while(i>0){
			i=i-1;
			var bonus = Math.floor(Math.random()*5);//Picks a number to select which bonus the bot gets
			if (bonus==0){ //extra health
				this.ships[botindex].maxhp = this.ships[botindex].maxhp+100;
				this.ships[botindex].hp = this.ships[botindex].hp+100;
				}
			if (bonus==1){ //extra shield
				this.ships[botindex].maxshield = this.ships[botindex].maxshield+50;
				this.ships[botindex].shield = this.ships[botindex].shield+50;
				}
			if (bonus==2){ //extra shield regen
				this.ships[botindex].shieldregen = this.ships[botindex].shieldregen+0.25;
				}			
			if (bonus==3){ //extra bomb damage
				this.botbombs[botindex].hurt = this.botbombs[botindex].hurt+8;
				}						
			if (bonus==4){ //extra bomb blast
				this.botbombs[botindex].boombuff = this.botbombs[botindex].boombuff+0.25;//I think botbombs needs -1 because it does not include a bomb for ships[0] (player)
				}			
			this.ships[botindex].level = this.ships[botindex].level+1;
			}
		}
	addrandomgang(planetindex, num,level){ //Adds a gang of enemy ships, level describes difficulty (not used yet)
		var gangsize = num;
		var gangcolor = randcolor();
		var gangcolor2 = randcolor();
		var gangparent = planetindex;
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomplayerverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomplayerverts);
		var gangpolytheta = randomplayerverts[0];
		var gangpolyradius = randomplayerverts[1];
		var i = gangsize;
		while (i>0){
			i=i-1;
			this.ships.push(new Umo(-600,32000,12,gangcolor));
			var botindex = this.ships.length-1;
			this.ships[botindex].c2 = gangcolor2;
			this.ships[botindex].parentid = gangparent; 
			this.ships[botindex].respawn(this.planets[this.ships[botindex].parentid]);
			this.ships[botindex].name = "";//randname(5);
			this.ships[botindex].hp = 150;
			this.ships[botindex].maxhp = 150;
			this.ships[botindex].polytheta = gangpolytheta;
			this.ships[botindex].polyradius = gangpolyradius;
			this.ships[botindex].ai = "enemy";
			this.botbombs.push( new Umo(0,0,0,"red"));
			this.botbombs[this.botbombs.length-1].hp = 1;  //Set hitpoints to 1 so they explode on contact
			this.botbombs[this.botbombs.length-1].maxhp = 1; //with planets 
			this.botbombs[this.botbombs.length-1].shield=0;   
			this.levelup(botindex,level);
			}
		}
	addrandomtraders(destinations, num, level){
		var fleetsize = num;
		var fleetcolor = randcolor();
		var fleetcolor2 = randcolor();
		var fleetparent = destinations[0];
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomshipverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomshipverts);
		var fleetpolytheta = randomshipverts[0];
		var fleetpolyradius = randomshipverts[1];
		var i = fleetsize;
		while (i>0){
			i=i-1;
			this.ships.push(new Umo(-600,32000,32,fleetcolor));
			var botindex = this.ships.length-1;
			this.ships[botindex].c2 = fleetcolor2;
			this.ships[botindex].parentid = fleetparent; 
			this.ships[botindex].respawn(this.planets[fleetparent]);
			this.ships[botindex].name = randname(5);
			this.ships[botindex].hp = 150;
			this.ships[botindex].maxhp = 150;
			this.ships[botindex].polytheta = fleetpolytheta;
			this.ships[botindex].polyradius = fleetpolyradius;
			this.ships[botindex].ai = "trader";
			this.ships[botindex].aistate = 0;
			this.ships[botindex].aitargets = destinations;
			this.botbombs.push( new Umo(0,0,0,"red"));
			this.botbombs[this.botbombs.length-1].hp = 1;  //Set hitpoints to 1 so they explode on contact
			this.botbombs[this.botbombs.length-1].maxhp = 1; //with planets 
			this.botbombs[this.botbombs.length-1].shield=0;  
			this.levelup(botindex,level);
			}
		}
	enemypopulate(num,minlevel,maxlevel){ //Adds gangs of enemy ships, level describes difficulty, num is size of each gang.
		var i=1;
		while (i<this.planets.length-1){
			var templevel = Math.floor(minlevel + Math.random()*(maxlevel+1 - minlevel));
			this.addrandomgang(i,num,templevel);
			i=i+1;
			}
		var i = 0;
		while (i<this.shops.length){
			var k = 0;
			while (k<4){
				this.shops[i].addkillmission(this.ships,this.planets,this.outposts);
				k=k+1;
				}
			i=i+1;
			}
		}
	addbling(parent,basevalue,bonusvalue,num){//adds bling to 1 planet
		var i=0;
		while(i<num){
			var tempvalue = Math.floor(basevalue+Math.random()*bonusvalue);
			var tempdistance = parent.s+32+2*Math.floor(Math.random()*parent.s);
			this.bling.push(new Bling(0,0,0,0,tempvalue));
			this.bling[this.bling.length-1].setorbit(parent,tempdistance,Math.random()*2*Math.PI,1);
			this.bling[this.bling.length-1].t = this.bling[this.bling.length-1].t +i*600;
			i++;
		}
	}
	addrandombling(spread){
		var i=0;
		while (i<this.planets.length){
			var blingonplanet = Math.floor(this.planets[i].s/spread);
			var j=0;
			while(j<blingonplanet){
				this.addbling(this.planets[i],16,32,1);
				this.bling[this.bling.length-1].parentid = i;
				this.bling[this.bling.length-1].t = Math.floor(Math.random()*1000);//Timer counts up to an expiration, this helps stagger the expiration times
				j++
			}
			i++;
		}
	
	}
	nextjob(){
		var numjobs = 0;
		var thejob = "none";
		var i=0;
		while (i<this.shops.length){
			var j=0;
			while (j<this.shops[i].missions.length){
				if (this.shops[i].missions[j].taken){
					numjobs = numjobs + 1;
					thejob = this.shops[i].missions[j].message;
					}
				j=j+1;
				}
			i=i+1;
			}
		return [thejob, numjobs];
		}
	joblist(x,y){
		context.fillStyle = "orange";
		context.font='12px Arial';
		var jobnum = 0;
		var i=0;
		while (i<this.shops.length){
			var j=0;
			while (j<this.shops[i].missions.length){
				if (this.shops[i].missions[j].taken){
					context.fillText(this.shops[i].missions[j].message,x,y+jobnum*20);
					jobnum++;
					}
				j=j+1;
				}
			i=i+1;
			}
		}
	}//end of system class////////////////////////////////////////////////////////////////////////////////////////////////////////////////