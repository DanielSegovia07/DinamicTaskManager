class Memoria {
    constructor() {
        this._dblEspacioTotal = 0;
        this._dblEspacioDisponible = 0;
        this._dblParteResidente = 0;
        this.misParticiones = [];
    }

    Inicializar(t, pr) {
        // Inicializa la memoria con el espacio total y la parte residenteeee.
        this._dblEspacioTotal = t;
        this._dblParteResidente = pr;
        this._dblEspacioDisponible = t - pr;
    }

    QuitarCargaTrabajo() {
        // Borra todos los datos de la memoria.
        this._dblEspacioTotal = 0;
        this._dblParteResidente = 0;
        this._dblEspacioDisponible = 0;
        this.misParticiones = [];
    }

    get EspacioDisponible() {
        return this._dblEspacioDisponible;
    }

    get EspacioTotal() {
        return this._dblEspacioTotal;
    }

    get ParteResidente() {
        return this._dblParteResidente;
    }

    get Particiones() {
        return this.misParticiones;
    }

    AgregarParticion(espacio, numero) {
        if (espacio <= this.CalcularEspacioRestante()) {
            // Agrega una partición si hay espacio suficiente.
            const nuevaParticion = new Particion();
            nuevaParticion.Tamaño = espacio;
            nuevaParticion.Nombre = "P" + numero;
            this.misParticiones.push(nuevaParticion);
        } else if (espacio === 0) {
            throw new Error("El espacio de la partición debe ser mayor a 0");
        } else {
            throw new Error("No hay suficientes recursos para la partición");
        }
    }

    EliminarTarea(nombre) {
        // Elimina una tarea por su nombre.
        this.misParticiones.forEach(p => {
            if (p.Tarea.Nombre === nombre) {
                p.Tarea = new Tarea(0);
            }
        });
    }

    CalcularEspacioRestante() {
        // Calcula el espacio restante restando el espacio usado por las particiones.
        let eo = 0;
        this.misParticiones.forEach(p => {
            eo += p.Tamaño;
        });
        return this._dblEspacioDisponible - eo;
    }

    CalcularMemoriaUsada() {
        // Calcula el espacio usado por las particiones y la parte residente.
        let eo = this._dblParteResidente;
        this.misParticiones.forEach(p => {
            eo += p.Tamaño;
        });
        return eo;
    }

    CalcularMemoriaDisponible() {
        // Calcula el espacio disponible restando el espacio usado.
        return this._dblEspacioTotal - this.CalcularMemoriaUsada();
    }

    AgregarTarea(t) {
        let agregado = -1;
        this.misParticiones.forEach(p => {
            if (t.Tamaño <= p.Tamaño && p.Tarea.Tamaño === 0) {
                // Asigna una tarea a una partición si hay espacio suficiente y la partición no tiene una tarea.
                p.Tarea = t;
                agregado = 1;
            } else if (t.Tamaño <= p.Tamaño && p.Tarea.Tamaño !== 0) {
                agregado = 0;
            }
        });
        return agregado;
    }

    CalcularMemoriaDesperdiciada() {
        // Calcula el espacio desperdiciado sumando el espacio desperdiciado en cada partición.
        let md = 0;
        this.misParticiones.forEach(p => {
            md += p.CalcularEspacioDesperdiciado();
        });
        return md;
    }
}