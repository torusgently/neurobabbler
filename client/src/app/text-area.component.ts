import { Component, Input,  NgZone } from '@angular/core';
import {AfterViewInit, ViewChild, ElementRef} from '@angular/core';
declare var $:JQueryStatic;

@Component({
    selector: 'text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.css'],
    inputs: ['name']
})
export class TextAreaComponent  implements  AfterViewInit{
    @ViewChild('inputText') el:ElementRef;
    public name: string;
    public textValue = "";
    constructor(private zone: NgZone) {}

    ngAfterViewInit() {
        $(this.el.nativeElement).scrollTop =  $(this.el.nativeElement).scrollHeight;
    }
}
