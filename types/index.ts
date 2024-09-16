import type {EStatus, EPriority} from "~/types/Enums";
export { };

declare global {
    interface IBoard {
        [key in EStatus]: {
            title: string;
            items: IBoardItem[];
        }
    }
    interface IBoardItem {
        name: string;
        id: number;
        status: EStatus;
        description: string;
        priority: EPriority | null;
        author: IUser | null;
        performers: IUser[];
    }
    interface IEditItem {
        key: string;
        index: number;
        item: IBoardItem;
    }
    interface IGeo {
        lat: string;
        lng: string;
    }

    interface IAddress {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: IGeo;
    }

    interface ICompany {
        name: string;
        catchPhrase: string;
        bs: string;
    }

    interface IUser {
        id: number;
        name: string;
        username: string;
        email: string;
        address: IAddress;
        phone: string;
        website: string;
        company: ICompany;
    }
}
