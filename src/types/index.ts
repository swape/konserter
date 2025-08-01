export interface UserObjType {
	uid?: string
	name?: string
	email?: string
	img?: string
}

export interface ConcertObjectType {
	date: string
	artist: string
	note: string
	rating: number
	festival: string
	venue: string
	price: number
	uid?: string
	id?: string
	deleted?: boolean
	deletedDate?: Date | null
}

export interface ConcertObjectTypeFromFireBase {
	[key: string]: ConcertObjectType
}

export interface ChartData {
	[key: string]: number
}
