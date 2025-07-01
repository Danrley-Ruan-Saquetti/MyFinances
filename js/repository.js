class LocalStorageRepository {

	constructor(resourceName) {
		this.resourceName = resourceName
		this.storageKey = `repo_${resourceName}`
		this.idKey = `repo_${resourceName}.count-id`
	}

	getAll() {
		return this._getAllData()
	}

	getById(id) {
		return this._getAllData().find(item => item.id === id) || null
	}

	create(data) {
		const all = this._getAllData()
		const newItem = { id: this._getNextId(), ...data }

		all.push(newItem)
		this._saveAllData(all)

		return newItem
	}

	update(id, data) {
		const all = this._getAllData()
		const index = all.findIndex(item => item.id === id)

		if (index === -1) {
			return null
		}

		all[index] = data

		this._saveAllData(all)

		return all[index]
	}

	delete(id) {
		let all = this._getAllData()

		const originalLength = all.length

		all = all.filter(item => item.id !== id)

		if (all.length === originalLength) {
			return false
		}

		this._saveAllData(all)

		return true
	}

	clear() {
		localStorage.removeItem(this.storageKey)
		localStorage.removeItem(this.idKey)
	}

	_getNextId() {
		const next = +(localStorage.getItem(this.idKey) || 0) + 1

		localStorage.setItem(this.idKey, `${next}`)

		return next
	}

	_getAllData() {
		return JSON.parse(localStorage.getItem(this.storageKey)) || []
	}

	_saveAllData(data) {
		localStorage.setItem(this.storageKey, JSON.stringify(data))
	}
}
