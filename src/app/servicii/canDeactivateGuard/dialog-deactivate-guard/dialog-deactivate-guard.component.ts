import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dialog-deactivate-guard',
    templateUrl: './dialog-deactivate-guard.component.html',
    styleUrls: ['./dialog-deactivate-guard.component.scss']
})
export class DialogDeactivateGuardComponent implements OnInit {

    titlu: string
    message: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogDeactivateGuardComponent>) {
        this.titlu = data.titlu as string;
        this.message = data.mesaj as string;
    }

    ngOnInit(): void {
    }

    Continua() {
        this.dialogRef.close(true);
        return true;
    }

}
