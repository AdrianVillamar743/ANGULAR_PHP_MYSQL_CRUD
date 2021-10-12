import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import{ FormGroup, FormBuilder} from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
elID:any;
formularioDeEmpleados:FormGroup;

  constructor(
    private activeRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador:Router
  ) { 
    this.formularioDeEmpleados=this.formulario.group(
      {
        emple_nombre:[''],
        emple_apellidos:['']
      }
    );
    this.elID=this.activeRoute.snapshot.paramMap.get('id');
    console.log("ID que llegó: "+this.elID);
    
    this.crudService.ObtenerEmpleadoID(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta[0]);
        this.formularioDeEmpleados.setValue({
          emple_nombre:respuesta[0]['emple_nombre'],
          emple_apellidos:respuesta[0]['emple_apellidos']   
        }
        );
      }
    )
  }

  ngOnInit(): void {

  }


  enviarDatos():any{
    console.log(this.elID);
    console.log(this.formularioDeEmpleados.value)
    if(window.confirm("¿Desea MODIFICAR el registro?")){

    this.crudService.EditarEmpleado(this.formularioDeEmpleados.value,this.elID).subscribe();
    this.ruteador.navigateByUrl('/listar-empleado')
    }

  }

}
