import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { EmployeeToCompany } from './employee_to_company.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @ManyToMany(() => Company)
  // companies: Company[];

  @OneToMany(() => EmployeeToCompany, (employeeToCompany) => employeeToCompany.employee)
  employeeToCompanies!: EmployeeToCompany[];
}
