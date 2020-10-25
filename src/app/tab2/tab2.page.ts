import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella'];


  constructor(private moviesService: MoviesService,
  			  public modalController: ModalController) {

  }

  ngOnInit(){
  	
  }


  buscar(event){
  	const valor: string = event.detail.value;
  	console.log(valor);

  	if ( valor.length === 0 ) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    // console.log(valor);
    this.buscando = true;


  	this.moviesService.buscarPeliculas(valor)
  		.subscribe( resp => {
  			console.log( resp );
  			this.peliculas = resp['results'];
  			this.buscando = false;
  		});

  }


  async verDetalle( id: string){

    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
