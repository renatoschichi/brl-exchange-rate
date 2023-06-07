import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  visibleItens: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  toggleItens() {
    this.visibleItens = !this.visibleItens;
    if (this.visibleItens) {
      this.renderer.addClass(document.body, 'visible-footer');
    } else {
      this.renderer.removeClass(document.body, 'visible-footer');
    }
  }

  exchangeResult() {
    console.log('hello')
  }

}
