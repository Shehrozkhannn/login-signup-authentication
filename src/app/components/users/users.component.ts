import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDialogComponent } from '../../user-dialog/user-dialog.component';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-users',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'body', 'title', 'userId', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.showUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showUsers() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.http.get<any>(url).subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  openDialog(rowData:any = null): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data:rowData ? {...rowData}: null
    });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result) {
          if(rowData){
            const index = this.dataSource.data.findIndex((val)=> val.id === result.id);
            if(index !== -1){
              this.dataSource.data[index] = result;
              this.dataSource.data = [...this.dataSource.data];
            }
          }else{
            this.dataSource.data = [...this.dataSource.data, result];
          }
        }
      });
  }

  deleteRow(data:any){
    this.dataSource.data = [...this.dataSource.data.filter((item)=> item.id !== data.id)]
  }
}
