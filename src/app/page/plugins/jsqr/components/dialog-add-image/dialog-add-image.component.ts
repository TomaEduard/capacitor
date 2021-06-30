import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-image',
  templateUrl: './dialog-add-image.component.html',
  styleUrls: ['./dialog-add-image.component.scss']
})
export class DialogAddImageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddImageComponent>,
    private formBuilder: FormBuilder,
  ) {
    console.log('data', data)
  }
  
  ngOnInit(): void {
  }

}
