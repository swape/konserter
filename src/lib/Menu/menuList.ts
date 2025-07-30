interface MenuItemsType {
	url: string
	title: string
}

export const menuList: MenuItemsType[] = [
	{url: 'start', title: 'Forsiden'},
	{url: 'new', title: 'Registrer'},
	{url: 'list', title: 'Alle konserter'},
	{url: 'stats', title: 'Statistikk'},
	{url: 'bandSearch', title: 'Søk etter band'}
]

export function getMyMenu(): MenuItemsType[] {
	return menuList
}
