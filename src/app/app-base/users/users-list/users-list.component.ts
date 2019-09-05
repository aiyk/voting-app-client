import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;

  people: any[] = [
    {
      firstname: "Ikechukwu",
      lastname: "Ekwe",
      age: "22yrs",
      gender: "Male",
      phone: "08143492211",
      email: "aiyk.ekwe@gmail.com"
    },
    {
      firstname: "Ikechukwu",
      lastname: "Ekwe",
      age: "22yrs",
      gender: "Male",
      phone: "08143492211",
      email: "aiyk.ekwe@gmail.com"
    },
    {
      firstname: "Ikechukwu",
      lastname: "Ekwe",
      age: "22yrs",
      gender: "Male",
      phone: "08143492211",
      email: "aiyk.ekwe@gmail.com"
    },
    {
      firstname: "Ikechukwu",
      lastname: "Ekwe",
      age: "22yrs",
      gender: "Male",
      phone: "08143492211",
      email: "aiyk.ekwe@gmail.com"
    }
  ];

  constructor() { }

  clickItemIndex: number;
  ngOnInit() {}

  tags_onclick() {
    this.ddmenu_tags = !this.ddmenu_tags;
  }
  item_to_show(i) {
    return this.clickItemIndex === i;
  }
  tblmenu_onclick() {
    this.ddmenu_tblmenu = !this.ddmenu_tblmenu;
  }
  tblmenuitem_onclick(itemIndex) {
    this.clickItemIndex = itemIndex;
    this.ddmenu_tblitem = !this.ddmenu_tblitem;
  }

}

