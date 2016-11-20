import { Component, Input } from '@angular/core';

@Component({
    selector: 'text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.css'],
    inputs: ['name']
})
export class TextAreaComponent {
    public name: string;
    public textValue = "Test Value";
    constructor() {}
}
