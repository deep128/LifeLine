import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { DialogBoxDetail } from './DialogBoxDetail';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css']
})
export class PopupMessageComponent implements OnInit {
  
  @Input() dialogBoxDetail:DialogBoxDetail;

  constructor() { }

  ngOnInit() {
  }

  closePopUp():void {
    this.dialogBoxDetail.showDialogBox = false;
    this.dialogBoxDetail.showOverlay = false;
  }

}
