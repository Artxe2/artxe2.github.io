function selectWeapon() {
	if (character == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		if (character == Jackie) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img class = '" + dagger[i].Rarity + "' title = '" + dagger[i].Title + "' onclick = 'changeWeapon(\"dagger\", " + i + ")' src = './img/weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img class = '" + twoHandedSword[i].Rarity + "' title = '" + twoHandedSword[i].Title + "' onclick = 'changeWeapon(\"twoHandedSword\", " + i + ")' src = './img/weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < axe.length; i++) {
				list += "<img class = '" + axe[i].Rarity + "' title = '" + axe[i].Title + "' onclick = 'changeWeapon(\"axe\", " + i + ")' src = './img/weapon/" + axe[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < dualSwords.length; i++) {
				list += "<img class = '" + dualSwords[i].Rarity + "' title = '" + dualSwords[i].Title + "' onclick = 'changeWeapon(\"dualSwords\", " + i + ")' src = './img/weapon/" + dualSwords[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Aya) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img class = '" + pistol[i].Rarity + "' title = '" + pistol[i].Title + "' onclick = 'changeWeapon(\"pistol\", " + i + ")' src = './img/weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < assaultRifle.length; i++) {
				list += "<img class = '" + assaultRifle[i].Rarity + "' title = '" + assaultRifle[i].Title + "' onclick = 'changeWeapon(\"assaultRifle\", " + i + ")' src = './img/weapon/" + assaultRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < sniperRifle.length; i++) {
				list += "<img class = '" + sniperRifle[i].Rarity + "' title = '" + sniperRifle[i].Title + "' onclick = 'changeWeapon(\"sniperRifle\", " + i + ")' src = './img/weapon/" + sniperRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Fiora) {
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img class = '" + twoHandedSword[i].Rarity + "' title = '" + twoHandedSword[i].Title + "' onclick = 'changeWeapon(\"twoHandedSword\", " + i + ")' src = './img/weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < rapier.length; i++) {
				list += "<img class = '" + rapier[i].Rarity + "' title = '" + rapier[i].Title + "' onclick = 'changeWeapon(\"rapier\", " + i + ")' src = './img/weapon/" + rapier[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < spear.length; i++) {
				list += "<img class = '" + spear[i].Rarity + "' title = '" + spear[i].Title + "' onclick = 'changeWeapon(\"spear\", " + i + ")' src = './img/weapon/" + spear[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Magnus) {
			for (let i = 0; i < hammer.length; i++) {
				list += "<img class = '" + hammer[i].Rarity + "' title = '" + hammer[i].Title + "' onclick = 'changeWeapon(\"hammer\", " + i + ")' src = './img/weapon/" + hammer[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < bat.length; i++) {
				list += "<img class = '" + bat[i].Rarity + "' title = '" + bat[i].Title + "' onclick = 'changeWeapon(\"bat\", " + i + ")' src = './img/weapon/" + bat[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Zahir) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img class = '" + throws[i].Rarity + "' title = '" + throws[i].Title + "' onclick = 'changeWeapon(\"throws\", " + i + ")' src = './img/weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img class = '" + shuriken[i].Rarity + "' title = '" + shuriken[i].Title + "' onclick = 'changeWeapon(\"shuriken\", " + i + ")' src = './img/weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Nadine) {
			for (let i = 0; i < bow.length; i++) {
				list += "<img class = '" + bow[i].Rarity + "' title = '" + bow[i].Title + "' onclick = 'changeWeapon(\"bow\", " + i + ")' src = './img/weapon/" + bow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < crossbow.length; i++) {
				list += "<img class = '" + crossbow[i].Rarity + "' title = '" + crossbow[i].Title + "' onclick = 'changeWeapon(\"crossbow\", " + i + ")' src = './img/weapon/" + crossbow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Hyunwoo) {
			for (let i = 0; i < glove.length; i++) {
				list += "<img class = '" + glove[i].Rarity + "' title = '" + glove[i].Title + "' onclick = 'changeWeapon(\"glove\", " + i + ")' src = './img/weapon/" + glove[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < tonfa.length; i++) {
				list += "<img class = '" + tonfa[i].Rarity + "' title = '" + tonfa[i].Title + "' onclick = 'changeWeapon(\"tonfa\", " + i + ")' src = './img/weapon/" + tonfa[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Hart) {
			for (let i = 0; i < guitar.length; i++) {
				list += "<img class = '" + guitar[i].Rarity + "' title = '" + guitar[i].Title + "' onclick = 'changeWeapon(\"guitar\", " + i + ")' src = './img/weapon/" + guitar[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Isol) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img class = '" + pistol[i].Rarity + "' title = '" + pistol[i].Title + "' onclick = 'changeWeapon(\"pistol\", " + i + ")' src = './img/weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < assaultRifle.length; i++) {
				list += "<img class = '" + assaultRifle[i].Rarity + "' title = '" + assaultRifle[i].Title + "' onclick = 'changeWeapon(\"assaultRifle\", " + i + ")' src = './img/weapon/" + assaultRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Li_Dailin) {
			for (let i = 0; i < glove.length; i++) {
				list += "<img class = '" + glove[i].Rarity + "' title = '" + glove[i].Title + "' onclick = 'changeWeapon(\"glove\", " + i + ")' src = './img/weapon/" + glove[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < nunchaku.length; i++) {
				list += "<img class = '" + nunchaku[i].Rarity + "' title = '" + nunchaku[i].Title + "' onclick = 'changeWeapon(\"nunchaku\", " + i + ")' src = './img/weapon/" + nunchaku[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Yuki) {
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img class = '" + twoHandedSword[i].Rarity + "' title = '" + twoHandedSword[i].Title + "' onclick = 'changeWeapon(\"twoHandedSword\", " + i + ")' src = './img/weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < dualSwords.length; i++) {
				list += "<img class = '" + dualSwords[i].Rarity + "' title = '" + dualSwords[i].Title + "' onclick = 'changeWeapon(\"dualSwords\", " + i + ")' src = './img/weapon/" + dualSwords[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Hyejin) {
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img class = '" + shuriken[i].Rarity + "' title = '" + shuriken[i].Title + "' onclick = 'changeWeapon(\"shuriken\", " + i + ")' src = './img/weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < bow.length; i++) {
				list += "<img class = '" + bow[i].Rarity + "' title = '" + bow[i].Title + "' onclick = 'changeWeapon(\"bow\", " + i + ")' src = './img/weapon/" + bow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Xiukai) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img class = '" + dagger[i].Rarity + "' title = '" + dagger[i].Title + "' onclick = 'changeWeapon(\"dagger\", " + i + ")' src = './img/weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < spear.length; i++) {
				list += "<img class = '" + spear[i].Rarity + "' title = '" + spear[i].Title + "' onclick = 'changeWeapon(\"spear\", " + i + ")' src = './img/weapon/" + spear[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Chiara) {
			for (let i = 0; i < rapier.length; i++) {
				list += "<img class = '" + rapier[i].Rarity + "' title = '" + rapier[i].Title + "' onclick = 'changeWeapon(\"rapier\", " + i + ")' src = './img/weapon/" + rapier[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Sissela) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img class = '" + throws[i].Rarity + "' title = '" + throws[i].Title + "' onclick = 'changeWeapon(\"throws\", " + i + ")' src = './img/weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img class = '" + shuriken[i].Rarity + "' title = '" + shuriken[i].Title + "' onclick = 'changeWeapon(\"shuriken\", " + i + ")' src = './img/weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Adriana) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img class = '" + throws[i].Rarity + "' title = '" + throws[i].Title + "' onclick = 'changeWeapon(\"throws\", " + i + ")' src = './img/weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Shoichi) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img class = '" + dagger[i].Rarity + "' title = '" + dagger[i].Title + "' onclick = 'changeWeapon(\"dagger\", " + i + ")' src = './img/weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Silvia) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img class = '" + pistol[i].Rarity + "' title = '" + pistol[i].Title + "' onclick = 'changeWeapon(\"pistol\", " + i + ")' src = './img/weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Emma) {
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img class = '" + shuriken[i].Rarity + "' title = '" + shuriken[i].Title + "' onclick = 'changeWeapon(\"shuriken\", " + i + ")' src = './img/weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		}
		list += "<img title = 'remove weapon' onclick = 'changeWeapon(\"\", 0)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
		document.querySelector('#s_itemList').innerHTML = list;
		document.querySelector('#d_itemList').style.display = 'block';
	}
}
function selectWeapon2() {
	if (character2 == undefined) {
		alert('select character2 plz');
	} else {				
		let list = '';
		let index = 0;
		if (character2 == Jackie) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img class = '" + dagger[i].Rarity + "' title = '" + dagger[i].Title + "' onclick = 'changeWeapon2(\"dagger\", " + i + ")' src = './img/weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img class = '" + twoHandedSword[i].Rarity + "' title = '" + twoHandedSword[i].Title + "' onclick = 'changeWeapon2(\"twoHandedSword\", " + i + ")' src = './img/weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < axe.length; i++) {
				list += "<img class = '" + axe[i].Rarity + "' title = '" + axe[i].Title + "' onclick = 'changeWeapon2(\"axe\", " + i + ")' src = './img/weapon/" + axe[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < dualSwords.length; i++) {
				list += "<img class = '" + dualSwords[i].Rarity + "' title = '" + dualSwords[i].Title + "' onclick = 'changeWeapon2(\"dualSwords\", " + i + ")' src = './img/weapon/" + dualSwords[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Aya) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img class = '" + pistol[i].Rarity + "' title = '" + pistol[i].Title + "' onclick = 'changeWeapon2(\"pistol\", " + i + ")' src = './img/weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < assaultRifle.length; i++) {
				list += "<img class = '" + assaultRifle[i].Rarity + "' title = '" + assaultRifle[i].Title + "' onclick = 'changeWeapon2(\"assaultRifle\", " + i + ")' src = './img/weapon/" + assaultRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < sniperRifle.length; i++) {
				list += "<img class = '" + sniperRifle[i].Rarity + "' title = '" + sniperRifle[i].Title + "' onclick = 'changeWeapon2(\"sniperRifle\", " + i + ")' src = './img/weapon/" + sniperRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Fiora) {
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img class = '" + twoHandedSword[i].Rarity + "' title = '" + twoHandedSword[i].Title + "' onclick = 'changeWeapon2(\"twoHandedSword\", " + i + ")' src = './img/weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < rapier.length; i++) {
				list += "<img class = '" + rapier[i].Rarity + "' title = '" + rapier[i].Title + "' onclick = 'changeWeapon2(\"rapier\", " + i + ")' src = './img/weapon/" + rapier[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < spear.length; i++) {
				list += "<img class = '" + spear[i].Rarity + "' title = '" + spear[i].Title + "' onclick = 'changeWeapon2(\"spear\", " + i + ")' src = './img/weapon/" + spear[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Magnus) {
			for (let i = 0; i < hammer.length; i++) {
				list += "<img class = '" + hammer[i].Rarity + "' title = '" + hammer[i].Title + "' onclick = 'changeWeapon2(\"hammer\", " + i + ")' src = './img/weapon/" + hammer[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < bat.length; i++) {
				list += "<img class = '" + bat[i].Rarity + "' title = '" + bat[i].Title + "' onclick = 'changeWeapon2(\"bat\", " + i + ")' src = './img/weapon/" + bat[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Zahir) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img class = '" + throws[i].Rarity + "' title = '" + throws[i].Title + "' onclick = 'changeWeapon2(\"throws\", " + i + ")' src = './img/weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img class = '" + shuriken[i].Rarity + "' title = '" + shuriken[i].Title + "' onclick = 'changeWeapon2(\"shuriken\", " + i + ")' src = './img/weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Nadine) {
			for (let i = 0; i < bow.length; i++) {
				list += "<img class = '" + bow[i].Rarity + "' title = '" + bow[i].Title + "' onclick = 'changeWeapon2(\"bow\", " + i + ")' src = './img/weapon/" + bow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < crossbow.length; i++) {
				list += "<img class = '" + crossbow[i].Rarity + "' title = '" + crossbow[i].Title + "' onclick = 'changeWeapon2(\"crossbow\", " + i + ")' src = './img/weapon/" + crossbow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Hyunwoo) {
			for (let i = 0; i < glove.length; i++) {
				list += "<img class = '" + glove[i].Rarity + "' title = '" + glove[i].Title + "' onclick = 'changeWeapon2(\"glove\", " + i + ")' src = './img/weapon/" + glove[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < tonfa.length; i++) {
				list += "<img class = '" + tonfa[i].Rarity + "' title = '" + tonfa[i].Title + "' onclick = 'changeWeapon2(\"tonfa\", " + i + ")' src = './img/weapon/" + tonfa[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Hart) {
			for (let i = 0; i < guitar.length; i++) {
				list += "<img class = '" + guitar[i].Rarity + "' title = '" + guitar[i].Title + "' onclick = 'changeWeapon2(\"guitar\", " + i + ")' src = './img/weapon/" + guitar[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Isol) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img class = '" + pistol[i].Rarity + "' title = '" + pistol[i].Title + "' onclick = 'changeWeapon2(\"pistol\", " + i + ")' src = './img/weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < assaultRifle.length; i++) {
				list += "<img class = '" + assaultRifle[i].Rarity + "' title = '" + assaultRifle[i].Title + "' onclick = 'changeWeapon2(\"assaultRifle\", " + i + ")' src = './img/weapon/" + assaultRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Li_Dailin) {
			for (let i = 0; i < glove.length; i++) {
				list += "<img class = '" + glove[i].Rarity + "' title = '" + glove[i].Title + "' onclick = 'changeWeapon2(\"glove\", " + i + ")' src = './img/weapon/" + glove[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < nunchaku.length; i++) {
				list += "<img class = '" + nunchaku[i].Rarity + "' title = '" + nunchaku[i].Title + "' onclick = 'changeWeapon2(\"nunchaku\", " + i + ")' src = './img/weapon/" + nunchaku[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Yuki) {
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img class = '" + twoHandedSword[i].Rarity + "' title = '" + twoHandedSword[i].Title + "' onclick = 'changeWeapon2(\"twoHandedSword\", " + i + ")' src = './img/weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < dualSwords.length; i++) {
				list += "<img class = '" + dualSwords[i].Rarity + "' title = '" + dualSwords[i].Title + "' onclick = 'changeWeapon2(\"dualSwords\", " + i + ")' src = './img/weapon/" + dualSwords[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Hyejin) {
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img class = '" + shuriken[i].Rarity + "' title = '" + shuriken[i].Title + "' onclick = 'changeWeapon2(\"shuriken\", " + i + ")' src = './img/weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < bow.length; i++) {
				list += "<img class = '" + bow[i].Rarity + "' title = '" + bow[i].Title + "' onclick = 'changeWeapon2(\"bow\", " + i + ")' src = './img/weapon/" + bow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Xiukai) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img class = '" + dagger[i].Rarity + "' title = '" + dagger[i].Title + "' onclick = 'changeWeapon2(\"dagger\", " + i + ")' src = './img/weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < spear.length; i++) {
				list += "<img class = '" + spear[i].Rarity + "' title = '" + spear[i].Title + "' onclick = 'changeWeapon2(\"spear\", " + i + ")' src = './img/weapon/" + spear[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Chiara) {
			for (let i = 0; i < rapier.length; i++) {
				list += "<img class = '" + rapier[i].Rarity + "' title = '" + rapier[i].Title + "' onclick = 'changeWeapon2(\"rapier\", " + i + ")' src = './img/weapon/" + rapier[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Sissela) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img class = '" + throws[i].Rarity + "' title = '" + throws[i].Title + "' onclick = 'changeWeapon2(\"throws\", " + i + ")' src = './img/weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img class = '" + shuriken[i].Rarity + "' title = '" + shuriken[i].Title + "' onclick = 'changeWeapon2(\"shuriken\", " + i + ")' src = './img/weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Adriana) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img class = '" + throws[i].Rarity + "' title = '" + throws[i].Title + "' onclick = 'changeWeapon2(\"throws\", " + i + ")' src = './img/weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Shoichi) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img class = '" + dagger[i].Rarity + "' title = '" + dagger[i].Title + "' onclick = 'changeWeapon2(\"dagger\", " + i + ")' src = './img/weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Silvia) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img class = '" + pistol[i].Rarity + "' title = '" + pistol[i].Title + "' onclick = 'changeWeapon2(\"pistol\", " + i + ")' src = './img/weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Emma) {
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img class = '" + shuriken[i].Rarity + "' title = '" + shuriken[i].Title + "' onclick = 'changeWeapon2(\"shuriken\", " + i + ")' src = './img/weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		}
		list += "<img title = 'remove weapon' onclick = 'changeWeapon2(\"\", 0)' src = './img/weapon/blank.png' width = '128px' height = '71px' border = '1'>";
		document.querySelector('#s_itemList2').innerHTML = list;
		document.querySelector('#d_itemList2').style.display = 'block';
	}
}