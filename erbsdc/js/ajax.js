ajax = (config) => {
	var req = new XMLHttpRequest();
	req.onreadystatechange = () => {
		if (req.readyState == 4) {
			if (req.status == 200) {
				config.success == undefined ? () => {alert(req.responseText);} : config.success(req.responseText);
			} else {
				config.error == undefined ? () => {res = req.status; alert(req.status);} : config.error(req.status);
			}
		}
	}
	req.open(
			config.method == undefined ? 'GET' : config.method, 
			config.url + (config.param == undefined ? '' : config.param), 
			config.async == undefined ? true : config.async
	);
	req.send();
}