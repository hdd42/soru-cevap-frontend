import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input('meta') meta
  @Output('') paginate = new EventEmitter()

  currentPage= 0;

  constructor() { }

  ngOnInit() {

  }

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
   let page = event.page;
   let skip = 10 * (page - 1)
   this.paginate.emit(skip)
   console.log('Page changed to: ' + event.page);
   console.log('Number items per page: ' + event.itemsPerPage);
  }

}
