import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
    name: 'fahrenheitToDegrees'
})
export class FahrenheitToDegrees implements PipeTransform {
    transform(temp: any) {
        return ((temp - 32) * (5/9));
    }
}