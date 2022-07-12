interface MenuItemsType {
  url: string
  title: string
  access: number[]
}

export const menuList: MenuItemsType[] = [
  { url: '/concerts', title: 'Konserter', access: [1] },
  { url: '/new', title: 'Registrer', access: [1] },
  { url: '/stats', title: 'Statistikk', access: [1] },
  { url: '/other', title: 'Another long title for this menu', access: [1] }
]

export function getMyMenu(access: number[]): MenuItemsType[] {
  return menuList.filter((item) => access.some((a) => item.access.includes(a)))
}
