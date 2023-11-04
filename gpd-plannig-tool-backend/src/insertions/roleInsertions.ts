// roleInsertion.js or roleInsertion.ts

import { Role } from "@/dominio/modelos/Role"; // Import the Role model

// Function to insert roles into the database
async function insertRoles() {
  try {
    // Insert roles here
    const pm_role = await Role.create({
      role_name: 'PM',
      description: 'Project Manager',
    });

    const dev_role = await Role.create({
      role_name: 'Developer',
      description: 'Software Developer',
    });

    const tl_role = await Role.create({
      role_name: 'TL',
      description: 'Tech Lead',
    });

    // Additional role insertions can be added as needed
  } catch (error) {
    console.error('Error inserting roles:', error);
  }
}

export { insertRoles };

