// roleInsertion.js or roleInsertion.ts

import { Role } from "@/dominio/modelos/Role"; // Import the Role model

// Function to insert roles into the database
async function insertRoles() {
  try {
    // Insert roles here
    const pm_role = await Role.create({
        id: '6f550e11-524b-4e9c-89d3-906f1ebba8e2',
      nome: 'PM',
      descricao: 'Project Manager',
    });

    const dev_role = await Role.create({
        id: '3e4516f7-7f49-496d-931e-08e370dcb133',
      nome: 'Developer',
      descricao: 'Software Developer',
    });

    const tl_role = await Role.create({
        id: '8e18a07c-5394-4f62-a365-d4f2a9c63a0d',
      nome: 'TL',
      descricao: 'Tech Lead',
    });

    // Additional role insertions can be added as needed
  } catch (error) {
    console.error('Error inserting roles:', error);
  }
}

export { insertRoles };

