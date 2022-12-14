import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { MeditacionService } from 'src/app/providers/service/meditacion.service';
import Swal from "sweetalert2";
import {FormModalMeditacionComponent} from "./form-modal-meditacion/form-modal-meditacion.component";

@Component({
  selector: 'app-meditacion',
  templateUrl: './meditacion.component.html',
  styleUrls: ['./meditacion.component.css']
})
export class MeditacionComponent implements OnInit {

  meditaciones: any = [];

  constructor(private meditacionService: MeditacionService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMeditaciones();
  }

  getMeditaciones(): void{
    this.meditacionService.getAll$().subscribe(response => {
      this.meditaciones = response.data || []; /*|| es OR*/
      console.log(this.meditaciones);
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalMeditacionComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if(res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Meditación',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        })
        this.getMeditaciones();
      }
    }).catch(err => {});
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalMeditacionComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.mediId = item.mediId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Meditación',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getMeditaciones();
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.mediId;
    const mensaje = '¿ Desea eliminar ' + item.mediReflexion + ' ?';
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        //animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#0F3971',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.meditacionService.delete$(ID).subscribe(response => {
            if (response.success) {
              Swal.fire({
                title: 'Eliminado',
                text: response.message,
                backdrop: true,
                //animation: true,
                showConfirmButton: false,
                confirmButtonColor: '#0F3971',
                timer: 1500,
              });
              this.getMeditaciones();
            }
          });
        }
      });
    }
  }
}
