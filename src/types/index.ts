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
	mbid?: string | null
}

export interface ConcertObjectTypeFromFireBase {
	[key: string]: ConcertObjectType
}

export interface ChartData {
	[key: string]: number
}

export interface SelectOption {
	value?: string
	title: string
}

export interface SelectProps {
	options?: SelectOption[]
	onChange?: (e: Event & {currentTarget: EventTarget & HTMLSelectElement}) => void
	value?: string
	emptyText?: string
}

export interface BandInfoData {
	type: string | undefined
	disambiguation: string
	formed: string
	country: string
	genre: string
}

export interface BandInfo {
	artist: string
	fetchedDate: string
	mbid: string
	data: BandInfoData
}
