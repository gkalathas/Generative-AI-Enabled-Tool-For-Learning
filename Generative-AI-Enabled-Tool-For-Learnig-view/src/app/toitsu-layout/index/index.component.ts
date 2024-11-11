import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['index.component.css']
})
export class IndexComponent implements OnInit {
  
  redirectUrl: string;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }
  
  ngOnInit() {
  }
}
