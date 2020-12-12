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
	let key, values = document.cookie + '; ';
	values = values.split('; ');
	for (let i = 0; i < values.length; i++) {
		io = values[i].indexOf('=');
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
	if (character != undefined) {
		document.querySelector('#level').selectedIndex = 
		document.querySelector('#c_level').selectedIndex;
		document.querySelector('#weapon_mastery').selectedIndex = 
		document.querySelector('#c_weapon_mastery').selectedIndex;
		document.querySelector('#hunt_mastery').selectedIndex = 
		document.querySelector('#c_hunt_mastery').selectedIndex;
		document.querySelector('#craft_mastery').selectedIndex = 
		document.querySelector('#c_craft_mastery').selectedIndex;
		document.querySelector('#search_mastery').selectedIndex = 
		document.querySelector('#c_search_mastery').selectedIndex;
		document.querySelector('#move_mastery').selectedIndex = 
		document.querySelector('#c_move_mastery').selectedIndex;
		document.querySelector('#health_mastery').selectedIndex = 
		document.querySelector('#c_health_mastery').selectedIndex;
		document.querySelector('#defense_mastery').selectedIndex = 
		document.querySelector('#c_defense_mastery').selectedIndex;
		document.querySelector('#meditation_mastery').selectedIndex = 
		document.querySelector('#c_meditation_mastery').selectedIndex;
		document.querySelector('#trap_mastery').selectedIndex = 
		document.querySelector('#c_trap_mastery').selectedIndex;
		
		document.querySelector('#q_level').selectedIndex = 4;
		document.querySelector('#w_level').selectedIndex = 4;
		document.querySelector('#e_level').selectedIndex = 4;
		document.querySelector('#r_level').selectedIndex = 2;
		document.querySelector('#t_level').selectedIndex = 2;
		updateDisplay();
	}
	if (character2 != undefined) {
		document.querySelector('#level2').selectedIndex = 
		document.querySelector('#c_level').selectedIndex;
		document.querySelector('#weapon_mastery2').selectedIndex = 
		document.querySelector('#c_weapon_mastery').selectedIndex;
		document.querySelector('#hunt_mastery2').selectedIndex = 
		document.querySelector('#c_hunt_mastery').selectedIndex;
		document.querySelector('#craft_mastery2').selectedIndex = 
		document.querySelector('#c_craft_mastery').selectedIndex;
		document.querySelector('#search_mastery2').selectedIndex = 
		document.querySelector('#c_search_mastery').selectedIndex;
		document.querySelector('#move_mastery2').selectedIndex = 
		document.querySelector('#c_move_mastery').selectedIndex;
		document.querySelector('#health_mastery2').selectedIndex = 
		document.querySelector('#c_health_mastery').selectedIndex;
		document.querySelector('#defense_mastery2').selectedIndex = 
		document.querySelector('#c_defense_mastery').selectedIndex;
		document.querySelector('#meditation_mastery2').selectedIndex = 
		document.querySelector('#c_meditation_mastery').selectedIndex;
		document.querySelector('#trap_mastery2').selectedIndex = 
		document.querySelector('#c_trap_mastery').selectedIndex;
		
		document.querySelector('#q_level2').selectedIndex = 4;
		document.querySelector('#w_level2').selectedIndex = 4;
		document.querySelector('#e_level2').selectedIndex = 4;
		document.querySelector('#r_level2').selectedIndex = 2;
		document.querySelector('#t_level2').selectedIndex = 2;;
		updateDisplay2();
	}
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