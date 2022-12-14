import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MeditacionService} from "../../../../providers/service/meditacion.service";

@Component({
  selector: 'app-form-modal-meditacion',
  templateUrl: './form-modal-meditacion.component.html',
  styleUrls: ['./form-modal-meditacion.component.css']
})
export class FormModalMeditacionComponent implements OnInit {


  @Input() title: any;
  @Input() mediId: any;
  @Input() item: any;
  frmMeditacion: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private meditacionService: MeditacionService) { }

  ngOnInit(): void {
    this.formInit();
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      mediOracion: ['', [Validators.required]],
      mediVersiculo: ['', [Validators.required]],
      mediReflexion: ['', [Validators.required]],
    };
    this.frmMeditacion = this.formBuilder.group(controls);
  }

  save(): void {
    this.meditacionService.add$(this.frmMeditacion.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message});
      }
    });
  }

  update(): void {
    this.meditacionService.update$(this.mediId, this.frmMeditacion.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message});
      }
    });
  }

  updateData(): void {
    this.frmMeditacion.patchValue(this.item);
  }

}
