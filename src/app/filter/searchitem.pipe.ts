import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchitem'
})
export class SearchitemPipe implements PipeTransform {
  falseResult: string="Please search again"
  transform(value: any[], searchItem:any): any {
    if(!value || !searchItem){
      return value;
    }
    return value.filter(obj =>
      {
        for(let key in obj)
        {
           if((obj[key]+'').includes(searchItem))
           {
             return true;
            }
        }
        return false;
      } 
  )
}

}
