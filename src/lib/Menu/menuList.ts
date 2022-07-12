interface MenuItemsType {
  url: string
  title: string
  access: number[]
}

export const menuList: MenuItemsType[] = [
  { url: '/new', title: 'Registrer', access: [1] }
  //  { url: '/stats', title: 'Statistikk', access: [1] }
]

export function getMyMenu(): MenuItemsType[] {
  return menuList
}
