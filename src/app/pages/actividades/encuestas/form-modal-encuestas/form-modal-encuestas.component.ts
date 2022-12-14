import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EncuestaService} from "../../../../providers/service/encuesta.service";
import {TallerService} from "../../../../providers/service/taller.service";

@Component({
  selector: 'app-form-modal-encuestas',
  templateUrl: './form-modal-encuestas.component.html',
  styleUrls: ['./form-modal-encuestas.component.css']
})
export class FormModalEncuestasComponent implements OnInit {

  @Input() title: any;
  @Input() encuId: any;
  @Input() item: any;
  frmEncuesta: FormGroup;
  talleres: any = [];
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private encuestaService: EncuestaService,
              private tallerService: TallerService) { }

  ngOnInit(): void {
    this.formInit();
    this.getTalleres();
    if(this.item){
      this.updateData();
    }
  }

  getTalleres(): void{
    this.tallerService.getAll$().subscribe(response => {
      /*console.log(response);/*aca se guarda toda la info del backend*/
      this.talleres = response.data || []; /*|| es OR*/
      console.log(this.talleres);
    });
  }

  formInit(): void {
    const controls = {
      encuRespuestaUno: ['', [Validators.required]],
      encuRespuestaDos: ['', [Validators.required]],
      encuRespuestaTres: ['', [Validators.required]],
      tallId: ['', [Validators.required]]
    };
    this.frmEncuesta = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmEncuesta.value,
      {taller: {tallId: this.frmEncuesta.value.tallId}});
    this.encuestaService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });//serializa y envia formato tipo JS
  }
  /*Aca actualiza los datos*/
  update(): void {
    let data = Object.assign(this.frmEncuesta.value,
      {taller: {tallId: this.frmEncuesta.value.tallId}});
    console.log(data);
    this.encuestaService.update$(this.encuId, data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });
  }
  /*Esto llena las cajas de textos con los datos*/
  updateData(): void {
    let data = Object.assign(this.item,
      {tallId: this.item.taller.tallId});
    console.log(data, "hola, soy updateData");
    this.frmEncuesta.patchValue(data);
  }

}
