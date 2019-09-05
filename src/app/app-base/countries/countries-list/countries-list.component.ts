import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Country } from '../../../_models/country';
import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;

  // countries: any[] = [
  //   {
  //     name: "Nigeria",
  //     dateCreated: "11th Oct 2018"
  //   }
  // ];

  loading = false;
  countries: Country[];

  constructor(private countryService: CountryService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;
    this.countryService.getAll().pipe(first()).subscribe(countries => {
      this.loading = false;
      this.countries = countries.result;
    });
  }

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
