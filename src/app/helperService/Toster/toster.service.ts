import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TosterService {
  constructor(private toster: ToastrService) {}

  success(messgae: string, type: string) {
    this.toster.success(messgae, type);
  }

  error(messgae: string, type: string) {
    this.toster.error(messgae, type);
  }

  warning(messgae: string, type: string) {
    this.toster.error(messgae, type);
  }

}
