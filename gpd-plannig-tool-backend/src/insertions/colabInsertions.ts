import { Colaborador } from "@/dominio/modelos/Colaborador"; // Import the Colaborador model
import { faker } from '@faker-js/faker';
import * as uuid from "uuid"; // Import the uuid library

// Function to insert colaboradores into the database for a given role
async function insertColaboradoresForRole(roleId, roleName) {
  try {
    const colaboradores: Array<Colaborador> = [];

    for (let i = 0; i < 20; i++) {
      const nome = faker.person.fullName(); // Generate a random name
      const departamento = `Dpto${Math.floor(Math.random() * 3) + 1}`; // Random department froom 1 to 3

      const colaborador = await Colaborador.create({
        id: uuid.v4(), // Generate a unique UUID
        nome,
        departamento,
        id_role: roleId,
      });

      colaboradores.push(colaborador);
    }

    console.log(`Inserted 20 colaboradores for role: ${roleName}`);
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
      { id: '3e4516f7-7f49-496d-931e-08e370dcb133', name: 'Developer' },
      { id: '6f550e11-524b-4e9c-89d3-906f1ebba8e2', name: 'PM' },
      { id: '8e18a07c-5394-4f62-a365-d4f2a9c63a0d', name: 'TL' },
    ];

    // Insert colaboradores for each role
    for (const role of roles) {
      await insertColaboradoresForRole(role.id, role.name);
    }
  } catch (error) {
    console.error('Error inserting colaboradores:', error);
  }
}


export { insertColaboradores };