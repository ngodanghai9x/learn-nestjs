import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Employee } from './employee.entity';
import { EmployeeToCompany } from './employee_to_company.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  website: string;

  @Column()
  email: string;

  // @ManyToMany(() => Employee)
  // @JoinTable()
  // employees: Employee[];

  @OneToMany(() => EmployeeToCompany, (employeeToCompany) => employeeToCompany.company)
  employeeToCompanies!: EmployeeToCompany[];
}
