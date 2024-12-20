import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  action: 'add' | 'edit' | 'delete';
  user: any;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  imports: [MatDialogModule , MatFormFieldModule, FormsModule, MatInputModule]
})
export class UserDialogComponent implements OnInit{
  newUser:any;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent> , @Inject(MAT_DIALOG_DATA) public data: any) {
    this.newUser = data ? {...data} : {
      body: '',
      title: '',
      userId: 0,
      id: Math.floor(Math.random() * 1000), // Generate a random ID
    };
  }

  ngOnInit() {
    console.log(this.data)
  }

  onSave(): void {
    this.dialogRef.close(this.newUser);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
