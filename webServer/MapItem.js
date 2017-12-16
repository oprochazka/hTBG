class MapItem {
	constructor(name, url)
	{
		this.name = name;
		this.url = url;
	}

	json()
	{
		return JSON.stringify({name: this.name, url: this.url});
	}
}

module.exports = MapItem;