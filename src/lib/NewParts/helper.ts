import type {ConcertObjectType} from "../../types";
import {goto} from "$app/navigation";

export function isDataOk(item: ConcertObjectType): boolean {
    return !!item.artist.trim() && !!item.date
}

export function toNumber(value: string | number): number {
    return parseInt(`${value}`.replace(/\D/g, ''), 10)
}


export function cancel(): void {
    goto('/')
}

export function gotoNew(): void {
    goto('/new')
}

export function getFormattedDate(): string {
    const nowDate = new Date()
    const day = `${nowDate.getDate()}`.padStart(2, '0')
    const month = `${nowDate.getMonth()}`.padStart(2, '0')
    return `${nowDate.getFullYear()}-${month}-${day}`
}
