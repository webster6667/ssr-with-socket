import {IUser} from "@shared-types"

export interface MainPagePropsI {
    users?: IUser[],
    dispatch: (Promise) => () => Promise<IUser[]>
}