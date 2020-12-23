document.addEventListener('DOMContentLoaded', (e) => {
	document.querySelector('#character').addEventListener('change', (e) => {
		let select = document.querySelector('#character').value;
		if ('Jackie' == select) {
			document.querySelector('#i_character').src = './img/character/Jackie.png';
			character = Jackie;
			document.querySelector('#t_damage').innerHTML = "<b> _ weak: </b><input id = 'tw' type = 'checkbox'><b> strong: </b><input id = 'ts' type = 'checkbox'>";
			if (weapon != undefined) {
				if (weapon.Type != 'Dagger' && 
						weapon.Type != 'TwoHandedSword' && 
						weapon.Type != 'Axe' && 
						weapon.Type != 'DualSwords') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
			document.querySelector('#tw').addEventListener('change', (e) => {
				updateDisplay();
			});
			document.querySelector('#ts').addEventListener('change', (e) => {
				updateDisplay();
			});
		} else if ('Aya' == select) {
			document.querySelector('#i_character').src = './img/character/Aya.png';
			character = Aya;
			if (weapon != undefined) {
				if (weapon.Type != 'Pistol' && 
						weapon.Type != 'AssaultRifle' && 
						weapon.Type != 'SniperRifle') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Fiora' == select) {
			document.querySelector('#i_character').src = './img/character/Fiora.png';
			character = Fiora;
			if (weapon != undefined) {
				if (weapon.Type != 'TwoHandedSword' && 
						weapon.Type != 'Rapier' && 
						weapon.Type != 'Spear') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Magnus' == select) {
			document.querySelector('#i_character').src = './img/character/Magnus.png';
			character = Magnus;
			if (weapon != undefined) {
				if (weapon.Type != 'Hammer' && 
						weapon.Type != 'Bat') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Zahir' == select) {
			document.querySelector('#i_character').src = './img/character/Zahir.png';
			character = Zahir;
			if (weapon != undefined) {
				if (weapon.Type != 'Throws' && 
						weapon.Type != 'Shuriken') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Nadine' == select) {
			document.querySelector('#i_character').src = './img/character/Nadine.png';
			character = Nadine;
			document.querySelector('#t_damage').innerHTML = "<input id = 'stack' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				}
				updateDisplay();
			});
			if (weapon != undefined) {
				if (weapon.Type != 'Bow' && 
						weapon.Type != 'Crossbow') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Hyunwoo' == select) {
			document.querySelector('#i_character').src = './img/character/Hyunwoo.png';
			character = Hyunwoo;
			if (weapon != undefined) {
				if (weapon.Type != 'Glove' && 
						weapon.Type != 'Tonfa') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Hart' == select) {
			document.querySelector('#i_character').src = './img/character/Hart.png';
			character = Hart;
			if (weapon != undefined) {
				if (weapon.Type != 'Guitar') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Isol' == select) {
			document.querySelector('#i_character').src = './img/character/Isol.png';
			character = Isol;
			if (weapon != undefined) {
				if (weapon.Type != 'Pistol' && 
						weapon.Type != 'AssaultRifle') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Li Dailin' == select) {
			document.querySelector('#i_character').src = './img/character/Li_Dailin.png';
			character = Li_Dailin;
			if (weapon != undefined) {
				if (weapon.Type != 'Glove' && 
						weapon.Type != 'Nunchaku') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Yuki' == select) {
			document.querySelector('#i_character').src = './img/character/Yuki.png';
			character = Yuki;
			if (weapon != undefined) {
				if (weapon.Type != 'TwoHandedSword' && 
						weapon.Type != 'DualSwords') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Hyejin' == select) {
			document.querySelector('#i_character').src = './img/character/Hyejin.png';
			character = Hyejin;
			if (weapon != undefined) {
				if (weapon.Type != 'Bow' && 
						weapon.Type != 'Crossbow') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Xiukai' == select) {
			document.querySelector('#i_character').src = './img/character/Xiukai.png';
			character = Xiukai;
			document.querySelector('#t_damage').innerHTML = "<input id = 'stack' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				}
				updateDisplay();
			});
			if (weapon != undefined) {
				if (weapon.Type != 'Dagger' && 
						weapon.Type != 'Spear') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Chiara' == select) {
			document.querySelector('#i_character').src = './img/character/Chiara.png';
			character = Chiara;
			document.querySelector('#t_damage').innerHTML = "<input id = 'stack' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				} else if (stack.value > 4) {
					stack.value = 4;
				}
				if (character2 != undefined) {					
					updateDisplay2();
				}
			});
			if (weapon != undefined) {
				if (weapon.Type != 'Rapier') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Sissela' == select) {
			document.querySelector('#i_character').src = './img/character/Sissela.png';
			character = Sissela;
			document.querySelector('#t_damage').innerHTML = "<span id='tt_damage'>0</span><br>" + 
				"Lost Hp: <input id = 'stack' type = 'number' value = '0' style = 'width: 40px'>% _ R : " + 
				"<input id = 'tr' type = 'checkbox'>";
			document.querySelector('#stack').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				} else if (stack.value > 100) {
					stack.value = 100;
				}
				updateDisplay();
			});
			document.querySelector('#tr').addEventListener('change', (e) => {
				updateDisplay();
			});
			if (weapon != undefined) {
				if (weapon.Type != 'Throws' && 
						weapon.Type != 'Shuriken') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Adriana' == select) {
			document.querySelector('#i_character').src = './img/character/Adriana.png';
			character = Adriana;
			if (weapon != undefined) {
				if (weapon.Type != 'Throws') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Shoichi' == select) {
			document.querySelector('#i_character').src = './img/character/Shoichi.png';
			character = Shoichi;
			document.querySelector('#t_damage').innerHTML = "<span id='tt_damage'>0</span> / <input id = 'stack' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				} else if (stack.value > 5) {
					stack.value = 5;
				}
				updateDisplay();
			});
			if (weapon != undefined) {
				if (weapon.Type != 'Dagger') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Silvia' == select) {
			document.querySelector('#i_character').src = './img/character/Silvia.png';
			character = Silvia;
			document.querySelector('#t_damage').innerHTML = "<input id = 'stack' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				} else if (stack.value > 15) {
					stack.value = 15;
				}
				updateDisplay();
			});
			if (weapon != undefined) {
				if (weapon.Type != 'Pistol') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		} else if ('Emma' == select) {
			document.querySelector('#i_character').src = './img/character/Emma.png';
			character = Emma;
			if (weapon != undefined) {
				if (weapon.Type != 'Shuriken') {
					weapon = null;
					document.querySelector('#weapon').innerHTML = '';
				}
			}
		}
		updateDisplay();
	});
});
document.addEventListener('DOMContentLoaded', (e) => {
	document.querySelector('#character2').addEventListener('change', (e) => {
		let select = document.querySelector('#character2').value;
		if ('Jackie' == select) {
			document.querySelector('#i_character2').src = './img/character/Jackie.png';
			character2 = Jackie;
			document.querySelector('#t_damage2').innerHTML = "<b> _ weak: </b><input id = 'tw2' type = 'checkbox'><b> strong: </b><input id = 'ts2' type = 'checkbox'>";
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Dagger' && 
						weapon2.Type != 'TwoHandedSword' && 
						weapon2.Type != 'Axe' && 
						weapon2.Type != 'DualSwords') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
			document.querySelector('#tw2').addEventListener('change', (e) => {
				updateDisplay2();
			});
			document.querySelector('#ts2').addEventListener('change', (e) => {
				updateDisplay2();
			});
		} else if ('Aya' == select) {
			document.querySelector('#i_character2').src = './img/character/Aya.png';
			character2 = Aya;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Pistol' && 
						weapon2.Type != 'AssaultRifle' && 
						weapon2.Type != 'SniperRifle') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Fiora' == select) {
			document.querySelector('#i_character2').src = './img/character/Fiora.png';
			character2 = Fiora;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'TwoHandedSword' && 
						weapon2.Type != 'Rapier' && 
						weapon2.Type != 'Spear') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Magnus' == select) {
			document.querySelector('#i_character2').src = './img/character/Magnus.png';
			character2 = Magnus;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Hammer' && 
						weapon2.Type != 'Bat') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Zahir' == select) {
			document.querySelector('#i_character2').src = './img/character/Zahir.png';
			character2 = Zahir;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Throws' && 
						weapon2.Type != 'Shuriken') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Nadine' == select) {
			document.querySelector('#i_character2').src = './img/character/Nadine.png';
			character2 = Nadine;
			document.querySelector('#t_damage2').innerHTML = "<input id = 'stack2' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack2').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack2');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				}
				updateDisplay2();
			});
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Bow' && 
						weapon2.Type != 'Crossbow') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Hyunwoo' == select) {
			document.querySelector('#i_character2').src = './img/character/Hyunwoo.png';
			character2 = Hyunwoo;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Glove' && 
						weapon2.Type != 'Tonfa') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Hart' == select) {
			document.querySelector('#i_character2').src = './img/character/Hart.png';
			character2 = Hart;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Guitar') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Isol' == select) {
			document.querySelector('#i_character2').src = './img/character/Isol.png';
			character2 = Isol;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Pistol' && 
						weapon2.Type != 'AssaultRifle') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Li Dailin' == select) {
			document.querySelector('#i_character2').src = './img/character/Li_Dailin.png';
			character2 = Li_Dailin;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Glove' && 
						weapon2.Type != 'Nunchaku') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Yuki' == select) {
			document.querySelector('#i_character2').src = './img/character/Yuki.png';
			character2 = Yuki;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'TwoHandedSword' && 
						weapon2.Type != 'DualSwords') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Hyejin' == select) {
			document.querySelector('#i_character2').src = './img/character/Hyejin.png';
			character2 = Hyejin;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Bow' && 
						weapon2.Type != 'Crossbow') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Xiukai' == select) {
			document.querySelector('#i_character2').src = './img/character/Xiukai.png';
			character2 = Xiukai;
			document.querySelector('#t_damage2').innerHTML = "<input id = 'stack2' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack2').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack2');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				}
				updateDisplay2();
			});
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Dagger' && 
						weapon2.Type != 'Spear') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Chiara' == select) {
			document.querySelector('#i_character2').src = './img/character/Chiara.png';
			character2 = Chiara;
			document.querySelector('#t_damage2').innerHTML = "<input id = 'stack2' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack2').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack2');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				} else if (stack.value > 4) {
					stack.value = 4;
				}
				if (character != undefined) {					
					updateDisplay();
				}
			});
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Rapier') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Sissela' == select) {
			document.querySelector('#i_character2').src = './img/character/Sissela.png';
			character2 = Sissela;
			document.querySelector('#t_damage2').innerHTML = "<span id='tt_damage2'>0</span><br>" + 
				"Lost Hp: <input id = 'stack2' type = 'number' value = '0' style = 'width: 40px'>% _ R : " + 
				"<input id = 'tr2' type = 'checkbox'>";
			document.querySelector('#stack2').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack2');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				} else if (stack.value > 100) {
					stack.value = 100;
				}
				updateDisplay2();
			});
			document.querySelector('#tr2').addEventListener('change', (e) => {
				updateDisplay2();
			});
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Throws' && 
						weapon2.Type != 'Shuriken') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Adriana' == select) {
			document.querySelector('#i_character2').src = './img/character/Adriana.png';
			character2 = Adriana;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Throws') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Shoichi' == select) {
			document.querySelector('#i_character2').src = './img/character/Shoichi.png';
			character2 = Shoichi;
			document.querySelector('#t_damage2').innerHTML = "<span id='tt_damage2'>0</span> / <input id = 'stack2' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack2').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack2');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				} else if (stack.value > 5) {
					stack.value = 5;
				}
				updateDisplay2();
			});
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Dagger') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Silvia' == select) {
			document.querySelector('#i_character2').src = './img/character/Silvia.png';
			character2 = Silvia;
			document.querySelector('#t_damage2').innerHTML = "<input id = 'stack2' type = 'number' value = '0' style = 'width: 40px'><b>Stack</b>";
			document.querySelector('#stack2').addEventListener('change', (e) => {
				let stack = document.querySelector('#stack2');
				if (stack.value == '' || stack.value < 0) {
					stack.value = 0;
				} else if (stack.value > 15) {
					stack.value = 15;
				}
				updateDisplay2();
			});
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Pistol') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		} else if ('Emma' == select) {
			document.querySelector('#i_character2').src = './img/character/Emma.png';
			character2 = Emma;
			if (weapon2 != undefined) {
				if (weapon2.Type != 'Bow' && 
						weapon2.Type != 'Crossbow') {
					weapon2 = null;
					document.querySelector('#weapon2').innerHTML = '';
				}
			}
		}
		updateDisplay2();
	});
});