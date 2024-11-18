import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleData',
})
export class ArticleDataPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let str = value.substring(4);
  let index=str.indexOf('</h1>');
  let result=str.substring(0,index);
  let index1=result.indexOf('<');
  if(index1!=-1){
  let index2=result.indexOf('>');
  let index3=result.lastIndexOf('<');
  let index4=result.indexOf(';');
  let result1=result.substring(0,index1);
  let result2;
  if(index4==-1){
      result2=result.substring(index2+1,index3);
  }
  else{
      result2= ' '+result.substring(index4+1,index3);
  }
  return result1+result2;
  }
    return result;
  }
}
