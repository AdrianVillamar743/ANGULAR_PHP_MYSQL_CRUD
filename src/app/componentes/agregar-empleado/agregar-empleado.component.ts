import { Component, OnInit } from '@angular/core';
import{ FormGroup, FormBuilder} from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {

  formularioDeEmpleados:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private crudServicio:CrudService,
    private ruteador:Router
    ) { 
    this.formularioDeEmpleados=this.formulario.group(
      {
        emple_nombre:[''],
        emple_apellidos:['']
      }
    );
  }

  ngOnInit(): void {
  }

 enviarDatos():any {
   console.log("Datos enviados")
  console.log(this.formularioDeEmpleados.value);
    this.crudServicio.AgregarEmpleado(this.formularioDeEmpleados.value).subscribe();
    this.ruteador.navigateByUrl('/listar-empleado')
}


}
