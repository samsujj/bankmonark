import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteredlist'
})
export class FilteredlistPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    args = args.toLocaleLowerCase();

    if(args == ''){
      return value;
    }else {
      return value.filter(value=> (value.firstname.toLocaleLowerCase().indexOf(args) != -1 || value.lastname.toLocaleLowerCase().indexOf(args) != -1 || value.email.toLocaleLowerCase().indexOf(args) != -1)  );
    }
  }

}
