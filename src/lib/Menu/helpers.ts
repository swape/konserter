export function shorterName(name: string | undefined): string {
	if (!name) return ''
	const nameList = name.split(' ')
	let last = ''
	if (nameList.length >= 2) {
		const lastList = nameList[1].split('')
		last = ` ${lastList[0]}.`
	}
	return `${nameList[0]}${last}`
}

export function initials(name: string | undefined): string {
	if (!name) return ''
	const nameList = name.split(' ')
	if (nameList.length >= 2) {
		return `${nameList[0][0]}${nameList[1][0]}`
	}
	return nameList[0][0]
}
