import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Country } from '../../../_models/country';

import { AuthService } from '../../../services/auth.service';
import { CountryService} from '../../../services/country.service';
import { ActivePageService} from '../../../services/active-page.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  ddmenu_tags = false;
  ddmenu_tblmenu = false;
  ddmenu_tblitem = false;

  loading = false;
  countries: Country[];

  pgData = {
    title: 'List of Countries',
    button: {
      title: 'New country',
      route: 'countries-update'
    }
  };

  constructor(private countryService: CountryService, private pageData: ActivePageService) { }

  clickItemIndex: number;
  ngOnInit() {
    this.loading = true;

    this.loadCountries();

    this.pageData.changePageData(this.pgData);
  }

  loadCountries(){
    this.countryService.getAll().subscribe(countries => {
      if(countries){
        this.loading = false;
        this.countries = countries.result;
      }
    });
  }

  deleteCountry(id){
    if(window.confirm('are you sure you want to permanently delete?')){
      this.countryService.delete(id).subscribe(data => this.loadCountries());
    }
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
