function selectWeapon() {
	if (character == undefined) {
		alert('select character plz');
	} else {				
		let list = '';
		let index = 0;
		if (character == Jackie) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img title = '" + dagger[i].Name + "' onclick = 'changeWeapon(\"dagger\", " + i + ")' src = './weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img title = '" + twoHandedSword[i].Name + "' onclick = 'changeWeapon(\"twoHandedSword\", " + i + ")' src = './weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < axe.length; i++) {
				list += "<img title = '" + axe[i].Name + "' onclick = 'changeWeapon(\"axe\", " + i + ")' src = './weapon/" + axe[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < dualSwords.length; i++) {
				list += "<img title = '" + dualSwords[i].Name + "' onclick = 'changeWeapon(\"dualSwords\", " + i + ")' src = './weapon/" + dualSwords[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Aya) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img title = '" + pistol[i].Name + "' onclick = 'changeWeapon(\"pistol\", " + i + ")' src = './weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < assaultRifle.length; i++) {
				list += "<img title = '" + assaultRifle[i].Name + "' onclick = 'changeWeapon(\"assaultRifle\", " + i + ")' src = './weapon/" + assaultRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < sniperRifle.length; i++) {
				list += "<img title = '" + sniperRifle[i].Name + "' onclick = 'changeWeapon(\"sniperRifle\", " + i + ")' src = './weapon/" + sniperRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Fiora) {
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img title = '" + twoHandedSword[i].Name + "' onclick = 'changeWeapon(\"twoHandedSword\", " + i + ")' src = './weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < rapier.length; i++) {
				list += "<img title = '" + rapier[i].Name + "' onclick = 'changeWeapon(\"rapier\", " + i + ")' src = './weapon/" + rapier[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < spear.length; i++) {
				list += "<img title = '" + spear[i].Name + "' onclick = 'changeWeapon(\"spear\", " + i + ")' src = './weapon/" + spear[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Magnus) {
			for (let i = 0; i < hammer.length; i++) {
				list += "<img title = '" + hammer[i].Name + "' onclick = 'changeWeapon(\"hammer\", " + i + ")' src = './weapon/" + hammer[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < bat.length; i++) {
				list += "<img title = '" + bat[i].Name + "' onclick = 'changeWeapon(\"bat\", " + i + ")' src = './weapon/" + bat[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Zahir) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img title = '" + throws[i].Name + "' onclick = 'changeWeapon(\"throws\", " + i + ")' src = './weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img title = '" + shuriken[i].Name + "' onclick = 'changeWeapon(\"shuriken\", " + i + ")' src = './weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Nadine) {
			for (let i = 0; i < bow.length; i++) {
				list += "<img title = '" + bow[i].Name + "' onclick = 'changeWeapon(\"bow\", " + i + ")' src = './weapon/" + bow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < crossbow.length; i++) {
				list += "<img title = '" + crossbow[i].Name + "' onclick = 'changeWeapon(\"crossbow\", " + i + ")' src = './weapon/" + crossbow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Hyunwoo) {
			for (let i = 0; i < glove.length; i++) {
				list += "<img title = '" + glove[i].Name + "' onclick = 'changeWeapon(\"glove\", " + i + ")' src = './weapon/" + glove[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < tonfa.length; i++) {
				list += "<img title = '" + tonfa[i].Name + "' onclick = 'changeWeapon(\"tonfa\", " + i + ")' src = './weapon/" + tonfa[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Hart) {
			for (let i = 0; i < guitar.length; i++) {
				list += "<img title = '" + guitar[i].Name + "' onclick = 'changeWeapon(\"guitar\", " + i + ")' src = './weapon/" + guitar[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Isol) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img title = '" + pistol[i].Name + "' onclick = 'changeWeapon(\"pistol\", " + i + ")' src = './weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < assaultRifle.length; i++) {
				list += "<img title = '" + assaultRifle[i].Name + "' onclick = 'changeWeapon(\"assaultRifle\", " + i + ")' src = './weapon/" + assaultRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Li_Dailin) {
			for (let i = 0; i < glove.length; i++) {
				list += "<img title = '" + glove[i].Name + "' onclick = 'changeWeapon(\"glove\", " + i + ")' src = './weapon/" + glove[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < nunchaku.length; i++) {
				list += "<img title = '" + nunchaku[i].Name + "' onclick = 'changeWeapon(\"nunchaku\", " + i + ")' src = './weapon/" + nunchaku[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Yuki) {
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img title = '" + twoHandedSword[i].Name + "' onclick = 'changeWeapon(\"twoHandedSword\", " + i + ")' src = './weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < dualSwords.length; i++) {
				list += "<img title = '" + dualSwords[i].Name + "' onclick = 'changeWeapon(\"dualSwords\", " + i + ")' src = './weapon/" + dualSwords[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Hyejin) {
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img title = '" + shuriken[i].Name + "' onclick = 'changeWeapon(\"shuriken\", " + i + ")' src = './weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < bow.length; i++) {
				list += "<img title = '" + bow[i].Name + "' onclick = 'changeWeapon(\"bow\", " + i + ")' src = './weapon/" + bow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Xiukai) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img title = '" + dagger[i].Name + "' onclick = 'changeWeapon(\"dagger\", " + i + ")' src = './weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < spear.length; i++) {
				list += "<img title = '" + spear[i].Name + "' onclick = 'changeWeapon(\"spear\", " + i + ")' src = './weapon/" + spear[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Chiara) {
			for (let i = 0; i < rapier.length; i++) {
				list += "<img title = '" + rapier[i].Name + "' onclick = 'changeWeapon(\"rapier\", " + i + ")' src = './weapon/" + rapier[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Sissela) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img title = '" + throws[i].Name + "' onclick = 'changeWeapon(\"throws\", " + i + ")' src = './weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img title = '" + shuriken[i].Name + "' onclick = 'changeWeapon(\"shuriken\", " + i + ")' src = './weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Adriana) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img title = '" + throws[i].Name + "' onclick = 'changeWeapon(\"throws\", " + i + ")' src = './weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Shoichi) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img title = '" + dagger[i].Name + "' onclick = 'changeWeapon(\"dagger\", " + i + ")' src = './weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character == Silvia) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img title = '" + pistol[i].Name + "' onclick = 'changeWeapon(\"pistol\", " + i + ")' src = './weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		}
		list += "<img title = 'remove weapon' onclick = 'changeWeapon(\"\", 0)' src = './weapon/blank.png' width = '128px' height = '71px' border = '1'>";
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
				list += "<img title = '" + dagger[i].Name + "' onclick = 'changeWeapon2(\"dagger\", " + i + ")' src = './weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img title = '" + twoHandedSword[i].Name + "' onclick = 'changeWeapon2(\"twoHandedSword\", " + i + ")' src = './weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < axe.length; i++) {
				list += "<img title = '" + axe[i].Name + "' onclick = 'changeWeapon2(\"axe\", " + i + ")' src = './weapon/" + axe[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < dualSwords.length; i++) {
				list += "<img title = '" + dualSwords[i].Name + "' onclick = 'changeWeapon2(\"dualSwords\", " + i + ")' src = './weapon/" + dualSwords[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Aya) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img title = '" + pistol[i].Name + "' onclick = 'changeWeapon2(\"pistol\", " + i + ")' src = './weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < assaultRifle.length; i++) {
				list += "<img title = '" + assaultRifle[i].Name + "' onclick = 'changeWeapon2(\"assaultRifle\", " + i + ")' src = './weapon/" + assaultRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < sniperRifle.length; i++) {
				list += "<img title = '" + sniperRifle[i].Name + "' onclick = 'changeWeapon2(\"sniperRifle\", " + i + ")' src = './weapon/" + sniperRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Fiora) {
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img title = '" + twoHandedSword[i].Name + "' onclick = 'changeWeapon2(\"twoHandedSword\", " + i + ")' src = './weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < rapier.length; i++) {
				list += "<img title = '" + rapier[i].Name + "' onclick = 'changeWeapon2(\"rapier\", " + i + ")' src = './weapon/" + rapier[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < spear.length; i++) {
				list += "<img title = '" + spear[i].Name + "' onclick = 'changeWeapon2(\"spear\", " + i + ")' src = './weapon/" + spear[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Magnus) {
			for (let i = 0; i < hammer.length; i++) {
				list += "<img title = '" + hammer[i].Name + "' onclick = 'changeWeapon2(\"hammer\", " + i + ")' src = './weapon/" + hammer[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < bat.length; i++) {
				list += "<img title = '" + bat[i].Name + "' onclick = 'changeWeapon2(\"bat\", " + i + ")' src = './weapon/" + bat[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Zahir) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img title = '" + throws[i].Name + "' onclick = 'changeWeapon2(\"throws\", " + i + ")' src = './weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img title = '" + shuriken[i].Name + "' onclick = 'changeWeapon2(\"shuriken\", " + i + ")' src = './weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Nadine) {
			for (let i = 0; i < bow.length; i++) {
				list += "<img title = '" + bow[i].Name + "' onclick = 'changeWeapon2(\"bow\", " + i + ")' src = './weapon/" + bow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < crossbow.length; i++) {
				list += "<img title = '" + crossbow[i].Name + "' onclick = 'changeWeapon2(\"crossbow\", " + i + ")' src = './weapon/" + crossbow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Hyunwoo) {
			for (let i = 0; i < glove.length; i++) {
				list += "<img title = '" + glove[i].Name + "' onclick = 'changeWeapon2(\"glove\", " + i + ")' src = './weapon/" + glove[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < tonfa.length; i++) {
				list += "<img title = '" + tonfa[i].Name + "' onclick = 'changeWeapon2(\"tonfa\", " + i + ")' src = './weapon/" + tonfa[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Hart) {
			for (let i = 0; i < guitar.length; i++) {
				list += "<img title = '" + guitar[i].Name + "' onclick = 'changeWeapon2(\"guitar\", " + i + ")' src = './weapon/" + guitar[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Isol) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img title = '" + pistol[i].Name + "' onclick = 'changeWeapon2(\"pistol\", " + i + ")' src = './weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < assaultRifle.length; i++) {
				list += "<img title = '" + assaultRifle[i].Name + "' onclick = 'changeWeapon2(\"assaultRifle\", " + i + ")' src = './weapon/" + assaultRifle[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Li_Dailin) {
			for (let i = 0; i < glove.length; i++) {
				list += "<img title = '" + glove[i].Name + "' onclick = 'changeWeapon2(\"glove\", " + i + ")' src = './weapon/" + glove[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < nunchaku.length; i++) {
				list += "<img title = '" + nunchaku[i].Name + "' onclick = 'changeWeapon2(\"nunchaku\", " + i + ")' src = './weapon/" + nunchaku[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Yuki) {
			for (let i = 0; i < twoHandedSword.length; i++) {
				list += "<img title = '" + twoHandedSword[i].Name + "' onclick = 'changeWeapon2(\"twoHandedSword\", " + i + ")' src = './weapon/" + twoHandedSword[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < dualSwords.length; i++) {
				list += "<img title = '" + dualSwords[i].Name + "' onclick = 'changeWeapon2(\"dualSwords\", " + i + ")' src = './weapon/" + dualSwords[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Hyejin) {
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img title = '" + shuriken[i].Name + "' onclick = 'changeWeapon2(\"shuriken\", " + i + ")' src = './weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < bow.length; i++) {
				list += "<img title = '" + bow[i].Name + "' onclick = 'changeWeapon2(\"bow\", " + i + ")' src = './weapon/" + bow[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Xiukai) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img title = '" + dagger[i].Name + "' onclick = 'changeWeapon2(\"dagger\", " + i + ")' src = './weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < spear.length; i++) {
				list += "<img title = '" + spear[i].Name + "' onclick = 'changeWeapon2(\"spear\", " + i + ")' src = './weapon/" + spear[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Chiara) {
			for (let i = 0; i < rapier.length; i++) {
				list += "<img title = '" + rapier[i].Name + "' onclick = 'changeWeapon2(\"rapier\", " + i + ")' src = './weapon/" + rapier[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Sissela) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img title = '" + throws[i].Name + "' onclick = 'changeWeapon2(\"throws\", " + i + ")' src = './weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
			for (let i = 0; i < shuriken.length; i++) {
				list += "<img title = '" + shuriken[i].Name + "' onclick = 'changeWeapon2(\"shuriken\", " + i + ")' src = './weapon/" + shuriken[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Adriana) {
			for (let i = 0; i < throws.length; i++) {
				list += "<img title = '" + throws[i].Name + "' onclick = 'changeWeapon2(\"throws\", " + i + ")' src = './weapon/" + throws[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Shoichi) {
			for (let i = 0; i < dagger.length; i++) {
				list += "<img title = '" + dagger[i].Name + "' onclick = 'changeWeapon2(\"dagger\", " + i + ")' src = './weapon/" + dagger[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		} else if (character2 == Silvia) {
			for (let i = 0; i < pistol.length; i++) {
				list += "<img title = '" + pistol[i].Name + "' onclick = 'changeWeapon2(\"pistol\", " + i + ")' src = './weapon/" + pistol[i].Name + ".png' width = '128px' height = '71px' border = '1'>";
				if (++index == 3) {
					index = 0;
					list += '<br>';
				}
			}
		}
		list += "<img title = 'remove weapon' onclick = 'changeWeapon2(\"\", 0)' src = './weapon/blank.png' width = '128px' height = '71px' border = '1'>";
		document.querySelector('#s_itemList2').innerHTML = list;
		document.querySelector('#d_itemList2').style.display = 'block';
	}
}
