# Mia Core Angular

## Description

Es la libreria base de todos los proyectos de Angular en AgencyCoda utilizado en Dorotea. Contiene varias entidades, componentes y directrices que pueden ser util en todos los proyectos.

## Configuracion inicial

Importar el modulo y agregar como provider en el app.module, para configurar la URL base que utilizaran los servicios:

```ts
import { MiaCoreModule, MIA_CORE_PROVIDER, MIA_GOOGLE_STORAGE_PROVIDER } from '@doroteati/mia-core';

  ...
  imports: [
    ...,
    MiaCoreModule
  ],
  providers: [
    {
      provide: MIA_CORE_PROVIDER,
      useValue: {
        baseUrl: 'https://doroteati.test/api/'
      }
    },
  ]
  ...
```

## Casos de usos

### Utilizar Google Cloud Storage para subida de archivos

Primer paso configurar el provider: MIA_GOOGLE_STORAGE_PROVIDER:

```ts
{
    provide: MIA_GOOGLE_STORAGE_PROVIDER,
    useValue: {
        bucket: 'name_of_bucket'
    }
}
```

Ya con esto, muchos de los elementos (Ejemplo: PhotoField en MiaForm, etc) de las librerias que permiten subir archivos, van a funcionar adecuadamente.

- Metodo 1:

Utilizar directamente la directiva: miaFileGoogle, el unico evento importante es: "fileUploaded":

```html
<input #inputFile miaFileGoogle (fileUploaded)="onUploadFile($event)" (startUpload)="isUploading = true" type="file" style="display: none;" accept="image/*" />

<button (click)="inputFile.click()">Upload file</button>
```

```ts
onUploadFile(data: MiaFile): void {
    data.url; // URL Publica del archivo
    data.size; // Tamaño en bytes del archivo
    data.name; // Nombre del archivo sin ningun proceso (El mismo nombre que el usuario ve en su maquina cuando selecciona el archivo)
}
```

De esta manera ya se encarga directamente de subir el archivo seleccionado

- Metodo 2:

Si por algun motivo usted quiere generar su propio HTML y seleccionador de archivo, usted puede utilizar directamente el servicio:

```ts
import { GoogleStorageService } from '@doroteati/mia-core';

constructor(
    protected googleStorage: GoogleStorageService,
}

upload(file: File) {
    ...


    this.googleStorage.uploadDirect(file).subscribe(res => {
        if(!res.success){
            // No se ha subido correctamente
            return;
        }

        let data: MiaFile = res.response;
        data.url; // URL Publica del archivo
        data.size; // Tamaño en bytes del archivo
        data.name; // Nombre del archivo sin ningun proceso (El mismo nombre que el usuario ve en su maquina cuando selecciona el archivo)
    });

}
```

### Sumar Drag and Drop a la subida de archivos

Para esto vamos a utilizar la directiva: "miaFileDragAndDrop":

```html
<div miaFileDragAndDrop class="upload-component box" (fileSelected)="onSelectedFile($event)">
  <input #inputFile miaFileGoogle (fileUploaded)="onUploadFile($event)" (startUpload)="isUploading = true" type="file" style="display: none;" accept="image/*" />

  <button (click)="inputFile.click()">Upload file</button>
</div>
```

```ts

@ViewChild(FileGoogleDirective) fileGoogle!: FileGoogleDirective;

onSelectedFile(file: File) {
    this.fileGoogle.uploadFile(file);
}

```

---
