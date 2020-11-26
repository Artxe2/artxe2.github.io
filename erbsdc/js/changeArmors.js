function changeChest(type, index) {		
	chest = chests[index];
	document.querySelector('#chest').innerHTML = "<img title = '" + chest.Name + "' src = './armors/" + chest.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay();
}
function changeHead(type, index)  {
	head = heads[index];
	document.querySelector('#head').innerHTML = "<img title = '" + head.Name + "' src = './armors/" + head.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay();
}
function changeArm(type, index)  {
	arm = arms[index];
	document.querySelector('#arm').innerHTML = "<img title = '" + arm.Name + "' src = './armors/" + arm.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay();
}
function changeLeg(type, index)  {
	leg = legs[index];
	document.querySelector('#leg').innerHTML = "<img title = '" + leg.Name + "' src = './armors/" + leg.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay();
}
function changeAccessory(type, index)  {
	accessory = accessorys[index];
	document.querySelector('#accessory').innerHTML = "<img title = '" + accessory.Name + "' src = './armors/" + accessory.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay();
}
function changeChest2(type, index) {		
	chest2 = chests[index];
	document.querySelector('#chest2').innerHTML = "<img title = '" + chest2.Name + "' src = './armors/" + chest2.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay2();
}
function changeHead2(type, index)  {
	head2 = heads[index];
	document.querySelector('#head2').innerHTML = "<img title = '" + head2.Name + "' src = './armors/" + head2.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay2();
}
function changeArm2(type, index)  {
	arm2 = arms[index];
	document.querySelector('#arm2').innerHTML = "<img title = '" + arm2.Name + "' src = './armors/" + arm2.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay2();
}
function changeLeg2(type, index)  {
	leg2 = legs[index];
	document.querySelector('#leg2').innerHTML = "<img title = '" + leg2.Name + "' src = './armors/" + leg2.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay2();
}
function changeAccessory2(type, index)  {
	accessory2 = accessorys[index];
	document.querySelector('#accessory2').innerHTML = "<img title = '" + accessory2.Name + "' src = './armors/" + accessory2.Name + ".png' width = '75px' height = '42px'>";
	updateDisplay2();
}