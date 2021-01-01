function setCookie(name, value, days) {
	value = escape(value)
	if (days) {    			
		const exDate = new Date();
		exDate.setDate(exDate.getDate() + days);
		value += '; expires=' + exDate;
	}
	document.cookie = name + '=' + escape(value);
}
function getCookie(name) {
	let key, value, values = document.cookie + '; ';
	values = values.split('; ');
	for (let i = 0; i < values.length; i++) {
		key = values[i].substr(0, values[i].indexOf('='));
		if (key == name) {
			value = unescape(values[i].substr(key.length + 1));
			value = value.substr(0, value.indexOf(';'));
			return value;
		}
	}
	return null;
}
function settingQm() {
	document.querySelector('#d_qm_setting').style.display = 'block';
}
function closeQmSetting() {
	document.querySelector('#d_qm_setting').style.display = 'none';
}
function quickMastery() {
	for (let c = 0; c < characters.length; c++) {
		const character = characters[c].DIV;

		character.querySelector('.level').selectedIndex = 
		document.querySelector('#c_level').selectedIndex;
		character.querySelector('.weapon_mastery').selectedIndex = 
		document.querySelector('#c_weapon_mastery').selectedIndex;

		character.querySelector('.hunt_mastery').selectedIndex = 
		document.querySelector('#c_hunt_mastery').selectedIndex;
		character.querySelector('.craft_mastery').selectedIndex = 
		document.querySelector('#c_craft_mastery').selectedIndex;
		character.querySelector('.search_mastery').selectedIndex = 
		document.querySelector('#c_search_mastery').selectedIndex;
		character.querySelector('.move_mastery').selectedIndex = 
		document.querySelector('#c_move_mastery').selectedIndex;
		
		character.querySelector('.health_mastery').selectedIndex = 
		document.querySelector('#c_health_mastery').selectedIndex;
		character.querySelector('.defense_mastery').selectedIndex = 
		document.querySelector('#c_defense_mastery').selectedIndex;
		character.querySelector('.meditation_mastery').selectedIndex = 
		document.querySelector('#c_meditation_mastery').selectedIndex;
		character.querySelector('.trap_mastery').selectedIndex = 
		document.querySelector('#c_trap_mastery').selectedIndex;
		
		character.querySelector('.q_level').selectedIndex = 4;
		character.querySelector('.w_level').selectedIndex = 4;
		character.querySelector('.e_level').selectedIndex = 4;
		character.querySelector('.r_level').selectedIndex = 2;
		character.querySelector('.t_level').selectedIndex = 2;
	}
	updateDisplay();
}
document.addEventListener('DOMContentLoaded', (e) => {
	let cookie;
	if (cookie = getCookie('c_level')) {
		document.querySelector('#c_level').selectedIndex = cookie;
	} else {
		document.querySelector('#c_level').selectedIndex = 15;
	}
	document.querySelector('#c_level').addEventListener('change', (e) => {
		setCookie('c_level', document.querySelector('#c_level').selectedIndex, 7);
	});
	
	if (cookie = getCookie('c_weapon_mastery')) {
		document.querySelector('#c_weapon_mastery').selectedIndex = cookie;
	} else {
		document.querySelector('#c_weapon_mastery').selectedIndex = 13;
	}
	document.querySelector('#c_weapon_mastery').addEventListener('change', (e) => {
		setCookie('c_weapon_mastery', document.querySelector('#c_weapon_mastery').selectedIndex, 7);
	});
	
	if (cookie = getCookie('c_hunt_mastery')) {
		document.querySelector('#c_hunt_mastery').selectedIndex = cookie;
	} else {
		document.querySelector('#c_hunt_mastery').selectedIndex = 17;
	}
	document.querySelector('#c_hunt_mastery').addEventListener('change', (e) => {
		setCookie('c_hunt_mastery', document.querySelector('#c_hunt_mastery').selectedIndex, 7);
	});
	if (cookie = getCookie('c_craft_mastery')) {
		document.querySelector('#c_craft_mastery').selectedIndex = cookie;
	} else {
		document.querySelector('#c_craft_mastery').selectedIndex = 12;
	}
	document.querySelector('#c_craft_mastery').addEventListener('change', (e) => {
		setCookie('c_craft_mastery', document.querySelector('#c_craft_mastery').selectedIndex, 7);
	});
	if (cookie = getCookie('c_search_mastery')) {
		document.querySelector('#c_search_mastery').selectedIndex = cookie;
	} else {
		document.querySelector('#c_search_mastery').selectedIndex = 12;
	}
	document.querySelector('#c_search_mastery').addEventListener('change', (e) => {
		setCookie('c_search_mastery', document.querySelector('#c_search_mastery').selectedIndex.value, 7);
	});
	if (cookie = getCookie('c_move_mastery')) {
		document.querySelector('#c_move_mastery').selectedIndex = cookie;
	} else {
		document.querySelector('#c_move_mastery').selectedIndex = 17;
	}
	document.querySelector('#c_move_mastery').addEventListener('change', (e) => {
		setCookie('c_move_mastery', document.querySelector('#c_move_mastery').selectedIndex, 7);
	});
	
	if (cookie = getCookie('c_health_mastery')) {
		document.querySelector('#c_health_mastery').selectedIndex = cookie;
	} else {
		document.querySelector('#c_health_mastery').selectedIndex = 7;
	}
	document.querySelector('#c_health_mastery').addEventListener('change', (e) => {
		setCookie('c_health_mastery', document.querySelector('#c_health_mastery').selectedIndex, 7);
	});
	if (cookie = getCookie('c_defense_mastery')) {
		document.querySelector('#c_defense_mastery').selectedIndex = cookie;
	} else {
		document.querySelector('#c_defense_mastery').selectedIndex = 12;
	}
	document.querySelector('#c_defense_mastery').addEventListener('change', (e) => {
		setCookie('c_defense_mastery', document.querySelector('#c_defense_mastery').selectedIndex, 7);
	});
	if (cookie = getCookie('c_meditation_mastery')) {
		document.querySelector('#c_meditation_mastery').selectedIndex = cookie;
	} else {
		document.querySelector('#c_meditation_mastery').selectedIndex = 7;
	}
	document.querySelector('#c_meditation_mastery').addEventListener('change', (e) => {
		setCookie('c_meditation_mastery', document.querySelector('#c_meditation_mastery').selectedIndex, 7);
	});
	if (cookie = getCookie('c_trap_mastery')) {
		document.querySelector('#c_trap_mastery').selectedIndex = cookie;
	} else {
		document.querySelector('#c_trap_mastery').selectedIndex = 1;
	}
	document.querySelector('#c_trap_mastery').addEventListener('change', (e) => {
		setCookie('c_trap_mastery', document.querySelector('#c_trap_mastery').selectedIndex, 7);
	});
});