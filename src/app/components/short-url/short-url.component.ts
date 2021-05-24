import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css'],
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  showSpinner: boolean;
  mostrarError: boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.showSpinner = false;
    this.mostrarError = false;
    this.textError = '';
  }

  procesarUrl() {
    if (this.nombreUrl === '') {
      this.mostrarError = true;
      this.textError = 'Por favor ingrese una URL';
      setTimeout(()=>{
        this.mostrarError = false;
        this.textError = '';
      }, 3000)
      return;
    }
    this.urlProcesada = false;
    this.showSpinner = true;
    this._shortUrlService.getUrlShort(this.nombreUrl).subscribe((data) => {
      console.log(data);
      this.urlShort = data.link;
      this.urlProcesada = true;
      this.showSpinner = false;
    },error=>{
      this.mostrarError = true;
      this.textError = 'URL inválida, por favor verifica tu enlace.';
      this.showSpinner = false;
      setTimeout(()=>{
        this.mostrarError = false;
        this.textError = '';
      }, 3000)
    });
  }

  ngOnInit(): void {}
}
