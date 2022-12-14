import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonaService} from "../../../../providers/service/persona.service";
import {TipoPersonaService} from "../../../../providers/service/tipo-persona.service";

@Component({
  selector: 'app-form-modal-personas',
  templateUrl: './form-modal-personas.component.html',
  styleUrls: ['./form-modal-personas.component.css']
})
export class FormModalPersonasComponent implements OnInit {

  @Input() title: any;
  @Input() persId: any;
  @Input() item: any;
  frmPersona: FormGroup;
  tipoPersonas: any = [];
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaService: PersonaService,
              private tipoPersonaService: TipoPersonaService) {}

  ngOnInit(): void {
    this.getTipoPersonas();
    this.formInit();
    if(this.item){
      this.updateData();
    }
  }

  getTipoPersonas(): void {
    this.tipoPersonaService.getAll$().subscribe(response => {
      this.tipoPersonas = response.data || [];
      console.log(this.tipoPersonas);
    });
  }


  formInit(): void {
    const controls = {
      persNombres: ['', [Validators.required]],
      persApPaterno: ['', [Validators.required]],
      persApMaterno: ['', [Validators.required]],
      persDni: ['', [Validators.required]],
      persTelefono: ['', [Validators.required]],
      tipeId: ['', [Validators.required]],
    };
    this.frmPersona = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmPersona.value,
      {tipoPersona: {tipeId: this.frmPersona.value.tipeId}});
    this.personaService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });//serializa y envia formato tipo JS
  }

  update(): void {
    let data = Object.assign(this.frmPersona.value,
      {tipoPersona: {tipeId: this.frmPersona.value.tipeId}},);
    console.log(data);
    this.personaService.update$(this.persId, data).subscribe(response => {
      console.log(response.success, 'hola soy update');
      if (response.success){
        this.activeModal.close({
          success:true,
          message: response.message
        });
      }
    });
  }

  updateData(): void {
    let data = Object.assign(this.item,
      {tipeId: this.item.tipoPersona.tipeId},
);
    console.log(data, "hola, soy updateData");
    this.frmPersona.patchValue(data);
  }
}
