import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";

@Component({
  selector: 'app-brands-page',
  imports: [SectionHeaderComponent],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.css',
})
export class BrandsPageComponent implements OnInit {
public readonly brandsService = inject(BrandsService)

ngOnInit(): void {
  this.getAllBrands()
}

getAllBrands():void{
  this.brandsService.getAllBrands()
}
}
