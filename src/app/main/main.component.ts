import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MyDataArray } from "../my-data-array";
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  mySheetName: any;
  timeOut: any = null;
  indexOfRow: any;
  indexOfCols: any;
  cellIndex: any;
  arraytobeDeleted: number[] = [];
  result: number[] = [];
  array: MyDataArray[] = [];
  sheetColoums: object[] = [];
  finalDataArray: object[] = [];
  sheetRows2: object[] = [];
  flag: boolean = false;

  sheetDataForm = this._fb.group({
    sheetRows: ['', [Validators.required]],
    sheetCols: ['', [Validators.required]],
    sheetName: ['', [Validators.required]],


  })
  cellData = this._fb.group({
    data: ['']
  })



  send() {
    let length = this.array.length;
    for (var i = 0; i < length; i++) {
      for (var j = i + 1; j < length; j++) {
        if (this.array[i].cellNumber == this.array[j].cellNumber) {
          let x = i;

          this.arraytobeDeleted.push(x);

        }

      }
    }

    this.finalDataArray = this.array;
    this.result = [...new Set(this.arraytobeDeleted)];

    for (var i = this.result.length - 1; i >= 0; i--) {
      this.finalDataArray.splice(this.result[i], 1)
    }
    console.log(this.finalDataArray);

  }
  create() {

    this.mySheetName = this.sheetDataForm.value.sheetName;
    for (var i = 1; i <= this.sheetDataForm.value.sheetRows; i++) {

      this.sheetRows2.push({ rows: i });
    }
    for (var i = 1; i <= this.sheetDataForm.value.sheetCols; i++) {

      this.sheetColoums.push({ cols: i })
    }
    this.flag = true;

  }


  typing(e: any, no: any, no2: any) {
    clearTimeout(this.timeOut);//clearing the time out to remove last task time.
    this.indexOfRow = String(no2);
    this.indexOfCols = String(no);
    this.cellIndex = this.indexOfRow + this.indexOfCols;
    this.timeOut = setTimeout(() => {

      if (e.target.value == "") {
        return;
      }
      else {
        this.array.push({ cellNumber: this.cellIndex, data: e.target.value });
      }


    }, 500);

  }
  /*  for(int i=0; i<array1.size(); i++){
     for(int j=i + 1; j<array1.size(); j++){
        if(arr[i] != arr[j]){
           ..do stuff..
        }
     }
   } */

  NewSheet() {

    window.location.reload();
  }
  constructor(private _fb: FormBuilder) {


  }

  ngOnInit(): void {


  }

}
