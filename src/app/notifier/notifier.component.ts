import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
