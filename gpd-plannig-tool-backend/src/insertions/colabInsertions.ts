import { Colaborador } from "@/dominio/modelos/Colaborador"; // Import the Colaborador model
import { faker } from '@faker-js/faker';
import * as uuid from "uuid"; // Import the uuid library

// Function to insert colaboradores into the database for a given role
async function insertColaboradoresForRole(roleName) {
  try {
    const colaboradores: Array<Colaborador> = [];
    const qtde_colab = 5;
    for (let i = 0; i < qtde_colab; i++) {
      const nome = faker.person.fullName(); // Generate a random name
      const departamento = `Dpto${Math.floor(Math.random() * 3) + 1}`; // Random department froom 1 to 3

      const colaborador = await Colaborador.create({
        id: uuid.v4(), // Generate a unique UUID
        nome,
        departamento,
        role_name: roleName,
      });

      colaboradores.push(colaborador);
    }

    console.log(`Inserted ${qtde_colab} colaboradores for role: ${roleName}`);
    return colaboradores;
  } catch (error) {
    console.error(`Error inserting colaboradores for role ${roleName}:`, error);
  }
}

// Insert colaboradores for each role using their respective UUIDs
async function insertColaboradores() {
  try {
    // Define the roles and their UUIDs
    const roles = [
      { role_name: 'Developer' },
      { role_name: 'PM' },
      { role_name: 'TL' },
    ];

    // Insert colaboradores for each role
    for (const role of roles) {
      await insertColaboradoresForRole(role.role_name);
    }
  } catch (error) {
    console.error('Error inserting colaboradores:', error);
  }
}


export { insertColaboradores };