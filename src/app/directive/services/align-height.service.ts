import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

interface IHeightStore {
    [lookupKey: string]: {
        sourceHeight: number;
        heights: Set<number>;
    };
}

@Injectable()
export class AlignHeightService {

    public heightStore: Observable<IHeightStore>;
    private _heightStore: BehaviorSubject<IHeightStore>;

    private _dataStore: {
       heightStore: IHeightStore;
    };

    constructor() {
        this._dataStore = {
            heightStore: {}
        };

        this._heightStore = <BehaviorSubject<IHeightStore>>new BehaviorSubject({});
        this.heightStore = this._heightStore.asObservable();
    }

    public setKeyAndHeight(lookupKey: string, height: number, isSource: boolean) {

        if (isSource) {
            this._dataStore.heightStore[lookupKey].sourceHeight = height;
        }

        const clonedHeightStore = JSON.parse(JSON.stringify(this._dataStore.heightStore));
        this._heightStore.next(clonedHeightStore);
    }

}
