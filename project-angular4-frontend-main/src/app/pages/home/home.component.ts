import { Component, OnInit } from '@angular/core';
import {TallerService} from "../../providers/service/taller.service";
import {MeditacionService} from "../../providers/service/meditacion.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  talleres: any = [];
  meditaciones: any = [];

  constructor(private tallerService: TallerService,
              private meditacionService: MeditacionService) { }

  ngOnInit(): void {
    this.getTalleres();
    this.getMeditaciones();
  }

  getTalleres(): void{
    this.tallerService.getAll$().subscribe(response => {
      /*console.log(response);/*aca se guarda toda la info del backend*/
      this.talleres = response.data || []; /*|| es OR*/
      console.log(this.talleres);
    });
  }

  getMeditaciones(): void{
    this.meditacionService.getAll$().subscribe(response => {
      this.meditaciones = response.data || []; /*|| es OR*/
      console.log(this.meditaciones);
    });
  }
}
