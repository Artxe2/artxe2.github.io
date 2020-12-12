function changeChest(type, index) {
	if (index == -1) {
		chest = null;
		document.querySelector('#chest').innerHTML = '';
		updateDisplay();
		return;
	}
	chest = chests[index];
	document.querySelector('#chest').innerHTML = "<img title = '" + chest.Name + "' src = './armors/" + chest.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay();
}
function changeHead(type, index)  {
	if (index == -1) {
		head = null;
		document.querySelector('#head').innerHTML = '';
		updateDisplay();
		return;
	}
	head = heads[index];
	document.querySelector('#head').innerHTML = "<img title = '" + head.Name + "' src = './armors/" + head.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay();
}
function changeArm(type, index)  {
	if (index == -1) {
		arm = null;
		document.querySelector('#arm').innerHTML = '';
		updateDisplay();
		return;
	}
	arm = arms[index];
	document.querySelector('#arm').innerHTML = "<img title = '" + arm.Name + "' src = './armors/" + arm.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay();
}
function changeLeg(type, index)  {
	if (index == -1) {
		leg = null;
		document.querySelector('#leg').innerHTML = '';
		updateDisplay();
		return;
	}
	leg = legs[index];
	document.querySelector('#leg').innerHTML = "<img title = '" + leg.Name + "' src = './armors/" + leg.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay();
}
function changeAccessory(type, index)  {
	if (index == -1) {
		accessory = null;
		document.querySelector('#accessory').innerHTML = '';
		updateDisplay();
		return;
	}
	accessory = accessorys[index];
	document.querySelector('#accessory').innerHTML = "<img title = '" + accessory.Name + "' src = './armors/" + accessory.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay();
}
function closeItemList() {
	document.querySelector('#s_itemList').innerHTML = '';
	document.querySelector('#d_itemList').style.display = 'none';
}

function changeChest2(type, index) {
	if (index == -1) {
		chest2 = null;
		document.querySelector('#chest2').innerHTML = '';
		updateDisplay2();
		return;
	}
	chest2 = chests[index];
	document.querySelector('#chest2').innerHTML = "<img title = '" + chest2.Name + "' src = './armors/" + chest2.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay2();
}
function changeHead2(type, index)  {
	if (index == -1) {
		head2 = null;
		document.querySelector('#head2').innerHTML = '';
		updateDisplay2();
		return;
	}
	head2 = heads[index];
	document.querySelector('#head2').innerHTML = "<img title = '" + head2.Name + "' src = './armors/" + head2.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay2();
}
function changeArm2(type, index)  {
	if (index == -1) {
		arm2 = null;
		document.querySelector('#arm2').innerHTML = '';
		updateDisplay2();
		return;
	}
	arm2 = arms[index];
	document.querySelector('#arm2').innerHTML = "<img title = '" + arm2.Name + "' src = './armors/" + arm2.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay2();
}
function changeLeg2(type, index)  {
	if (index == -1) {
		leg2 = null;
		document.querySelector('#leg2').innerHTML = '';
		updateDisplay2();
		return;
	}
	leg2 = legs[index];
	document.querySelector('#leg2').innerHTML = "<img title = '" + leg2.Name + "' src = './armors/" + leg2.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay2();
}
function changeAccessory2(type, index)  {
	if (index == -1) {
		accessory2 = null;
		document.querySelector('#accessory2').innerHTML = '';
		updateDisplay2();
		return;
	}
	accessory2 = accessorys[index];
	document.querySelector('#accessory2').innerHTML = "<img title = '" + accessory2.Name + "' src = './armors/" + accessory2.Name + ".png' width = '80px' height = '44px'>";
	updateDisplay2();
}
function closeItemList2() {
	document.querySelector('#s_itemList2').innerHTML = '';
	document.querySelector('#d_itemList2').style.display = 'none';
}