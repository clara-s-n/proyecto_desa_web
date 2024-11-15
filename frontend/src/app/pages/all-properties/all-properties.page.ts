import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { Property } from '../../interfaces/property';
import { NgFor } from '@angular/common';
import { FiltersComponent } from '../../components/filters/filters.component';
import { PropertyService } from '../../services/property.service';
import { IonicModule, MenuController} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { filterOutline } from 'ionicons/icons';

@Component({
  selector: 'app-all-properties',
  standalone: true,
  imports: [
    PropertyCardComponent,
    NgFor,
    FiltersComponent,
    IonicModule
  ],
  templateUrl: './all-properties.page.html',
  styleUrl: './all-properties.page.css',
})
export class AllPropertiesPage {

  private propertyService = inject(PropertyService);
  private router: Router = inject(Router);
  private menu: MenuController = inject(MenuController);

  constructor() {
    addIcons({ filterOutline});
    //this.propertyService.fetchProperties();
    //this.writeProperties()
  }

  async ngOnInit() {
    console.log('OnInit');
    await this.propertyService.fetchProperties();
    this.writeProperties();
  }

  allProperties = this.propertyService.getProperties();
  writeProperties(): void {
    console.log('Propiedades en el properties:', this.properties);
  }
  //allProperties = this.propertyService.getAllProperties();

  // Lista filtrada de propiedades
  properties: Property[] = this.allProperties();

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  openFilterMenu() {
    this.menu.open('filterMenu');
    console.log('Menu opened');
  }

  aplicarFiltros(filtros: any): void {
    // no tiene filtros aplicados, restaura todas las propiedades
    if (!filtros || Object.keys(filtros).every((key) => !filtros[key])) {
      this.properties = [...this.allProperties()];
      return;
    }

    const maxPriceLimit =
      filtros.maxPrice === 10000
        ? Math.max(...this.allProperties().map((p) => p.price))
        : filtros.maxPrice;
    this.properties = this.allProperties().filter((property) => {
      console.log('Valor del filtro de habitaciones:', filtros.habitaciones);
      console.log(
        'Número de habitaciones de la propiedad:',
        property.number_of_rooms
      );
      const cumplePrecio =
        (filtros.minPrice == null || property.price >= filtros.minPrice) &&
        (filtros.maxPrice == null || property.price <= maxPriceLimit);

      // Filtro de Habitaciones
      const cumpleHabitaciones =
        !filtros.habitaciones ||
        (filtros.habitaciones === '5+' && property.number_of_rooms >= 5) ||
        (filtros.habitaciones !== '5+' &&
          property.number_of_rooms === +filtros.habitaciones);

      // Filtro de Departamento
      const cumpleDepartamento =
        !filtros.departamento || property.location === filtros.departamento;
      /*
      // Filtro de Barrio
      const cumpleBarrio =
      !filtros.barrio ||
      (property.barrio && property.barrio.toLowerCase().includes(filtros.barrio.toLowerCase()));
*/
      // incluye la propiedad si cumple con todas las condiciones de filtro
      return (
        cumplePrecio &&
        cumpleHabitaciones &&
        cumpleDepartamento /*&& cumpleBarrio*/
      );
    });
  }
}
