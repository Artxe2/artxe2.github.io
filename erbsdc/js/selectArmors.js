function selectChest() {
	if (character == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < chests.length; i++) {
			list += "<img title = '" + chests[i].Name + "' onclick = 'changeChest(\"chest\", " + i + ")' src = './armors/" + chests[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList').innerHTML = list;
		document.querySelector('#d_itemList').style.display = 'block';
	}
}
function selectHead() {
	if (character == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < heads.length; i++) {
			list += "<img title = '" + heads[i].Name + "' onclick = 'changeHead(\"head\", " + i + ")' src = './armors/" + heads[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList').innerHTML = list;
		document.querySelector('#d_itemList').style.display = 'block';
	}
}
function selectArm() {
	if (character == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < arms.length; i++) {
			list += "<img title = '" + arms[i].Name + "' onclick = 'changeArm(\"arm\", " + i + ")' src = './armors/" + arms[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList').innerHTML = list;
		document.querySelector('#d_itemList').style.display = 'block';
	}
}
function selectLeg() {
	if (character == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < legs.length; i++) {
			list += "<img title = '" + legs[i].Name + "' onclick = 'changeLeg(\"leg\", " + i + ")' src = './armors/" + legs[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList').innerHTML = list;
		document.querySelector('#d_itemList').style.display = 'block';
	}
}
function selectAccessory() {
	if (character == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < accessorys.length; i++) {
			list += "<img title = '" + accessorys[i].Name + "' onclick = 'changeAccessory(\"accessory\", " + i + ")' src = './armors/" + accessorys[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList').innerHTML = list;
		document.querySelector('#d_itemList').style.display = 'block';
	}
}
function selectChest2() {
	if (character2 == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < chests.length; i++) {
			list += "<img title = '" + chests[i].Name + "' onclick = 'changeChest2(\"chest\", " + i + ")' src = './armors/" + chests[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList2').innerHTML = list;
		document.querySelector('#d_itemList2').style.display = 'block';
	}
}
function selectHead2() {
	if (character2 == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < heads.length; i++) {
			list += "<img title = '" + heads[i].Name + "' onclick = 'changeHead2(\"head\", " + i + ")' src = './armors/" + heads[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList2').innerHTML = list;
		document.querySelector('#d_itemList2').style.display = 'block';
	}
}
function selectArm2() {
	if (character2 == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < arms.length; i++) {
			list += "<img title = '" + arms[i].Name + "' onclick = 'changeArm2(\"arm\", " + i + ")' src = './armors/" + arms[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList2').innerHTML = list;
		document.querySelector('#d_itemList2').style.display = 'block';
	}
}
function selectLeg2() {
	if (character2 == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < legs.length; i++) {
			list += "<img title = '" + legs[i].Name + "' onclick = 'changeLeg2(\"leg\", " + i + ")' src = './armors/" + legs[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList2').innerHTML = list;
		document.querySelector('#d_itemList2').style.display = 'block';
	}
}
function selectAccessory2() {
	if (character2 == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < accessorys.length; i++) {
			list += "<img title = '" + accessorys[i].Name + "' onclick = 'changeAccessory2(\"accessory\", " + i + ")' src = './armors/" + accessorys[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		document.querySelector('#s_itemList2').innerHTML = list;
		document.querySelector('#d_itemList2').style.display = 'block';
	}
}