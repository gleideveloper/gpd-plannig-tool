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
      role_name: 'DEV',
      description: 'Software Developer',
    });

    const tl_role = await Role.create({
      role_name: 'TL',
      description: 'Tech Lead',
    });

    const ut_role = await Role.create({
      role_name: 'UT_LEAD',
      description: 'UT Lead',
    });

    const pl_role = await Role.create({
      role_name: 'PL',
      description: 'Project Leader',
    });

    const da_role = await Role.create({
      role_name: 'DATA_ANALYST',
      description: 'Data Analyst',
    });

    const net_role = await Role.create({
      role_name: 'NETWORK',
      description: 'Network',
    });

    const cm_role = await Role.create({
      role_name: 'CM',
      description: 'CM',
    });

    const fact_role = await Role.create({
      role_name: 'FACTORY',
      description: 'Factory resource',
    });

  } catch (error) {
    console.error('Error inserting roles:', error);
  }
}

export { insertRoles };

