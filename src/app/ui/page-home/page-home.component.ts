import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css'
})
export class PageHomeComponent {

  isSmall!: boolean;

  customBreakpoints = {
    small: '(max-width: 767px)',
    //    medium: '(min-width: 600px) and (max-width: 959px)',
    large: '(min-width: 768px)',
  };


  primerasMuestras: any[] = [
    { numero: 1 },
    { numero: 2 },
    { numero: 3 },
    { numero: 4 },
    { numero: 5 }
  ];

  amigo = this.fb.group({
    // ... Otros campos ...
    amigos: this.fb.array([]),
  });


  //formularioAmigos!: FormArray;

  /*amigo = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    excluidos: new FormControl()
  });*/

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      this.customBreakpoints.small,
      this.customBreakpoints.large,
    ]).subscribe((state: BreakpointState) => {
      this.isSmall = state.breakpoints[this.customBreakpoints.small]
    });
    for (let i = 0; i < this.primerasMuestras.length; i++) {
      this.agregarAmigo();
    }
  }

  get formularioAmigos(): FormArray {
    return this.amigo.get('amigos') as FormArray;
  }



  submit() {
    console.log('Estado del formulario:', this.formularioAmigos);

    let index = 0;

    // Aplicar validadores solo antes de enviar
    this.formularioAmigos.controls.forEach(control => {
      if (index <= 2 || control.get('nombre')?.value !== '' && control.get('correo')?.value !== '') {
        control.get('nombre')?.setValidators([Validators.required]);
        control.get('correo')?.setValidators([Validators.required, Validators.email]);
        control.updateValueAndValidity(); // Actualizar el estado de validez después de aplicar los validadores
        index++;
      } else if (control.get('nombre')?.value === '' && control.get('correo')?.value === '') {
        control.updateValueAndValidity();
      }
    });

    if (this.formularioAmigos.length >= 3 && this.formularioAmigos.valid) {
      const amigosData = this.amigo.value.amigos;
      console.log('Guardando amigos:', amigosData);

      // Aquí deberías enviar los datos a tu servicio o API para guardar
    } else {
      console.log('No');
    }
  }

  isSmallScreen(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Small);
  }


  agregarAmigo() {
    this.formularioAmigos.push(this.fb.group({
      nombre: [''],
      correo: [''],
      excluidos: ['']
    }));
  }
}
