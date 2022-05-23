import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: String = '';

  constructor(private _tokenStorage: TokenStorageService,
  ) {
  }

  ngOnInit(): void {
    this.user = this._tokenStorage.getUser();
  }

  scrollTop(){
    window.scrollTo(0, 0);
  }

}
