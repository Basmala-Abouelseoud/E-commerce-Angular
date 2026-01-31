import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-orders-page',
  imports: [DatePipe],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
})
export class OrdersPageComponent implements OnInit {
public readonly orderService = inject(OrderService)

  ngOnInit(): void {
    this.getUserOrders() 
  }


  getUserOrders() :void{
    this.orderService.getUserOrders()
  }
}
