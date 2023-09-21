import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';




// Definimos un esquema para el modelo de datos de Veterinario.
const veterinarioSchema = mongoose.Schema({
    
    // Campo "nombre" de tipo String, obligatorio y con eliminación de espacios en blanco.
    name: {
        type: String,
        required: true,
        trim: true // ELIMINA ESPACIOS EN BLANCO
    },

    // Campo "password" de tipo String, obligatorio.
    password: {
        type: String,
        required: true
    },

    // Campo "email" de tipo String, obligatorio, único y con eliminación de espacios en blanco.
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // Campo "telefono" de tipo String, con valor por defecto null y eliminación de espacios en blanco.
    phone: {
        type: String,
        default: null,
        trim: true
    },

    // Campo "web" de tipo String, con valor por defecto null.
    web: {
        type: String,
        default: null
    },

    // Campo "token" de tipo String.
    token: {
        type: String,
        default:uuidv4
    },

    // Campo "confirmado" de tipo Boolean, con valor por defecto false.
    confirm: {
        type: Boolean,
        default: false
    }
});

// Middleware "pre" que se ejecuta antes de guardar un documento Veterinario en la base de datos.
veterinarioSchema.pre("save", async function(next) {
    // Verifica si el campo "password" no ha sido hasheado en el documento.
if (!this.isModified("password")) {
    // Si el campo "password" no ha sido hasheado, pasa al siguiente middleware o acción.
    next();
}
    // Genera un valor aleatorio llamado "salt" para aumentar la seguridad de la contraseña. El valor 10 es el número de rondas para generar el "salt".
    const salt = await bcrypt.genSalt(10);

    // Hashea (encripta) la contraseña actual del documento usando el "salt" generado. // Esto reemplaza la contraseña sin cifrar por la contraseña cifrada en el documento.
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.checkPassword = async function(passwordForm){
    return await bcrypt.compare(passwordForm, this.password)
}


// Creamos un modelo llamado "Veterinario" utilizando el esquema definido anteriormente.
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

// Exportamos el modelo "Veterinario" para que pueda ser utilizado en otras partes de la aplicación.
export default Veterinario;
