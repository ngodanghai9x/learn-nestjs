import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { Company } from './company.entity';

@Entity('employee_to_companies')
export class EmployeeToCompany {
  @PrimaryGeneratedColumn()
  public employeeToCompanyId!: number;

  @Column()
  public employeeId!: number;

  @Column()
  public companyId!: number;

  @Column()
  public order!: number;

  @ManyToOne(() => Employee, (employee) => employee.employeeToCompanies)
  public employee!: Employee;

  @ManyToOne(() => Company, (company) => company.employeeToCompanies)
  public company!: Company;
}
