function selectChest() {
	if (character == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		for (let i = 0; i < chests.length; i++) {
			list += "<img class = '" + chests[i].Rarity + "' title = '" + chests[i].Title + "' onclick = 'changeChest(\"chest\", " + i + ")' src = './img/armors/" + chests[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove chest' onclick = 'changeChest(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
			list += "<img class = '" + heads[i].Rarity + "' title = '" + heads[i].Title + "' onclick = 'changeHead(\"head\", " + i + ")' src = './img/armors/" + heads[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove head' onclick = 'changeHead(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
			list += "<img class = '" + arms[i].Rarity + "' title = '" + arms[i].Title + "' onclick = 'changeArm(\"arm\", " + i + ")' src = './img/armors/" + arms[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove arm' onclick = 'changeArm(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
			list += "<img class = '" + legs[i].Rarity + "' title = '" + legs[i].Title + "' onclick = 'changeLeg(\"leg\", " + i + ")' src = './img/armors/" + legs[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove leg' onclick = 'changeLeg(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
			list += "<img class = '" + accessorys[i].Rarity + "' title = '" + accessorys[i].Title + "' onclick = 'changeAccessory(\"accessory\", " + i + ")' src = './img/armors/" + accessorys[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove accessory' onclick = 'changeAccessory(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
			list += "<img class = '" + chests[i].Rarity + "' title = '" + chests[i].Title + "' onclick = 'changeChest2(\"chest\", " + i + ")' src = './img/armors/" + chests[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove chest' onclick = 'changeChest2(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
			list += "<img class = '" + heads[i].Rarity + "' title = '" + heads[i].Title + "' onclick = 'changeHead2(\"head\", " + i + ")' src = './img/armors/" + heads[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove head' onclick = 'changeHead2(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
			list += "<img class = '" + arms[i].Rarity + "' title = '" + arms[i].Title + "' onclick = 'changeArm2(\"arm\", " + i + ")' src = './img/armors/" + arms[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove arm' onclick = 'changeArm2(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
			list += "<img class = '" + legs[i].Rarity + "' title = '" + legs[i].Title + "' onclick = 'changeLeg2(\"leg\", " + i + ")' src = './img/armors/" + legs[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove leg' onclick = 'changeLeg2(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
			list += "<img class = '" + accessorys[i].Rarity + "' title = '" + accessorys[i].Title + "' onclick = 'changeAccessory2(\"accessory\", " + i + ")' src = './img/armors/" + accessorys[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
			if (++index == 3) {
				index = 0;
				list += '<br>';
			}
		}
		list += "<img title = 'remove accessory' onclick = 'changeAccessory2(\"\", -1)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
		document.querySelector('#s_itemList2').innerHTML = list;
		document.querySelector('#d_itemList2').style.display = 'block';
	}
}