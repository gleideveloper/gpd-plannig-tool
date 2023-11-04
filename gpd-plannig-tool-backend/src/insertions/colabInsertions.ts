import { Colaborador } from "@/dominio/modelos/Colaborador";
import { faker } from '@faker-js/faker';
import * as uuid from "uuid";

async function insertColaboradoresForRole(roleName) {
  try {
    const colaboradores: Array<Colaborador> = [];
    const qtde_colab = 5;
    for (let i = 0; i < qtde_colab; i++) {
      const nome = faker.person.fullName(); 
      const departamento = `Dpto${Math.floor(Math.random() * 3) + 1}`; 

      const colaborador = await Colaborador.create({
        id: uuid.v4(), 
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

async function insertColaboradores() {
  try {
    const roles = [
      { role_name: 'Developer' },
      { role_name: 'PM' },
      { role_name: 'TL' },
      { role_name: 'PL' },
      { role_name: 'UT_LEAD' },
      { role_name: 'CM' },
      { role_name: 'FACTORY' },
      { role_name: 'DATA_ANALYST' },
      { role_name: 'NETWORK' },
    ];

    for (const role of roles) {
      await insertColaboradoresForRole(role.role_name);
    }
  } catch (error) {
    console.error('Error inserting colaboradores:', error);
  }
}


export { insertColaboradores };
