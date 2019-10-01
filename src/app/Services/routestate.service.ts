import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutestateService {
  private pathParamState = new BehaviorSubject<string>("mongoid");
  pathParam:Observable<string>;
  constructor() { 
    this.pathParam = this.pathParamState.asObservable();
  }
  updatePathParamState(newPathParm:string){
    this.pathParamState.next(newPathParm);
  }
}
