import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  things: object[] = [];

  constructor() { }

  ngOnInit() {
    this.things = [
      {name: 'apa',
      imgid: '200x200'},
      {name: 'banan',
      imgid: '201x201'},
      {name: 'citron',
      imgid: '202x202'},
      {name: 'dadlar',
      imgid: '203x203'},
      {name: 'bootleg',
      imgid: '204x204'},
      {name: 'mazariner',
      imgid: '205x205'},
      {name: 'winerbröd',
      imgid: '206x206'},
      {name: 'flens',
      imgid: '207x207'}
    ];
  }

}
