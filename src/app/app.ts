import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { FooterComponent } from './core/components/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });

  }
}
