import {
    Directive,
    ElementRef,
    Input,
    OnInit,
    OnChanges,
    SimpleChange,
    OnDestroy
} from '@angular/core';

import { AlignHeightService } from '../services/align-height.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

@Directive({
    selector: '[alignHeight]'
})
export class AlignHeightDirective implements OnInit, OnChanges, OnDestroy {

    @Input() public alignKey: string;
    @Input() public watchObject: any;
    @Input() public isSource: boolean;

    private _heightStoreSub: Subscription;

    constructor(private _elementRef: ElementRef,
                private _alignHeightService: AlignHeightService
    ) {}

    public ngOnInit(): void {
        // listens for source element height changes and update height to source's height
        this._heightStoreSub = this._alignHeightService.heightStore
                                .filter(() => !this.isSource)
                                .filter(heightStore => !!heightStore[this.alignKey])
                                .subscribe(heightStore => {
                                    // for debugging
                                    this._elementRef.nativeElement.style.backgroundColor = 'yellow';
                                    this._elementRef.nativeElement.style.height = `${heightStore[this.alignKey]}px`;
                                });

    }

    public ngOnChanges(changes: { watchObject: SimpleChange }): void {
        if (changes.watchObject && changes.watchObject.currentValue) {
            // get the height after view is updated
            // only want height after angular updates the view
            // no view life cycle hooks on
            setTimeout(() => {
                // makes sure the element is the full height of its's children
                this._elementRef.nativeElement.style.height = 'auto';
                 // for debugging
                console.log(`${this.alignKey} height`, this._elementRef.nativeElement.offsetHeight, this.isSource ? 'source' : 'nope');

                // only care about source's height change
                // there source only be one source
                this._alignHeightService.setKeyAndHeight(this.alignKey, this._elementRef.nativeElement.offsetHeight, this.isSource);
            }, 0);
        }
    }

    public ngOnDestroy(): void {
        this._heightStoreSub.unsubscribe();
    }
}
