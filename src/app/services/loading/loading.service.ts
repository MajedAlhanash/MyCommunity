import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loadingShown = new Subject<boolean>();

  private pendingRequests = new BehaviorSubject(0);
  pendingRequestsObservable = this.pendingRequests.asObservable();
  
  constructor() {}


  getLoadingShown() {
    return this.loadingShown.asObservable();
  }

  showLoading() {    
    this.pendingRequests.next(0);
    this.loadingShown.next(true);
  }

  hideLoading() {
    setTimeout(() => {
      this.loadingShown.next(false);
    }, 500);
  }

  addPendingRequest() {
    this.pendingRequests.next(this.pendingRequests.value + 1);
  }

  pendingRequestFinished() {
    this.pendingRequests.next(this.pendingRequests.value - 1);
  }
  
}
